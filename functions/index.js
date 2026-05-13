const { setGlobalOptions } = require("firebase-functions/v2");
const { HttpsError, onCall } = require("firebase-functions/v2/https");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();
setGlobalOptions({ region: "asia-east1", maxInstances: 10 });

const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

exports.bootstrapCurrentUser = onCall(async (request) => {
  const auth = requireAuth(request);
  const email = normalizeEmail(auth.token.email);
  const uid = auth.uid;
  const name = sanitizeName(request.data?.name || auth.token.name || "");
  const firstAdminEmail = normalizeEmail(process.env.FIRST_ADMIN_EMAIL);

  if (!email) {
    throw new HttpsError("invalid-argument", "Google 帳號缺少 Email。");
  }

  const userRef = db.collection("users").doc(uid);
  const allowedRef = db.collection("allowedUsers").doc(emailKey(email));
  const requestRef = db.collection("accountRequests").doc(uid);
  let profile;
  let accountRequest;
  let outcome = "active";

  await db.runTransaction(async (transaction) => {
    const [userSnap, allowedSnap, requestSnap] = await Promise.all([
      transaction.get(userRef),
      transaction.get(allowedRef),
      transaction.get(requestRef),
    ]);
    const allowedUser = allowedSnap.exists ? allowedSnap.data() : null;
    const existingUser = userSnap.exists ? userSnap.data() : null;
    const existingRequest = requestSnap.exists ? requestSnap.data() : null;
    const isConfiguredFirstAdmin = Boolean(firstAdminEmail && email === firstAdminEmail);

    if (!existingUser && !isConfiguredFirstAdmin && (!allowedUser || allowedUser.status !== "active")) {
      accountRequest = normalizeAccountRequest({
        uid,
        email,
        name: existingRequest?.name || name,
        ...(existingRequest || {}),
      });
      outcome = existingRequest ? accountRequest.status : "needs_request";
      return;
    }

    const role = existingUser?.role === "admin" || isConfiguredFirstAdmin || allowedUser?.role === "admin" ? "admin" : "user";
    const status = existingUser?.status === "disabled" || allowedUser?.status === "disabled" ? "disabled" : "active";

    if (status !== "active") {
      throw new HttpsError("permission-denied", "此帳號已停用。");
    }

    profile = {
      uid,
      email,
      name: existingUser?.name || name,
      role,
      status,
    };

    transaction.set(userRef, {
      uid,
      email,
      name: profile.name,
      role,
      status,
      createdAt: existingUser?.createdAt || FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      lastLoginAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    transaction.set(allowedRef, {
      email,
      uid,
      role,
      status,
      createdAt: allowedUser?.createdAt || FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    if (existingRequest && existingRequest.status !== "approved") {
      transaction.set(requestRef, {
        uid,
        email,
        name: profile.name,
        role,
        status: "approved",
        updatedAt: FieldValue.serverTimestamp(),
        reviewedAt: FieldValue.serverTimestamp(),
        reviewedByEmail: "system",
      }, { merge: true });
    }
  });

  if (outcome !== "active") {
    return { outcome, request: sanitizeAccountRequestForClient(accountRequest) };
  }

  await setClaims(uid, profile.role, profile.status);
  await writeAudit(request, {
    action: "login",
    targetEmail: email,
  });

  return { outcome: "active", profile: sanitizeProfileForClient(profile, auth.token) };
});

exports.updateCurrentUserProfile = onCall(async (request) => {
  const auth = requireAuth(request);
  const name = sanitizeName(request.data?.name);
  if (!name) {
    throw new HttpsError("invalid-argument", "請輸入顯示名稱。");
  }

  const profile = await requireActiveUser(auth.uid);
  await db.collection("users").doc(auth.uid).set({
    name,
    updatedAt: FieldValue.serverTimestamp(),
  }, { merge: true });
  await admin.auth().updateUser(auth.uid, { displayName: name }).catch((error) => logSafeWarning("auth.updateUser", error));
  await writeAudit(request, {
    action: "profile.update",
    targetEmail: profile.email,
  });

  return {
    profile: sanitizeProfileForClient({ ...profile, name }, auth.token),
  };
});

exports.createAllowedUser = onCall(async (request) => {
  await requireAdmin(request);
  const email = normalizeEmail(request.data?.email);
  const role = normalizeRole(request.data?.role);

  if (!email) {
    throw new HttpsError("invalid-argument", "請輸入有效的 Email。");
  }

  const authUser = await getAuthUserByEmail(email);
  const allowedRef = db.collection("allowedUsers").doc(emailKey(email));
  const userRef = authUser ? db.collection("users").doc(authUser.uid) : null;
  const requestRef = authUser ? db.collection("accountRequests").doc(authUser.uid) : null;

  await db.runTransaction(async (transaction) => {
    const [allowedSnap, requestSnap] = await Promise.all([
      transaction.get(allowedRef),
      requestRef ? transaction.get(requestRef) : Promise.resolve(null),
    ]);
    const allowedUser = allowedSnap.exists ? allowedSnap.data() : {};
    const accountRequest = requestSnap?.exists ? requestSnap.data() : {};
    let user = {};

    if (userRef) {
      const userSnap = await transaction.get(userRef);
      user = userSnap.exists ? userSnap.data() : {};
    }

    transaction.set(allowedRef, {
      email,
      uid: authUser?.uid || allowedUser.uid || "",
      role,
      status: "active",
      createdAt: allowedUser.createdAt || FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    if (userRef) {
      transaction.set(userRef, {
        uid: authUser.uid,
        email,
        name: user.name || authUser.displayName || "",
        role,
        status: "active",
        createdAt: user.createdAt || FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
    }

    if (requestRef && requestSnap?.exists) {
      transaction.set(requestRef, {
        uid: authUser.uid,
        email,
        name: user.name || accountRequest.name || authUser.displayName || "",
        role,
        status: "approved",
        updatedAt: FieldValue.serverTimestamp(),
        reviewedAt: FieldValue.serverTimestamp(),
        reviewedByEmail: normalizeEmail(request.auth?.token?.email),
      }, { merge: true });
    }
  });

  if (authUser) await setClaims(authUser.uid, role, "active");
  await writeAudit(request, {
    action: "account.create",
    targetEmail: email,
  });

  return { email, role, status: "active", uid: authUser?.uid || "" };
});

exports.submitAccountRequest = onCall(async (request) => {
  const auth = requireAuth(request);
  const uid = auth.uid;
  const email = normalizeEmail(auth.token.email);
  const name = sanitizeName(request.data?.name);

  if (!email) {
    throw new HttpsError("invalid-argument", "Google 帳號缺少 Email。");
  }

  if (!name) {
    throw new HttpsError("invalid-argument", "請輸入顯示名稱。");
  }

  const userRef = db.collection("users").doc(uid);
  const allowedRef = db.collection("allowedUsers").doc(emailKey(email));
  const requestRef = db.collection("accountRequests").doc(uid);
  let accountRequest;

  await db.runTransaction(async (transaction) => {
    const [userSnap, allowedSnap, requestSnap] = await Promise.all([
      transaction.get(userRef),
      transaction.get(allowedRef),
      transaction.get(requestRef),
    ]);
    const existingUser = userSnap.exists ? userSnap.data() : null;
    const allowedUser = allowedSnap.exists ? allowedSnap.data() : null;

    if (existingUser?.status === "active" || allowedUser?.status === "active") {
      throw new HttpsError("failed-precondition", "此帳號已可登入，請重新檢查登入狀態。");
    }

    const existingRequest = requestSnap.exists ? requestSnap.data() : {};
    accountRequest = normalizeAccountRequest({
      ...existingRequest,
      uid,
      email,
      name,
      role: existingRequest.role || "user",
      status: "pending",
      reviewedAt: "",
      reviewedByEmail: "",
    });

    transaction.set(requestRef, {
      uid,
      email,
      name,
      role: accountRequest.role,
      status: "pending",
      requestedAt: existingRequest.requestedAt || FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      reviewedAt: FieldValue.delete(),
      reviewedByEmail: FieldValue.delete(),
    }, { merge: true });
  });

  await writeAudit(request, {
    action: "account.request.submit",
    targetEmail: email,
  });

  return { outcome: "pending", request: sanitizeAccountRequestForClient(accountRequest) };
});

exports.approveAccountRequest = onCall(async (request) => {
  const adminProfile = await requireAdmin(request);
  const uid = String(request.data?.uid || "").trim();
  const role = normalizeRole(request.data?.role);

  if (!uid) {
    throw new HttpsError("invalid-argument", "找不到要審核的申請。");
  }

  const requestRef = db.collection("accountRequests").doc(uid);
  let approvedRequest;

  await db.runTransaction(async (transaction) => {
    const requestSnap = await transaction.get(requestRef);
    if (!requestSnap.exists) {
      throw new HttpsError("not-found", "找不到帳號申請。");
    }

    const accountRequest = normalizeAccountRequest({ uid, ...requestSnap.data() });
    if (!accountRequest.email) {
      throw new HttpsError("failed-precondition", "帳號申請缺少 Email。");
    }

    const userRef = db.collection("users").doc(uid);
    const allowedRef = db.collection("allowedUsers").doc(emailKey(accountRequest.email));
    const [userSnap, allowedSnap] = await Promise.all([
      transaction.get(userRef),
      transaction.get(allowedRef),
    ]);
    const user = userSnap.exists ? userSnap.data() : {};
    const allowedUser = allowedSnap.exists ? allowedSnap.data() : {};
    const name = accountRequest.name || sanitizeName(user.name || "");

    approvedRequest = {
      ...accountRequest,
      role,
      status: "approved",
      name,
    };

    transaction.set(userRef, {
      uid,
      email: accountRequest.email,
      name,
      role,
      status: "active",
      createdAt: user.createdAt || FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    transaction.set(allowedRef, {
      email: accountRequest.email,
      uid,
      role,
      status: "active",
      createdAt: allowedUser.createdAt || FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    transaction.set(requestRef, {
      uid,
      email: accountRequest.email,
      name,
      role,
      status: "approved",
      updatedAt: FieldValue.serverTimestamp(),
      reviewedAt: FieldValue.serverTimestamp(),
      reviewedByEmail: adminProfile.email,
    }, { merge: true });
  });

  await setClaims(uid, role, "active");
  await writeAudit(request, {
    action: "account.request.approve",
    targetEmail: approvedRequest.email,
    details: { role },
  });

  return { request: approvedRequest };
});

exports.rejectAccountRequest = onCall(async (request) => {
  const adminProfile = await requireAdmin(request);
  const uid = String(request.data?.uid || "").trim();

  if (!uid) {
    throw new HttpsError("invalid-argument", "找不到要審核的申請。");
  }

  const requestRef = db.collection("accountRequests").doc(uid);
  let rejectedRequest;

  await db.runTransaction(async (transaction) => {
    const requestSnap = await transaction.get(requestRef);
    if (!requestSnap.exists) {
      throw new HttpsError("not-found", "找不到帳號申請。");
    }

    const accountRequest = normalizeAccountRequest({ uid, ...requestSnap.data() });
    if (accountRequest.status === "approved") {
      throw new HttpsError("failed-precondition", "已核准的帳號申請不能改為拒絕。");
    }

    rejectedRequest = {
      ...accountRequest,
      status: "rejected",
    };

    transaction.set(requestRef, {
      status: "rejected",
      updatedAt: FieldValue.serverTimestamp(),
      reviewedAt: FieldValue.serverTimestamp(),
      reviewedByEmail: adminProfile.email,
    }, { merge: true });
  });

  await writeAudit(request, {
    action: "account.request.reject",
    targetEmail: rejectedRequest.email,
  });

  return { request: rejectedRequest };
});

exports.setUserRole = onCall(async (request) => {
  await requireAdmin(request);
  const role = normalizeRole(request.data?.role);
  const target = await resolveAccountTarget(request.data);

  await assertNotLastActiveAdmin(target.uid, role, target.status);
  await updateAccount(target, { role });
  if (target.uid) await setClaims(target.uid, role, target.status);

  await writeAudit(request, {
    action: "account.role",
    targetEmail: target.email,
    details: { role },
  });

  return { email: target.email, uid: target.uid, role, status: target.status };
});

exports.setUserStatus = onCall(async (request) => {
  await requireAdmin(request);
  const status = normalizeStatus(request.data?.status);
  const target = await resolveAccountTarget(request.data);

  await assertNotLastActiveAdmin(target.uid, target.role, status);
  await updateAccount(target, { status });
  if (target.uid) await setClaims(target.uid, target.role, status);

  await writeAudit(request, {
    action: "account.status",
    targetEmail: target.email,
    details: { status },
  });

  return { email: target.email, uid: target.uid, role: target.role, status };
});

exports.listAssignableOwners = onCall(async (request) => {
  const auth = requireAuth(request);
  const profile = await requireActiveUser(auth.uid);
  const canDelegate = profile.role === "admin" || await userHasDelegationScope(auth.uid);
  let snapshots;

  if (canDelegate) {
    snapshots = await db.collection("users")
      .where("status", "==", "active")
      .get();
  } else {
    const [selfSnap, adminsSnap] = await Promise.all([
      db.collection("users").doc(auth.uid).get(),
      db.collection("users")
        .where("role", "==", "admin")
        .where("status", "==", "active")
        .get(),
    ]);
    snapshots = {
      docs: [
        ...(selfSnap.exists ? [selfSnap] : []),
        ...adminsSnap.docs,
      ],
    };
  }

  const owners = new Map();
  snapshots.docs.forEach((snapshot) => {
    const user = snapshot.data();
    if (user.status !== "active") return;
    owners.set(snapshot.id, {
      uid: snapshot.id,
      name: sanitizeName(user.name || ""),
      role: normalizeRole(user.role),
      status: "active",
    });
  });

  return {
    owners: [...owners.values()].sort((a, b) => {
      return a.name.localeCompare(b.name, "zh-Hant");
    }),
  };
});

exports.auditSystemChanges = onDocumentWritten("systems/{docId}", (event) => auditDataChange(event, "systems"));
exports.auditProjectChanges = onDocumentWritten("projects/{docId}", (event) => auditDataChange(event, "projects"));
exports.auditTaskChanges = onDocumentWritten("tasks/{docId}", (event) => auditDataChange(event, "tasks"));

function requireAuth(request) {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "請先登入。");
  }
  return request.auth;
}

async function requireActiveUser(uid) {
  const snapshot = await db.collection("users").doc(uid).get();
  if (!snapshot.exists || snapshot.data().status !== "active") {
    throw new HttpsError("permission-denied", "帳號尚未啟用或已停用。");
  }
  return { uid: snapshot.id, ...snapshot.data() };
}

async function requireAdmin(request) {
  const auth = requireAuth(request);
  const profile = await requireActiveUser(auth.uid);
  if (profile.role !== "admin" || auth.token.admin !== true) {
    throw new HttpsError("permission-denied", "只有管理員可以使用後台功能。");
  }
  return profile;
}

async function resolveAccountTarget(data = {}) {
  const inputEmail = normalizeEmail(data.email);
  let uid = String(data.uid || "").trim();
  let email = inputEmail;
  let allowedUser = null;
  let user = null;

  if (email) {
    const allowedSnap = await db.collection("allowedUsers").doc(emailKey(email)).get();
    allowedUser = allowedSnap.exists ? allowedSnap.data() : null;
    uid ||= allowedUser?.uid || "";
  }

  if (uid) {
    const userSnap = await db.collection("users").doc(uid).get();
    user = userSnap.exists ? userSnap.data() : null;
    email ||= normalizeEmail(user?.email);
  }

  if (!uid && email) {
    const authUser = await getAuthUserByEmail(email);
    uid = authUser?.uid || "";
  }

  if (uid && !user) {
    const userSnap = await db.collection("users").doc(uid).get();
    user = userSnap.exists ? userSnap.data() : null;
  }

  email ||= normalizeEmail(user?.email);
  if (!email) {
    throw new HttpsError("invalid-argument", "找不到要更新的帳號。");
  }

  return {
    uid,
    email,
    role: normalizeRole(user?.role || allowedUser?.role || "user"),
    status: normalizeStatus(user?.status || allowedUser?.status || "active"),
  };
}

async function updateAccount(target, patch) {
  const allowedRef = db.collection("allowedUsers").doc(emailKey(target.email));
  const userRef = target.uid ? db.collection("users").doc(target.uid) : null;

  await db.runTransaction(async (transaction) => {
    const [allowedSnap, userSnap] = await Promise.all([
      transaction.get(allowedRef),
      userRef ? transaction.get(userRef) : Promise.resolve(null),
    ]);
    const allowedUser = allowedSnap.exists ? allowedSnap.data() : {};
    const user = userSnap?.exists ? userSnap.data() : {};

    transaction.set(allowedRef, {
      email: target.email,
      uid: target.uid || allowedUser.uid || "",
      role: patch.role || target.role,
      status: patch.status || target.status,
      createdAt: allowedUser.createdAt || FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    }, { merge: true });

    if (userRef) {
      transaction.set(userRef, {
        uid: target.uid,
        email: target.email,
        role: patch.role || target.role,
        status: patch.status || target.status,
        createdAt: user.createdAt || FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      }, { merge: true });
    }
  });
}

async function assertNotLastActiveAdmin(uid, nextRole, nextStatus) {
  if (!uid || (nextRole === "admin" && nextStatus === "active")) return;

  const userSnap = await db.collection("users").doc(uid).get();
  const user = userSnap.exists ? userSnap.data() : null;
  if (!user || user.role !== "admin" || user.status !== "active") return;

  const activeAdmins = await db.collection("users")
    .where("role", "==", "admin")
    .where("status", "==", "active")
    .get();

  if (activeAdmins.size <= 1) {
    throw new HttpsError("failed-precondition", "不能停用或降級最後一位管理員。");
  }
}

async function userHasDelegationScope(uid) {
  const [systemSnap, projectSnap] = await Promise.all([
    db.collection("systems").where("ownerUid", "==", uid).limit(1).get(),
    db.collection("projects").where("ownerUid", "==", uid).limit(1).get(),
  ]);
  return !systemSnap.empty || !projectSnap.empty;
}

async function setClaims(uid, role, status) {
  await admin.auth().setCustomUserClaims(uid, {
    role,
    status,
    admin: role === "admin" && status === "active",
  });
}

async function getAuthUserByEmail(email) {
  try {
    return await admin.auth().getUserByEmail(email);
  } catch (error) {
    if (error.code === "auth/user-not-found") return null;
    throw error;
  }
}

async function writeAudit(request, entry) {
  const actorEmail = normalizeEmail(request.auth?.token?.email || "system");
  await db.collection("auditLogs").add({
    actorUid: request.auth?.uid || "system",
    actorEmail,
    ...entry,
    createdAt: FieldValue.serverTimestamp(),
  });
}

async function auditDataChange(event, collection) {
  const beforeExists = event.data?.before?.exists;
  const afterExists = event.data?.after?.exists;
  const data = afterExists ? event.data.after.data() : event.data.before.data();
  const action = !beforeExists ? "data.create" : !afterExists ? "data.delete" : "data.update";

  await db.collection("auditLogs").add({
    actorUid: data.updatedBy || data.createdBy || "system",
    actorEmail: normalizeEmail(data.updatedByEmail || data.createdByEmail || "system"),
    action,
    collection,
    docId: event.params.docId,
    createdAt: FieldValue.serverTimestamp(),
  });
}

function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

function emailKey(email) {
  return encodeURIComponent(normalizeEmail(email));
}

function normalizeRole(role = "user") {
  return role === "admin" ? "admin" : "user";
}

function normalizeStatus(status = "active") {
  return status === "disabled" ? "disabled" : "active";
}

function normalizeRequestStatus(status = "pending") {
  return status === "approved" || status === "rejected" ? status : "pending";
}

function normalizeAccountRequest(request = {}) {
  return {
    uid: String(request.uid || "").trim(),
    email: normalizeEmail(request.email),
    name: sanitizeName(request.name),
    role: normalizeRole(request.role),
    status: normalizeRequestStatus(request.status),
    requestedAt: request.requestedAt || "",
    updatedAt: request.updatedAt || "",
    reviewedAt: request.reviewedAt || "",
    reviewedByEmail: normalizeEmail(request.reviewedByEmail),
  };
}

function sanitizeName(name = "") {
  return String(name).trim().slice(0, 40);
}

function sanitizeProfileForClient(profile = {}, token = {}) {
  const email = normalizeEmail(profile.email || token.email);
  const displayName = sanitizeName(profile.name || token.name || "");
  return {
    uid: String(profile.uid || "").trim(),
    displayName,
    name: displayName,
    emailMasked: maskEmail(email),
    emailVerified: token.email_verified === true,
    photoURL: "",
    role: normalizeRole(profile.role),
    status: normalizeStatus(profile.status),
    lastLoginAt: profile.lastLoginAt || "",
  };
}

function sanitizeAccountRequestForClient(request = {}) {
  const email = normalizeEmail(request.email);
  const reviewedByEmail = normalizeEmail(request.reviewedByEmail);
  return {
    uid: String(request.uid || "").trim(),
    displayName: sanitizeName(request.name),
    name: sanitizeName(request.name),
    emailMasked: maskEmail(email),
    role: normalizeRole(request.role),
    status: normalizeRequestStatus(request.status),
    requestedAt: request.requestedAt || "",
    updatedAt: request.updatedAt || "",
    reviewedAt: request.reviewedAt || "",
    reviewedByEmailMasked: maskEmail(reviewedByEmail),
  };
}

function maskEmail(email = "") {
  const normalized = normalizeEmail(email);
  const atIndex = normalized.indexOf("@");
  if (atIndex <= 0) return normalized ? "***" : "";
  const local = normalized.slice(0, atIndex);
  const domain = normalized.slice(atIndex + 1);
  const visible = local.slice(0, 1);
  const stars = "*".repeat(Math.max(3, local.length - 1));
  return `${visible}${stars}@${domain}`;
}

function getSensitiveAuthFields() {
  return [
    "idToken",
    "refreshToken",
    "oauthAccessToken",
    "stsTokenManager",
    "accessToken",
    "apiKey",
    "federatedId",
    "providerUserInfo",
    "rawUserInfo",
  ];
}

function redactSensitiveText(value = "") {
  return String(value)
    .replace(new RegExp(`\\b(${getSensitiveAuthFields().join("|")})\\b\\s*[:=]\\s*("[^"]*"|'[^']*'|[^\\s,}]+)`, "gi"), "$1: [redacted]")
    .replace(/[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+/g, "[redacted-token]")
    .replace(/[A-Za-z0-9_/-]{120,}={0,2}/g, "[redacted-token]");
}

function sanitizeLogError(error = {}) {
  return {
    name: String(error.name || "Error"),
    code: String(error.code || ""),
    message: redactSensitiveText(error.message || ""),
  };
}

function logSafeWarning(context, error = {}) {
  logger.warn(context, sanitizeLogError(error));
}
