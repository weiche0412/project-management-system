const phases = [
  { id: "deal", label: "商談" },
  { id: "planning", label: "規劃" },
  { id: "development", label: "開發" },
  { id: "testing", label: "測試" },
  { id: "launch", label: "版更" },
  { id: "closed", label: "結案" },
];

const projectCategories = [
  { id: "development", label: "開發" },
  { id: "general", label: "一般" },
];

const taskColumns = [
  { id: "not_started", title: "未開始" },
  { id: "doing", title: "進行中" },
  { id: "done", title: "已完成" },
];

const todoViews = [
  { id: "incomplete", title: "未完成任務", icon: "☰" },
  { id: "today", title: "今日待辦事項", icon: "☼" },
  { id: "tomorrow", title: "明日待辦事項", icon: "○" },
  { id: "thisWeek", title: "本週待辦事項", icon: "▣" },
  { id: "nextWeek", title: "下週待辦事項", icon: "▤" },
];

const generalWorkScopeId = "__general_work__";
const taskScopeOptions = [
  { id: "project", label: "專案任務" },
  { id: "system", label: "系統任務" },
  { id: "general", label: "一般任務" },
];

const preferencesKey = "project-desk-preferences-v1";
const previewStorageKey = "project-desk-preview-v1";
let state = createEmptyState();
let preferences = loadPreferences();
let selectedSystemId = null;
let selectedProjectId = "all";
let activeTodoView = preferences.activeTodoView || "today";
let todoSortKey = preferences.todoSortKey || "executionDate";
let todoSortDirection = preferences.todoSortDirection || "asc";
let todoGroupBySystem = Boolean(preferences.todoGroupBySystem);
let todoFocusSection = "";
let sidebarCollapsed = Boolean(preferences.sidebarCollapsed);
let todoSectionCollapsed = {
  deadline: false,
  general: false,
  range: true,
  completed: false,
  ...(preferences.todoSectionCollapsed || {}),
};
let ganttScale = preferences.ganttScale || "week";
let ganttProjectFilter = preferences.ganttProjectFilter || "all";
let selectedTagFilter = "";
let ganttCollapsed = {
  systems: {},
  projects: {},
  taskGroups: {},
  ...(preferences.ganttCollapsed || {}),
};
let selectedTodoTaskId = null;
let drawerMode = "view";
let toastTimer = null;
let completionAudioContext = null;
let auth = null;
let db = null;
let cloudFunctions = null;
let currentFirebaseUser = null;
let currentProfile = null;
let cloudReady = false;
let previewMode = false;
let cloudSaveTimer = null;
let cloudSaveChain = Promise.resolve();
let profileDialogRequired = false;
let authSessionVersion = 0;
let profileUnsubscribe = null;
let cloudUnsubscribes = [];
let adminUnsubscribes = [];
let remoteState = createEmptyState();
let remoteLoaded = { systems: false, projects: false, tasks: false };
let lastSyncedState = createEmptyStateMaps();
let adminUsers = [];
let adminAllowedUsers = [];
let adminAuditLogs = [];
let adminFilters = {
  query: "",
  action: "all",
  date: "",
};

const els = {
  authScreen: document.querySelector("#authScreen"),
  googleSignInButton: document.querySelector("#googleSignInButton"),
  previewModeButton: document.querySelector("#previewModeButton"),
  authStatusText: document.querySelector("#authStatusText"),
  authHelpText: document.querySelector("#authHelpText"),
  appShell: document.querySelector("#appShell") || document.querySelector(".app-shell"),
  adminButton: document.querySelector("#adminButton"),
  accountButton: document.querySelector("#accountButton"),
  accountName: document.querySelector("#accountName"),
  accountRole: document.querySelector("#accountRole"),
  accountMenu: document.querySelector("#accountMenu"),
  editProfileButton: document.querySelector("#editProfileButton"),
  signOutButton: document.querySelector("#signOutButton"),
  profileDialog: document.querySelector("#profileDialog"),
  profileForm: document.querySelector("#profileForm"),
  profileName: document.querySelector("#profileName"),
  profileDialogClose: document.querySelector("#profileDialogClose"),
  profileCancelButton: document.querySelector("#profileCancelButton"),
  sidebarToggle: document.querySelector("#sidebarToggle"),
  systemList: document.querySelector("#systemList"),
  pageTitle: document.querySelector("#pageTitle"),
  pageSubtitle: document.querySelector("#pageSubtitle"),
  searchInput: document.querySelector("#searchInput"),
  phaseFilter: document.querySelector("#phaseFilter"),
  tagFilterBar: document.querySelector("#tagFilterBar"),
  todoDashboard: document.querySelector("#todoDashboard"),
  openTodoPageButton: document.querySelector("#openTodoPageButton"),
  openGanttPageButton: document.querySelector("#openGanttPageButton"),
  todoPage: document.querySelector("#todoPage"),
  closeTodoPageButton: document.querySelector("#closeTodoPageButton"),
  todoPageSidebar: document.querySelector("#todoPageSidebar"),
  todoPageSearch: document.querySelector("#todoPageSearch"),
  todoPageTitle: document.querySelector("#todoPageTitle"),
  todoPageDate: document.querySelector("#todoPageDate"),
  todoSystemTabs: document.querySelector("#todoSystemTabs"),
  todoSortSelect: document.querySelector("#todoSortSelect"),
  todoSortDirectionSelect: document.querySelector("#todoSortDirectionSelect"),
  todoGroupSystemButton: document.querySelector("#todoGroupSystemButton"),
  todoGroupIndicator: document.querySelector("#todoGroupIndicator"),
  todoClearGroupButton: document.querySelector("#todoClearGroupButton"),
  todoQuickForm: document.querySelector("#todoQuickForm"),
  todoAddTrigger: document.querySelector("#todoAddTrigger"),
  todoAddDetails: document.querySelector("#todoAddDetails"),
  todoAddReset: document.querySelector("#todoAddReset"),
  todoAddCancel: document.querySelector("#todoAddCancel"),
  ganttPage: document.querySelector("#ganttPage"),
  closeGanttPageButton: document.querySelector("#closeGanttPageButton"),
  ganttSearchInput: document.querySelector("#ganttSearchInput"),
  ganttScaleSelect: document.querySelector("#ganttScaleSelect"),
  ganttProjectFilter: document.querySelector("#ganttProjectFilter"),
  ganttRangeLabel: document.querySelector("#ganttRangeLabel"),
  ganttChart: document.querySelector("#ganttChart"),
  ganttTaskDrawer: document.querySelector("#ganttTaskDrawer"),
  addTodoEmailButton: document.querySelector("#addTodoEmailButton"),
  addTodoLinkButton: document.querySelector("#addTodoLinkButton"),
  todoPageList: document.querySelector("#todoPageList"),
  todoTaskDrawer: document.querySelector("#todoTaskDrawer"),
  mainTaskDrawer: document.querySelector("#mainTaskDrawer"),
  toast: document.querySelector("#toast"),
  projectList: document.querySelector("#projectList"),
  projectTabs: document.querySelector("#projectTabs"),
  board: document.querySelector("#board"),
  taskScopeLabel: document.querySelector("#taskScopeLabel"),
  addSystemButton: document.querySelector("#addSystemButton"),
  quickSystemButton: document.querySelector("#quickSystemButton"),
  addProjectButton: document.querySelector("#addProjectButton"),
  addTaskButton: document.querySelector("#addTaskButton"),
  systemDialog: document.querySelector("#systemDialog"),
  systemForm: document.querySelector("#systemForm"),
  projectDialog: document.querySelector("#projectDialog"),
  projectForm: document.querySelector("#projectForm"),
  taskDialog: document.querySelector("#taskDialog"),
  taskForm: document.querySelector("#taskForm"),
  deleteTaskButton: document.querySelector("#deleteTaskButton"),
  addProjectEmailButton: document.querySelector("#addProjectEmailButton"),
  addProjectLinkButton: document.querySelector("#addProjectLinkButton"),
  addTaskEmailButton: document.querySelector("#addTaskEmailButton"),
  addTaskLinkButton: document.querySelector("#addTaskLinkButton"),
  systemCount: document.querySelector("#systemCount"),
  projectCount: document.querySelector("#projectCount"),
  activeTaskCount: document.querySelector("#activeTaskCount"),
  deadlineCount: document.querySelector("#deadlineCount"),
  adminPage: document.querySelector("#adminPage"),
  closeAdminPageButton: document.querySelector("#closeAdminPageButton"),
  adminMetrics: document.querySelector("#adminMetrics"),
  adminUserForm: document.querySelector("#adminUserForm"),
  adminUserEmail: document.querySelector("#adminUserEmail"),
  adminUserRole: document.querySelector("#adminUserRole"),
  adminUsersTable: document.querySelector("#adminUsersTable"),
  auditLogTable: document.querySelector("#auditLogTable"),
  auditSearchInput: document.querySelector("#auditSearchInput"),
  auditActionFilter: document.querySelector("#auditActionFilter"),
  auditDateFilter: document.querySelector("#auditDateFilter"),
  exportJsonButton: document.querySelector("#exportJsonButton"),
  exportCsvButton: document.querySelector("#exportCsvButton"),
};

const systemFields = {
  id: document.querySelector("#systemId"),
  name: document.querySelector("#systemName"),
  description: document.querySelector("#systemDescription"),
};

const projectFields = {
  id: document.querySelector("#projectId"),
  systemId: document.querySelector("#projectSystem"),
  category: document.querySelector("#projectCategory"),
  name: document.querySelector("#projectName"),
  description: document.querySelector("#projectDescription"),
  phaseFields: document.querySelector("#projectPhaseFields"),
  phase: document.querySelector("#projectPhase"),
  phaseChangedAt: document.querySelector("#projectPhaseChangedAt"),
  requirementField: document.querySelector("#projectRequirementField"),
  requirementRequest: document.querySelector("#projectRequirementRequest"),
  scheduleSection: document.querySelector("#projectScheduleSection"),
  plannedStart: document.querySelector("#projectPlannedStart"),
  plannedEnd: document.querySelector("#projectPlannedEnd"),
  phaseScheduleSection: document.querySelector("#phaseScheduleSection"),
  phaseSchedules: document.querySelector("#phaseScheduleFields"),
  relatedEmails: document.querySelector("#projectRelatedEmails"),
  relatedLinks: document.querySelector("#projectRelatedLinks"),
};

const taskFields = {
  id: document.querySelector("#taskId"),
  scope: document.querySelector("#taskScope"),
  systemField: document.querySelector("#taskSystemField"),
  systemId: document.querySelector("#taskSystem"),
  projectField: document.querySelector("#taskProjectField"),
  projectId: document.querySelector("#taskProject"),
  title: document.querySelector("#taskTitle"),
  description: document.querySelector("#taskDescription"),
  status: document.querySelector("#taskStatus"),
  priority: document.querySelector("#taskPriority"),
  rangeStart: document.querySelector("#taskRangeStart"),
  rangeEnd: document.querySelector("#taskRangeEnd"),
  executionDate: document.querySelector("#taskExecutionDate"),
  deadline: document.querySelector("#taskDeadline"),
  completedDateField: document.querySelector("#taskCompletedDateField"),
  completedDate: document.querySelector("#taskCompletedDate"),
  owner: document.querySelector("#taskOwner"),
  tags: document.querySelector("#taskTags"),
  stakeholders: document.querySelector("#taskStakeholders"),
  relatedEmails: document.querySelector("#taskRelatedEmails"),
  relatedLinks: document.querySelector("#taskRelatedLinks"),
};

const todoAddFields = {
  mode: document.querySelector("#todoAddMode"),
  scope: document.querySelector("#todoAddScope"),
  systemField: document.querySelector("#todoAddSystemField"),
  systemId: document.querySelector("#todoAddSystem"),
  projectField: document.querySelector("#todoAddProjectField"),
  projectId: document.querySelector("#todoAddProject"),
  existingTaskField: document.querySelector("#todoExistingTaskField"),
  existingTaskId: document.querySelector("#todoExistingTask"),
  title: document.querySelector("#todoAddTitle"),
  description: document.querySelector("#todoAddDescription"),
  status: document.querySelector("#todoAddStatus"),
  priority: document.querySelector("#todoAddPriority"),
  owner: document.querySelector("#todoAddOwner"),
  rangeStart: document.querySelector("#todoAddRangeStart"),
  rangeEnd: document.querySelector("#todoAddRangeEnd"),
  executionDate: document.querySelector("#todoAddExecutionDate"),
  deadline: document.querySelector("#todoAddDeadline"),
  completedDateField: document.querySelector("#todoAddCompletedDateField"),
  completedDate: document.querySelector("#todoAddCompletedDate"),
  tags: document.querySelector("#todoAddTags"),
  stakeholders: document.querySelector("#todoAddStakeholders"),
  relatedEmails: document.querySelector("#todoRelatedEmails"),
  relatedLinks: document.querySelector("#todoRelatedLinks"),
};

els.googleSignInButton?.addEventListener("click", signInWithGoogle);
els.previewModeButton?.addEventListener("click", startPreviewMode);
els.signOutButton?.addEventListener("click", signOutCurrentUser);
els.accountButton?.addEventListener("click", () => {
  els.accountMenu.classList.toggle("hidden");
  els.accountButton.setAttribute("aria-expanded", String(!els.accountMenu.classList.contains("hidden")));
});
els.editProfileButton?.addEventListener("click", () => openProfileDialog(false));
els.profileForm?.addEventListener("submit", handleProfileSubmit);
els.profileDialog?.addEventListener("cancel", (event) => {
  if (profileDialogRequired) event.preventDefault();
});
els.adminButton?.addEventListener("click", openAdminPage);
els.closeAdminPageButton?.addEventListener("click", closeAdminPage);
els.adminUserForm?.addEventListener("submit", handleAdminUserCreate);
els.adminUsersTable?.addEventListener("change", handleAdminTableChange);
els.adminUsersTable?.addEventListener("click", handleAdminTableClick);
els.auditSearchInput?.addEventListener("input", () => {
  adminFilters.query = els.auditSearchInput.value.trim().toLowerCase();
  renderAuditLogs();
});
els.auditActionFilter?.addEventListener("change", () => {
  adminFilters.action = els.auditActionFilter.value;
  renderAuditLogs();
});
els.auditDateFilter?.addEventListener("change", () => {
  adminFilters.date = els.auditDateFilter.value;
  renderAuditLogs();
});
els.exportJsonButton?.addEventListener("click", exportProjectDataJson);
els.exportCsvButton?.addEventListener("click", exportProjectDataCsv);
els.addSystemButton.addEventListener("click", () => openSystemDialog());
els.quickSystemButton.addEventListener("click", () => openSystemDialog());
els.addProjectButton.addEventListener("click", () => openProjectDialog());
els.addTaskButton.addEventListener("click", () => openTaskDialog());
els.sidebarToggle.addEventListener("click", () => {
  sidebarCollapsed = !sidebarCollapsed;
  syncSidebarCollapsed();
  persistViewPreferences();
});
els.openTodoPageButton.addEventListener("click", () => openTodoPage("today"));
els.openGanttPageButton.addEventListener("click", openGanttPage);
els.closeTodoPageButton.addEventListener("click", closeTodoPage);
els.closeGanttPageButton.addEventListener("click", closeGanttPage);
els.todoPageSearch.addEventListener("input", renderTodoPage);
els.ganttSearchInput.addEventListener("input", () => {
  els.searchInput.value = els.ganttSearchInput.value;
  render();
});
els.ganttScaleSelect.addEventListener("change", () => {
  ganttScale = els.ganttScaleSelect.value;
  persistViewPreferences();
  renderGanttPage();
});
els.ganttProjectFilter.addEventListener("change", () => {
  ganttProjectFilter = els.ganttProjectFilter.value;
  persistViewPreferences();
  renderGanttPage();
});
els.todoSortSelect.addEventListener("change", () => {
  todoSortKey = els.todoSortSelect.value;
  persistViewPreferences();
  renderTodoPage();
});
els.todoSortDirectionSelect.addEventListener("change", () => {
  todoSortDirection = els.todoSortDirectionSelect.value;
  persistViewPreferences();
  renderTodoPage();
});
els.todoGroupSystemButton.addEventListener("click", () => {
  todoGroupBySystem = true;
  persistViewPreferences();
  renderTodoPage();
});
els.todoClearGroupButton.addEventListener("click", () => {
  todoGroupBySystem = false;
  persistViewPreferences();
  renderTodoPage();
});
els.todoAddTrigger.addEventListener("click", () => openTodoAddDetails());
els.todoQuickForm.addEventListener("submit", handleTodoQuickSubmit);
els.todoAddReset.addEventListener("click", () => resetTodoAddForm(false));
els.todoAddCancel.addEventListener("click", () => resetTodoAddForm(true));
els.searchInput.addEventListener("input", render);
els.phaseFilter.addEventListener("change", () => {
  selectedTagFilter = "";
  selectedProjectId = "all";
  render();
});
els.systemForm.addEventListener("submit", handleSystemSubmit);
els.projectForm.addEventListener("submit", handleProjectSubmit);
els.taskForm.addEventListener("submit", handleTaskSubmit);
els.deleteTaskButton.addEventListener("click", handleTaskDelete);
els.addProjectEmailButton.addEventListener("click", () => addEmailRow(projectFields.relatedEmails));
els.addProjectLinkButton.addEventListener("click", () => addLinkRow(projectFields.relatedLinks));
els.addTaskEmailButton.addEventListener("click", () => addEmailRow(taskFields.relatedEmails));
els.addTaskLinkButton.addEventListener("click", () => addLinkRow(taskFields.relatedLinks));
els.addTodoEmailButton.addEventListener("click", () => addEmailRow(todoAddFields.relatedEmails));
els.addTodoLinkButton.addEventListener("click", () => addLinkRow(todoAddFields.relatedLinks));
projectFields.category.addEventListener("change", () => syncProjectCategoryFields());
projectFields.phase.addEventListener("change", () => {
  projectFields.phaseChangedAt.value = todayString();
});
taskFields.scope.addEventListener("change", () => syncTaskScopeFields(taskFields));
taskFields.systemId.addEventListener("change", () => {
  populateTaskProjectSelect(taskFields.systemId.value);
  syncTaskScopeFields(taskFields, false);
});
taskFields.status.addEventListener("change", () => syncTaskCompletedField(taskFields));
taskFields.rangeStart.addEventListener("change", () => updateTaskDateConstraints(taskFields));
taskFields.rangeEnd.addEventListener("change", () => updateTaskDateConstraints(taskFields));
taskFields.executionDate.addEventListener("change", () => updateTaskDateConstraints(taskFields, false));
taskFields.deadline.addEventListener("change", () => updateTaskDateConstraints(taskFields, false));
todoAddFields.mode.addEventListener("change", updateTodoAddMode);
todoAddFields.scope.addEventListener("change", () => {
  syncTaskScopeFields(todoAddFields);
  populateTodoExistingTaskSelect();
  if (todoAddFields.mode.value === "existing") fillTodoAddFromExistingTask();
});
todoAddFields.systemId.addEventListener("change", () => {
  populateTodoProjectSelect(todoAddFields.systemId.value);
  syncTaskScopeFields(todoAddFields, false);
  populateTodoExistingTaskSelect();
  if (todoAddFields.mode.value === "existing") fillTodoAddFromExistingTask();
});
todoAddFields.projectId.addEventListener("change", () => {
  populateTodoExistingTaskSelect();
  if (todoAddFields.mode.value === "existing") fillTodoAddFromExistingTask();
});
todoAddFields.existingTaskId.addEventListener("change", fillTodoAddFromExistingTask);
todoAddFields.status.addEventListener("change", () => syncTaskCompletedField(todoAddFields));
todoAddFields.rangeStart.addEventListener("change", () => updateTaskDateConstraints(todoAddFields));
todoAddFields.rangeEnd.addEventListener("change", () => updateTaskDateConstraints(todoAddFields));
todoAddFields.executionDate.addEventListener("change", () => updateTaskDateConstraints(todoAddFields, false));
todoAddFields.deadline.addEventListener("change", () => updateTaskDateConstraints(todoAddFields, false));
projectFields.plannedStart.addEventListener("change", () => updateProjectScheduleConstraints());
projectFields.plannedEnd.addEventListener("change", () => updateProjectScheduleConstraints());
document.addEventListener("click", handleRelatedRowClick);
document.addEventListener("click", handleTagFilterClick);
document.addEventListener("click", (event) => {
  if (!event.target.closest(".account-panel")) {
    els.accountMenu?.classList.add("hidden");
    els.accountButton?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.closeDialog === "profileDialog" && profileDialogRequired) return;
    document.querySelector(`#${button.dataset.closeDialog}`).close();
  });
});

initializeCloudApp();

function buildStarterState() {
  const systemA = createId();
  const systemB = createId();
  const systemC = createId();
  const systemD = createId();
  const projectA = createId();
  const projectB = createId();
  const projectC = createId();
  const projectD = createId();
  const projectE = createId();
  const projectF = createId();
  const projectG = createId();
  const projectH = createId();

  const makeTask = ({
    scope = "project",
    systemId,
    projectId,
    title,
    description,
    status = "not_started",
    priority = "medium",
    owner,
    rangeStart,
    rangeEnd,
    executionDate,
    deadline,
    tags = [],
    relatedEmails = [],
    relatedLinks = [],
    important = false,
    steps = [],
    files = [],
    notes = "",
    history = [],
    completedDate,
  }) => ({
    id: createId(),
    scope,
    systemId,
    projectId,
    title,
    description,
    status,
    priority,
    owner,
    rangeStart: getDateOffset(rangeStart),
    rangeEnd: getDateOffset(rangeEnd),
    executionDate: getDateOffset(executionDate),
    deadline: getDateOffset(deadline),
    tags,
    relatedEmails,
    relatedLinks,
    completedDate: status === "done" ? getDateOffset(completedDate ?? 0) : "",
    important,
    steps: steps.map((step) => ({
      id: createId(),
      title: step.title,
      completed: Boolean(step.completed),
    })),
    files,
    notes,
    history: normalizeTaskHistory(history),
  });

  return {
    systems: [
      {
        id: systemA,
        name: "CRM 客戶管理系統",
        description: "管理客戶資料、商機與售後服務流程。",
      },
      {
        id: systemB,
        name: "內部營運系統",
        description: "支援跨部門流程、簽核與報表。",
      },
      {
        id: systemC,
        name: "ERP 財務採購系統",
        description: "整合採購、應付帳款、月結與管理報表。",
      },
      {
        id: systemD,
        name: "客服工單系統",
        description: "管理客服案件、SLA、分派規則與客訴追蹤。",
      },
    ],
    projects: [
      {
        id: projectA,
        systemId: systemA,
        name: "會員登入改版",
        description: "改善登入體驗，補齊雙因素驗證與錯誤提示。",
        phase: "development",
        plannedStart: getDateOffset(-5),
        plannedEnd: getDateOffset(20),
        phaseSchedules: createPhaseSchedules({
          deal: { start: getDateOffset(-12), end: getDateOffset(-9) },
          planning: { start: getDateOffset(-8), end: getDateOffset(-4) },
          development: { start: getDateOffset(-3), end: getDateOffset(10) },
          testing: { start: getDateOffset(11), end: getDateOffset(16) },
          launch: { start: getDateOffset(17), end: getDateOffset(20) },
        }),
        relatedEmails: ["會員登入改版需求確認"],
        relatedLinks: [{ title: "登入流程稿", url: "https://example.com/login-flow" }],
        closed: false,
        closedAt: "",
      },
      {
        id: projectB,
        systemId: systemA,
        name: "客戶資料清理",
        description: "清理重複客戶資料並補強欄位一致性。",
        phase: "planning",
        plannedStart: getDateOffset(3),
        plannedEnd: getDateOffset(24),
        phaseSchedules: createPhaseSchedules({
          deal: { start: getDateOffset(0), end: getDateOffset(2) },
          planning: { start: getDateOffset(3), end: getDateOffset(8) },
          development: { start: getDateOffset(9), end: getDateOffset(18) },
          testing: { start: getDateOffset(19), end: getDateOffset(22) },
          launch: { start: getDateOffset(23), end: getDateOffset(24) },
        }),
        relatedEmails: ["客戶資料清理欄位對照", "重複資料判斷規則確認"],
        relatedLinks: [{ title: "資料清理規格", url: "https://example.com/customer-cleanup" }],
        closed: false,
        closedAt: "",
      },
      {
        id: projectC,
        systemId: systemB,
        name: "費用簽核電子化",
        description: "將紙本簽核流程改為線上申請、審核與通知。",
        phase: "testing",
        plannedStart: getDateOffset(-12),
        plannedEnd: getDateOffset(8),
        phaseSchedules: createPhaseSchedules({
          deal: { start: getDateOffset(-24), end: getDateOffset(-20) },
          planning: { start: getDateOffset(-19), end: getDateOffset(-14) },
          development: { start: getDateOffset(-13), end: getDateOffset(-3) },
          testing: { start: getDateOffset(-2), end: getDateOffset(5) },
          launch: { start: getDateOffset(6), end: getDateOffset(8) },
        }),
        relatedEmails: ["費用簽核 UAT 測試通知"],
        relatedLinks: [{ title: "簽核流程測試案例", url: "https://example.com/expense-approval-uat" }],
        closed: false,
        closedAt: "",
      },
      {
        id: projectD,
        systemId: systemB,
        name: "公告與知識庫整合",
        description: "整合公司公告、FAQ 與內部知識庫搜尋，降低重複詢問。",
        phase: "development",
        plannedStart: getDateOffset(-4),
        plannedEnd: getDateOffset(18),
        phaseSchedules: createPhaseSchedules({
          planning: { start: getDateOffset(-4), end: getDateOffset(0) },
          development: { start: getDateOffset(1), end: getDateOffset(10) },
          testing: { start: getDateOffset(11), end: getDateOffset(15) },
          launch: { start: getDateOffset(16), end: getDateOffset(18) },
        }),
        relatedEmails: ["知識庫分類盤點結果"],
        relatedLinks: [{ title: "知識庫資訊架構", url: "https://example.com/knowledge-base-ia" }],
        closed: false,
        closedAt: "",
      },
      {
        id: projectE,
        systemId: systemC,
        name: "採購申請流程優化",
        description: "簡化採購申請、比價、核准與收貨確認流程。",
        phase: "planning",
        plannedStart: getDateOffset(0),
        plannedEnd: getDateOffset(28),
        phaseSchedules: createPhaseSchedules({
          deal: { start: getDateOffset(0), end: getDateOffset(3) },
          planning: { start: getDateOffset(4), end: getDateOffset(9) },
          development: { start: getDateOffset(10), end: getDateOffset(21) },
          testing: { start: getDateOffset(22), end: getDateOffset(26) },
          launch: { start: getDateOffset(27), end: getDateOffset(28) },
        }),
        relatedEmails: ["採購申請流程訪談紀錄"],
        relatedLinks: [{ title: "採購流程藍圖", url: "https://example.com/purchase-flow" }],
        closed: false,
        closedAt: "",
      },
      {
        id: projectF,
        systemId: systemC,
        name: "月結報表自動化",
        description: "自動彙整應付帳款、採購金額與部門費用分攤報表。",
        phase: "testing",
        plannedStart: getDateOffset(-10),
        plannedEnd: getDateOffset(12),
        phaseSchedules: createPhaseSchedules({
          planning: { start: getDateOffset(-10), end: getDateOffset(-6) },
          development: { start: getDateOffset(-5), end: getDateOffset(4) },
          testing: { start: getDateOffset(5), end: getDateOffset(10) },
          launch: { start: getDateOffset(11), end: getDateOffset(12) },
        }),
        relatedEmails: ["月結報表欄位確認", "財務月結試算資料"],
        relatedLinks: [{ title: "月結報表樣板", url: "https://example.com/monthly-close-report" }],
        closed: false,
        closedAt: "",
      },
      {
        id: projectG,
        systemId: systemD,
        name: "SLA 追蹤儀表板",
        description: "建立客服案件 SLA 即時監控、逾時預警與主管檢視儀表板。",
        phase: "development",
        plannedStart: getDateOffset(-2),
        plannedEnd: getDateOffset(16),
        phaseSchedules: createPhaseSchedules({
          planning: { start: getDateOffset(-2), end: getDateOffset(1) },
          development: { start: getDateOffset(2), end: getDateOffset(9) },
          testing: { start: getDateOffset(10), end: getDateOffset(14) },
          launch: { start: getDateOffset(15), end: getDateOffset(16) },
        }),
        relatedEmails: ["客服 SLA 指標定義"],
        relatedLinks: [{ title: "SLA 儀表板 wireframe", url: "https://example.com/sla-dashboard" }],
        closed: false,
        closedAt: "",
      },
      {
        id: projectH,
        systemId: systemD,
        name: "客訴案件分派規則",
        description: "依產品線、客戶等級與案件類型自動分派客訴案件。",
        phase: "deal",
        plannedStart: getDateOffset(5),
        plannedEnd: getDateOffset(30),
        phaseSchedules: createPhaseSchedules({
          deal: { start: getDateOffset(5), end: getDateOffset(8) },
          planning: { start: getDateOffset(9), end: getDateOffset(14) },
          development: { start: getDateOffset(15), end: getDateOffset(24) },
          testing: { start: getDateOffset(25), end: getDateOffset(28) },
          launch: { start: getDateOffset(29), end: getDateOffset(30) },
        }),
        relatedEmails: ["客訴分派規則討論"],
        relatedLinks: [{ title: "分派矩陣草案", url: "https://example.com/complaint-routing" }],
        closed: false,
        closedAt: "",
      },
    ],
    tasks: [
      makeTask({
        systemId: systemA,
        projectId: projectA,
        title: "整理登入需求與驗收條件",
        description: "確認帳號、密碼、雙因素驗證與錯誤提示規則。",
        status: "not_started",
        priority: "high",
        owner: "Alice",
        rangeStart: 0,
        rangeEnd: 3,
        executionDate: 0,
        deadline: 3,
        tags: ["需求", "PRD"],
        relatedEmails: ["登入改版需求確認"],
        relatedLinks: [{ title: "登入流程稿", url: "https://example.com/login-flow" }],
        important: true,
        steps: [
          { title: "整理驗收條件", completed: false },
          { title: "確認錯誤提示文案", completed: false },
        ],
      }),
      makeTask({
        systemId: systemA,
        projectId: projectA,
        title: "串接登入 API",
        description: "完成前端呼叫、錯誤處理與 token 更新。",
        status: "doing",
        priority: "medium",
        owner: "Ben",
        rangeStart: 1,
        rangeEnd: 7,
        executionDate: 1,
        deadline: 8,
        tags: ["API", "Frontend"],
        relatedEmails: [],
        relatedLinks: [],
        important: false,
        steps: [
          { title: "建立登入服務呼叫", completed: true },
          { title: "補上錯誤訊息對應", completed: false },
        ],
      }),
      makeTask({
        systemId: systemA,
        projectId: projectA,
        title: "完成登入頁可用性回饋整理",
        description: "彙整測試者回饋並標記後續優化項目。",
        status: "done",
        priority: "low",
        owner: "Alice",
        rangeStart: -3,
        rangeEnd: -1,
        executionDate: -1,
        deadline: 0,
        tags: ["UX", "回饋"],
        relatedEmails: ["登入頁可用性測試結果"],
        relatedLinks: [{ title: "回饋彙整表", url: "https://example.com/login-feedback" }],
        important: false,
        completedDate: 0,
        steps: [
          { title: "彙整問題清單", completed: true },
          { title: "標記高頻問題", completed: true },
        ],
      }),
      makeTask({
        systemId: systemA,
        projectId: projectB,
        title: "定義重複客戶判斷規則",
        description: "釐清統編、Email、手機與公司名稱的比對優先順序。",
        status: "not_started",
        priority: "high",
        owner: "Dora",
        rangeStart: 0,
        rangeEnd: 2,
        executionDate: 0,
        deadline: 0,
        tags: ["資料治理", "規則"],
        relatedEmails: ["重複資料判斷規則確認"],
        relatedLinks: [{ title: "重複判斷規格", url: "https://example.com/dedup-rule" }],
        important: true,
        steps: [
          { title: "盤點現有重複資料案例", completed: false },
          { title: "確認欄位權重", completed: false },
        ],
      }),
      makeTask({
        systemId: systemA,
        projectId: projectB,
        title: "建立資料清理批次腳本",
        description: "建立可重跑的批次清理流程與清理前後比對紀錄。",
        status: "doing",
        priority: "medium",
        owner: "Ethan",
        rangeStart: 3,
        rangeEnd: 9,
        executionDate: 4,
        deadline: 10,
        tags: ["Batch", "Data"],
        relatedEmails: [],
        relatedLinks: [{ title: "清理腳本規格", url: "https://example.com/cleanup-job" }],
        important: false,
        steps: [
          { title: "建立清理暫存表", completed: true },
          { title: "產生清理差異報表", completed: false },
        ],
      }),
      makeTask({
        systemId: systemA,
        projectId: projectB,
        title: "完成客戶欄位盤點",
        description: "整理 CRM 主要客戶欄位與資料來源。",
        status: "done",
        priority: "low",
        owner: "Dora",
        rangeStart: -2,
        rangeEnd: 0,
        executionDate: 0,
        deadline: 0,
        tags: ["欄位盤點"],
        relatedEmails: ["客戶資料清理欄位對照"],
        relatedLinks: [],
        completedDate: 0,
        steps: [
          { title: "匯出欄位清單", completed: true },
          { title: "標示必要欄位", completed: true },
        ],
      }),
      makeTask({
        systemId: systemB,
        projectId: projectC,
        title: "測試主管簽核流程",
        description: "覆蓋代理人、退回、補件與通知案例。",
        status: "doing",
        priority: "high",
        owner: "Chris",
        rangeStart: -2,
        rangeEnd: 2,
        executionDate: 0,
        deadline: 4,
        tags: ["QA", "Workflow"],
        relatedEmails: ["費用簽核 UAT 測試通知"],
        relatedLinks: [{ title: "簽核流程測試案例", url: "https://example.com/expense-approval-uat" }],
        important: false,
        steps: [
          { title: "測試代理人簽核", completed: true },
          { title: "測試退回補件通知", completed: false },
        ],
      }),
      makeTask({
        systemId: systemB,
        projectId: projectC,
        title: "補齊簽核通知信版型",
        description: "調整申請、核准、退回與結案通知內容。",
        status: "not_started",
        priority: "medium",
        owner: "Fiona",
        rangeStart: 1,
        rangeEnd: 3,
        executionDate: 1,
        deadline: 3,
        tags: ["通知", "Email"],
        relatedEmails: ["簽核通知信版型確認"],
        relatedLinks: [],
        important: false,
        steps: [
          { title: "整理通知情境", completed: false },
          { title: "確認信件文案", completed: false },
        ],
      }),
      makeTask({
        systemId: systemB,
        projectId: projectC,
        title: "完成簽核權限矩陣",
        description: "確認不同金額與部門的簽核層級。",
        status: "done",
        priority: "high",
        owner: "Chris",
        rangeStart: -5,
        rangeEnd: -2,
        executionDate: -2,
        deadline: -1,
        tags: ["權限", "簽核"],
        relatedEmails: ["簽核權限矩陣確認"],
        relatedLinks: [{ title: "簽核矩陣", url: "https://example.com/approval-matrix" }],
        completedDate: -1,
        important: true,
        steps: [
          { title: "確認金額門檻", completed: true },
          { title: "確認部門主管層級", completed: true },
        ],
      }),
      makeTask({
        systemId: systemB,
        projectId: projectD,
        title: "規劃知識庫分類與標籤",
        description: "設計公告、FAQ、流程文件的分類與搜尋標籤。",
        status: "doing",
        priority: "medium",
        owner: "Gina",
        rangeStart: -1,
        rangeEnd: 4,
        executionDate: 2,
        deadline: 5,
        tags: ["知識庫", "分類"],
        relatedEmails: ["知識庫分類盤點結果"],
        relatedLinks: [{ title: "知識庫資訊架構", url: "https://example.com/knowledge-base-ia" }],
        important: true,
        steps: [
          { title: "整理現有公告分類", completed: true },
          { title: "建立標籤命名規則", completed: false },
        ],
      }),
      makeTask({
        systemId: systemB,
        projectId: projectD,
        title: "串接全文搜尋索引",
        description: "讓公告與 FAQ 可依標題、內容與標籤搜尋。",
        status: "not_started",
        priority: "high",
        owner: "Henry",
        rangeStart: 5,
        rangeEnd: 10,
        executionDate: 6,
        deadline: 11,
        tags: ["Search", "Index"],
        relatedEmails: [],
        relatedLinks: [{ title: "搜尋索引規格", url: "https://example.com/search-index" }],
        important: false,
        steps: [
          { title: "建立索引欄位", completed: false },
          { title: "測試關鍵字權重", completed: false },
        ],
      }),
      makeTask({
        systemId: systemB,
        projectId: projectD,
        title: "完成公告資料盤點",
        description: "盤點一年內公告資料並標示保留與封存規則。",
        status: "done",
        priority: "low",
        owner: "Gina",
        rangeStart: -4,
        rangeEnd: -1,
        executionDate: -1,
        deadline: 0,
        tags: ["公告", "盤點"],
        relatedEmails: ["公告資料盤點完成"],
        relatedLinks: [],
        completedDate: 0,
        important: false,
        steps: [
          { title: "匯出公告清單", completed: true },
          { title: "標示封存規則", completed: true },
        ],
      }),
      makeTask({
        systemId: systemC,
        projectId: projectE,
        title: "訪談採購申請痛點",
        description: "整理採購、財務與請購單位的流程痛點。",
        status: "not_started",
        priority: "high",
        owner: "Ivy",
        rangeStart: 1,
        rangeEnd: 4,
        executionDate: 1,
        deadline: 4,
        tags: ["採購", "訪談"],
        relatedEmails: ["採購申請流程訪談紀錄"],
        relatedLinks: [{ title: "採購流程藍圖", url: "https://example.com/purchase-flow" }],
        important: false,
        steps: [
          { title: "安排採購訪談", completed: false },
          { title: "整理請購表單問題", completed: false },
        ],
      }),
      makeTask({
        systemId: systemC,
        projectId: projectE,
        title: "設計比價與核准欄位",
        description: "定義比價附件、供應商與核准紀錄欄位。",
        status: "doing",
        priority: "medium",
        owner: "Jack",
        rangeStart: 5,
        rangeEnd: 9,
        executionDate: 5,
        deadline: 9,
        tags: ["採購", "表單"],
        relatedEmails: [],
        relatedLinks: [{ title: "請購表單草案", url: "https://example.com/purchase-form" }],
        important: true,
        steps: [
          { title: "定義供應商欄位", completed: true },
          { title: "定義比價附件規則", completed: false },
        ],
      }),
      makeTask({
        systemId: systemC,
        projectId: projectE,
        title: "完成採購現況流程圖",
        description: "繪製目前採購申請與核准流程。",
        status: "done",
        priority: "low",
        owner: "Ivy",
        rangeStart: -3,
        rangeEnd: 0,
        executionDate: 0,
        deadline: 0,
        tags: ["流程圖"],
        relatedEmails: ["採購現況流程圖確認"],
        relatedLinks: [{ title: "現況流程圖", url: "https://example.com/purchase-current-flow" }],
        completedDate: 0,
        important: false,
        steps: [
          { title: "訪談請購人員", completed: true },
          { title: "完成流程圖", completed: true },
        ],
      }),
      makeTask({
        systemId: systemC,
        projectId: projectF,
        title: "核對月結報表資料來源",
        description: "確認採購、應付帳款與部門費用資料表來源。",
        status: "doing",
        priority: "high",
        owner: "Karen",
        rangeStart: -1,
        rangeEnd: 3,
        executionDate: 0,
        deadline: 3,
        tags: ["月結", "資料來源"],
        relatedEmails: ["月結報表欄位確認"],
        relatedLinks: [{ title: "月結報表樣板", url: "https://example.com/monthly-close-report" }],
        important: true,
        steps: [
          { title: "確認採購資料來源", completed: true },
          { title: "確認費用分攤資料來源", completed: false },
        ],
      }),
      makeTask({
        systemId: systemC,
        projectId: projectF,
        title: "建立報表排程與寄送設定",
        description: "設定月結後自動產出並寄送報表給財務主管。",
        status: "not_started",
        priority: "medium",
        owner: "Leo",
        rangeStart: 4,
        rangeEnd: 8,
        executionDate: 4,
        deadline: 8,
        tags: ["排程", "報表"],
        relatedEmails: ["月結報表寄送名單確認"],
        relatedLinks: [],
        important: false,
        steps: [
          { title: "建立排程時間", completed: false },
          { title: "確認寄送名單", completed: false },
        ],
      }),
      makeTask({
        systemId: systemC,
        projectId: projectF,
        title: "完成月結試算資料匯入",
        description: "匯入測試月份資料並確認欄位格式。",
        status: "done",
        priority: "medium",
        owner: "Karen",
        rangeStart: -6,
        rangeEnd: -2,
        executionDate: -2,
        deadline: -1,
        tags: ["測試資料"],
        relatedEmails: ["財務月結試算資料"],
        relatedLinks: [],
        completedDate: -1,
        important: false,
        steps: [
          { title: "匯入試算資料", completed: true },
          { title: "確認欄位格式", completed: true },
        ],
      }),
      makeTask({
        systemId: systemD,
        projectId: projectG,
        title: "定義 SLA 逾時規則",
        description: "依案件等級定義初回覆、處理中與結案時限。",
        status: "doing",
        priority: "high",
        owner: "Mia",
        rangeStart: -1,
        rangeEnd: 2,
        executionDate: 0,
        deadline: 0,
        tags: ["SLA", "規則"],
        relatedEmails: ["客服 SLA 指標定義"],
        relatedLinks: [{ title: "SLA 儀表板 wireframe", url: "https://example.com/sla-dashboard" }],
        important: true,
        steps: [
          { title: "確認案件等級", completed: true },
          { title: "確認逾時門檻", completed: false },
        ],
      }),
      makeTask({
        systemId: systemD,
        projectId: projectG,
        title: "製作主管儀表板圖表",
        description: "建立逾時案件、即將逾時與平均處理時間圖表。",
        status: "not_started",
        priority: "medium",
        owner: "Noah",
        rangeStart: 2,
        rangeEnd: 7,
        executionDate: 2,
        deadline: 7,
        tags: ["Dashboard", "Chart"],
        relatedEmails: [],
        relatedLinks: [{ title: "主管儀表板草圖", url: "https://example.com/support-dashboard-chart" }],
        important: false,
        steps: [
          { title: "建立逾時案件圖表", completed: false },
          { title: "建立平均處理時間圖表", completed: false },
        ],
      }),
      makeTask({
        systemId: systemD,
        projectId: projectG,
        title: "完成客服案件欄位盤點",
        description: "確認案件等級、產品線、客戶等級與處理狀態欄位。",
        status: "done",
        priority: "low",
        owner: "Mia",
        rangeStart: -4,
        rangeEnd: -1,
        executionDate: -1,
        deadline: 0,
        tags: ["客服", "欄位盤點"],
        relatedEmails: ["客服案件欄位盤點"],
        relatedLinks: [],
        completedDate: 0,
        important: false,
        steps: [
          { title: "盤點案件欄位", completed: true },
          { title: "確認必填欄位", completed: true },
        ],
      }),
      makeTask({
        systemId: systemD,
        projectId: projectH,
        title: "整理客訴分派條件",
        description: "確認產品線、客戶等級、案件類型與負責團隊對照。",
        status: "not_started",
        priority: "high",
        owner: "Olivia",
        rangeStart: 5,
        rangeEnd: 8,
        executionDate: 5,
        deadline: 8,
        tags: ["客訴", "分派"],
        relatedEmails: ["客訴分派規則討論"],
        relatedLinks: [{ title: "分派矩陣草案", url: "https://example.com/complaint-routing" }],
        important: true,
        steps: [
          { title: "盤點產品線", completed: false },
          { title: "確認負責團隊", completed: false },
        ],
      }),
      makeTask({
        systemId: systemD,
        projectId: projectH,
        title: "設計自動分派規則測試案例",
        description: "建立不同案件條件下的分派預期結果。",
        status: "doing",
        priority: "medium",
        owner: "Peter",
        rangeStart: 9,
        rangeEnd: 13,
        executionDate: 9,
        deadline: 14,
        tags: ["測試案例", "分派"],
        relatedEmails: [],
        relatedLinks: [{ title: "分派測試案例", url: "https://example.com/routing-test-cases" }],
        important: false,
        steps: [
          { title: "建立高等級客訴案例", completed: true },
          { title: "建立跨產品線案例", completed: false },
        ],
      }),
      makeTask({
        systemId: systemD,
        projectId: projectH,
        title: "完成客訴案件樣本蒐集",
        description: "蒐集近三個月客訴案件供分派規則分析。",
        status: "done",
        priority: "low",
        owner: "Olivia",
        rangeStart: -5,
        rangeEnd: -2,
        executionDate: -2,
        deadline: -1,
        tags: ["客訴", "樣本"],
        relatedEmails: ["客訴案件樣本匯出"],
        relatedLinks: [],
        completedDate: -1,
        important: false,
        steps: [
          { title: "匯出案件樣本", completed: true },
          { title: "移除個資欄位", completed: true },
        ],
      }),
    ],
  };
}

function createEmptyState() {
  return {
    systems: [],
    projects: [],
    tasks: [],
  };
}

function createEmptyStateMaps() {
  return {
    systems: new Map(),
    projects: new Map(),
    tasks: new Map(),
  };
}

function loadState() {
  return createEmptyState();
}

function loadPreviewState() {
  try {
    const saved = localStorage.getItem(previewStorageKey);
    if (!saved) return normalizeState(buildStarterState());

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed.systems) || !Array.isArray(parsed.projects) || !Array.isArray(parsed.tasks)) {
      return normalizeState(buildStarterState());
    }
    return normalizeState(parsed);
  } catch {
    return normalizeState(buildStarterState());
  }
}

function loadPreferences() {
  try {
    const saved = localStorage.getItem(preferencesKey);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function persistViewPreferences() {
  const nextPreferences = {
    activeTodoView,
    todoSortKey,
    todoSortDirection,
    todoGroupBySystem,
    sidebarCollapsed,
    todoSectionCollapsed,
    ganttScale,
    ganttProjectFilter,
    ganttCollapsed,
  };
  localStorage.setItem(preferencesKey, JSON.stringify(nextPreferences));
}

function normalizeState(rawState = {}) {
  return {
    systems: Array.isArray(rawState.systems) ? rawState.systems : [],
    projects: Array.isArray(rawState.projects) ? rawState.projects.map(normalizeProject) : [],
    tasks: Array.isArray(rawState.tasks) ? rawState.tasks.map(normalizeTask) : [],
  };
}

function normalizeTask(task) {
  const rangeStart = task.rangeStart || task.startDate || task.dueDate || todayString();
  const rangeEnd = task.rangeEnd || task.endDate || task.startDate || task.dueDate || rangeStart;
  const executionDate = clampDate(task.executionDate || task.startDate || rangeStart, rangeStart, rangeEnd);
  const deadline = task.deadline && task.deadline >= rangeEnd ? task.deadline : rangeEnd;
  const scope = normalizeTaskScope(task);

  return {
    ...task,
    scope,
    systemId: scope === "general" ? "" : task.systemId || "",
    projectId: scope === "project" ? task.projectId || "" : "",
    status: normalizeTaskStatus(task.status),
    tags: Array.isArray(task.tags) ? task.tags : [],
    stakeholders: normalizeTextList(task.stakeholders),
    rangeStart,
    rangeEnd,
    executionDate,
    deadline,
    relatedEmails: normalizeEmailList(task.relatedEmails),
    relatedLinks: normalizeLinkList(task.relatedLinks),
    completedDate: normalizeTaskStatus(task.status) === "done" ? task.completedDate || todayString() : "",
    important: Boolean(task.important),
    steps: normalizeTaskSteps(task.steps),
    files: normalizeTaskFiles(task.files),
    notes: task.notes || "",
    history: normalizeTaskHistory(task.history),
  };
}

function normalizeTaskScope(task = {}) {
  if (task.scope === "general") return "general";
  if (task.scope === "system") return "system";
  if (task.scope === "project") return "project";
  if (task.projectId) return "project";
  if (task.systemId) return "system";
  return "general";
}

function getTaskScope(task = {}) {
  return normalizeTaskScope(task);
}

function getTaskScopeLabel(scope) {
  return taskScopeOptions.find((option) => option.id === scope)?.label || "專案任務";
}

function getTaskContextLabel(task) {
  const scope = getTaskScope(task);
  if (scope === "general") return "一般工作";

  const system = getSystem(task.systemId);
  if (scope === "system") return `${system?.name || "未指定系統"} / 系統層級任務`;

  const project = getProject(task.projectId);
  return `${system?.name || "未指定系統"} / ${project?.name || "未指定專案"}`;
}

function selectedScopeIsGeneral(systemId = selectedSystemId) {
  return systemId === generalWorkScopeId;
}

function taskMatchesSystemScope(task, systemId = selectedSystemId) {
  if (!systemId) return true;
  const scope = getTaskScope(task);
  if (selectedScopeIsGeneral(systemId)) return scope === "general";
  return scope !== "general" && task.systemId === systemId;
}

function taskMatchesProjectScope(task, projectId = selectedProjectId) {
  if (projectId === "all") return true;
  return getTaskScope(task) === "project" && task.projectId === projectId;
}

function taskMatchesPhaseScope(task, phaseProjectIds, phase = els.phaseFilter.value) {
  if (phase === "all") return true;
  return getTaskScope(task) === "project" && phaseProjectIds.includes(task.projectId);
}

function getTaskScopeFormValues(fields) {
  const scope = fields.scope?.value || "project";
  return {
    scope,
    systemId: scope === "general" ? "" : fields.systemId.value,
    projectId: scope === "project" ? fields.projectId.value : "",
  };
}

function validateTaskScopeValues(scopeValues) {
  if (scopeValues.scope !== "general" && !scopeValues.systemId) {
    alert("請先選擇系統。");
    return false;
  }

  if (scopeValues.scope === "project" && !scopeValues.projectId) {
    alert("請先選擇專案。");
    return false;
  }

  return true;
}

function normalizeTaskStatus(status) {
  if (status === "done") return "done";
  if (status === "doing" || status === "review") return "doing";
  return "not_started";
}

function normalizeProjectCategory(category) {
  return category === "general" ? "general" : "development";
}

function normalizeTextList(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item || "").trim())
    .filter(Boolean);
}

function splitCommaList(value = "") {
  return String(value)
    .split(/[,，]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeEmailList(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item : item?.title || ""))
    .map((title) => title.trim())
    .filter(Boolean);
}

function normalizeLinkList(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      title: (item?.title || "").trim(),
      url: (item?.url || "").trim(),
    }))
    .filter((item) => item.title || item.url);
}

function normalizeTaskSteps(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      id: item?.id || createId(),
      title: (typeof item === "string" ? item : item?.title || "").trim(),
      completed: Boolean(item?.completed),
    }))
    .filter((item) => item.title);
}

function normalizeTaskFiles(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      id: item?.id || createId(),
      name: (typeof item === "string" ? item : item?.name || "").trim(),
    }))
    .filter((item) => item.name);
}

function normalizeTaskHistory(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      id: item?.id || createId(),
      date: item?.date || todayString(),
      description: (typeof item === "string" ? item : item?.description || "").trim(),
      note: (item?.note || "").trim(),
      links: normalizeHistoryLinks(item?.links || item?.relatedLinks || []),
    }))
    .filter((item) => item.description || item.note || item.links.length);
}

function normalizeHistoryLinks(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      name: (item?.name || item?.title || "").trim(),
      url: (item?.url || "").trim(),
    }))
    .filter((item) => item.name || item.url);
}

function normalizeProject(project) {
  const phaseSchedules = project.phaseSchedules || createPhaseSchedules({
    [project.phase || "planning"]: {
      start: project.plannedStart || "",
      end: project.plannedEnd || "",
    },
  });
  const normalizedSchedules = createPhaseSchedules(phaseSchedules);
  const plannedRange = getProjectScheduleRange(project.plannedStart || "", project.plannedEnd || "", normalizedSchedules);

  return {
    ...project,
    category: normalizeProjectCategory(project.category),
    description: project.description || "",
    phase: project.phase || "deal",
    phaseChangedAt: project.phaseChangedAt || todayString(),
    requirementRequest: project.requirementRequest || "",
    phaseSchedules: normalizedSchedules,
    plannedStart: plannedRange.start,
    plannedEnd: plannedRange.end,
    relatedEmails: normalizeEmailList(project.relatedEmails),
    relatedLinks: normalizeLinkList(project.relatedLinks),
    closed: Boolean(project.closed || project.phase === "closed"),
    closedAt: project.closedAt || "",
  };
}

function saveState() {
  persistViewPreferences();
  if (previewMode) {
    try {
      localStorage.setItem(previewStorageKey, JSON.stringify(state));
    } catch (error) {
      console.error(error);
      showToast("預覽資料儲存失敗，請稍後再試。");
    }
    return;
  }
  if (!cloudReady) return;
  window.clearTimeout(cloudSaveTimer);
  cloudSaveTimer = window.setTimeout(() => {
    cloudSaveChain = cloudSaveChain
      .then(pushStateToCloud)
      .catch((error) => {
        console.error(error);
        showToast(`雲端儲存失敗：${getReadableError(error)}`);
      });
  }, 250);
}

function initializeCloudApp() {
  setAuthStatus("正在初始化雲端服務...", "請稍候。");

  if (!configureFirebase()) return;

  auth.useDeviceLanguage?.();
  auth.onAuthStateChanged(async (user) => {
    const sessionVersion = ++authSessionVersion;
    if (previewMode) return;
    cleanupCloudSubscriptions();
    closeAdminPage();
    cloudReady = false;
    currentFirebaseUser = user;

    if (!user) {
      currentProfile = null;
      state = createEmptyState();
      remoteState = createEmptyState();
      remoteLoaded = { systems: false, projects: false, tasks: false };
      lastSyncedState = createEmptyStateMaps();
      showAuthScreen("請使用 Google 帳號登入。管理員需先在後台建立使用者帳號。");
      updateAccountUi();
      return;
    }

    showAuthScreen("正在確認帳號權限...", "第一次登入可能需要幾秒鐘建立雲端帳號。", true);

    try {
      const result = await callFunction("bootstrapCurrentUser", {
        name: user.displayName || "",
      });
      if (sessionVersion !== authSessionVersion) return;

      await user.getIdToken(true);
      currentProfile = normalizeProfile(result.data?.profile || {});
      updateAccountUi();
      startProfileListener(user.uid);
      startCloudListeners();
    } catch (error) {
      console.error(error);
      await auth.signOut().catch(() => {});
      showAuthScreen("此 Google 帳號尚未被授權。", getReadableError(error));
    }
  });
}

function configureFirebase() {
  if (!window.firebase) {
    showAuthScreen("Firebase SDK 尚未載入。", "請透過 Firebase Hosting 開啟此系統，或確認 /__/firebase/init.js 可正常載入。", false, true);
    return false;
  }

  try {
    if (!firebase.apps.length && window.firebaseConfig) {
      firebase.initializeApp(window.firebaseConfig);
    }

    if (!firebase.apps.length) {
      showAuthScreen("Firebase 尚未完成初始化。", "部署到 Firebase Hosting 後會自動載入專案設定。", false, true);
      return false;
    }

    auth = firebase.auth();
    db = firebase.firestore();
    cloudFunctions = firebase.app().functions("asia-east1");
    return true;
  } catch (error) {
    console.error(error);
    showAuthScreen("Firebase 初始化失敗。", getReadableError(error), false, true);
    return false;
  }
}

function showAuthScreen(message, helpText = "若尚未被授權，請聯絡系統管理員開通帳號。", loading = false, disabled = false) {
  els.authScreen?.classList.remove("hidden");
  els.appShell?.classList.add("hidden");
  els.adminPage?.classList.add("hidden");
  setAuthStatus(message, helpText, loading || disabled);
}

function setAuthStatus(message, helpText = "", buttonDisabled = false) {
  if (els.authStatusText) els.authStatusText.textContent = message;
  if (els.authHelpText) els.authHelpText.textContent = helpText;
  if (els.googleSignInButton) els.googleSignInButton.disabled = buttonDisabled;
}

function showAppShell() {
  els.authScreen?.classList.add("hidden");
  els.appShell?.classList.remove("hidden");
}

function startPreviewMode() {
  authSessionVersion += 1;
  cleanupCloudSubscriptions();
  cleanupProfileListener();
  closeAdminPage();
  closeTodoPage();
  closeGanttPage();
  closeTodoDrawer();

  previewMode = true;
  cloudReady = false;
  currentFirebaseUser = null;
  currentProfile = {
    uid: "preview",
    email: "",
    name: "預覽模式",
    role: "user",
    status: "active",
  };
  state = loadPreviewState();
  remoteState = createEmptyState();
  remoteLoaded = { systems: false, projects: false, tasks: false };
  lastSyncedState = createEmptyStateMaps();

  showAppShell();
  updateAccountUi();
  render();
  showToast("已進入預覽模式，資料只會保存在這台瀏覽器。");
}

function exitPreviewMode() {
  previewMode = false;
  currentProfile = null;
  currentFirebaseUser = auth?.currentUser || null;
  state = createEmptyState();
  remoteState = createEmptyState();
  remoteLoaded = { systems: false, projects: false, tasks: false };
  lastSyncedState = createEmptyStateMaps();
  closeAdminPage();
  closeTodoPage();
  closeGanttPage();
  closeTodoDrawer();
  showAuthScreen("請使用 Google 帳號登入。管理員需先在後台建立使用者帳號。", "也可以使用預覽操作介面查看功能畫面。", false, !auth);
  updateAccountUi();
}

async function signInWithGoogle() {
  if (!auth) return;
  setAuthStatus("正在開啟 Google 登入...", "請在 Google 視窗完成登入。", true);

  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  } catch (error) {
    if (error.code === "auth/popup-blocked" || error.code === "auth/popup-closed-by-user") {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithRedirect(provider);
      return;
    }
    console.error(error);
    setAuthStatus("Google 登入失敗。", getReadableError(error));
  } finally {
    if (!auth.currentUser && els.googleSignInButton) els.googleSignInButton.disabled = false;
  }
}

async function signOutCurrentUser() {
  if (previewMode) {
    exitPreviewMode();
    return;
  }

  closeAdminPage();
  cleanupCloudSubscriptions();
  cleanupProfileListener();
  currentProfile = null;
  currentFirebaseUser = null;
  cloudReady = false;
  await auth?.signOut();
}

function callFunction(name, payload = {}) {
  return cloudFunctions.httpsCallable(name)(payload);
}

function startProfileListener(uid) {
  cleanupProfileListener();
  profileUnsubscribe = db.collection("users").doc(uid).onSnapshot((snapshot) => {
    if (!snapshot.exists) return;
    const previousRole = currentProfile?.role;
    const previousStatus = currentProfile?.status;
    const nextProfile = normalizeProfile({ uid: snapshot.id, ...snapshot.data() });
    currentProfile = nextProfile;
    updateAccountUi();

    if (nextProfile.status === "disabled") {
      showToast("帳號已停用，系統將登出。");
      signOutCurrentUser();
    } else if (previousRole && (previousRole !== nextProfile.role || previousStatus !== nextProfile.status)) {
      currentFirebaseUser?.getIdToken(true).catch(() => {});
    }
  });
}

function cleanupProfileListener() {
  if (profileUnsubscribe) profileUnsubscribe();
  profileUnsubscribe = null;
}

function startCloudListeners() {
  cleanupCloudSubscriptions();
  remoteState = createEmptyState();
  remoteLoaded = { systems: false, projects: false, tasks: false };

  ["systems", "projects", "tasks"].forEach((collectionName) => {
    const unsubscribe = db.collection(collectionName).onSnapshot((snapshot) => {
      remoteState[collectionName] = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort(compareCloudRecords);
      remoteLoaded[collectionName] = true;
      if (Object.values(remoteLoaded).every(Boolean)) {
        applyRemoteState();
      }
    }, (error) => {
      console.error(error);
      showToast(`雲端資料讀取失敗：${getReadableError(error)}`);
      if (error.code === "permission-denied") signOutCurrentUser();
    });
    cloudUnsubscribes.push(unsubscribe);
  });
}

function cleanupCloudSubscriptions() {
  cloudUnsubscribes.forEach((unsubscribe) => unsubscribe());
  cloudUnsubscribes = [];
  cleanupAdminSubscriptions();
}

function applyRemoteState() {
  state = normalizeState(remoteState);
  lastSyncedState = stateToMaps(remoteState);
  cloudReady = true;
  showAppShell();
  updateAccountUi();
  render();

  if (currentProfile && !currentProfile.name) {
    openProfileDialog(true);
  }
}

async function pushStateToCloud() {
  if (!cloudReady || !db || !currentFirebaseUser) return;

  let batch = db.batch();
  let operations = 0;

  const commitIfNeeded = async (force = false) => {
    if (!operations) return;
    if (!force && operations < 450) return;
    await batch.commit();
    batch = db.batch();
    operations = 0;
  };

  for (const collectionName of ["systems", "projects", "tasks"]) {
    const currentMap = new Map(state[collectionName].map((item) => [item.id, item]));
    const previousMap = lastSyncedState[collectionName] || new Map();
    const collectionRef = db.collection(collectionName);

    for (const [id, item] of currentMap.entries()) {
      const previous = previousMap.get(id);
      if (!previous || hasCloudDataChanged(item, previous)) {
        batch.set(collectionRef.doc(id), prepareCloudDocument(item, previous));
        operations += 1;
        await commitIfNeeded();
      }
    }

    for (const id of previousMap.keys()) {
      if (!currentMap.has(id)) {
        batch.delete(collectionRef.doc(id));
        operations += 1;
        await commitIfNeeded();
      }
    }
  }

  await commitIfNeeded(true);
}

function prepareCloudDocument(item, previous = {}) {
  const documentData = stripUndefinedDeep({ ...item });
  documentData.createdAt = previous.createdAt || firebase.firestore.FieldValue.serverTimestamp();
  documentData.createdBy = previous.createdBy || currentFirebaseUser?.uid || "";
  documentData.createdByEmail = previous.createdByEmail || currentFirebaseUser?.email || "";
  documentData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  documentData.updatedBy = currentFirebaseUser?.uid || "";
  documentData.updatedByEmail = currentFirebaseUser?.email || "";
  return documentData;
}

function stripUndefinedDeep(value) {
  if (Array.isArray(value)) {
    return value.map(stripUndefinedDeep).filter((item) => item !== undefined);
  }

  if (value && typeof value === "object" && !isFirestoreTimestamp(value)) {
    return Object.entries(value).reduce((result, [key, item]) => {
      if (item !== undefined) result[key] = stripUndefinedDeep(item);
      return result;
    }, {});
  }

  return value;
}

function hasCloudDataChanged(item, previous) {
  return stableStringify(stripCloudMetadata(item)) !== stableStringify(stripCloudMetadata(previous));
}

function stripCloudMetadata(value) {
  if (Array.isArray(value)) return value.map(stripCloudMetadata);
  if (value && typeof value === "object" && !isFirestoreTimestamp(value)) {
    return Object.entries(value)
      .filter(([key]) => !["createdAt", "createdBy", "createdByEmail", "updatedAt", "updatedBy", "updatedByEmail"].includes(key))
      .reduce((result, [key, item]) => {
        result[key] = stripCloudMetadata(item);
        return result;
      }, {});
  }
  return value;
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object" && !isFirestoreTimestamp(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function stateToMaps(sourceState) {
  return {
    systems: new Map((sourceState.systems || []).map((item) => [item.id, item])),
    projects: new Map((sourceState.projects || []).map((item) => [item.id, item])),
    tasks: new Map((sourceState.tasks || []).map((item) => [item.id, item])),
  };
}

function compareCloudRecords(a, b) {
  const timeDiff = getSortableTimestamp(b.createdAt || b.updatedAt) - getSortableTimestamp(a.createdAt || a.updatedAt);
  if (timeDiff) return timeDiff;
  return String(a.name || a.title || a.email || "").localeCompare(String(b.name || b.title || b.email || ""), "zh-Hant");
}

function getSortableTimestamp(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.toDate === "function") return value.toDate().getTime();
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function isFirestoreTimestamp(value) {
  return value && typeof value === "object" && (typeof value.toDate === "function" || typeof value.toMillis === "function");
}

function normalizeProfile(profile = {}) {
  return {
    uid: profile.uid || currentFirebaseUser?.uid || "",
    email: normalizeEmail(profile.email || currentFirebaseUser?.email || ""),
    name: (profile.name || "").trim(),
    role: profile.role === "admin" ? "admin" : "user",
    status: profile.status === "disabled" ? "disabled" : "active",
    lastLoginAt: profile.lastLoginAt || "",
  };
}

function updateAccountUi() {
  const isAdmin = currentProfile?.role === "admin" && currentProfile?.status === "active";
  els.accountName && (els.accountName.textContent = currentProfile?.name || currentProfile?.email || "使用者");
  els.accountRole && (els.accountRole.textContent = previewMode ? "本機預覽" : isAdmin ? "管理員" : "一般使用者");
  els.signOutButton && (els.signOutButton.textContent = previewMode ? "離開預覽" : "登出");
  els.adminButton?.classList.toggle("hidden", !isAdmin);
}

function openProfileDialog(required = false) {
  profileDialogRequired = required;
  els.accountMenu?.classList.add("hidden");
  if (els.profileName) els.profileName.value = currentProfile?.name || "";
  els.profileDialogClose.hidden = required;
  els.profileCancelButton.hidden = required;
  els.profileDialog?.showModal();
  els.profileName?.focus();
}

async function handleProfileSubmit(event) {
  event.preventDefault();
  const name = els.profileName.value.trim();
  if (!name) return;

  if (previewMode) {
    currentProfile = { ...currentProfile, name };
    updateAccountUi();
    profileDialogRequired = false;
    els.profileDialog.close();
    showToast("預覽名稱已更新。");
    return;
  }

  try {
    const result = await callFunction("updateCurrentUserProfile", { name });
    currentProfile = normalizeProfile(result.data?.profile || { ...currentProfile, name });
    updateAccountUi();
    profileDialogRequired = false;
    els.profileDialog.close();
    showToast("名稱已更新。");
  } catch (error) {
    console.error(error);
    alert(`名稱儲存失敗：${getReadableError(error)}`);
  }
}

function openAdminPage() {
  if (currentProfile?.role !== "admin") return;
  closeTodoPage();
  closeGanttPage();
  closeTodoDrawer();
  els.adminPage.classList.remove("hidden");
  els.adminPage.setAttribute("aria-hidden", "false");
  startAdminListeners();
}

function closeAdminPage() {
  if (!els.adminPage) return;
  els.adminPage.classList.add("hidden");
  els.adminPage.setAttribute("aria-hidden", "true");
  cleanupAdminSubscriptions();
}

function startAdminListeners() {
  cleanupAdminSubscriptions();

  const userUnsubscribe = db.collection("users").onSnapshot((snapshot) => {
    adminUsers = snapshot.docs.map((doc) => normalizeAdminUser({ uid: doc.id, ...doc.data() }));
    renderAdminPage();
  }, handleAdminReadError);

  const allowedUnsubscribe = db.collection("allowedUsers").onSnapshot((snapshot) => {
    adminAllowedUsers = snapshot.docs.map((doc) => normalizeAllowedUser({ emailKey: doc.id, ...doc.data() }));
    renderAdminPage();
  }, handleAdminReadError);

  const auditUnsubscribe = db.collection("auditLogs").orderBy("createdAt", "desc").limit(100).onSnapshot((snapshot) => {
    adminAuditLogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderAuditLogs();
  }, handleAdminReadError);

  adminUnsubscribes = [userUnsubscribe, allowedUnsubscribe, auditUnsubscribe];
}

function cleanupAdminSubscriptions() {
  adminUnsubscribes.forEach((unsubscribe) => unsubscribe());
  adminUnsubscribes = [];
}

function handleAdminReadError(error) {
  console.error(error);
  showToast(`後台資料讀取失敗：${getReadableError(error)}`);
}

function normalizeAdminUser(user = {}) {
  return {
    uid: user.uid || "",
    email: normalizeEmail(user.email),
    name: (user.name || "").trim(),
    role: user.role === "admin" ? "admin" : "user",
    status: user.status === "disabled" ? "disabled" : "active",
    lastLoginAt: user.lastLoginAt || "",
    createdAt: user.createdAt || "",
  };
}

function normalizeAllowedUser(user = {}) {
  return {
    emailKey: user.emailKey || "",
    uid: user.uid || "",
    email: normalizeEmail(user.email),
    role: user.role === "admin" ? "admin" : "user",
    status: user.status === "disabled" ? "disabled" : "active",
    createdAt: user.createdAt || "",
  };
}

function getAdminAccountRows() {
  const rows = new Map();

  adminAllowedUsers.forEach((allowedUser) => {
    rows.set(allowedUser.email, {
      ...allowedUser,
      name: "",
      lastLoginAt: "",
      linked: Boolean(allowedUser.uid),
    });
  });

  adminUsers.forEach((user) => {
    const existing = rows.get(user.email) || {};
    rows.set(user.email, {
      ...existing,
      ...user,
      email: user.email || existing.email,
      linked: true,
    });
  });

  return [...rows.values()].sort((a, b) => a.email.localeCompare(b.email));
}

function renderAdminPage() {
  if (!els.adminPage || els.adminPage.classList.contains("hidden")) return;
  const rows = getAdminAccountRows();
  const activeUsers = rows.filter((row) => row.status === "active").length;
  const admins = rows.filter((row) => row.role === "admin" && row.status === "active").length;
  const disabled = rows.filter((row) => row.status === "disabled").length;

  els.adminMetrics.innerHTML = [
    ["使用者", rows.length],
    ["管理員", admins],
    ["啟用帳號", activeUsers],
    ["停用帳號", disabled],
  ].map(([label, value]) => `
    <article class="admin-metric">
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `).join("");

  renderAdminUsers(rows);
  renderAuditLogs();
}

function renderAdminUsers(rows = getAdminAccountRows()) {
  if (!els.adminUsersTable) return;
  if (!rows.length) {
    els.adminUsersTable.innerHTML = `<p class="empty-state">尚未建立使用者帳號。</p>`;
    return;
  }

  els.adminUsersTable.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>名稱</th>
          <th>狀態</th>
          <th>角色</th>
          <th>最後登入</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row) => `
          <tr>
            <td>
              <strong>${escapeHtml(row.email)}</strong>
              <small>${row.linked ? "已連結 Google 帳號" : "等待首次登入"}</small>
            </td>
            <td>${escapeHtml(row.name || "尚未設定")}</td>
            <td><span class="status-pill ${row.status === "disabled" ? "disabled" : ""}">${row.status === "disabled" ? "停用" : "啟用"}</span></td>
            <td>
              <select data-admin-role data-uid="${escapeHtml(row.uid || "")}" data-email="${escapeHtml(row.email)}">
                <option value="user" ${row.role === "user" ? "selected" : ""}>一般使用者</option>
                <option value="admin" ${row.role === "admin" ? "selected" : ""}>管理員</option>
              </select>
            </td>
            <td>${formatDateTime(row.lastLoginAt)}</td>
            <td>
              <button class="secondary-button" type="button" data-toggle-user-status data-status="${row.status}" data-uid="${escapeHtml(row.uid || "")}" data-email="${escapeHtml(row.email)}">
                ${row.status === "disabled" ? "啟用" : "停用"}
              </button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderAuditLogs() {
  if (!els.auditLogTable) return;
  const logs = adminAuditLogs.filter((log) => {
    const query = adminFilters.query;
    const action = getAuditCategory(log.action);
    const queryText = `${log.actorEmail || ""} ${log.action || ""} ${log.collection || ""} ${log.targetEmail || ""} ${log.docId || ""}`.toLowerCase();
    const logDate = getIsoDateFromTimestamp(log.createdAt);
    return (!query || queryText.includes(query))
      && (adminFilters.action === "all" || adminFilters.action === action)
      && (!adminFilters.date || logDate === adminFilters.date);
  });

  if (!logs.length) {
    els.auditLogTable.innerHTML = `<p class="empty-state">尚無符合條件的操作紀錄。</p>`;
    return;
  }

  els.auditLogTable.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th>時間</th>
          <th>操作者</th>
          <th>動作</th>
          <th>目標</th>
        </tr>
      </thead>
      <tbody>
        ${logs.map((log) => `
          <tr>
            <td>${formatDateTime(log.createdAt)}</td>
            <td>${escapeHtml(log.actorEmail || "system")}</td>
            <td>${escapeHtml(getAuditActionLabel(log.action))}</td>
            <td>${escapeHtml(log.targetEmail || log.collection || "")}${log.docId ? `<small>${escapeHtml(log.docId)}</small>` : ""}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

async function handleAdminUserCreate(event) {
  event.preventDefault();
  const email = normalizeEmail(els.adminUserEmail.value);
  const role = els.adminUserRole.value === "admin" ? "admin" : "user";
  if (!email) return;

  try {
    await callFunction("createAllowedUser", { email, role });
    els.adminUserForm.reset();
    showToast("使用者帳號已建立。");
  } catch (error) {
    console.error(error);
    alert(`建立帳號失敗：${getReadableError(error)}`);
  }
}

async function handleAdminTableChange(event) {
  const control = event.target.closest("[data-admin-role]");
  if (!control) return;

  try {
    await callFunction("setUserRole", {
      uid: control.dataset.uid || "",
      email: control.dataset.email,
      role: control.value === "admin" ? "admin" : "user",
    });
    showToast("角色已更新。");
  } catch (error) {
    console.error(error);
    alert(`角色更新失敗：${getReadableError(error)}`);
    renderAdminUsers();
  }
}

async function handleAdminTableClick(event) {
  const button = event.target.closest("[data-toggle-user-status]");
  if (!button) return;

  const nextStatus = button.dataset.status === "disabled" ? "active" : "disabled";
  try {
    await callFunction("setUserStatus", {
      uid: button.dataset.uid || "",
      email: button.dataset.email,
      status: nextStatus,
    });
    showToast(nextStatus === "active" ? "帳號已啟用。" : "帳號已停用。");
  } catch (error) {
    console.error(error);
    alert(`狀態更新失敗：${getReadableError(error)}`);
  }
}

function exportProjectDataJson() {
  downloadTextFile(`project-desk-${todayString()}.json`, JSON.stringify(state, null, 2), "application/json");
}

function exportProjectDataCsv() {
  const rows = [
    ["type", "system", "project", "title", "status", "owner", "executionDate", "deadline"],
    ...state.systems.map((system) => ["system", system.name, "", "", "", "", "", ""]),
    ...state.projects.map((project) => [project.category || "project", getSystem(project.systemId)?.name || "", project.name, "", project.phase || "", "", project.plannedStart || "", project.plannedEnd || ""]),
    ...state.tasks.map((task) => ["task", getSystem(task.systemId)?.name || "", getProject(task.projectId)?.name || "", task.title, task.status, task.owner, task.executionDate, task.deadline]),
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  downloadTextFile(`project-desk-${todayString()}.csv`, csv, "text/csv;charset=utf-8");
}

function csvCell(value) {
  const text = String(value || "");
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadTextFile(fileName, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function getAuditCategory(action = "") {
  if (action === "login") return "login";
  if (action.startsWith("account.") || action.startsWith("profile.")) return "admin";
  return "data";
}

function getAuditActionLabel(action = "") {
  return {
    login: "登入",
    "account.create": "建立帳號",
    "account.role": "調整角色",
    "account.status": "調整狀態",
    "profile.update": "修改名稱",
    "data.create": "新增資料",
    "data.update": "更新資料",
    "data.delete": "刪除資料",
  }[action] || action || "資料異動";
}

function formatDateTime(value) {
  if (!value) return "未紀錄";
  const date = typeof value.toDate === "function" ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "未紀錄";
  return new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getIsoDateFromTimestamp(value) {
  if (!value) return "";
  const date = typeof value.toDate === "function" ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function normalizeEmail(email = "") {
  return String(email).trim().toLowerCase();
}

function getReadableError(error = {}) {
  const code = error.code || "";
  const message = error.message || "";
  if (code.includes("permission-denied")) return "權限不足或帳號未被授權。";
  if (code.includes("unauthenticated")) return "登入狀態已失效，請重新登入。";
  if (code.includes("already-exists")) return "此帳號已存在。";
  if (code.includes("invalid-argument")) return message || "輸入資料格式不正確。";
  if (code.includes("failed-precondition")) return message || "目前狀態不允許這項操作。";
  return message || "請稍後再試。";
}

function render() {
  ensureSelection();
  syncSidebarCollapsed();
  renderSystems();
  renderHeader();
  renderMetrics();
  renderTodoDashboard();
  renderProjects();
  renderProjectTabs();
  renderTagFilterBar();
  renderBoard();
  if (!els.todoPage.classList.contains("hidden")) {
    renderTodoPage();
  } else if (!els.ganttPage.classList.contains("hidden")) {
    renderGanttPage();
  } else {
    renderTodoDrawer();
  }
}

function syncSidebarCollapsed() {
  els.appShell.classList.toggle("sidebar-collapsed", sidebarCollapsed);
  els.sidebarToggle.textContent = sidebarCollapsed ? "›" : "‹";
  els.sidebarToggle.setAttribute("aria-expanded", String(!sidebarCollapsed));
  els.sidebarToggle.setAttribute("aria-label", sidebarCollapsed ? "展開側邊欄" : "收合側邊欄");
}

function ensureSelection() {
  if (selectedSystemId && !selectedScopeIsGeneral() && !state.systems.some((system) => system.id === selectedSystemId)) {
    selectedSystemId = null;
  }

  if (selectedScopeIsGeneral()) {
    selectedProjectId = "all";
  }

  if (selectedProjectId !== "all" && !state.projects.some((project) => project.id === selectedProjectId)) {
    selectedProjectId = "all";
  }
}

function renderSystems() {
  const allActive = selectedSystemId === null;
  const generalActive = selectedScopeIsGeneral();
  const allProjects = state.projects.length;
  const allTasks = state.tasks.length;
  const generalTasks = state.tasks.filter((task) => getTaskScope(task) === "general").length;

  const buttons = [
    `<button class="system-item ${allActive ? "active" : ""}" type="button" data-system-id="" title="全部系統">
      <strong class="system-name-full">全部系統</strong>
      <strong class="system-name-short">全部</strong>
      <span>${allProjects} 個專案・${allTasks} 個任務</span>
    </button>`,
    ...state.systems.map((system) => {
      const projectCount = state.projects.filter((project) => project.systemId === system.id).length;
      const taskCount = state.tasks.filter((task) => taskMatchesSystemScope(task, system.id)).length;
      const shortLabel = getSystemShortLabel(system.name);

      return `
        <button class="system-item ${selectedSystemId === system.id ? "active" : ""}" type="button" data-system-id="${system.id}" title="${escapeHtml(system.name)}">
          <strong class="system-name-full">${escapeHtml(system.name)}</strong>
          <strong class="system-name-short">${escapeHtml(shortLabel)}</strong>
          <span>${projectCount} 個專案・${taskCount} 個任務</span>
        </button>
      `;
    }),
    `<button class="system-item ${generalActive ? "active" : ""}" type="button" data-system-id="${generalWorkScopeId}" title="一般工作">
      <strong class="system-name-full">一般工作</strong>
      <strong class="system-name-short">一般</strong>
      <span>非系統別・${generalTasks} 個任務</span>
    </button>`,
  ].join("");

  els.systemList.innerHTML = buttons;
  els.systemList.querySelectorAll(".system-item").forEach((button) => {
    button.addEventListener("click", () => {
      selectedTagFilter = "";
      selectedSystemId = button.dataset.systemId || null;
      selectedProjectId = "all";
      render();
    });
  });
}

function getSystemShortLabel(name = "") {
  const normalized = String(name).trim().replace(/\s+/g, " ");
  if (!normalized) return "系統";

  const englishPrefix = normalized.match(/^([A-Za-z0-9]{2,5})\s*(.*)$/);
  if (englishPrefix) {
    const suffix = englishPrefix[2].replace(/\s+/g, "");
    const chineseHint = suffix.match(/[\u4e00-\u9fff]/)?.[0] || "";
    return `${englishPrefix[1].toUpperCase()}${chineseHint}`.slice(0, 5);
  }

  const compact = normalized
    .replace(/\s+/g, "")
    .replace(/管理系統$|資訊系統$|系統$|平台$|整合$|模組$/g, "");
  return (compact || normalized.replace(/\s+/g, "")).slice(0, 4);
}

function renderHeader() {
  if (selectedScopeIsGeneral()) {
    els.pageTitle.textContent = "一般工作";
    els.pageSubtitle.textContent = "管理不屬於特定系統或專案的任務與待辦事項。";
    return;
  }

  const system = getSystem(selectedSystemId);
  els.pageTitle.textContent = system ? system.name : "全部系統";
  els.pageSubtitle.textContent = system?.description || "依系統管理專案，再由專案掌握任務與實際時程。";
}

function renderMetrics() {
  const projects = getScopedProjects();
  const projectIds = projects.map((project) => project.id);
  const tasks = state.tasks.filter((task) => taskMatchesSystemScope(task));
  const activeTasks = tasks.filter((task) => task.status !== "done").length;
  const dueSoon = tasks.filter((task) => {
    if (!task.deadline || task.status === "done") return false;
    const diff = getDayDiff(new Date(), new Date(`${task.deadline}T00:00:00`));
    return diff >= 0 && diff <= 7;
  }).length;

  els.systemCount.textContent = selectedScopeIsGeneral() ? 0 : selectedSystemId ? 1 : state.systems.length;
  els.projectCount.textContent = projectIds.length;
  els.activeTaskCount.textContent = activeTasks;
  els.deadlineCount.textContent = dueSoon;
}

function renderTodoDashboard() {
  const sections = getDashboardTodoSections();

  els.todoDashboard.innerHTML = sections
    .filter((section) => !section.hideWhenEmpty || section.tasks.length)
    .map((section) => {
      const visibleTasks = section.tasks.slice(0, 5);
      const rows = visibleTasks.length
        ? visibleTasks.map((task) => renderTodoItem(task, section)).join("")
        : `<p class="empty-state">目前沒有任務</p>`;
      const moreButton = section.tasks.length > 5
        ? `<button class="todo-see-more" type="button" data-open-todo-view="${section.viewId}" data-focus-section="${section.focusSection}">查看更多 ${section.tasks.length - 5} 筆</button>`
        : "";

      return `
        <section class="todo-column ${section.variant ? `todo-column-${section.variant}` : ""}" aria-label="${section.title}">
          <div class="todo-column-header">
            <h3>${section.title}</h3>
            <button type="button" data-open-todo-view="${section.viewId}" data-focus-section="${section.focusSection}">${section.tasks.length}</button>
          </div>
          <div class="todo-list">${rows}</div>
          ${moreButton}
        </section>
      `;
    }).join("");

  els.todoDashboard.querySelectorAll("[data-complete-task]").forEach((checkbox) => {
    checkbox.addEventListener("click", (event) => event.stopPropagation());
    checkbox.addEventListener("change", () => {
      markTaskDone(checkbox.dataset.completeTask);
    });
  });

  els.todoDashboard.querySelectorAll("[data-dashboard-task-open]").forEach((button) => {
    button.addEventListener("click", () => openTodoDrawer(button.dataset.dashboardTaskOpen, "view"));
  });

  els.todoDashboard.querySelectorAll("[data-open-todo-view]").forEach((button) => {
    button.addEventListener("click", () => openTodoPage(button.dataset.openTodoView, button.dataset.focusSection || ""));
  });
}

function getDashboardTodoSections() {
  const today = todayString();
  const tomorrow = getDateOffset(1);
  const week = getWeekRange(0);
  const tasks = state.tasks
    .filter((task) => task.status !== "done" && taskMatchesSystemScope(task))
    .sort(compareTasksByUrgency);
  const assigned = new Set();
  const take = (predicate) => {
    const matches = tasks.filter((task) => !assigned.has(task.id) && predicate(task));
    matches.forEach((task) => assigned.add(task.id));
    return matches;
  };

  const deadlineToday = take((task) => task.deadline === today);
  const overdue = take((task) => taskIsOverdue(task, today));
  const todayTasks = take((task) => task.executionDate === today);
  const tomorrowTasks = take((task) => task.executionDate === tomorrow);
  const thisWeekPlanned = take((task) => dateInRange(task.executionDate, week.start, week.end));

  return [
    {
      id: "deadline",
      title: "最後期限",
      tasks: deadlineToday,
      variant: "urgent",
      viewId: "today",
      focusSection: "deadline",
      hideWhenEmpty: true,
    },
    {
      id: "today",
      title: "今日待辦事項",
      tasks: todayTasks,
      viewId: "today",
      focusSection: "general",
    },
    {
      id: "tomorrow",
      title: "明日待辦事項",
      tasks: tomorrowTasks,
      viewId: "tomorrow",
      focusSection: "standard",
    },
    {
      id: "thisWeek",
      title: "本週預計執行的項目",
      tasks: thisWeekPlanned,
      viewId: "thisWeek",
      focusSection: "standard",
    },
    {
      id: "overdue",
      title: "未完成任務",
      tasks: overdue,
      variant: "overdue",
      viewId: "incomplete",
      focusSection: "standard",
      hideWhenEmpty: true,
    },
  ];
}

function taskIsOverdue(task, today = todayString()) {
  return Boolean((task.executionDate && task.executionDate < today) || (task.deadline && task.deadline < today));
}

function dateInRange(date, start, end) {
  return Boolean(date && date >= start && date <= end);
}

function getTodoBuckets() {
  const tasks = state.tasks
    .filter((task) => {
      return task.status !== "done" && taskMatchesSystemScope(task);
    })
    .sort(compareTasksByUrgency);
  const today = todayString();
  const tomorrow = getDateOffset(1);
  const thisWeek = getWeekRange(0);
  const nextWeek = getWeekRange(1);

  return [
    {
      id: "incomplete",
      title: "未完成任務",
      tasks,
    },
    {
      id: "today",
      title: "今日待辦事項",
      tasks: tasks.filter((task) => taskMatchesTodayTodo(task, today)),
    },
    {
      id: "tomorrow",
      title: "明日待辦事項",
      tasks: tasks.filter((task) => taskMatchesDate(task, tomorrow)),
    },
    {
      id: "thisWeek",
      title: "本週待辦事項",
      tasks: tasks.filter((task) => taskMatchesRange(task, thisWeek.start, thisWeek.end)),
    },
    {
      id: "nextWeek",
      title: "下週待辦事項",
      tasks: tasks.filter((task) => taskMatchesRange(task, nextWeek.start, nextWeek.end)),
    },
  ];
}

function renderTodoItem(task, section = {}) {
  const system = getSystem(task.systemId);
  const project = getProject(task.projectId);
  const today = todayString();
  const executionOverdue = task.executionDate && task.executionDate < today;
  const deadlineOverdue = task.deadline && task.deadline < today;
  const deadlineUrgent = section.variant === "urgent";

  return `
    <article class="todo-item ${section.variant ? `todo-item-${section.variant}` : ""}">
      <input type="checkbox" data-complete-task="${task.id}" aria-label="完成 ${escapeHtml(task.title)}" />
      <button class="todo-item-content" type="button" data-dashboard-task-open="${task.id}" aria-label="查看 ${escapeHtml(task.title)}">
        <strong>${escapeHtml(task.title)}</strong>
        <span>${escapeHtml(getTaskContextLabel(task))}</span>
        <span class="todo-item-dates">
          <span class="${executionOverdue ? "date-alert" : ""}">執行日期：${formatDate(task.executionDate)}</span>
          <span class="${deadlineOverdue || deadlineUrgent ? "date-alert" : ""}">最後期限：${formatDate(task.deadline)}</span>
        </span>
      </button>
    </article>
  `;
}

function markTaskDone(taskId, completed = true) {
  const task = getProjectTask(taskId);
  if (completed && !canCompleteTask(task)) {
    alert("請先完成所有細項步驟，才能將任務標示為已完成。");
    return;
  }

  state.tasks = state.tasks.map((item) => {
    if (item.id !== taskId) return item;
    return applyTaskStatusSideEffects({
      ...item,
      status: completed ? "done" : "not_started",
    }, item, completed ? todayString() : "");
  });
  saveState();
  if (completed && task) {
    playCompletionSound();
    showToast(`已完成：${task.title}`);
  }
  render();
}

function playCompletionSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    completionAudioContext ||= new AudioContextClass();
    const context = completionAudioContext;
    if (context.state === "suspended") {
      context.resume().catch(() => {});
    }

    const now = context.currentTime;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    gain.connect(context.destination);

    [660, 880].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const start = now + index * 0.06;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      oscillator.connect(gain);
      oscillator.start(start);
      oscillator.stop(start + 0.16);
    });
  } catch (error) {
    // Audio feedback is optional; completion should keep working if blocked.
  }
}

function openTodoPage(viewId = "today", focusSection = "") {
  closeTodoDrawer();
  els.ganttPage.classList.add("hidden");
  els.ganttPage.setAttribute("aria-hidden", "true");
  activeTodoView = viewId;
  todoFocusSection = focusSection;
  persistViewPreferences();
  els.todoPage.classList.remove("hidden");
  els.todoPage.setAttribute("aria-hidden", "false");
  resetTodoAddForm(true);
  renderTodoPage();
}

function closeTodoPage() {
  closeTodoDrawer();
  els.todoPage.classList.add("hidden");
  els.todoPage.setAttribute("aria-hidden", "true");
}

function openGanttPage() {
  if (!els.todoPage.classList.contains("hidden")) {
    closeTodoPage();
  } else {
    closeTodoDrawer();
  }

  els.ganttSearchInput.value = els.searchInput.value;
  els.ganttScaleSelect.value = ganttScale;
  ganttProjectFilter = selectedProjectId !== "all" ? selectedProjectId : "all";
  els.ganttPage.classList.remove("hidden");
  els.ganttPage.setAttribute("aria-hidden", "false");
  renderGanttPage();
}

function closeGanttPage() {
  closeTodoDrawer();
  els.ganttPage.classList.add("hidden");
  els.ganttPage.setAttribute("aria-hidden", "true");
}

function renderTodoPage() {
  const buckets = getTodoBuckets();
  const activeBucket = buckets.find((bucket) => bucket.id === activeTodoView) || buckets[0];
  const query = els.todoPageSearch.value.trim().toLowerCase();
  const allViewTasks = getTasksForTodoView(activeBucket.id).filter((task) => taskMatchesTodoQuery(task, query));

  els.todoPageTitle.textContent = activeBucket.title;
  els.todoPageDate.textContent = getTodoPageSubtitle(activeBucket.id);
  els.todoSortSelect.value = todoSortKey;
  els.todoSortDirectionSelect.value = todoSortDirection;
  renderTodoSystemTabs(activeBucket.id, query);
  els.todoGroupIndicator.classList.toggle("hidden", !todoGroupBySystem);
  els.todoPage.classList.toggle("drawer-open", !els.todoTaskDrawer.classList.contains("hidden"));
  els.todoPageSidebar.innerHTML = buckets.map((bucket) => {
    const view = todoViews.find((item) => item.id === bucket.id);
    return `
      <button class="todo-nav-item ${bucket.id === activeBucket.id ? "active" : ""}" type="button" data-todo-view="${bucket.id}">
        <span>${view?.icon || "·"}</span>
        <strong>${bucket.title}</strong>
        <span>${bucket.tasks.length}</span>
      </button>
    `;
  }).join("");

  els.todoPageSidebar.querySelectorAll("[data-todo-view]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTodoView = button.dataset.todoView;
      if (!todoAddFields.executionDate.value) {
        const date = getDefaultTodoDateForView(activeTodoView);
        todoAddFields.rangeStart.value = date;
        todoAddFields.rangeEnd.value = date;
        todoAddFields.executionDate.value = date;
        todoAddFields.deadline.value ||= date;
        updateTaskDateConstraints(todoAddFields);
      }
      renderTodoPage();
    });
  });

  els.todoPageList.innerHTML = activeBucket.id === "today"
    ? renderTodayTodoSections(allViewTasks)
    : renderStandardTodoSections(allViewTasks);

  attachTodoPageHandlers();
  renderTodoDrawer();
  focusTodoSection();
}

function renderGanttPage() {
  els.ganttSearchInput.value = els.searchInput.value;
  els.ganttScaleSelect.value = ganttScale;
  syncGanttProjectFilterOptions();

  const groups = getGanttGroups();
  const timeline = buildGanttTimeline(groups);
  const scaleLabel = ganttScale === "week" ? "以日檢視" : ganttScale === "month" ? "以週檢視" : "以月檢視";
  els.ganttRangeLabel.textContent = `${formatRange(timeline.startString, timeline.endString)}・${scaleLabel}`;

  if (!groups.length) {
    els.ganttChart.innerHTML = `<p class="empty-state">目前沒有符合條件的系統、專案或任務。</p>`;
    renderTodoDrawer();
    return;
  }

  els.ganttChart.innerHTML = `
    <div class="gantt-chart-inner" style="--gantt-unit-width: ${timeline.unitWidth}px; --gantt-grid-width: ${timeline.units.length * timeline.unitWidth}px; --gantt-columns: repeat(${timeline.units.length}, ${timeline.unitWidth}px);">
      ${renderGanttTimeHeader(timeline)}
      ${groups.map((group) => renderGanttGroup(group, timeline)).join("")}
    </div>
  `;

  attachGanttHandlers();
  renderTodoDrawer();
}

function syncGanttProjectFilterOptions() {
  const projects = getGanttFilterProjects();
  if (ganttProjectFilter !== "all" && !projects.some((project) => project.id === ganttProjectFilter)) {
    ganttProjectFilter = "all";
  }

  els.ganttProjectFilter.innerHTML = [
    `<option value="all">全部專案</option>`,
    ...projects.map((project) => `<option value="${project.id}">${escapeHtml(project.name)}</option>`),
  ].join("");
  els.ganttProjectFilter.value = ganttProjectFilter;
}

function getGanttFilterProjects() {
  if (selectedScopeIsGeneral()) return [];
  const phase = els.phaseFilter.value;
  return state.projects.filter((project) => {
    const matchSystem = selectedSystemId ? project.systemId === selectedSystemId : true;
    const matchPhase = project.category === "general" || phase === "all" || project.phase === phase;
    return matchSystem && matchPhase;
  });
}

function getGanttGroups() {
  const visibleTasks = getVisibleTasks({ projectId: ganttProjectFilter });
  const projects = getGanttScopedProjects(visibleTasks);
  const groups = [];

  if (selectedScopeIsGeneral()) {
    const generalTasks = visibleTasks.filter((task) => getTaskScope(task) === "general");
    groups.push({
      id: "general",
      name: "一般工作",
      description: "非系統別任務",
      projects: [],
      tasks: generalTasks,
      kind: "general",
    });
    return groups;
  }

  const systems = selectedSystemId
    ? state.systems.filter((system) => system.id === selectedSystemId)
    : state.systems;

  systems.forEach((system) => {
    const systemProjects = projects
      .filter((project) => project.systemId === system.id)
      .map((project) => ({
        project,
        tasks: visibleTasks.filter((task) => getTaskScope(task) === "project" && task.projectId === project.id),
      }));
    const systemTasks = visibleTasks.filter((task) => getTaskScope(task) === "system" && task.systemId === system.id);

    if (systemProjects.length || systemTasks.length || selectedSystemId === system.id) {
      groups.push({
        id: `system-${system.id}`,
        systemId: system.id,
        name: system.name,
        description: system.description || "未設定描述",
        projects: systemProjects,
        tasks: systemTasks,
        kind: "system",
      });
    }
  });

  if (!selectedSystemId) {
    const generalTasks = visibleTasks.filter((task) => getTaskScope(task) === "general");
    if (generalTasks.length) {
      groups.push({
        id: "general",
        name: "一般工作",
        description: "非系統別任務",
        projects: [],
        tasks: generalTasks,
        kind: "general",
      });
    }
  }

  return groups;
}

function getGanttScopedProjects(visibleTasks) {
  const query = els.searchInput.value.trim().toLowerCase();
  const phase = els.phaseFilter.value;
  const visibleTaskProjectIds = new Set(
    visibleTasks
      .filter((task) => getTaskScope(task) === "project" && task.projectId)
      .map((task) => task.projectId),
  );

  return state.projects.filter((project) => {
    const system = getSystem(project.systemId);
    const matchSystem = selectedSystemId ? project.systemId === selectedSystemId : true;
    const matchProject = ganttProjectFilter === "all" || project.id === ganttProjectFilter;
    const matchPhase = project.category === "general" || phase === "all" || project.phase === phase;
    const matchQuery = !query || projectMatchesSearch(project, system, query) || visibleTaskProjectIds.has(project.id);
    return matchSystem && matchProject && matchPhase && matchQuery;
  });
}

function renderGanttTimeHeader(timeline) {
  return `
    <div class="gantt-row gantt-time-header">
      <div class="gantt-label-cell gantt-header-label">層級 / 項目</div>
      <div class="gantt-grid gantt-header-grid" aria-hidden="true">
        ${timeline.units.map((unit) => {
          return `
            <div class="gantt-time-cell ${unit.isToday ? "today" : ""}">
              <strong>${escapeHtml(unit.label)}</strong>
              <span>${escapeHtml(unit.subLabel)}</span>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderGanttGroup(group, timeline) {
  const collapsed = Boolean(ganttCollapsed.systems[group.id]);
  const range = getGanttGroupRange(group);
  const projectCount = group.projects.length;
  const taskCount = group.tasks.length + group.projects.reduce((count, item) => count + item.tasks.length, 0);
  const summary = [
    projectCount ? `${projectCount} 個專案` : "",
    taskCount ? `${taskCount} 筆任務` : "",
    range ? formatRange(range.start, range.end) : "",
  ].filter(Boolean).join("・") || "沒有符合條件的時程";

  return `
    <section class="gantt-section">
      ${renderGanttRow({
        className: `gantt-system-row gantt-level-0 ${group.kind === "general" ? "general" : ""}`,
        label: renderGanttTreeLabel({
          level: 0,
          type: group.kind === "general" ? "一般" : "系統",
          typeClass: group.kind === "general" ? "general" : "system",
          name: group.name,
          meta: `${group.description}・${summary}`,
          toggle: {
            id: group.id,
            target: "system",
            collapsed,
          },
        }),
        grid: renderGanttBar(range?.start, range?.end, timeline, {
          className: "system",
          title: `${group.name} ${summary}`,
          content: summary,
        }),
        timeline,
      })}
      ${collapsed ? "" : renderGanttGroupChildren(group, timeline)}
    </section>
  `;
}

function renderGanttGroupChildren(group, timeline) {
  const projectRows = group.projects.map((item) => renderGanttProject(item, timeline)).join("");
  const taskRows = renderGanttTaskBlock(
    group.kind === "general" ? "一般任務" : "系統層級任務",
    group.tasks,
    timeline,
    "system-task",
    `${group.id}-tasks`,
  );

  if (!projectRows && !taskRows) {
    return renderGanttRow({
      className: "gantt-note-row gantt-level-1",
      label: renderGanttTreeLabel({
        level: 1,
        type: "提示",
        typeClass: "note",
        name: "沒有符合目前篩選的專案或任務",
        meta: "請調整搜尋、系統或階段篩選",
      }),
      grid: "",
      timeline,
    });
  }

  return `${taskRows}${projectRows}`;
}

function renderGanttProject(item, timeline) {
  const { project, tasks } = item;
  const collapsed = Boolean(ganttCollapsed.projects[project.id]);
  const progress = getProjectCompletion(project.id);
  const range = getGanttProjectRange(project, tasks);
  const phaseRows = getGanttProjectPhases(project).map((phaseItem) => renderGanttPhaseRow(project, phaseItem, timeline)).join("");
  const taskRows = renderGanttTaskBlock("專案任務", tasks, timeline, "project-task", `project-${project.id}-tasks`);
  const closed = project.category !== "general" && (project.closed || project.phase === "closed");
  const rangeLabel = range ? formatRange(range.start, range.end) : "尚未設定時程";
  const meta = project.category === "general"
    ? `${getProjectCategoryLabel(project.category)}・${progress.label}・${rangeLabel}`
    : `${getPhaseLabel(project.phase)}・${progress.label}・${rangeLabel}`;

  return `
    ${renderGanttRow({
      className: `gantt-project-row gantt-level-1 ${closed ? "closed" : ""}`,
      label: renderGanttTreeLabel({
        level: 1,
        type: "專案",
        typeClass: "project",
        name: project.name,
        meta,
        actionAttributes: `data-gantt-project="${project.id}"`,
        toggle: {
          id: project.id,
          target: "project",
          collapsed,
        },
      }),
      grid: renderGanttBar(range?.start, range?.end, timeline, {
        className: `project ${closed ? "closed" : ""}`,
        title: `${project.name} ${rangeLabel}`,
        content: `${progress.label}`,
        data: `data-gantt-project="${project.id}"`,
      }),
      timeline,
    })}
    ${collapsed ? "" : `${phaseRows}${taskRows}`}
  `;
}

function renderGanttPhaseRow(project, phaseItem, timeline) {
  const active = project.phase === phaseItem.id;
  return renderGanttRow({
    className: `gantt-phase-row gantt-level-2 ${active ? "active" : ""}`,
    label: renderGanttTreeLabel({
      level: 2,
      type: "階段",
      typeClass: active ? "phase active" : "phase",
      name: phaseItem.label,
      meta: `${formatRange(phaseItem.start, phaseItem.end)}${active ? "・目前階段" : ""}`,
    }),
    grid: renderGanttBar(phaseItem.start, phaseItem.end, timeline, {
      className: `phase ${active ? "active" : ""}`,
      title: `${project.name} / ${phaseItem.label}`,
      content: active ? "目前階段" : phaseItem.label,
    }),
    timeline,
  });
}

function renderGanttTaskBlock(title, tasks, timeline, className = "", groupId = title) {
  if (!tasks.length) return "";
  const range = getGanttTasksRange(tasks);
  const collapsed = Boolean(ganttCollapsed.taskGroups[groupId]);
  return `
    ${renderGanttRow({
      className: `gantt-task-group-row gantt-level-2 ${className}`,
      label: renderGanttTreeLabel({
        level: 2,
        type: "群組",
        typeClass: "group",
        name: title,
        meta: `${tasks.length} 筆・${range ? formatRange(range.start, range.end) : "尚未設定"}`,
        toggle: {
          id: groupId,
          target: "task-group",
          collapsed,
        },
      }),
      grid: "",
      timeline,
    })}
    ${collapsed ? "" : tasks.map((task) => renderGanttTaskRow(task, timeline)).join("")}
  `;
}

function renderGanttTaskRow(task, timeline) {
  const priority = getPriorityLabel(task.priority);
  const status = getStatusLabel(task.status);
  const owner = task.owner || "未指定";
  const grid = [
    renderGanttBar(task.rangeStart, task.rangeEnd, timeline, {
      className: `task status-${task.status} priority-${task.priority}`,
      title: `${task.title} ${formatRange(task.rangeStart, task.rangeEnd)}`,
      content: task.title,
      data: `data-gantt-task="${task.id}"`,
    }),
    renderGanttMarker(task.executionDate, timeline, "execution", `執行日：${formatDate(task.executionDate)}`),
    renderGanttMarker(task.deadline, timeline, "deadline", `截止日：${formatDate(task.deadline)}`),
  ].join("");

  return renderGanttRow({
    className: `gantt-task-row gantt-level-3 priority-${task.priority}`,
    label: renderGanttTreeLabel({
      level: 3,
      type: "任務",
      typeClass: `task priority-${task.priority}`,
      name: task.title,
      meta: `${owner}・${status}・優先級 ${priority}`,
      actionAttributes: `data-gantt-task="${task.id}"`,
    }),
    grid,
    timeline,
  });
}

function renderGanttTreeLabel({ level, type, typeClass = "", name, meta = "", actionAttributes = "", toggle = null }) {
  const toggleControl = toggle
    ? `<button class="gantt-disclosure" type="button" data-gantt-toggle-${toggle.target}="${toggle.id}" aria-expanded="${!toggle.collapsed}" aria-label="${toggle.collapsed ? "展開" : "收合"}${escapeHtml(name)}">${toggle.collapsed ? "+" : "-"}</button>`
    : `<span class="gantt-disclosure-placeholder" aria-hidden="true"></span>`;
  const nameControl = actionAttributes
    ? `<button class="gantt-name-button" type="button" ${actionAttributes}>${escapeHtml(name)}</button>`
    : `<strong>${escapeHtml(name)}</strong>`;

  return `
    <div class="gantt-tree-node level-${level}">
      ${toggleControl}
      <span class="gantt-level-badge ${typeClass}">${escapeHtml(type)}</span>
      <div class="gantt-label-text">
        ${nameControl}
        <span>${escapeHtml(meta)}</span>
      </div>
    </div>
  `;
}

function renderGanttRow({ className, label, grid, timeline }) {
  return `
    <div class="gantt-row ${className}">
      <div class="gantt-label-cell">${label}</div>
      <div class="gantt-grid">
        ${renderGanttTodayLine(timeline)}
        ${grid || ""}
      </div>
    </div>
  `;
}

function renderGanttBar(start, end, timeline, options = {}) {
  const placement = getGanttPlacement(start, end, timeline);
  if (!placement) return "";

  const tag = options.data ? "button" : "span";
  const type = options.data ? ` type="button"` : "";
  const title = options.title ? ` title="${escapeHtml(options.title)}"` : "";
  const content = options.content ? escapeHtml(options.content) : "";

  return `
    <${tag} class="gantt-bar ${options.className || ""}"${type} ${options.data || ""}${title} style="grid-column: ${placement.start} / ${placement.end};">
      ${content}
    </${tag}>
  `;
}

function renderGanttMarker(date, timeline, className, title) {
  const index = getGanttUnitIndex(date, timeline);
  if (index < 0) return "";
  return `<span class="gantt-marker ${className}" title="${escapeHtml(title)}" style="grid-column: ${index + 1};"></span>`;
}

function renderGanttTodayLine(timeline) {
  const index = getGanttUnitIndex(todayString(), timeline);
  if (index < 0) return "";
  return `<span class="gantt-today-line" style="grid-column: ${index + 1};"></span>`;
}

function attachGanttHandlers() {
  els.ganttChart.querySelectorAll("[data-gantt-toggle-system]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.ganttToggleSystem;
      ganttCollapsed.systems[id] = !ganttCollapsed.systems[id];
      persistViewPreferences();
      renderGanttPage();
    });
  });

  els.ganttChart.querySelectorAll("[data-gantt-toggle-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.ganttToggleProject;
      ganttCollapsed.projects[id] = !ganttCollapsed.projects[id];
      persistViewPreferences();
      renderGanttPage();
    });
  });

  els.ganttChart.querySelectorAll("[data-gantt-toggle-task-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.ganttToggleTaskGroup;
      ganttCollapsed.taskGroups[id] = !ganttCollapsed.taskGroups[id];
      persistViewPreferences();
      renderGanttPage();
    });
  });

  els.ganttChart.querySelectorAll("[data-gantt-project]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = getProject(button.dataset.ganttProject);
      if (project) openProjectDialog(project);
    });
  });

  els.ganttChart.querySelectorAll("[data-gantt-task]").forEach((button) => {
    button.addEventListener("click", () => openTodoDrawer(button.dataset.ganttTask, "view"));
  });
}

function buildGanttTimeline(groups) {
  const dates = collectGanttDates(groups).sort();
  const today = todayString();
  const firstDate = dates[0] || today;
  const lastDate = dates[dates.length - 1] || getDateOffset(30);
  const paddedStart = addDaysToDateString(firstDate, ganttScale === "week" ? -3 : ganttScale === "month" ? -14 : -45);
  const paddedEnd = addDaysToDateString(lastDate, ganttScale === "week" ? 5 : ganttScale === "month" ? 21 : 90);
  const parsedStart = parseDateString(paddedStart);
  const parsedEnd = parseDateString(paddedEnd);
  const startDate = ganttScale === "week"
    ? getStartOfWeek(parsedStart)
    : ganttScale === "month"
      ? getStartOfMonth(parsedStart)
      : getStartOfYear(parsedStart);
  const endDate = ganttScale === "week"
    ? getEndOfWeek(parsedEnd)
    : ganttScale === "month"
      ? getEndOfMonth(parsedEnd)
      : getEndOfYear(parsedEnd);
  const units = buildGanttUnits(startDate, endDate, ganttScale);

  return {
    startString: toDateInputValue(startDate),
    endString: toDateInputValue(endDate),
    unitWidth: ganttScale === "week" ? 48 : ganttScale === "month" ? 86 : 112,
    units,
  };
}

function buildGanttUnits(startDate, endDate, scale) {
  const units = [];
  let cursor = new Date(startDate);
  const today = todayString();

  while (cursor <= endDate) {
    const unitStart = new Date(cursor);
    const unitEnd = scale === "week"
      ? new Date(cursor)
      : scale === "month"
        ? addDaysToDate(cursor, 6)
        : getEndOfMonth(cursor);
    if (unitEnd > endDate) unitEnd.setTime(endDate.getTime());
    const startString = toDateInputValue(unitStart);
    const endString = toDateInputValue(unitEnd);

    units.push({
      startString,
      endString,
      label: scale === "year" ? formatGanttMonthLabel(startString) : formatGanttShortDate(startString),
      subLabel: scale === "week"
        ? formatGanttWeekday(startString)
        : scale === "month"
          ? `至 ${formatGanttShortDate(endString)}`
          : "月",
      isToday: today >= startString && today <= endString,
    });

    cursor = scale === "week"
      ? addDaysToDate(cursor, 1)
      : scale === "month"
        ? addDaysToDate(cursor, 7)
        : addMonthsToDate(cursor, 1);
  }

  return units;
}

function collectGanttDates(groups) {
  const dates = [];
  groups.forEach((group) => {
    collectGanttTaskDates(group.tasks, dates);
    group.projects.forEach((item) => {
      const projectRange = getGanttProjectRange(item.project, item.tasks);
      pushGanttRangeDates(projectRange, dates);
      getGanttProjectPhases(item.project).forEach((phaseItem) => pushGanttRangeDates(phaseItem, dates));
      collectGanttTaskDates(item.tasks, dates);
    });
  });
  return dates.filter(Boolean);
}

function collectGanttTaskDates(tasks, dates) {
  tasks.forEach((task) => {
    dates.push(task.rangeStart, task.rangeEnd, task.executionDate, task.deadline);
  });
}

function pushGanttRangeDates(range, dates) {
  if (!range) return;
  dates.push(range.start, range.end);
}

function getGanttGroupRange(group) {
  const dates = [];
  collectGanttTaskDates(group.tasks, dates);
  group.projects.forEach((item) => {
    pushGanttRangeDates(getGanttProjectRange(item.project, item.tasks), dates);
    getGanttProjectPhases(item.project).forEach((phaseItem) => pushGanttRangeDates(phaseItem, dates));
    collectGanttTaskDates(item.tasks, dates);
  });
  return getGanttRangeFromDates(dates);
}

function getGanttProjectRange(project, tasks = []) {
  if (project.category === "general") return getGanttTasksRange(tasks);
  const plannedRange = getProjectScheduleRange(project.plannedStart, project.plannedEnd, project.phaseSchedules || {});
  if (plannedRange.start || plannedRange.end) return normalizeGanttRange(plannedRange.start, plannedRange.end);
  return getGanttTasksRange(tasks);
}

function getGanttProjectPhases(project) {
  if (project.category === "general") return [];
  const schedules = project.phaseSchedules || createPhaseSchedules();
  return phases
    .map((phase) => {
      const schedule = schedules[phase.id] || {};
      const range = normalizeGanttRange(schedule.start, schedule.end);
      return range ? { id: phase.id, label: phase.label, start: range.start, end: range.end } : null;
    })
    .filter(Boolean);
}

function getGanttTasksRange(tasks) {
  const dates = [];
  collectGanttTaskDates(tasks, dates);
  return getGanttRangeFromDates(dates);
}

function getGanttRangeFromDates(dates) {
  const cleanDates = dates.filter(Boolean).sort();
  if (!cleanDates.length) return null;
  return { start: cleanDates[0], end: cleanDates[cleanDates.length - 1] };
}

function normalizeGanttRange(start, end) {
  if (!start && !end) return null;
  const rangeStart = start || end;
  const rangeEnd = end || start;
  return rangeStart <= rangeEnd
    ? { start: rangeStart, end: rangeEnd }
    : { start: rangeEnd, end: rangeStart };
}

function getGanttPlacement(start, end, timeline) {
  const range = normalizeGanttRange(start, end);
  if (!range) return null;
  const startIndex = getGanttUnitIndex(range.start, timeline);
  const endIndex = getGanttUnitIndex(range.end, timeline);
  if (startIndex < 0 || endIndex < 0) return null;
  return {
    start: startIndex + 1,
    end: endIndex + 2,
  };
}

function getGanttUnitIndex(dateString, timeline) {
  if (!dateString) return -1;
  return timeline.units.findIndex((unit) => dateString >= unit.startString && dateString <= unit.endString);
}

function getProjectCompletion(projectId) {
  const tasks = state.tasks.filter((task) => getTaskScope(task) === "project" && task.projectId === projectId);
  if (!tasks.length) return { done: 0, total: 0, ratio: 0, label: "0 / 0 完成" };
  const done = tasks.filter((task) => task.status === "done").length;
  return {
    done,
    total: tasks.length,
    ratio: Math.round((done / tasks.length) * 100),
    label: `${done} / ${tasks.length} 完成`,
  };
}

function parseDateString(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

function addDaysToDate(date, days) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function addDaysToDateString(dateString, days) {
  return toDateInputValue(addDaysToDate(parseDateString(dateString), days));
}

function addMonthsToDate(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function getStartOfWeek(date) {
  const start = new Date(date);
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset);
  return start;
}

function getEndOfWeek(date) {
  return addDaysToDate(getStartOfWeek(date), 6);
}

function getStartOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getEndOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function getStartOfYear(date) {
  return new Date(date.getFullYear(), 0, 1);
}

function getEndOfYear(date) {
  return new Date(date.getFullYear(), 11, 31);
}

function formatGanttShortDate(dateString) {
  const date = parseDateString(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatGanttWeekday(dateString) {
  return new Intl.DateTimeFormat("zh-TW", { weekday: "short" }).format(parseDateString(dateString));
}

function formatGanttMonthLabel(dateString) {
  const date = parseDateString(dateString);
  return `${date.getFullYear()}/${date.getMonth() + 1}`;
}

function renderTodoSystemTabs(activeBucketId, query) {
  const tabs = [
    {
      id: "",
      name: "全部系統",
      description: `${state.systems.length} 個系統 + 一般工作`,
    },
    {
      id: generalWorkScopeId,
      name: "一般工作",
      description: "非系統別任務",
    },
    ...state.systems.map((system) => ({
      id: system.id,
      name: system.name,
      description: system.description || "未設定描述",
    })),
  ];

  els.todoSystemTabs.innerHTML = tabs.map((tab) => {
    const systemId = tab.id || null;
    const count = getTasksForTodoView(activeBucketId, systemId)
      .filter((task) => task.status !== "done" && taskMatchesTodoQuery(task, query))
      .length;
    const active = selectedSystemId === systemId;

    return `
      <button class="todo-system-tab ${active ? "active" : ""}" type="button" data-todo-system-id="${tab.id}" aria-pressed="${active}">
        <span>
          <strong>${escapeHtml(tab.name)}</strong>
          <small>${escapeHtml(tab.description)}</small>
        </span>
        <em>${count}</em>
      </button>
    `;
  }).join("");

  els.todoSystemTabs.querySelectorAll("[data-todo-system-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextSystemId = button.dataset.todoSystemId || null;
      if (selectedSystemId === nextSystemId) return;
      selectedTagFilter = "";
      selectedSystemId = nextSystemId;
      selectedProjectId = "all";
      closeTodoDrawer();
      resetTodoAddForm(true);
      render();
    });
  });
}

function renderStandardTodoSections(tasks) {
  const activeTasks = sortTodoTasks(tasks.filter((task) => task.status !== "done"));
  const completedTasks = sortTodoTasks(tasks.filter((task) => task.status === "done"));

  return `
    ${renderTodoListHeader()}
    <section class="todo-standard-section" data-todo-section="standard">
      ${renderTodoRows(activeTasks)}
    </section>
    ${renderTodoCompletedSection(completedTasks)}
  `;
}

function focusTodoSection() {
  if (!todoFocusSection) return;
  const section = els.todoPageList.querySelector(`[data-todo-section="${todoFocusSection}"]`);
  if (!section) {
    todoFocusSection = "";
    return;
  }

  section.classList.add("todo-section-focus");
  section.scrollIntoView({ block: "start", behavior: "smooth" });
  window.setTimeout(() => section.classList.remove("todo-section-focus"), 1400);
  todoFocusSection = "";
}

function renderTodayTodoSections(tasks) {
  const sections = getTodayTodoSections(tasks);

  return `
    ${renderTodoListHeader()}
    ${renderTodoSection("最後期限", sections.deadline, "urgent", "deadline")}
    ${renderTodoSection("一般待辦事項", sections.general, "general", "general")}
    ${renderTodoSection("執行區間任務", sections.range, "range", "range")}
    ${renderTodoCompletedSection(sections.completed, "已完成", "completed")}
  `;
}

function renderTodoListHeader() {
  return `
    <div class="todo-list-header" aria-hidden="true">
      <span></span>
      <span>標題</span>
      <span>執行日期</span>
      <span>最後期限</span>
      <span>執行區間</span>
      <span>優先級</span>
      <span>重要性</span>
    </div>
  `;
}

function renderTodoRows(tasks) {
  if (!tasks.length) return `<p class="empty-state">這個清單目前沒有待辦工作。</p>`;

  if (!todoGroupBySystem) return tasks.map(renderTodoTaskRow).join("");

  return groupTasksBySystem(tasks)
    .map((group) => `
      <section class="todo-group-block">
        <h3 class="todo-group-title">${escapeHtml(group.title)}</h3>
        ${group.tasks.map(renderTodoTaskRow).join("")}
      </section>
    `)
    .join("");
}

function renderTodoSection(title, tasks, variant = "", sectionKey = title) {
  const collapsed = Boolean(todoSectionCollapsed[sectionKey]);

  return `
    <section class="todo-section-block ${variant ? `todo-section-${variant}` : ""} ${collapsed ? "collapsed" : ""}" data-todo-section="${sectionKey}">
      <button class="todo-section-title" type="button" data-toggle-section="${sectionKey}" aria-expanded="${!collapsed}">
        <span class="section-caret">${collapsed ? ">" : "v"}</span>
        ${variant === "urgent" ? `<span class="section-urgent-mark">!</span>` : ""}
        <strong>${title}</strong>
        <small>${tasks.length}</small>
      </button>
      <div class="todo-section-content ${collapsed ? "hidden" : ""}">
        ${tasks.length ? renderTodoRows(tasks) : `<p class="empty-state">這個區塊目前沒有工作。</p>`}
      </div>
    </section>
  `;
}

function renderTodoCompletedSection(tasks, title = "完成", sectionKey = "completed") {
  const collapsed = Boolean(todoSectionCollapsed[sectionKey]);

  return `
    <section class="todo-completed-section ${collapsed ? "collapsed" : ""}" data-todo-section="${sectionKey}">
      <button class="todo-completed-header" type="button" data-toggle-section="${sectionKey}" aria-expanded="${!collapsed}">
        <span class="section-caret">${collapsed ? ">" : "v"}</span>
        <strong>${title}</strong>
        <span>${tasks.length}</span>
      </button>
      <div class="todo-completed-list ${collapsed ? "hidden" : ""}">
        ${tasks.length ? tasks.map(renderTodoTaskRow).join("") : `<p class="empty-state">尚無已完成工作。</p>`}
      </div>
    </section>
  `;
}

function renderTodoTaskRow(task) {
  const system = getSystem(task.systemId);
  const project = getProject(task.projectId);
  const completed = task.status === "done";
  const today = todayString();
  const shouldMarkOverdue = activeTodoView === "incomplete" && !completed;
  const executionOverdueClass = shouldMarkOverdue && task.executionDate && task.executionDate < today ? "todo-overdue-date" : "";
  const deadlineOverdueClass = shouldMarkOverdue && task.deadline && task.deadline < today ? "todo-overdue-date" : "";
  const completedMeta = completed ? `・已完成 ${formatDate(task.completedDate)}` : "";

  return `
    <article class="todo-task-row ${completed ? "completed" : ""}" data-task-row="${task.id}">
      <button class="todo-check-button ${completed ? "completed" : ""}" type="button" data-toggle-complete="${task.id}" title="${completed ? "標示為未完成" : "標示為已完成"}">✓</button>
      <div class="todo-title-cell">
        <div class="todo-title-line">
          <input class="todo-title-input" data-inline-title="${task.id}" value="${escapeHtml(task.title)}" aria-label="任務名稱" />
          <button class="todo-open-edit" type="button" data-open-edit-drawer="${task.id}" title="編輯任務">✎</button>
        </div>
        <span class="todo-subtitle">${escapeHtml(getTaskContextLabel(task))}${completedMeta}</span>
      </div>
      <input class="todo-inline-date ${executionOverdueClass}" data-inline-execution="${task.id}" type="date" min="${task.rangeStart}" max="${task.rangeEnd}" value="${task.executionDate}" aria-label="執行日期" />
      <input class="todo-inline-date ${deadlineOverdueClass}" data-inline-deadline="${task.id}" type="date" min="${task.rangeEnd}" value="${task.deadline}" aria-label="最後期限" />
      <div class="todo-range-inputs">
        <input data-inline-range-start="${task.id}" type="date" value="${task.rangeStart}" aria-label="執行區間開始" />
        <input data-inline-range-end="${task.id}" type="date" min="${task.rangeStart}" value="${task.rangeEnd}" aria-label="執行區間結束" />
      </div>
      <select class="todo-inline-priority" data-inline-priority="${task.id}" aria-label="優先級">
        ${renderPriorityOptions(task.priority)}
      </select>
      <button class="todo-important-button ${task.important ? "important" : ""}" type="button" data-toggle-important="${task.id}" title="${task.important ? "移除重要性" : "將工作標示為重要"}">${task.important ? "★" : "☆"}</button>
    </article>
  `;
}

function attachTodoPageHandlers() {
  els.todoPageList.querySelectorAll("[data-toggle-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionKey = button.dataset.toggleSection;
      todoSectionCollapsed[sectionKey] = !todoSectionCollapsed[sectionKey];
      persistViewPreferences();
      renderTodoPage();
    });
  });

  els.todoPageList.querySelectorAll("[data-task-row]").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.closest("button, input, select, a")) return;
      openTodoDrawer(row.dataset.taskRow, "view");
    });
  });

  els.todoPageList.querySelectorAll("[data-toggle-complete]").forEach((button) => {
    button.addEventListener("click", () => {
      const task = getProjectTask(button.dataset.toggleComplete);
      markTaskDone(button.dataset.toggleComplete, task?.status !== "done");
    });
  });

  els.todoPageList.querySelectorAll("[data-open-edit-drawer]").forEach((button) => {
    button.addEventListener("click", () => openTodoDrawer(button.dataset.openEditDrawer, "edit"));
  });

  els.todoPageList.querySelectorAll("[data-inline-title]").forEach((input) => {
    input.addEventListener("change", () => updateInlineTask(input.dataset.inlineTitle, { title: input.value.trim() || "未命名任務" }));
  });

  els.todoPageList.querySelectorAll("[data-inline-execution]").forEach((input) => {
    input.addEventListener("change", () => updateInlineTaskDates(input.dataset.inlineExecution, { executionDate: input.value }));
  });

  els.todoPageList.querySelectorAll("[data-inline-deadline]").forEach((input) => {
    input.addEventListener("change", () => updateInlineTaskDates(input.dataset.inlineDeadline, { deadline: input.value }));
  });

  els.todoPageList.querySelectorAll("[data-inline-range-start]").forEach((input) => {
    input.addEventListener("change", () => updateInlineTaskDates(input.dataset.inlineRangeStart, { rangeStart: input.value }));
  });

  els.todoPageList.querySelectorAll("[data-inline-range-end]").forEach((input) => {
    input.addEventListener("change", () => updateInlineTaskDates(input.dataset.inlineRangeEnd, { rangeEnd: input.value }));
  });

  els.todoPageList.querySelectorAll("[data-inline-priority]").forEach((select) => {
    select.addEventListener("change", () => updateInlineTask(select.dataset.inlinePriority, { priority: select.value }));
  });

  els.todoPageList.querySelectorAll("[data-toggle-important]").forEach((button) => {
    button.addEventListener("click", () => toggleTaskImportant(button.dataset.toggleImportant));
  });
}

function getTasksForTodoView(viewId, systemId = selectedSystemId) {
  const normalizedTagFilter = selectedTagFilter.trim().toLowerCase();
  const scopedTasks = state.tasks.filter((task) => {
    const matchTag = !normalizedTagFilter || (task.tags || []).some((tag) => tag.toLowerCase() === normalizedTagFilter);
    return taskMatchesSystemScope(task, systemId) && matchTag;
  });
  const today = todayString();
  const tomorrow = getDateOffset(1);
  const thisWeek = getWeekRange(0);
  const nextWeek = getWeekRange(1);

  if (viewId === "today") return scopedTasks.filter((task) => taskMatchesTodayTodo(task, today));
  if (viewId === "tomorrow") return scopedTasks.filter((task) => taskMatchesDate(task, tomorrow));
  if (viewId === "thisWeek") return scopedTasks.filter((task) => taskMatchesRange(task, thisWeek.start, thisWeek.end));
  if (viewId === "nextWeek") return scopedTasks.filter((task) => taskMatchesRange(task, nextWeek.start, nextWeek.end));
  return scopedTasks;
}

function getTodayTodoSections(tasks) {
  const today = todayString();
  const incompleteTasks = tasks.filter((task) => task.status !== "done");
  const deadlineTasks = incompleteTasks.filter((task) => task.deadline === today);
  const deadlineIds = new Set(deadlineTasks.map((task) => task.id));
  const generalTasks = incompleteTasks.filter((task) => task.executionDate === today && !deadlineIds.has(task.id));
  const generalIds = new Set(generalTasks.map((task) => task.id));
  const rangeTasks = incompleteTasks.filter((task) => {
    return taskRangeIncludesDate(task, today) && !deadlineIds.has(task.id) && !generalIds.has(task.id);
  });

  return {
    deadline: sortTodoTasks(deadlineTasks),
    general: sortTodoTasks(generalTasks),
    range: sortTodoTasks(rangeTasks),
    completed: sortTodoTasks(tasks.filter((task) => task.status === "done" && task.completedDate === today)),
  };
}

function taskMatchesTodayTodo(task, today = todayString()) {
  if (task.status === "done") return task.completedDate === today;
  return task.deadline === today || task.executionDate === today || taskRangeIncludesDate(task, today);
}

function taskMatchesTodoQuery(task, query) {
  if (!query) return true;

  const system = getSystem(task.systemId);
  const project = getProject(task.projectId);
  const haystack = [
    task.title,
    task.description,
    task.owner,
    (task.stakeholders || []).join(" "),
    task.completedDate,
    getStatusLabel(task.status),
    getPriorityLabel(task.priority),
    getTaskScopeLabel(getTaskScope(task)),
    getTaskContextLabel(task),
    task.tags.join(" "),
    task.notes,
    (task.steps || []).map((step) => step.title).join(" "),
    (task.files || []).map((file) => file.name).join(" "),
    (task.history || []).map((item) => `${item.date} ${item.description} ${item.note} ${(item.links || []).map((link) => `${link.name} ${link.url}`).join(" ")}`).join(" "),
    (task.relatedEmails || []).join(" "),
    (task.relatedLinks || []).map((link) => `${link.title} ${link.url}`).join(" "),
    system?.name,
    project?.name,
    project?.description,
    getProjectCategoryLabel(project?.category),
    project?.requirementRequest,
    project?.phaseChangedAt,
    (project?.relatedEmails || []).join(" "),
    (project?.relatedLinks || []).map((link) => `${link.title} ${link.url}`).join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function sortTodoTasks(tasks) {
  const priorityRank = { low: 0, medium: 1, high: 2 };
  const getSortValue = (task) => {
    if (todoSortKey === "title") return { value: task.title.toLowerCase(), missing: false };
    if (todoSortKey === "systemProject") {
      return {
        value: `${getTaskContextLabel(task)} ${task.title}`.toLowerCase(),
        missing: false,
      };
    }
    if (todoSortKey === "deadline") return { value: task.deadline || "9999-12-31", missing: !task.deadline };
    if (todoSortKey === "priority") return { value: priorityRank[task.priority] ?? 1, missing: false };
    if (todoSortKey === "important") return { value: task.important ? 1 : 0, missing: false };
    return { value: task.executionDate || "9999-12-31", missing: !task.executionDate };
  };

  return [...tasks].sort((a, b) => {
    const first = getSortValue(a);
    const second = getSortValue(b);
    if (first.missing && !second.missing) return 1;
    if (!first.missing && second.missing) return -1;
    let result = 0;
    if (typeof first.value === "string" && typeof second.value === "string") {
      result = first.value.localeCompare(second.value, "zh-Hant");
    } else if (first.value < second.value) {
      result = -1;
    } else if (first.value > second.value) {
      result = 1;
    }
    if (result !== 0) return todoSortDirection === "desc" ? -result : result;
    return a.title.localeCompare(b.title, "zh-Hant");
  });
}

function groupTasksBySystem(tasks) {
  const groups = new Map();

  tasks.forEach((task) => {
    const systemName = getTaskScope(task) === "general"
      ? "一般工作"
      : getSystem(task.systemId)?.name || "未指定系統";
    if (!groups.has(systemName)) groups.set(systemName, []);
    groups.get(systemName).push(task);
  });

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b, "zh-Hant"))
    .map(([title, groupTasks]) => ({ title, tasks: groupTasks }));
}

function renderPriorityOptions(selectedPriority = "medium") {
  return ["high", "medium", "low"]
    .map((priority) => `<option value="${priority}" ${priority === selectedPriority ? "selected" : ""}>${getPriorityLabel(priority)}</option>`)
    .join("");
}

function applyTaskStatusSideEffects(nextTask, previousTask = null, requestedCompletedDate = "") {
  const today = todayString();
  const previous = previousTask || nextTask;
  const nextStatus = normalizeTaskStatus(nextTask.status);
  const updatedTask = {
    ...nextTask,
    status: nextStatus,
  };

  updatedTask.completedDate = nextStatus === "done"
    ? requestedCompletedDate || (previous.status === "done" ? previous.completedDate || today : today)
    : "";

  if (previousTask && nextStatus === "doing" && previous.status !== "doing" && previous.rangeStart && previous.rangeStart > today) {
    const rangeDays = Math.max(0, getDateDiffFromStrings(previous.rangeStart, previous.rangeEnd || previous.rangeStart));
    const deadlineDays = previous.deadline
      ? Math.max(0, getDateDiffFromStrings(previous.rangeEnd || previous.rangeStart, previous.deadline))
      : 0;
    updatedTask.rangeStart = today;
    updatedTask.rangeEnd = addDaysToDateString(today, rangeDays);
    updatedTask.executionDate = today;
    updatedTask.deadline = addDaysToDateString(updatedTask.rangeEnd, deadlineDays);
  }

  return updatedTask;
}

function getDateDiffFromStrings(start, end) {
  return getDayDiff(parseDateString(start), parseDateString(end));
}

function syncTaskCompletedField(fields) {
  const isDone = normalizeTaskStatus(fields.status.value) === "done";
  fields.completedDateField?.classList.toggle("hidden", !isDone);
  if (fields.completedDate) {
    fields.completedDate.required = isDone;
    if (isDone && !fields.completedDate.value) fields.completedDate.value = todayString();
    if (!isDone) fields.completedDate.value = "";
  }
}

function updateInlineTask(taskId, patch) {
  state.tasks = state.tasks.map((task) => {
    if (task.id !== taskId) return task;

    const nextStatus = patch.status ? normalizeTaskStatus(patch.status) : task.status;
    const nextTask = {
      ...task,
      ...patch,
      status: nextStatus,
    };

    return applyTaskStatusSideEffects(nextTask, task, patch.completedDate);
  });

  saveState();
  render();
}

function updateInlineTaskDates(taskId, patch) {
  state.tasks = state.tasks.map((task) => {
    if (task.id !== taskId) return task;

    const nextTask = { ...task, ...patch };
    nextTask.rangeStart ||= todayString();
    nextTask.rangeEnd ||= nextTask.rangeStart;

    if (nextTask.rangeEnd < nextTask.rangeStart) {
      nextTask.rangeEnd = nextTask.rangeStart;
    }

    nextTask.executionDate = clampDate(nextTask.executionDate || nextTask.rangeStart, nextTask.rangeStart, nextTask.rangeEnd);

    if (!nextTask.deadline || nextTask.deadline < nextTask.rangeEnd) {
      nextTask.deadline = nextTask.rangeEnd;
    }

    return nextTask;
  });

  saveState();
  render();
}

function toggleTaskImportant(taskId) {
  const task = getProjectTask(taskId);
  if (!task) return;
  updateInlineTask(taskId, { important: !task.important });
}

function todoPageIsOpen() {
  return !els.todoPage.classList.contains("hidden");
}

function ganttPageIsOpen() {
  return !els.ganttPage.classList.contains("hidden");
}

function getActiveTaskDrawer() {
  if (todoPageIsOpen()) return els.todoTaskDrawer;
  if (ganttPageIsOpen()) return els.ganttTaskDrawer;
  return els.mainTaskDrawer;
}

function getInactiveTaskDrawers() {
  return [els.todoTaskDrawer, els.ganttTaskDrawer, els.mainTaskDrawer].filter((drawer) => drawer !== getActiveTaskDrawer());
}

function hideTaskDrawer(drawer) {
  if (!drawer) return;
  drawer.innerHTML = "";
  drawer.classList.add("hidden");
  drawer.setAttribute("aria-hidden", "true");
}

function syncTaskDrawerShell(open) {
  els.todoPage.classList.toggle("drawer-open", open && todoPageIsOpen());
  els.ganttPage.classList.toggle("drawer-open", open && ganttPageIsOpen());
  els.appShell.classList.toggle("main-drawer-open", open && !todoPageIsOpen() && !ganttPageIsOpen());
}

function openTodoDrawer(taskId, mode = "view") {
  const drawer = getActiveTaskDrawer();
  const isSameTaskOpen = selectedTodoTaskId === taskId
    && drawerMode === mode
    && drawer
    && !drawer.classList.contains("hidden");

  if (isSameTaskOpen && mode === "view") {
    closeTodoDrawer();
    return;
  }

  selectedTodoTaskId = taskId;
  drawerMode = mode;
  getInactiveTaskDrawers().forEach(hideTaskDrawer);
  drawer.classList.remove("hidden");
  drawer.setAttribute("aria-hidden", "false");
  syncTaskDrawerShell(true);
  renderTodoDrawer();
}

function closeTodoDrawer() {
  selectedTodoTaskId = null;
  drawerMode = "view";
  hideTaskDrawer(els.todoTaskDrawer);
  hideTaskDrawer(els.ganttTaskDrawer);
  hideTaskDrawer(els.mainTaskDrawer);
  syncTaskDrawerShell(false);
}

function renderTodoDrawer() {
  const drawer = getActiveTaskDrawer();

  if (!selectedTodoTaskId) {
    syncTaskDrawerShell(drawer && !drawer.classList.contains("hidden"));
    return;
  }

  const task = getProjectTask(selectedTodoTaskId);
  if (!task) {
    closeTodoDrawer();
    return;
  }

  getInactiveTaskDrawers().forEach(hideTaskDrawer);
  drawer.classList.remove("hidden");
  drawer.setAttribute("aria-hidden", "false");
  drawer.innerHTML = drawerMode === "edit" ? renderTodoDrawerEdit(task) : renderTodoDrawerView(task);
  syncTaskDrawerShell(true);

  drawer.querySelector("[data-close-drawer]")?.addEventListener("click", closeTodoDrawer);
  drawer.querySelector("[data-drawer-edit]")?.addEventListener("click", () => {
    drawerMode = "edit";
    renderTodoDrawer();
  });
  drawer.querySelector("[data-drawer-view]")?.addEventListener("click", () => {
    drawerMode = "view";
    renderTodoDrawer();
  });
  drawer.querySelector("[data-drawer-complete]")?.addEventListener("click", () => {
    markTaskDone(task.id, task.status !== "done");
  });
  drawer.querySelector("[data-drawer-important]")?.addEventListener("click", () => toggleTaskImportant(task.id));
  drawer.querySelector("[data-add-step]")?.addEventListener("click", () => {
    const input = drawer.querySelector("[data-new-step-title]");
    addTaskStep(task.id, input?.value || "");
  });
  drawer.querySelector("[data-new-step-title]")?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    addTaskStep(task.id, event.currentTarget.value);
  });
  drawer.querySelectorAll("[data-toggle-step]").forEach((button) => {
    button.addEventListener("click", () => toggleTaskStep(task.id, button.dataset.toggleStep));
  });
  drawer.querySelectorAll("[data-remove-step]").forEach((button) => {
    button.addEventListener("click", () => removeTaskStep(task.id, button.dataset.removeStep));
  });
  const historyLinkInputs = drawer.querySelector("[data-history-link-inputs]");
  drawer.querySelector("[data-add-history-link]")?.addEventListener("click", () => {
    historyLinkInputs?.insertAdjacentHTML("beforeend", renderHistoryLinkInputRow());
  });
  historyLinkInputs?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-history-link-input]");
    if (!button) return;
    button.closest(".history-link-input-row")?.remove();
  });
  drawer.querySelector("[data-history-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    addTaskHistory(task.id, collectHistoryForm(event.currentTarget));
  });
  drawer.querySelectorAll("[data-remove-history]").forEach((button) => {
    button.addEventListener("click", () => removeTaskHistory(task.id, button.dataset.removeHistory));
  });
  drawer.querySelector("[data-task-notes]")?.addEventListener("change", (event) => {
    updateTaskNotes(task.id, event.currentTarget.value);
  });

  const form = drawer.querySelector("[data-drawer-form]");
  if (!form) return;

  const drawerFields = getDrawerDateFields(form);
  const updateDrawerDates = (autoCorrect = true) => updateTaskDateConstraints(drawerFields, autoCorrect);
  const syncDrawerCompletedDate = () => {
    const isDone = normalizeTaskStatus(form.elements.status.value) === "done";
    const field = form.querySelector("[data-drawer-completed-date-field]");
    field?.classList.toggle("hidden", !isDone);
    form.elements.completedDate.required = isDone;
    if (isDone && !form.elements.completedDate.value) form.elements.completedDate.value = todayString();
    if (!isDone) form.elements.completedDate.value = "";
  };

  form.elements.scope.addEventListener("change", () => syncDrawerScopeFields(form));
  form.elements.systemId.addEventListener("change", () => {
    form.elements.projectId.innerHTML = renderProjectOptionsForSystem(form.elements.systemId.value, "");
    syncDrawerScopeFields(form, false);
  });
  form.elements.status.addEventListener("change", syncDrawerCompletedDate);
  drawerFields.rangeStart.addEventListener("change", () => updateDrawerDates(true));
  drawerFields.rangeEnd.addEventListener("change", () => updateDrawerDates(true));
  drawerFields.executionDate.addEventListener("change", () => updateDrawerDates(false));
  drawerFields.deadline.addEventListener("change", () => updateDrawerDates(false));
  form.addEventListener("submit", handleDrawerTaskSubmit);
  syncDrawerScopeFields(form, false);
  syncDrawerCompletedDate();
  updateDrawerDates(false);
}

function renderTodoDrawerView(task) {
  const system = getSystem(task.systemId);
  const project = getProject(task.projectId);
  const emailList = task.relatedEmails?.length
    ? `<ul>${task.relatedEmails.map((title) => `<li>${escapeHtml(title)}</li>`).join("")}</ul>`
    : `<strong>無</strong>`;
  const linkList = task.relatedLinks?.length
    ? `<ul>${task.relatedLinks.map((link) => `<li><a href="${escapeHtml(link.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(link.title || link.url)}</a></li>`).join("")}</ul>`
    : `<strong>無</strong>`;
  const stepProgress = getTaskStepProgress(task);
  const tagList = task.tags?.length ? `<div class="tags">${renderTagButtons(task.tags)}</div>` : `<strong>無</strong>`;
  const stakeholders = task.stakeholders?.length ? task.stakeholders.join(", ") : "無";

  return `
    <div class="drawer-header">
      <div>
        <p class="eyebrow">${escapeHtml(getTaskContextLabel(task))}</p>
        <h2>${escapeHtml(task.title)}</h2>
      </div>
      <button class="drawer-close" type="button" data-close-drawer aria-label="關閉">×</button>
    </div>
    <div class="drawer-actions">
      <button class="primary-button" type="button" data-drawer-edit>編輯任務</button>
      <button class="secondary-button" type="button" data-drawer-complete>${task.status === "done" ? "取消完成" : "標示完成"}</button>
      <button class="secondary-button" type="button" data-drawer-important>${task.important ? "★ 重要" : "☆ 標記重要"}</button>
    </div>
    <section class="drawer-section">
      <span>任務內容</span>
      <strong>${escapeHtml(task.description || "沒有描述")}</strong>
    </section>
    <section class="drawer-section">
      <div class="drawer-section-heading">
        <span>細項步驟</span>
        <strong>${stepProgress.done} / ${stepProgress.total}</strong>
      </div>
      <div class="task-step-list">
        ${renderTaskSteps(task)}
      </div>
      <div class="task-inline-add">
        <input data-new-step-title maxlength="100" placeholder="下一個步驟" />
        <button type="button" data-add-step>新增</button>
      </div>
    </section>
    <section class="drawer-section">
      <span>狀態 / 優先級</span>
      <strong>${getStatusLabel(task.status)} / ${getPriorityLabel(task.priority)}</strong>
    </section>
    <section class="drawer-section">
      <span>執行日期</span>
      <strong>${formatDate(task.executionDate)}</strong>
      <span>最後期限</span>
      <strong>${formatDate(task.deadline)}</strong>
      <span>執行區間</span>
      <strong>${formatRange(task.rangeStart, task.rangeEnd)}</strong>
      <span>已完成日期</span>
      <strong>${task.completedDate ? formatDate(task.completedDate) : "未完成"}</strong>
    </section>
    <section class="drawer-section">
      <span>負責人</span>
      <strong>${escapeHtml(task.owner || "未指定")}</strong>
      <span>關係人</span>
      <strong>${escapeHtml(stakeholders)}</strong>
      <span>標籤</span>
      ${tagList}
    </section>
    <section class="drawer-section">
      <span>關聯信件</span>
      ${emailList}
    </section>
    <section class="drawer-section">
      <span>關聯連結</span>
      ${linkList}
    </section>
    <section class="drawer-section">
      <span>記事</span>
      <textarea class="task-notes-field" data-task-notes rows="5" placeholder="新增記事">${escapeHtml(task.notes || "")}</textarea>
    </section>
    <section class="drawer-section">
      <div class="drawer-section-heading">
        <span>歷程紀錄</span>
        <strong>${(task.history || []).length} 筆</strong>
      </div>
      <div class="task-history-list">
        ${renderTaskHistory(task)}
      </div>
      <form class="task-history-form" data-history-form>
        <label>
          日期
          <input name="date" type="date" value="${todayString()}" required />
        </label>
        <label>
          歷程描述
          <textarea name="description" rows="3" maxlength="500" placeholder="記錄這次處理內容" required></textarea>
        </label>
        <label>
          補充說明
          <textarea name="note" rows="2" maxlength="300" placeholder="可填信件主旨、背景或提醒"></textarea>
        </label>
        <div class="history-link-inputs" data-history-link-inputs>
          ${renderHistoryLinkInputRow()}
        </div>
        <div class="drawer-actions">
          <button class="secondary-button" type="button" data-add-history-link>新增連結</button>
          <button class="primary-button" type="submit">新增歷程</button>
        </div>
      </form>
    </section>
  `;
}

function renderTodoDrawerEdit(task) {
  return `
    <div class="drawer-header">
      <div>
        <p class="eyebrow">編輯任務</p>
        <h2>${escapeHtml(task.title)}</h2>
      </div>
      <button class="drawer-close" type="button" data-close-drawer aria-label="關閉">×</button>
    </div>
    <form class="drawer-edit-form" data-drawer-form>
      <div class="drawer-edit-grid">
        <label>
          任務歸屬
          <select name="scope" required>${renderTaskScopeOptions(getTaskScope(task))}</select>
        </label>
        <label data-drawer-system-field>
          系統
          <select name="systemId" required>${renderSystemOptions(task.systemId)}</select>
        </label>
        <label data-drawer-project-field>
          專案
          <select name="projectId" required>${renderProjectOptionsForSystem(task.systemId, task.projectId)}</select>
        </label>
      </div>
      <label>
        任務名稱
        <input name="title" required maxlength="80" value="${escapeHtml(task.title)}" />
      </label>
      <label>
        任務內容
        <textarea name="description" rows="3" maxlength="220">${escapeHtml(task.description || "")}</textarea>
      </label>
      <div class="drawer-edit-grid">
        <label>
          狀態
          <select name="status">
            ${renderStatusOptions(task.status)}
          </select>
        </label>
        <label>
          優先級
          <select name="priority">
            ${renderPriorityOptions(task.priority)}
          </select>
        </label>
      </div>
      <div class="drawer-edit-grid">
        <label>
          執行日期
          <input name="executionDate" type="date" required value="${task.executionDate}" />
        </label>
        <label>
          最後期限
          <input name="deadline" type="date" required value="${task.deadline}" />
        </label>
      </div>
      <div class="drawer-edit-grid">
        <label>
          執行區間開始
          <input name="rangeStart" type="date" required value="${task.rangeStart}" />
        </label>
        <label>
          執行區間結束
          <input name="rangeEnd" type="date" required value="${task.rangeEnd}" />
        </label>
      </div>
      <label data-drawer-completed-date-field class="${task.status === "done" ? "" : "hidden"}">
        已完成日期
        <input name="completedDate" type="date" value="${task.completedDate || ""}" />
      </label>
      <div class="drawer-edit-grid">
        <label>
          負責人
          <input name="owner" maxlength="30" value="${escapeHtml(task.owner || "")}" />
        </label>
        <label>
          標籤
          <input name="tags" value="${escapeHtml(task.tags?.join(", ") || "")}" placeholder="以逗號分隔" />
        </label>
      </div>
      <label>
        關係人
        <input name="stakeholders" maxlength="120" value="${escapeHtml(task.stakeholders?.join(", ") || "")}" placeholder="以逗號分隔" />
      </label>
      <label>
        關聯信件
        <textarea name="relatedEmails" rows="3" placeholder="一行一個信件標題">${escapeHtml((task.relatedEmails || []).join("\n"))}</textarea>
      </label>
      <label>
        關聯連結
        <textarea name="relatedLinks" rows="3" placeholder="一行一筆：標題 | https://example.com">${escapeHtml(formatLinksForTextarea(task.relatedLinks || []))}</textarea>
      </label>
      <div class="drawer-actions">
        <button class="primary-button" type="submit">儲存</button>
        <button class="secondary-button" type="button" data-drawer-view>返回查看</button>
      </div>
    </form>
  `;
}

function renderTaskSteps(task) {
  const steps = task.steps || [];
  if (!steps.length) return `<p class="drawer-empty">尚未新增步驟。</p>`;

  return steps
    .map((step) => `
      <div class="task-step-row ${step.completed ? "completed" : ""}">
        <button class="todo-check-button ${step.completed ? "completed" : ""}" type="button" data-toggle-step="${step.id}" title="${step.completed ? "取消完成步驟" : "完成步驟"}">✓</button>
        <span>${escapeHtml(step.title)}</span>
        <button class="drawer-remove-button" type="button" data-remove-step="${step.id}" aria-label="刪除步驟">×</button>
      </div>
    `)
    .join("");
}

function renderTaskHistory(task) {
  const history = task.history || [];
  if (!history.length) return `<p class="drawer-empty">尚未新增歷程紀錄。</p>`;

  return history
    .slice()
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .map((item) => {
      const links = item.links?.length
        ? `<ul>${item.links.map((link) => `<li><a href="${escapeHtml(link.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(link.name || link.url)}</a></li>`).join("")}</ul>`
        : "";

      return `
        <article class="task-history-card">
          <div class="task-history-card-header">
            <strong>${formatDate(item.date)}</strong>
            <button class="drawer-remove-button" type="button" data-remove-history="${item.id}" aria-label="刪除歷程">×</button>
          </div>
          <p>${escapeHtml(item.description)}</p>
          ${item.note ? `<small>${escapeHtml(item.note)}</small>` : ""}
          ${links}
        </article>
      `;
    })
    .join("");
}

function renderHistoryLinkInputRow(link = {}) {
  return `
    <div class="history-link-input-row">
      <input name="linkName" maxlength="100" placeholder="連結名稱" value="${escapeHtml(link.name || "")}" />
      <input name="linkUrl" type="url" placeholder="https://example.com" value="${escapeHtml(link.url || "")}" />
      <button class="drawer-remove-button" type="button" data-remove-history-link-input aria-label="移除歷程連結">×</button>
    </div>
  `;
}

function getTaskStepProgress(task) {
  const steps = task?.steps || [];
  return {
    total: steps.length,
    done: steps.filter((step) => step.completed).length,
  };
}

function canCompleteTask(task) {
  const steps = task?.steps || [];
  return !steps.length || steps.every((step) => step.completed);
}

function addTaskStep(taskId, title) {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) return;

  state.tasks = state.tasks.map((task) => {
    if (task.id !== taskId) return task;
    return {
      ...task,
      status: task.status === "done" ? "not_started" : task.status,
      completedDate: task.status === "done" ? "" : task.completedDate,
      steps: [...(task.steps || []), { id: createId(), title: trimmedTitle, completed: false }],
    };
  });
  saveState();
  render();
}

function toggleTaskStep(taskId, stepId) {
  let completedStep = false;
  state.tasks = state.tasks.map((task) => {
    if (task.id !== taskId) return task;
    const steps = (task.steps || []).map((step) => {
      if (step.id !== stepId) return step;
      completedStep = !step.completed;
      return { ...step, completed: !step.completed };
    });
    const allStepsDone = !steps.length || steps.every((step) => step.completed);
    return {
      ...task,
      steps,
      status: task.status === "done" && !allStepsDone ? "not_started" : task.status,
      completedDate: task.status === "done" && !allStepsDone ? "" : task.completedDate,
    };
  });
  saveState();
  if (completedStep) playCompletionSound();
  render();
}

function removeTaskStep(taskId, stepId) {
  state.tasks = state.tasks.map((task) => {
    if (task.id !== taskId) return task;
    return {
      ...task,
      steps: (task.steps || []).filter((step) => step.id !== stepId),
    };
  });
  saveState();
  render();
}

function updateTaskNotes(taskId, notes) {
  state.tasks = state.tasks.map((task) => {
    return task.id === taskId ? { ...task, notes: notes.trim() } : task;
  });
  saveState();
  render();
}

function collectHistoryForm(form) {
  return {
    date: form.elements.date.value || todayString(),
    description: form.elements.description.value.trim(),
    note: form.elements.note.value.trim(),
    links: [...form.querySelectorAll(".history-link-input-row")]
      .map((row) => ({
        name: row.querySelector('[name="linkName"]')?.value.trim() || "",
        url: row.querySelector('[name="linkUrl"]')?.value.trim() || "",
      }))
      .filter((link) => link.name || link.url),
  };
}

function addTaskHistory(taskId, entry) {
  const normalizedEntry = normalizeTaskHistory([{ ...entry, id: createId() }])[0];
  if (!normalizedEntry?.description) return;

  state.tasks = state.tasks.map((task) => {
    if (task.id !== taskId) return task;
    return {
      ...task,
      history: [normalizedEntry, ...(task.history || [])],
    };
  });
  saveState();
  render();
}

function removeTaskHistory(taskId, historyId) {
  state.tasks = state.tasks.map((task) => {
    if (task.id !== taskId) return task;
    return {
      ...task,
      history: (task.history || []).filter((item) => item.id !== historyId),
    };
  });
  saveState();
  render();
}

function getDrawerDateFields(form) {
  return {
    rangeStart: form.elements.rangeStart,
    rangeEnd: form.elements.rangeEnd,
    executionDate: form.elements.executionDate,
    deadline: form.elements.deadline,
  };
}

function handleDrawerTaskSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const fields = getDrawerDateFields(form);
  updateTaskDateConstraints(fields);

  const rangeStart = fields.rangeStart.value;
  const rangeEnd = fields.rangeEnd.value;
  const executionDate = fields.executionDate.value;
  const deadline = fields.deadline.value;

  if (!validateTaskDates(rangeStart, rangeEnd, executionDate, deadline)) return;

  const existingTask = getProjectTask(selectedTodoTaskId);
  if (!existingTask) return;
  const scopeValues = {
    scope: form.elements.scope.value,
    systemId: form.elements.scope.value === "general" ? "" : form.elements.systemId.value,
    projectId: form.elements.scope.value === "project" ? form.elements.projectId.value : "",
  };
  if (!validateTaskScopeValues(scopeValues)) return;

  const status = normalizeTaskStatus(form.elements.status.value);
  if (status === "done" && !canCompleteTask(existingTask)) {
    alert("請先完成所有細項步驟，才能將任務狀態改為已完成。");
    return;
  }

  const requestedCompletedDate = status === "done" ? form.elements.completedDate.value || todayString() : "";

  const updatedTask = applyTaskStatusSideEffects({
    ...existingTask,
    scope: scopeValues.scope,
    systemId: scopeValues.systemId,
    projectId: scopeValues.projectId,
    title: form.elements.title.value.trim() || "未命名任務",
    description: form.elements.description.value.trim(),
    status,
    priority: form.elements.priority.value,
    owner: form.elements.owner.value.trim(),
    rangeStart,
    rangeEnd,
    executionDate,
    deadline,
    tags: splitCommaList(form.elements.tags.value),
    stakeholders: splitCommaList(form.elements.stakeholders.value),
    relatedEmails: parseEmailTextarea(form.elements.relatedEmails.value),
    relatedLinks: parseLinkTextarea(form.elements.relatedLinks.value),
  }, existingTask, requestedCompletedDate);

  state.tasks = state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
  selectedSystemId = updatedTask.scope === "general" ? generalWorkScopeId : updatedTask.systemId;
  selectedProjectId = updatedTask.projectId || "all";
  drawerMode = "view";
  saveState();
  render();
}

function getDefaultTaskScope(defaults = {}) {
  if (defaults.scope) return defaults.scope;
  if (defaults.projectId || selectedProjectId !== "all") return "project";
  if (selectedScopeIsGeneral()) return "general";
  if (defaults.systemId || selectedSystemId) return "system";
  return state.projects.length ? "project" : "general";
}
function renderTaskScopeOptions(selectedScope = "project") {
  return taskScopeOptions
    .map((option) => `<option value="${option.id}" ${option.id === selectedScope ? "selected" : ""}>${option.label}</option>`)
    .join("");
}

function syncTaskScopeFields(fields, clearProject = true) {
  const scope = fields.scope?.value || "project";
  const isGeneral = scope === "general";
  const isProject = scope === "project";

  fields.systemField?.classList.toggle("hidden", isGeneral);
  fields.projectField?.classList.toggle("hidden", !isProject);
  fields.systemId.required = !isGeneral;
  fields.projectId.required = isProject;

  if (isGeneral) {
    fields.systemId.value = "";
    fields.projectId.value = "";
    return;
  }

  if (!fields.systemId.value && state.systems.length) {
    fields.systemId.value = selectedScopeIsGeneral() ? state.systems[0].id : selectedSystemId || state.systems[0].id;
  }

  if (isProject) {
    populateProjectSelectForField(fields.projectId, fields.systemId.value, clearProject ? "" : fields.projectId.value);
  } else {
    fields.projectId.value = "";
  }
}

function syncDrawerScopeFields(form, clearProject = true) {
  const scope = form.elements.scope.value;
  const isGeneral = scope === "general";
  const isProject = scope === "project";
  const systemField = form.querySelector("[data-drawer-system-field]");
  const projectField = form.querySelector("[data-drawer-project-field]");

  systemField?.classList.toggle("hidden", isGeneral);
  projectField?.classList.toggle("hidden", !isProject);
  form.elements.systemId.required = !isGeneral;
  form.elements.projectId.required = isProject;

  if (isGeneral) {
    form.elements.systemId.value = "";
    form.elements.projectId.value = "";
    return;
  }

  if (!form.elements.systemId.value && state.systems.length) {
    form.elements.systemId.value = state.systems[0].id;
  }

  if (isProject) {
    form.elements.projectId.innerHTML = renderProjectOptionsForSystem(form.elements.systemId.value, clearProject ? "" : form.elements.projectId.value);
  } else {
    form.elements.projectId.value = "";
  }
}

function populateProjectSelectForField(select, systemId, preferredProjectId = "") {
  const projects = state.projects.filter((project) => project.systemId === systemId);
  select.innerHTML = projects.length
    ? projects
        .map((project) => {
          const selected = project.id === preferredProjectId || (!preferredProjectId && project.id === projects[0].id);
          return `<option value="${project.id}" ${selected ? "selected" : ""}>${escapeHtml(project.name)}</option>`;
        })
        .join("")
    : `<option value="">請先新增此系統的專案</option>`;
}
function renderProjectOptionsForSystem(systemId, selectedProjectId = "") {
  const projects = state.projects.filter((project) => project.systemId === systemId);
  return projects.length
    ? projects
        .map((project) => `<option value="${project.id}" ${project.id === selectedProjectId ? "selected" : ""}>${escapeHtml(project.name)}</option>`)
        .join("")
    : `<option value="">請先新增此系統的專案</option>`;
}

function renderStatusOptions(selectedStatus = "not_started") {
  return taskColumns
    .map((column) => `<option value="${column.id}" ${column.id === selectedStatus ? "selected" : ""}>${column.title}</option>`)
    .join("");
}

function parseEmailTextarea(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseLinkTextarea(value) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, ...urlParts] = line.split("|");
      const url = urlParts.join("|").trim();
      return {
        title: title.trim(),
        url: url || title.trim(),
      };
    })
    .filter((link) => link.title || link.url);
}

function formatLinksForTextarea(links) {
  return links.map((link) => `${link.title || link.url}${link.url ? ` | ${link.url}` : ""}`).join("\n");
}

function showToast(message) {
  if (!els.toast) return;
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  toastTimer = window.setTimeout(() => {
    els.toast.classList.add("hidden");
  }, 2600);
}

function handleTodoQuickSubmit(event) {
  event.preventDefault();

  const scopeValues = getTaskScopeFormValues(todoAddFields);
  if (!validateTaskScopeValues(scopeValues)) return;
  const { scope, systemId, projectId } = scopeValues;

  if (todoAddFields.mode.value === "existing" && !todoAddFields.existingTaskId.value) {
    alert("請選擇一筆尚未完成的任務。");
    return;
  }

  updateTaskDateConstraints(todoAddFields);
  const rangeStart = todoAddFields.rangeStart.value;
  const rangeEnd = todoAddFields.rangeEnd.value;
  const executionDate = todoAddFields.executionDate.value;
  const deadline = todoAddFields.deadline.value;

  if (!validateTaskDates(rangeStart, rangeEnd, executionDate, deadline)) {
    return;
  }

  const existingTask = todoAddFields.mode.value === "existing" ? getProjectTask(todoAddFields.existingTaskId.value) : null;
  const status = normalizeTaskStatus(todoAddFields.status.value);
  if (status === "done" && !canCompleteTask(existingTask)) {
    alert("請先完成所有細項步驟，才能將任務狀態改為已完成。");
    return;
  }

  const requestedCompletedDate = status === "done" ? todoAddFields.completedDate.value || todayString() : "";

  const task = applyTaskStatusSideEffects({
    id: todoAddFields.mode.value === "existing" ? todoAddFields.existingTaskId.value : createId(),
    scope,
    systemId,
    projectId,
    title: todoAddFields.title.value.trim(),
    description: todoAddFields.description.value.trim(),
    status,
    priority: todoAddFields.priority.value,
    owner: todoAddFields.owner.value.trim(),
    rangeStart,
    rangeEnd,
    executionDate,
    deadline,
    tags: splitCommaList(todoAddFields.tags.value),
    stakeholders: splitCommaList(todoAddFields.stakeholders.value),
    relatedEmails: collectEmailRows(todoAddFields.relatedEmails),
    relatedLinks: collectLinkRows(todoAddFields.relatedLinks),
    important: existingTask?.important || false,
    steps: existingTask?.steps || [],
    files: existingTask?.files || [],
    notes: existingTask?.notes || "",
    history: existingTask?.history || [],
  }, existingTask, requestedCompletedDate);

  if (todoAddFields.mode.value === "existing" && existingTask) {
    state.tasks = state.tasks.map((item) => (item.id === existingTask.id ? task : item));
  } else {
    state.tasks = [task, ...state.tasks];
  }

  selectedSystemId = task.scope === "general" ? generalWorkScopeId : task.systemId;
  selectedProjectId = task.projectId || "all";
  saveState();
  resetTodoAddForm();
  render();
}

function openTodoAddDetails() {
  els.todoAddDetails.classList.remove("hidden");
  todoAddFields.title.focus();
}

function resetTodoAddForm(collapse = true) {
  els.todoQuickForm.reset();
  todoAddFields.mode.value = "new";
  const defaultScope = getDefaultTaskScope();
  const defaultSystemId = defaultScope === "general" ? "" : selectedSystemId || state.systems[0]?.id || "";
  todoAddFields.scope.value = defaultScope;
  todoAddFields.systemId.innerHTML = renderSystemOptions(defaultSystemId);
  populateTodoProjectSelect(todoAddFields.systemId.value, defaultScope === "project" ? selectedProjectId : "");
  todoAddFields.status.value = "not_started";
  todoAddFields.priority.value = "medium";
  const date = getDefaultTodoDateForView(activeTodoView);
  todoAddFields.rangeStart.value = date;
  todoAddFields.rangeEnd.value = date;
  todoAddFields.executionDate.value = date;
  todoAddFields.deadline.value = date;
  todoAddFields.completedDate.value = "";
  todoAddFields.stakeholders.value = "";
  renderEmailRows(todoAddFields.relatedEmails, []);
  renderLinkRows(todoAddFields.relatedLinks, []);
  syncTaskScopeFields(todoAddFields, false);
  syncTaskCompletedField(todoAddFields);
  updateTaskDateConstraints(todoAddFields);
  updateTodoAddMode();

  if (collapse) {
    els.todoAddDetails.classList.add("hidden");
  } else {
    els.todoAddDetails.classList.remove("hidden");
  }
}

function updateTodoAddMode() {
  const useExistingTask = todoAddFields.mode.value === "existing";
  todoAddFields.existingTaskField.classList.toggle("hidden", !useExistingTask);
  todoAddFields.existingTaskId.required = useExistingTask;

  if (useExistingTask) {
    populateTodoExistingTaskSelect();
    fillTodoAddFromExistingTask();
  } else {
    todoAddFields.existingTaskId.value = "";
  }
}

function populateTodoProjectSelect(systemId, preferredProjectId = "") {
  const projects = state.projects.filter((project) => project.systemId === systemId);
  todoAddFields.projectId.innerHTML = projects.length
    ? projects
        .map((project) => {
          const selected = project.id === preferredProjectId || (!preferredProjectId && project.id === projects[0].id);
          return `<option value="${project.id}" ${selected ? "selected" : ""}>${escapeHtml(project.name)}</option>`;
        })
        .join("")
    : `<option value="">請先新增此系統的專案</option>`;
}

function populateTodoExistingTaskSelect(preferredTaskId = "") {
  const scopeValues = getTaskScopeFormValues(todoAddFields);
  const tasks = state.tasks.filter((task) => {
    if (task.status === "done") return false;
    if (scopeValues.scope === "general") return getTaskScope(task) === "general";
    if (scopeValues.scope === "system") return getTaskScope(task) === "system" && task.systemId === scopeValues.systemId;
    return getTaskScope(task) === "project" && task.systemId === scopeValues.systemId && task.projectId === scopeValues.projectId;
  });

  todoAddFields.existingTaskId.innerHTML = tasks.length
    ? tasks
        .map((task) => {
          const selected = task.id === preferredTaskId || (!preferredTaskId && task.id === tasks[0].id);
          return `<option value="${task.id}" ${selected ? "selected" : ""}>${escapeHtml(task.title)}</option>`;
        })
        .join("")
    : `<option value="">此範圍目前沒有未完成任務</option>`;
}

function fillTodoAddFromExistingTask() {
  const task = getProjectTask(todoAddFields.existingTaskId.value);
  if (!task) return;

  todoAddFields.scope.value = getTaskScope(task);
  todoAddFields.systemId.innerHTML = renderSystemOptions(task.systemId || state.systems[0]?.id || "");
  populateTodoProjectSelect(todoAddFields.systemId.value, task.projectId || "");
  syncTaskScopeFields(todoAddFields, false);
  todoAddFields.title.value = task.title || "";
  todoAddFields.description.value = task.description || "";
  todoAddFields.status.value = normalizeTaskStatus(task.status);
  todoAddFields.priority.value = task.priority || "medium";
  todoAddFields.owner.value = task.owner || "";
  todoAddFields.rangeStart.value = task.rangeStart || task.startDate || getDefaultTodoDateForView(activeTodoView);
  todoAddFields.rangeEnd.value = task.rangeEnd || task.endDate || todoAddFields.rangeStart.value;
  todoAddFields.executionDate.value = task.executionDate || task.startDate || todoAddFields.rangeStart.value;
  todoAddFields.deadline.value = task.deadline || todoAddFields.rangeEnd.value;
  todoAddFields.completedDate.value = task.completedDate || "";
  todoAddFields.tags.value = Array.isArray(task.tags) ? task.tags.join(", ") : "";
  todoAddFields.stakeholders.value = Array.isArray(task.stakeholders) ? task.stakeholders.join(", ") : "";
  renderEmailRows(todoAddFields.relatedEmails, task.relatedEmails || []);
  renderLinkRows(todoAddFields.relatedLinks, task.relatedLinks || []);
  syncTaskCompletedField(todoAddFields);
  updateTaskDateConstraints(todoAddFields);
}

function getQuickTaskProject() {
  if (selectedProjectId !== "all") return getProject(selectedProjectId);
  const scopedProjects = getScopedProjects(true);
  return scopedProjects[0] || state.projects[0] || null;
}

function getProjectTask(taskId) {
  return state.tasks.find((task) => task.id === taskId);
}

function getTodoPageSubtitle(viewId) {
  if (viewId === "today") return formatFullDate(todayString());
  if (viewId === "tomorrow") return formatFullDate(getDateOffset(1));
  if (viewId === "thisWeek") {
    const range = getWeekRange(0);
    return `${formatDate(range.start)} - ${formatDate(range.end)}`;
  }
  if (viewId === "nextWeek") {
    const range = getWeekRange(1);
    return `${formatDate(range.start)} - ${formatDate(range.end)}`;
  }
  return "所有尚未完成的工作";
}

function getDefaultTodoDateForView(viewId) {
  if (viewId === "tomorrow") return getDateOffset(1);
  if (viewId === "nextWeek") return getWeekRange(1).start;
  return todayString();
}

function renderProjects() {
  const projects = getScopedProjects(true);
  const systems = selectedScopeIsGeneral()
    ? []
    : selectedSystemId
      ? state.systems.filter((system) => system.id === selectedSystemId)
      : state.systems;

  els.projectList.classList.add("project-group-list");

  if (selectedScopeIsGeneral()) {
    els.projectList.innerHTML = `<p class="empty-state">一般工作不需要專案。可直接在上方新增一般任務，或在待辦工作台切到一般工作新增待辦。</p>`;
    return;
  }

  if (!systems.length) {
    els.projectList.innerHTML = `<p class="empty-state">目前沒有符合條件的專案，請新增專案或調整篩選。</p>`;
    return;
  }

  els.projectList.innerHTML = systems.map((system) => {
    const systemProjects = projects.filter((project) => project.systemId === system.id);
    const projectCards = systemProjects.length
      ? systemProjects.map(renderProjectCard).join("")
      : `<p class="empty-state">這個系統目前沒有符合條件的專案。</p>`;

    return `
      <section class="project-system-group">
        <div class="project-system-group-header">
          <div>
            <h3>${escapeHtml(system.name)}</h3>
            <p>${escapeHtml(system.description || "未設定描述")}</p>
          </div>
          <button class="secondary-button" type="button" data-add-project-for-system="${system.id}">新增專案</button>
        </div>
        <div class="project-system-projects">
          ${projectCards}
        </div>
      </section>
    `;
  }).join("");

  els.projectList.querySelectorAll("[data-add-project-for-system]").forEach((button) => {
    button.addEventListener("click", () => {
      openProjectDialog(null, { systemId: button.dataset.addProjectForSystem });
    });
  });

  els.projectList.querySelectorAll("[data-project-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      openProjectDialog(getProject(button.dataset.projectEdit));
    });
  });

  els.projectList.querySelectorAll("[data-project-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = getProject(button.dataset.projectFilter);
      selectedTagFilter = "";
      selectedSystemId = project.systemId;
      selectedProjectId = project.id;
      render();
    });
  });

  els.projectList.querySelectorAll("[data-project-add-task]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = getProject(button.dataset.projectAddTask);
      if (!project) return;
      openTaskDialog(null, { systemId: project.systemId, projectId: project.id });
    });
  });

  els.projectList.querySelectorAll("[data-project-close]").forEach((button) => {
    button.addEventListener("click", () => toggleProjectClosed(button.dataset.projectClose));
  });

  els.projectList.querySelectorAll("[data-project-phase]").forEach((select) => {
    select.addEventListener("change", () => {
      const project = getProject(select.dataset.projectPhase);
      project.phase = select.value;
      project.phaseChangedAt = todayString();
      project.closed = select.value === "closed";
      project.closedAt = project.closed ? todayString() : "";
      project.phaseSchedules = createPhaseSchedules(project.phaseSchedules);
      if (project.closed) {
        project.phaseSchedules.closed.start ||= todayString();
        project.phaseSchedules.closed.end ||= todayString();
      }
      const plannedRange = getProjectScheduleRange(project.plannedStart, project.plannedEnd, project.phaseSchedules);
      project.plannedStart = plannedRange.start;
      project.plannedEnd = plannedRange.end;
      saveState();
      render();
    });
  });
}

function renderProjectCard(project) {
  const system = getSystem(project.systemId);
  const isDevelopmentProject = project.category !== "general";
  const actualRange = getProjectActualRange(project.id);
  const plannedRange = isDevelopmentProject ? getProjectPlannedRange(project) : "";
  const currentPhaseSchedule = project.phaseSchedules?.[project.phase] || {};
  const taskCount = state.tasks.filter((task) => task.projectId === project.id).length;
  const relatedSummary = getProjectRelatedSummary(project);
  const closed = isDevelopmentProject && (project.closed || project.phase === "closed");
  const delayed = isProjectDelayed(project);
  const requirement = isDevelopmentProject && project.requirementRequest
    ? `<div><strong>資訊需求單</strong> ${escapeHtml(project.requirementRequest)}</div>`
    : "";
  const phaseControl = isDevelopmentProject
    ? `
      <select class="phase-select" data-project-phase="${project.id}" aria-label="專案階段">
        ${renderPhaseOptions(project.phase)}
      </select>
    `
    : "";
  const scheduleDetails = isDevelopmentProject
    ? `
      <details class="phase-timeline-details">
        <summary>查看全部階段時程</summary>
        <div class="phase-timeline">
          ${renderProjectPhaseTimeline(project)}
        </div>
      </details>
    `
    : "";
  const dateRows = isDevelopmentProject
    ? `
        <div><strong>目前階段</strong> ${getPhaseLabel(project.phase)}・${formatRange(currentPhaseSchedule.start, currentPhaseSchedule.end)}</div>
        <div><strong>狀態日期</strong> ${formatDate(project.phaseChangedAt)}</div>
        <div><strong>專案時程</strong> ${plannedRange || "尚未設定"}</div>
        ${requirement}
        <div><strong>實際</strong> ${actualRange || "尚無任務日期"}</div>
        <div><strong>任務</strong> ${taskCount} 筆</div>
      `
    : `
        <div><strong>分類</strong> ${getProjectCategoryLabel(project.category)}</div>
        <div><strong>實際</strong> ${actualRange || "尚無任務日期"}</div>
        <div><strong>任務</strong> ${taskCount} 筆</div>
      `;

  return `
    <article class="project-card ${closed ? "closed" : ""}">
      <div class="project-card-header">
        <div>
          <h3>${escapeHtml(project.name)}</h3>
          <div class="project-system">${escapeHtml(system?.name || "未指定系統")}・${getProjectCategoryLabel(project.category)}</div>
        </div>
        <span class="status-badge ${closed ? "closed" : ""}">${isDevelopmentProject ? (closed ? "已結案" : "進行中") : "一般"}</span>
      </div>

      <p class="project-description">${escapeHtml(project.description || "沒有描述")}</p>

      ${phaseControl}
      ${delayed ? `<div class="delay-alert">delay 須調整時程或加強追蹤</div>` : ""}

      <div class="project-dates">
        ${dateRows}
      </div>

      ${relatedSummary ? `<div class="related-summary">${relatedSummary}</div>` : ""}

      ${scheduleDetails}

      <div class="project-card-actions">
        <button class="chip-button" type="button" data-project-filter="${project.id}">查看任務</button>
        <button class="chip-button" type="button" data-project-add-task="${project.id}">新增任務</button>
        <button class="chip-button" type="button" data-project-edit="${project.id}">設定</button>
        ${isDevelopmentProject ? `<button class="chip-button" type="button" data-project-close="${project.id}">${closed ? "重開" : "結案"}</button>` : ""}
      </div>
    </article>
  `;
}

function renderProjectTabs() {
  if (selectedScopeIsGeneral()) {
    selectedProjectId = "all";
    els.projectTabs.innerHTML = "";
    return;
  }

  const projects = getScopedProjects(true);
  const allActive = selectedProjectId === "all";

  if (selectedProjectId !== "all" && !projects.some((project) => project.id === selectedProjectId)) {
    selectedProjectId = "all";
  }

  els.projectTabs.innerHTML = [
    `<button class="chip-button ${allActive ? "active" : ""}" type="button" data-project-tab="all">全部專案</button>`,
    ...projects.map((project) => {
      return `<button class="chip-button ${selectedProjectId === project.id ? "active" : ""}" type="button" data-project-tab="${project.id}">${escapeHtml(project.name)}</button>`;
    }),
  ].join("");

  els.projectTabs.querySelectorAll("[data-project-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedTagFilter = "";
      selectedProjectId = button.dataset.projectTab;
      render();
    });
  });
}

function renderTagFilterBar() {
  if (!selectedTagFilter) {
    els.tagFilterBar.classList.add("hidden");
    els.tagFilterBar.innerHTML = "";
    return;
  }

  els.tagFilterBar.classList.remove("hidden");
  els.tagFilterBar.innerHTML = `
    <span>標籤篩選：${escapeHtml(selectedTagFilter)}</span>
    <button class="chip-button" type="button" data-clear-tag-filter>清除篩選</button>
  `;
}

function handleTagFilterClick(event) {
  const tagButton = event.target.closest("[data-tag-filter]");
  if (tagButton) {
    event.preventDefault();
    event.stopPropagation();
    applyTagFilter(tagButton.dataset.tagFilter);
    return;
  }

  if (event.target.closest("[data-clear-tag-filter]")) {
    event.preventDefault();
    selectedTagFilter = "";
    render();
  }
}

function applyTagFilter(tag) {
  const normalizedTag = (tag || "").trim();
  if (!normalizedTag) return;
  selectedTagFilter = normalizedTag;
  selectedSystemId = null;
  selectedProjectId = "all";
  els.phaseFilter.value = "all";
  els.searchInput.value = "";
  closeTodoDrawer();
  render();
}

function renderTagButtons(tags = []) {
  if (!tags.length) return "";
  return tags
    .map((tag) => `<button class="tag tag-button" type="button" data-tag-filter="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`)
    .join("");
}

function renderBoard() {
  const tasks = getVisibleTasks();
  const scopeProject = getProject(selectedProjectId);
  const scopeSystem = getSystem(selectedSystemId);

  els.taskScopeLabel.textContent = selectedTagFilter
    ? `目前顯示標籤「${selectedTagFilter}」的全部任務。`
    : selectedScopeIsGeneral()
    ? "目前顯示一般工作任務。"
    : scopeProject
      ? `目前顯示「${scopeProject.name}」的任務。`
      : scopeSystem
        ? `目前顯示「${scopeSystem.name}」的系統與專案任務。`
        : "目前顯示全部系統與一般工作的任務。";

  els.board.innerHTML = taskColumns
    .map((column) => renderTaskColumn(column, tasks))
    .join("");

  els.board.querySelectorAll(".task-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button, a")) return;
      openTodoDrawer(card.dataset.taskId, "view");
    });
    card.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (event.target.closest("button, a")) return;
      event.preventDefault();
      openTodoDrawer(card.dataset.taskId, "view");
    });
    card.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", card.dataset.taskId);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  });

  els.board.querySelectorAll("[data-task-drop-status]").forEach((list) => {
    list.addEventListener("dragover", (event) => {
      event.preventDefault();
      list.classList.add("drag-over");
      event.dataTransfer.dropEffect = "move";
    });
    list.addEventListener("dragleave", () => {
      list.classList.remove("drag-over");
    });
    list.addEventListener("drop", (event) => {
      event.preventDefault();
      list.classList.remove("drag-over");
      updateTaskStatusFromBoard(event.dataTransfer.getData("text/plain"), list.dataset.taskDropStatus);
    });
  });
}

function renderTaskColumn(column, tasks) {
  const columnTasks = tasks.filter((task) => task.status === column.id);
  const cards = columnTasks.length
    ? columnTasks.map(renderTaskCard).join("")
    : `<p class="empty-state">目前沒有任務</p>`;

  return `
    <section class="column" data-column-status="${column.id}">
      <div class="column-header">
        <h2>${column.title}</h2>
        <span class="count">${columnTasks.length}</span>
      </div>
      <div class="task-list" data-task-drop-status="${column.id}">${cards}</div>
    </section>
  `;
}

function renderTaskCard(task) {
  const system = getSystem(task.systemId);
  const project = getProject(task.projectId);
  const priorityText = getPriorityLabel(task.priority);
  const tags = renderTagButtons(task.tags || []);
  const relatedSummary = getRelatedSummary(task);
  const stakeholders = task.stakeholders?.length ? `<div class="task-stakeholders">關係人：${escapeHtml(task.stakeholders.join(", "))}</div>` : "";
  const completedDate = task.status === "done" ? `<div class="task-completed-date">已完成日期：${formatDate(task.completedDate)}</div>` : "";

  return `
    <article class="task-card priority-${task.priority}" data-task-id="${task.id}" draggable="true" tabindex="0">
      <div class="task-path">${escapeHtml(getTaskContextLabel(task))}</div>
      <h3>${escapeHtml(task.title)}</h3>
      <p>${escapeHtml(task.description || "沒有描述")}</p>
      <div class="task-date-line">${getTaskDateLine(task)}</div>
      ${completedDate}
      ${relatedSummary ? `<div class="related-summary">${relatedSummary}</div>` : ""}
      ${stakeholders}
      <div class="task-meta">
        <span>${escapeHtml(task.owner)}</span>
        <span>優先級：${priorityText}</span>
      </div>
      <div class="tags">${tags}</div>
    </article>
  `;
}

function updateTaskStatusFromBoard(taskId, status) {
  const task = getProjectTask(taskId);
  if (!task) return;
  const nextStatus = normalizeTaskStatus(status);
  if (task.status === nextStatus) return;
  if (nextStatus === "done" && !canCompleteTask(task)) {
    alert("請先完成所有細項步驟，才能將任務狀態改為已完成。");
    return;
  }

  state.tasks = state.tasks.map((item) => {
    if (item.id !== taskId) return item;
    return applyTaskStatusSideEffects({ ...item, status: nextStatus }, item, nextStatus === "done" ? todayString() : "");
  });

  saveState();
  if (nextStatus === "done") {
    playCompletionSound();
    showToast(`已完成：${task.title}`);
  }
  render();
}

function getScopedProjects(applyPhaseFilter = false) {
  const phase = els.phaseFilter.value;
  const query = els.searchInput.value.trim().toLowerCase();
  return state.projects.filter((project) => {
    const system = getSystem(project.systemId);
    const matchSystem = selectedScopeIsGeneral() ? false : selectedSystemId ? project.systemId === selectedSystemId : true;
    const matchPhase = !applyPhaseFilter || project.category === "general" || phase === "all" || project.phase === phase;
    const matchQuery = projectMatchesSearch(project, system, query);
    return matchSystem && matchPhase && matchQuery;
  });
}

function projectMatchesSearch(project, system, query) {
  if (!query) return true;

  const haystack = [
    project.name,
    project.description,
    getProjectCategoryLabel(project.category),
    project.requirementRequest,
    project.phaseChangedAt,
    (project.relatedEmails || []).join(" "),
    (project.relatedLinks || []).map((link) => `${link.title} ${link.url}`).join(" "),
    system?.name,
    getPhaseLabel(project.phase),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function getVisibleTasks(options = {}) {
  const query = els.searchInput.value.trim().toLowerCase();
  const phase = els.phaseFilter.value;
  const projectId = options.projectId ?? selectedProjectId;
  const tagFilter = options.tag ?? selectedTagFilter;
  const normalizedTagFilter = tagFilter.trim().toLowerCase();
  const phaseProjectIds = state.projects
    .filter((project) => project.category === "general" || phase === "all" || project.phase === phase)
    .map((project) => project.id);

  return state.tasks.filter((task) => {
    const system = getSystem(task.systemId);
    const project = getProject(task.projectId);
    const matchSystem = taskMatchesSystemScope(task);
    const matchProject = taskMatchesProjectScope(task, projectId);
    const matchPhase = taskMatchesPhaseScope(task, phaseProjectIds, phase);
    const matchTag = !normalizedTagFilter || (task.tags || []).some((tag) => tag.toLowerCase() === normalizedTagFilter);
    const haystack = [
      task.title,
      task.description,
      task.owner,
      (task.stakeholders || []).join(" "),
      task.priority,
      task.status,
      task.completedDate,
      getTaskScopeLabel(getTaskScope(task)),
      getTaskContextLabel(task),
      task.tags.join(" "),
      task.notes,
      (task.steps || []).map((step) => step.title).join(" "),
      (task.files || []).map((file) => file.name).join(" "),
      (task.history || []).map((item) => `${item.date} ${item.description} ${item.note} ${(item.links || []).map((link) => `${link.name} ${link.url}`).join(" ")}`).join(" "),
      (task.relatedEmails || []).join(" "),
      (task.relatedLinks || []).map((link) => `${link.title} ${link.url}`).join(" "),
      system?.name,
      project?.name,
      project?.description,
      getProjectCategoryLabel(project?.category),
      project?.requirementRequest,
      project?.phaseChangedAt,
      (project?.relatedEmails || []).join(" "),
      (project?.relatedLinks || []).map((link) => `${link.title} ${link.url}`).join(" "),
      getPhaseLabel(project?.phase),
    ]
      .join(" ")
      .toLowerCase();

    return matchSystem && matchProject && matchPhase && matchTag && haystack.includes(query);
  });
}

function openSystemDialog() {
  els.systemForm.reset();
  systemFields.id.value = "";
  els.systemDialog.showModal();
}

function handleSystemSubmit(event) {
  event.preventDefault();

  const system = {
    id: systemFields.id.value || createId(),
    name: systemFields.name.value.trim(),
    description: systemFields.description.value.trim(),
  };

  state.systems = [system, ...state.systems];
  selectedSystemId = system.id;
  selectedProjectId = "all";
  saveState();
  els.systemDialog.close();
  render();
}

function openProjectDialog(project = null, defaults = {}) {
  if (!state.systems.length) {
    openSystemDialog();
    return;
  }

  const defaultSystemId = project?.systemId || defaults.systemId || (selectedScopeIsGeneral() ? "" : selectedSystemId) || state.systems[0].id;
  document.querySelector("#projectDialogTitle").textContent = project ? "設定專案" : "新增專案";
  els.projectForm.reset();
  projectFields.id.value = project?.id || "";
  projectFields.systemId.innerHTML = renderSystemOptions(defaultSystemId);
  projectFields.category.value = normalizeProjectCategory(project?.category);
  projectFields.name.value = project?.name || "";
  projectFields.description.value = project?.description || "";
  projectFields.phase.value = project?.phase || "deal";
  projectFields.phaseChangedAt.value = project?.phaseChangedAt || todayString();
  projectFields.requirementRequest.value = project?.requirementRequest || "";
  projectFields.plannedStart.value = project?.plannedStart || "";
  projectFields.plannedEnd.value = project?.plannedEnd || "";
  projectFields.phaseSchedules.innerHTML = renderPhaseScheduleFields(project?.phaseSchedules || createPhaseSchedules());
  renderEmailRows(projectFields.relatedEmails, project?.relatedEmails || []);
  renderLinkRows(projectFields.relatedLinks, project?.relatedLinks || []);
  attachProjectScheduleHandlers();
  syncProjectCategoryFields();
  updateProjectScheduleConstraints();
  els.projectDialog.showModal();
}

function handleProjectSubmit(event) {
  event.preventDefault();

  updateProjectScheduleConstraints();
  const category = normalizeProjectCategory(projectFields.category.value);
  const isDevelopmentProject = category === "development";
  const phaseSchedules = isDevelopmentProject ? collectPhaseSchedules() : createPhaseSchedules();
  const invalidPhase = isDevelopmentProject
    ? phases.find((phase) => {
        const schedule = phaseSchedules[phase.id];
        return schedule.start && schedule.end && schedule.end < schedule.start;
      })
    : null;

  if (invalidPhase) {
    alert(`${invalidPhase.label} 階段的結束時間不能早於開始時間。`);
    return;
  }

  const plannedRange = isDevelopmentProject
    ? getProjectScheduleRange(projectFields.plannedStart.value, projectFields.plannedEnd.value, phaseSchedules)
    : { start: "", end: "" };
  const previousProject = getProject(projectFields.id.value);
  const phase = isDevelopmentProject ? projectFields.phase.value : "deal";
  const isClosed = isDevelopmentProject && phase === "closed";

  const project = {
    id: projectFields.id.value || createId(),
    systemId: projectFields.systemId.value,
    category,
    name: projectFields.name.value.trim(),
    description: projectFields.description.value.trim(),
    phase,
    phaseChangedAt: isDevelopmentProject ? projectFields.phaseChangedAt.value || todayString() : "",
    requirementRequest: isDevelopmentProject ? projectFields.requirementRequest.value.trim() : "",
    plannedStart: plannedRange.start,
    plannedEnd: plannedRange.end,
    phaseSchedules,
    relatedEmails: collectEmailRows(projectFields.relatedEmails),
    relatedLinks: collectLinkRows(projectFields.relatedLinks),
    closed: isClosed,
    closedAt: isClosed ? previousProject?.closedAt || todayString() : "",
  };

  if (previousProject) {
    state.projects = state.projects.map((item) => (item.id === project.id ? project : item));
    state.tasks = state.tasks.map((task) => {
      return task.projectId === project.id ? { ...task, systemId: project.systemId } : task;
    });
  } else {
    state.projects = [project, ...state.projects];
  }

  selectedSystemId = project.systemId;
  selectedProjectId = project.id;
  saveState();
  els.projectDialog.close();
  render();
}

function syncProjectCategoryFields() {
  const isDevelopmentProject = normalizeProjectCategory(projectFields.category.value) === "development";
  projectFields.phaseFields.classList.toggle("hidden", !isDevelopmentProject);
  projectFields.requirementField.classList.toggle("hidden", !isDevelopmentProject);
  projectFields.scheduleSection.classList.toggle("hidden", !isDevelopmentProject);
  projectFields.phaseScheduleSection.classList.toggle("hidden", !isDevelopmentProject);
  projectFields.phase.required = isDevelopmentProject;
  projectFields.phaseChangedAt.required = isDevelopmentProject;
}

function attachProjectScheduleHandlers() {
  projectFields.phaseSchedules.querySelectorAll("[data-phase-start], [data-phase-end]").forEach((input) => {
    input.addEventListener("change", updateProjectScheduleConstraints);
  });
}

function updateProjectScheduleConstraints() {
  projectFields.phaseSchedules.querySelectorAll("[data-phase-row]").forEach((row) => {
    const startInput = row.querySelector("[data-phase-start]");
    const endInput = row.querySelector("[data-phase-end]");

    if (startInput.value) {
      endInput.min = startInput.value;
    } else {
      endInput.removeAttribute("min");
    }

    if (startInput.value && endInput.value && endInput.value < startInput.value) {
      endInput.value = startInput.value;
    }
  });

  if (projectFields.plannedStart.value && projectFields.plannedEnd.value && projectFields.plannedEnd.value < projectFields.plannedStart.value) {
    projectFields.plannedEnd.value = projectFields.plannedStart.value;
  }

  const phaseSchedules = collectPhaseSchedules();
  const phaseRange = getPhaseSchedulesRange(phaseSchedules);
  const projectRange = getProjectScheduleRange(projectFields.plannedStart.value, projectFields.plannedEnd.value, phaseSchedules);

  projectFields.plannedStart.value = projectRange.start;
  projectFields.plannedEnd.value = projectRange.end;

  const startMaxCandidates = [projectRange.end, phaseRange.start].filter(Boolean).sort();
  const endMinCandidates = [projectRange.start, phaseRange.end].filter(Boolean).sort();

  if (startMaxCandidates.length) {
    projectFields.plannedStart.max = startMaxCandidates[0];
  } else {
    projectFields.plannedStart.removeAttribute("max");
  }

  if (endMinCandidates.length) {
    projectFields.plannedEnd.min = endMinCandidates[endMinCandidates.length - 1];
  } else {
    projectFields.plannedEnd.removeAttribute("min");
  }
}

function openTaskDialog(task = null, defaults = {}) {
  document.querySelector("#taskDialogTitle").textContent = task ? "編輯任務" : "新增任務";
  els.taskForm.reset();
  els.deleteTaskButton.hidden = !task;

  const defaultScope = task ? getTaskScope(task) : getDefaultTaskScope(defaults);
  const defaultSystemId = defaultScope === "general" ? "" : task?.systemId || defaults.systemId || (selectedScopeIsGeneral() ? "" : selectedSystemId) || state.systems[0]?.id || "";
  const defaultProjectId = defaultScope === "project" ? task?.projectId || defaults.projectId || (selectedProjectId === "all" ? "" : selectedProjectId) : "";
  taskFields.id.value = task?.id || "";
  taskFields.scope.value = defaultScope;
  taskFields.systemId.innerHTML = renderSystemOptions(defaultSystemId);
  populateTaskProjectSelect(defaultSystemId, defaultProjectId);
  taskFields.title.value = task?.title || "";
  taskFields.description.value = task?.description || "";
  taskFields.status.value = normalizeTaskStatus(task?.status);
  taskFields.priority.value = task?.priority || "medium";
  taskFields.rangeStart.value = task?.rangeStart || task?.startDate || todayString();
  taskFields.rangeEnd.value = task?.rangeEnd || task?.endDate || taskFields.rangeStart.value;
  taskFields.executionDate.value = task?.executionDate || task?.startDate || taskFields.rangeStart.value;
  taskFields.deadline.value = task?.deadline || taskFields.rangeEnd.value;
  taskFields.completedDate.value = task?.completedDate || "";
  taskFields.owner.value = task?.owner || "";
  taskFields.tags.value = task?.tags?.join(", ") || "";
  taskFields.stakeholders.value = task?.stakeholders?.join(", ") || "";
  renderEmailRows(taskFields.relatedEmails, task?.relatedEmails || []);
  renderLinkRows(taskFields.relatedLinks, task?.relatedLinks || []);

  syncTaskScopeFields(taskFields, false);
  syncTaskCompletedField(taskFields);
  updateTaskDateConstraints(taskFields);
  els.taskDialog.showModal();
}

function handleTaskSubmit(event) {
  event.preventDefault();

  const scopeValues = getTaskScopeFormValues(taskFields);
  if (!validateTaskScopeValues(scopeValues)) return;
  const { scope, systemId, projectId } = scopeValues;
  updateTaskDateConstraints(taskFields);
  const rangeStart = taskFields.rangeStart.value;
  const rangeEnd = taskFields.rangeEnd.value;
  const executionDate = taskFields.executionDate.value;
  const deadline = taskFields.deadline.value;


  if (!validateTaskDates(rangeStart, rangeEnd, executionDate, deadline)) {
    return;
  }

  const existingTask = taskFields.id.value ? getProjectTask(taskFields.id.value) : null;
  const status = normalizeTaskStatus(taskFields.status.value);
  if (status === "done" && !canCompleteTask(existingTask)) {
    alert("請先完成所有細項步驟，才能將任務狀態改為已完成。");
    return;
  }

  const requestedCompletedDate = status === "done" ? taskFields.completedDate.value || todayString() : "";

  const task = applyTaskStatusSideEffects({
    id: taskFields.id.value || createId(),
    scope,
    systemId,
    projectId,
    title: taskFields.title.value.trim(),
    description: taskFields.description.value.trim(),
    status,
    priority: taskFields.priority.value,
    owner: taskFields.owner.value.trim(),
    rangeStart,
    rangeEnd,
    executionDate,
    deadline,
    tags: splitCommaList(taskFields.tags.value),
    stakeholders: splitCommaList(taskFields.stakeholders.value),
    relatedEmails: collectEmailRows(taskFields.relatedEmails),
    relatedLinks: collectLinkRows(taskFields.relatedLinks),
    important: existingTask?.important || false,
    steps: existingTask?.steps || [],
    files: existingTask?.files || [],
    notes: existingTask?.notes || "",
    history: existingTask?.history || [],
  }, existingTask, requestedCompletedDate);

  state.tasks = taskFields.id.value
    ? state.tasks.map((item) => (item.id === task.id ? task : item))
    : [task, ...state.tasks];

  selectedSystemId = scope === "general" ? generalWorkScopeId : systemId;
  selectedProjectId = projectId || "all";
  saveState();
  els.taskDialog.close();
  render();
}

function handleTaskDelete() {
  const id = taskFields.id.value;
  if (!id) return;

  state.tasks = state.tasks.filter((task) => task.id !== id);
  saveState();
  els.taskDialog.close();
  render();
}

function toggleProjectClosed(projectId) {
  const project = getProject(projectId);
  if (!project) return;
  if (project.category === "general") return;

  const isClosed = project.closed || project.phase === "closed";
  project.closed = !isClosed;
  project.phase = isClosed ? "development" : "closed";
  project.phaseChangedAt = todayString();
  project.closedAt = project.closed ? todayString() : "";
  project.phaseSchedules = createPhaseSchedules(project.phaseSchedules);

  if (project.closed) {
    project.phaseSchedules.closed.start ||= todayString();
    project.phaseSchedules.closed.end = todayString();
  }

  const plannedRange = getProjectScheduleRange(project.plannedStart, project.plannedEnd, project.phaseSchedules);
  project.plannedStart = plannedRange.start;
  project.plannedEnd = plannedRange.end;
  saveState();
  render();
}

function populateTaskProjectSelect(systemId, preferredProjectId = "") {
  const projects = state.projects.filter((project) => project.systemId === systemId);
  taskFields.projectId.innerHTML = projects.length
    ? projects
        .map((project) => {
          const selected = project.id === preferredProjectId || (!preferredProjectId && project.id === projects[0].id);
          return `<option value="${project.id}" ${selected ? "selected" : ""}>${escapeHtml(project.name)}</option>`;
        })
        .join("")
    : `<option value="">請先新增此系統的專案</option>`;
}

function updateTaskDateConstraints(fields, autoCorrect = true) {
  if (!fields.rangeStart.value) fields.rangeStart.value = todayString();
  if (!fields.rangeEnd.value) fields.rangeEnd.value = fields.rangeStart.value;

  if (autoCorrect && fields.rangeEnd.value < fields.rangeStart.value) {
    fields.rangeEnd.value = fields.rangeStart.value;
  }

  fields.rangeEnd.min = fields.rangeStart.value;
  fields.executionDate.min = fields.rangeStart.value;
  fields.executionDate.max = fields.rangeEnd.value;
  fields.deadline.min = fields.rangeEnd.value;

  if (!fields.executionDate.value) {
    fields.executionDate.value = fields.rangeStart.value;
  }

  if (autoCorrect) {
    fields.executionDate.value = clampDate(fields.executionDate.value, fields.rangeStart.value, fields.rangeEnd.value);

    if (!fields.deadline.value || fields.deadline.value < fields.rangeEnd.value) {
      fields.deadline.value = fields.rangeEnd.value;
    }
  }
}

function validateTaskDates(rangeStart, rangeEnd, executionDate, deadline) {
  if (rangeEnd < rangeStart) {
    alert("執行區間結束不能早於開始。");
    return false;
  }

  if (executionDate < rangeStart || executionDate > rangeEnd) {
    alert("執行日期只能選擇執行區間內的日期。");
    return false;
  }

  if (deadline < rangeEnd) {
    alert("最後期限只能選擇執行區間結束日或之後的日期。");
    return false;
  }

  return true;
}

function addEmailRow(container, title = "") {
  container.insertAdjacentHTML("beforeend", renderEmailRow(title));
}

function addLinkRow(container, link = {}) {
  container.insertAdjacentHTML("beforeend", renderLinkRow(link));
}

function renderEmailRows(container, emails = []) {
  container.innerHTML = emails.length
    ? emails.map(renderEmailRow).join("")
    : renderEmailRow();
}

function renderLinkRows(container, links = []) {
  container.innerHTML = links.length
    ? links.map(renderLinkRow).join("")
    : renderLinkRow();
}

function renderEmailRow(title = "") {
  return `
    <div class="related-row email-row">
      <input data-related-email-title maxlength="120" placeholder="信件標題" value="${escapeHtml(title)}" />
      <button type="button" data-remove-related aria-label="移除關聯信件">×</button>
    </div>
  `;
}

function renderLinkRow(link = {}) {
  return `
    <div class="related-row">
      <input data-related-link-title maxlength="120" placeholder="連結標題" value="${escapeHtml(link.title || "")}" />
      <input data-related-link-url type="url" placeholder="https://example.com" value="${escapeHtml(link.url || "")}" />
      <button type="button" data-remove-related aria-label="移除關聯連結">×</button>
    </div>
  `;
}

function handleRelatedRowClick(event) {
  const button = event.target.closest("[data-remove-related]");
  if (!button) return;

  const list = button.closest(".related-list");
  const row = button.closest(".related-row");
  row.remove();

  if (!list.children.length) {
    if (list.id.toLowerCase().includes("email")) {
      addEmailRow(list);
    } else {
      addLinkRow(list);
    }
  }
}

function collectEmailRows(container) {
  return [...container.querySelectorAll("[data-related-email-title]")]
    .map((input) => input.value.trim())
    .filter(Boolean);
}

function collectLinkRows(container) {
  return [...container.querySelectorAll(".related-row")]
    .map((row) => ({
      title: row.querySelector("[data-related-link-title]")?.value.trim() || "",
      url: row.querySelector("[data-related-link-url]")?.value.trim() || "",
    }))
    .filter((link) => link.title || link.url);
}

function renderSystemOptions(selectedId) {
  return state.systems
    .map((system) => {
      return `<option value="${system.id}" ${system.id === selectedId ? "selected" : ""}>${escapeHtml(system.name)}</option>`;
    })
    .join("");
}

function renderPhaseScheduleFields(schedules) {
  const normalizedSchedules = createPhaseSchedules(schedules);
  return phases
    .map((phase) => {
      const schedule = normalizedSchedules[phase.id] || {};
      return `
        <div class="phase-schedule-row" data-phase-row="${phase.id}">
          <strong>${phase.label}</strong>
          <input type="date" value="${schedule.start || ""}" data-phase-start aria-label="${phase.label}開始" />
          <input type="date" value="${schedule.end || ""}" data-phase-end aria-label="${phase.label}結束" />
        </div>
      `;
    })
    .join("");
}

function collectPhaseSchedules() {
  const schedules = createPhaseSchedules();
  projectFields.phaseSchedules.querySelectorAll("[data-phase-row]").forEach((row) => {
    schedules[row.dataset.phaseRow] = {
      start: row.querySelector("[data-phase-start]").value,
      end: row.querySelector("[data-phase-end]").value,
    };
  });
  return schedules;
}

function renderPhaseOptions(selectedId) {
  return phases
    .map((phase) => {
      return `<option value="${phase.id}" ${phase.id === selectedId ? "selected" : ""}>${phase.label}</option>`;
    })
    .join("");
}

function renderProjectPhaseTimeline(project) {
  const schedules = project.phaseSchedules || createPhaseSchedules();
  return phases
    .map((phase) => {
      const schedule = schedules[phase.id] || {};
      return `
        <div class="phase-step ${project.phase === phase.id ? "active" : ""}">
          <strong>${phase.label}</strong>
          <span>${formatRange(schedule.start, schedule.end)}</span>
        </div>
      `;
    })
    .join("");
}

function getProjectActualRange(projectId) {
  const dates = state.tasks
    .filter((task) => task.projectId === projectId)
    .flatMap((task) => [task.rangeStart, task.rangeEnd, task.executionDate])
    .filter(Boolean)
    .sort();

  if (!dates.length) return "";
  return formatRange(dates[0], dates[dates.length - 1]);
}

function getTaskDateLine(task) {
  const range = `執行區間：${formatRange(task.rangeStart, task.rangeEnd)}`;
  const execution = `執行日期：${formatDate(task.executionDate)}`;
  const deadline = task.deadline ? `最後期限：${formatDate(task.deadline)}` : "最後期限：未設定";
  return `${range}・${execution}・${deadline}`;
}

function getRelatedSummary(task) {
  const emailCount = task.relatedEmails?.length || 0;
  const linkCount = task.relatedLinks?.length || 0;
  const parts = [];
  if (emailCount) parts.push(`關聯信件 ${emailCount}`);
  if (linkCount) parts.push(`關聯連結 ${linkCount}`);
  return parts.join("・");
}

function getProjectRelatedSummary(project) {
  const emailCount = project.relatedEmails?.length || 0;
  const linkCount = project.relatedLinks?.length || 0;
  const parts = [];
  if (emailCount) parts.push(`專案關聯信件 ${emailCount}`);
  if (linkCount) parts.push(`專案關聯連結 ${linkCount}`);
  return parts.join("・");
}

function getSystem(id) {
  return state.systems.find((system) => system.id === id);
}

function getProject(id) {
  return state.projects.find((project) => project.id === id);
}

function getPhaseLabel(id) {
  return phases.find((phase) => phase.id === id)?.label || "";
}

function getProjectCategoryLabel(id) {
  return projectCategories.find((category) => category.id === id)?.label || "開發";
}

function getStatusLabel(id) {
  return taskColumns.find((column) => column.id === id)?.title || "未開始";
}

function getPriorityLabel(id) {
  return { high: "高", medium: "中", low: "低" }[id] || "中";
}

function createPhaseSchedules(overrides = {}) {
  return phases.reduce((schedules, phase) => {
    const override = overrides[phase.id] || {};
    schedules[phase.id] = {
      start: override.start || "",
      end: override.end || "",
    };
    return schedules;
  }, {});
}

function getPhaseSchedulesRange(schedules = {}) {
  const dates = phases
    .flatMap((phase) => {
      const schedule = schedules[phase.id] || {};
      return [schedule.start, schedule.end];
    })
    .filter(Boolean)
    .sort();

  return {
    start: dates[0] || "",
    end: dates[dates.length - 1] || "",
  };
}

function getProjectScheduleRange(plannedStart = "", plannedEnd = "", schedules = {}) {
  let start = plannedStart || "";
  let end = plannedEnd || "";

  if (start && end && end < start) {
    end = start;
  }

  const phaseRange = getPhaseSchedulesRange(schedules);

  if (phaseRange.start && (!start || start > phaseRange.start)) {
    start = phaseRange.start;
  }

  if (phaseRange.end && (!end || end < phaseRange.end)) {
    end = phaseRange.end;
  }

  if (!start && end) {
    start = phaseRange.start || "";
  }

  return { start, end };
}

function getProjectPlannedRange(project) {
  const range = getProjectScheduleRange(project.plannedStart, project.plannedEnd, project.phaseSchedules || {});
  return formatRange(range.start, range.end);
}

function isProjectDelayed(project) {
  if (!project || project.category === "general" || project.closed || project.phase === "closed") return false;
  const schedule = project.phaseSchedules?.[project.phase];
  return Boolean(schedule?.end && schedule.end < todayString());
}

function clampDate(value, min, max) {
  if (!value) return min;
  if (min && value < min) return min;
  if (max && value > max) return max;
  return value;
}

function createId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function todayString() {
  return toDateInputValue(new Date());
}

function getDateOffset(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toDateInputValue(date);
}

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekRange(offsetWeeks = 0) {
  const start = new Date();
  const day = start.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + mondayOffset + offsetWeeks * 7);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    start: toDateInputValue(start),
    end: toDateInputValue(end),
  };
}

function compareTasksByUrgency(a, b) {
  return getTaskSortDate(a).localeCompare(getTaskSortDate(b));
}

function getTaskSortDate(task) {
  return [task.executionDate, task.deadline]
    .filter(Boolean)
    .sort()[0] || "9999-12-31";
}

function taskMatchesDate(task, targetDate) {
  return task.executionDate === targetDate;
}

function taskMatchesRange(task, rangeStart, rangeEnd) {
  return task.executionDate && task.executionDate >= rangeStart && task.executionDate <= rangeEnd;
}

function taskRangeIncludesDate(task, date) {
  if (!task.rangeStart || !task.rangeEnd || !date) return false;
  return task.rangeStart <= date && task.rangeEnd >= date;
}

function getDayDiff(start, end) {
  const dayMs = 24 * 60 * 60 * 1000;
  return Math.ceil((end - start) / dayMs);
}

function formatRange(start, end) {
  if (!start && !end) return "未設定";
  if (start && !end) return formatDate(start);
  if (!start && end) return formatDate(end);
  if (start === end) return formatDate(start);
  return `${formatDate(start)} - ${formatDate(end)}`;
}

function formatDate(dateString) {
  if (!dateString) return "未設定";
  return new Intl.DateTimeFormat("zh-TW", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
}

function formatFullDate(dateString) {
  if (!dateString) return "未設定";
  return new Intl.DateTimeFormat("zh-TW", {
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date(`${dateString}T00:00:00`));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[char];
  });
}
