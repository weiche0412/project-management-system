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
  let profile;

  await db.runTransaction(async (transaction) => {
    const [userSnap, allowedSnap] = await Promise.all([
      transaction.get(userRef),
      transaction.get(allowedRef),
    ]);
    const allowedUser = allowedSnap.exists ? allowedSnap.data() : null;
    const existingUser = userSnap.exists ? userSnap.data() : null;
    const isConfiguredFirstAdmin = Boolean(firstAdminEmail && email === firstAdminEmail);

    if (!existingUser && !isConfiguredFirstAdmin && (!allowedUser || allowedUser.status !== "active")) {
      throw new HttpsError("permission-denied", "此 Google 帳號尚未由管理員建立。");
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
  });

  await setClaims(uid, profile.role, profile.status);
  await writeAudit(request, {
    action: "login",
    targetEmail: email,
  });

  return { profile };
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
  await admin.auth().updateUser(auth.uid, { displayName: name }).catch((error) => logger.warn(error));
  await writeAudit(request, {
    action: "profile.update",
    targetEmail: profile.email,
  });

  return {
    profile: {
      ...profile,
      name,
    },
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

  await db.runTransaction(async (transaction) => {
    const allowedSnap = await transaction.get(allowedRef);
    const allowedUser = allowedSnap.exists ? allowedSnap.data() : {};
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
  });

  if (authUser) await setClaims(authUser.uid, role, "active");
  await writeAudit(request, {
    action: "account.create",
    targetEmail: email,
  });

  return { email, role, status: "active", uid: authUser?.uid || "" };
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

function sanitizeName(name = "") {
  return String(name).trim().slice(0, 40);
}
