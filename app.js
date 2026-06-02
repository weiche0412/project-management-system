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
  { id: "paused", title: "暫停" },
  { id: "done", title: "已完成" },
];

const projectStatusOptions = [
  { id: "not_started", label: "未開始" },
  { id: "doing", label: "進行中" },
  { id: "review", label: "待確認" },
  { id: "paused", label: "暫停" },
  { id: "done", label: "已完成" },
  { id: "closed", label: "已結案" },
];

const priorityOptions = [
  { id: "high", label: "高" },
  { id: "medium", label: "中" },
  { id: "low", label: "低" },
];

const scheduleStatusOptions = [
  { id: "all", label: "全部" },
  { id: "unset", label: "未設定" },
  { id: "not_started", label: "未開始" },
  { id: "doing", label: "進行中" },
  { id: "delay", label: "延遲" },
  { id: "overdue", label: "逾期" },
  { id: "this_week", label: "本週到期" },
  { id: "this_month", label: "本月到期" },
];

const dueStatusOptions = [
  { id: "all", label: "全部" },
  { id: "unset", label: "未設定" },
  { id: "today", label: "今日到期" },
  { id: "this_week", label: "本週到期" },
  { id: "overdue", label: "已逾期" },
  { id: "delay", label: "延遲" },
  { id: "no_deadline", label: "無期限" },
];

const dateFilterOptions = [
  { id: "all", label: "全部" },
  { id: "this_week", label: "本週" },
  { id: "this_month", label: "本月" },
  { id: "custom", label: "自訂區間" },
];

const projectMoreFilterOptions = [
  { value: "has_tasks", label: "有任務" },
  { value: "no_tasks", label: "無任務" },
  { value: "has_delay", label: "有延遲" },
  { value: "has_overdue", label: "有逾期" },
  { value: "my_owner", label: "只有我負責" },
  { value: "my_collab", label: "只有我協作" },
];

const taskMoreFilterOptions = [
  { value: "has_project", label: "有專案" },
  { value: "no_stage", label: "未設定階段" },
  { value: "has_delay", label: "有延遲" },
  { value: "has_overdue", label: "有逾期" },
  { value: "my_owner", label: "只有我負責" },
  { value: "my_collab", label: "只有我協作" },
];

const todoViews = [
  { id: "incomplete", title: "未完成任務", icon: "☰" },
  { id: "today", title: "今日待辦事項", icon: "☼" },
  { id: "tomorrow", title: "明日待辦事項", icon: "○" },
  { id: "thisWeek", title: "本週待辦事項", icon: "▣" },
  { id: "nextWeek", title: "下週待辦事項", icon: "▤" },
];

const generalWorkScopeId = "__general_work__";
const taskNoProjectFilterValue = "__no_project__";
const taskScopeOptions = [
  { id: "project", label: "專案任務" },
  { id: "system", label: "系統任務" },
  { id: "general", label: "一般工作" },
];

const taskTypeOptions = [
  { id: "normal", label: "獨立任務" },
  { id: "parent", label: "母任務" },
  { id: "child", label: "子任務" },
];

function normalizeFilterValues(values = []) {
  const source = Array.isArray(values) ? values : [values];
  return [...new Set(source.map((value) => String(value || "").trim()).filter((value) => value && value !== "all"))];
}

function filterIncludesValue(values = [], value = "") {
  const selectedValues = normalizeFilterValues(values);
  if (!selectedValues.length) return true;
  return selectedValues.includes(String(value || "").trim());
}

function filterMatchesAny(values = [], matcher = () => false) {
  const selectedValues = normalizeFilterValues(values);
  if (!selectedValues.length) return true;
  return selectedValues.some(matcher);
}

function getFilterOptionValue(option = {}) {
  return String(option.value ?? option.id ?? "").trim();
}

function getMultiFilterOptions(options = []) {
  return options
    .map((option) => ({ value: getFilterOptionValue(option), label: option.label ?? getFilterOptionValue(option) }))
    .filter((option) => option.value && option.value !== "all");
}

const ganttPeriodOptions = [
  { value: "all", label: "全部期間" },
  { value: "year", label: "今年" },
  { value: "firstHalf", label: "上半年" },
  { value: "secondHalf", label: "下半年" },
  { value: "q1", label: "第 1 季" },
  { value: "q2", label: "第 2 季" },
  { value: "q3", label: "第 3 季" },
  { value: "q4", label: "第 4 季" },
  { value: "custom", label: "自訂區間" },
];

function normalizeGanttPeriodFilter(value = "all") {
  return ganttPeriodOptions.some((option) => option.value === value) ? value : "all";
}

const preferencesKey = "project-desk-preferences-v1";
const projectListSortDefault = { key: "schedule", direction: "asc" };
const taskListSortDefault = { key: "deadline", direction: "asc" };
const projectListSortColumns = [
  { key: "name", label: "專案名稱", defaultDirection: "asc" },
  { key: "stage", label: "目前階段", defaultDirection: "asc" },
  { key: "status", label: "狀態", defaultDirection: "asc" },
  { key: "priority", label: "優先級", defaultDirection: "desc" },
  { key: "schedule", label: "時程", defaultDirection: "asc" },
  { key: "owner", label: "負責人", defaultDirection: "asc" },
  { key: "collaboration", label: "協作對象", defaultDirection: "asc" },
  { key: "taskStats", label: "任務統計", defaultDirection: "desc" },
];
const taskListSortColumns = [
  { key: "title", label: "任務名稱", defaultDirection: "asc" },
  { key: "project", label: "所屬專案", defaultDirection: "asc" },
  { key: "stage", label: "所屬階段", defaultDirection: "asc" },
  { key: "status", label: "狀態", defaultDirection: "asc" },
  { key: "priority", label: "優先級", defaultDirection: "desc" },
  { key: "deadline", label: "期限", defaultDirection: "asc" },
  { key: "owner", label: "負責人", defaultDirection: "asc" },
  { key: "collaboration", label: "協作對象", defaultDirection: "asc" },
];
const ganttUndatedPhasePreferenceVersion = 2;
const previewStorageKey = "project-desk-preview-v1";
let state = createEmptyState();
let preferences = loadPreferences();
let selectedSystemId = null;
let selectedProjectId = "all";
let mainProjectDisplayMode = preferences.mainProjectDisplayMode === "detailed" ? "detailed" : "compact";
let mainTaskDisplayMode = preferences.mainTaskDisplayMode === "detailed" ? "detailed" : "compact";
let activeTodoView = preferences.activeTodoView || "today";
let todoSortKey = preferences.todoSortKey || "executionDate";
let todoSortDirection = preferences.todoSortDirection || "asc";
let todoGroupBySystem = Boolean(preferences.todoGroupBySystem);
let todoOwnerFilterIds = Array.isArray(preferences.todoOwnerFilterIds) ? normalizeFilterValues(preferences.todoOwnerFilterIds) : [];
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
let ganttSystemFilterIds = Array.isArray(preferences.ganttSystemFilterIds)
  ? normalizeFilterValues(preferences.ganttSystemFilterIds)
  : normalizeFilterValues(preferences.ganttSystemFilter);
let ganttProjectFilterIds = Array.isArray(preferences.ganttProjectFilterIds)
  ? normalizeFilterValues(preferences.ganttProjectFilterIds)
  : normalizeFilterValues(preferences.ganttProjectFilter);
let ganttPhaseFilterIds = normalizeFilterValues(preferences.ganttPhaseFilterIds);
let ganttSystemFilter = ganttSystemFilterIds[0] || "all";
let ganttProjectFilter = ganttProjectFilterIds[0] || "all";
let ganttPeriodFilter = normalizeGanttPeriodFilter(preferences.ganttPeriodFilter || "all");
let ganttPeriodStart = preferences.ganttPeriodStart || "";
let ganttPeriodEnd = preferences.ganttPeriodEnd || "";
let ganttSortMode = preferences.ganttSortMode || "manual";
let ganttShowRecurring = Boolean(preferences.ganttShowRecurring);
let ganttShowUndatedPhases = preferences.ganttUndatedPhasePreferenceVersion === ganttUndatedPhasePreferenceVersion
  ? Boolean(preferences.ganttShowUndatedPhases)
  : false;
let ganttShowUndatedItems = Boolean(preferences.ganttShowUndatedItems);
let projectOwnerFilterIds = Array.isArray(preferences.projectOwnerFilterIds) ? preferences.projectOwnerFilterIds : [];
let projectCollaborationFilters = Array.isArray(preferences.projectCollaborationFilters) ? preferences.projectCollaborationFilters : [];
let projectFilters = {
  phase: normalizeFilterValues(preferences.projectFilters?.phase),
  status: normalizeFilterValues(preferences.projectFilters?.status),
  priority: normalizeFilterValues(preferences.projectFilters?.priority),
  schedule: normalizeFilterValues(preferences.projectFilters?.schedule),
  date: preferences.projectFilters?.date || "all",
  dateStart: preferences.projectFilters?.dateStart || "",
  dateEnd: preferences.projectFilters?.dateEnd || "",
  more: Array.isArray(preferences.projectFilters?.more) ? preferences.projectFilters.more : [],
};
let taskFilters = {
  query: preferences.taskFilters?.query || "",
  projectIds: normalizeFilterValues(preferences.taskFilters?.projectIds ?? preferences.taskFilters?.projectId),
  phase: normalizeFilterValues(preferences.taskFilters?.phase),
  status: normalizeFilterValues(preferences.taskFilters?.status),
  ownerIds: Array.isArray(preferences.taskFilters?.ownerIds) ? preferences.taskFilters.ownerIds : [],
  collaborationTags: Array.isArray(preferences.taskFilters?.collaborationTags) ? preferences.taskFilters.collaborationTags : [],
  priority: normalizeFilterValues(preferences.taskFilters?.priority),
  due: normalizeFilterValues(preferences.taskFilters?.due),
  date: preferences.taskFilters?.date || "all",
  dateStart: preferences.taskFilters?.dateStart || "",
  dateEnd: preferences.taskFilters?.dateEnd || "",
  more: Array.isArray(preferences.taskFilters?.more) ? preferences.taskFilters.more : [],
};
let projectListSort = normalizeListSort(preferences.projectListSort, projectListSortDefault, projectListSortColumns);
let taskListSort = normalizeListSort(preferences.taskListSort, taskListSortDefault, taskListSortColumns);
let taskViewMode = preferences.taskViewMode === "list" ? "list" : "board";
let taskGroupMode = preferences.taskGroupMode === "phase" ? "phase" : "status";
let ganttOwnerFilterIds = Array.isArray(preferences.ganttOwnerFilterIds) ? preferences.ganttOwnerFilterIds : [];
let ganttCollaborationFilters = Array.isArray(preferences.ganttCollaborationFilters) ? preferences.ganttCollaborationFilters : [];
let selectedTagFilter = "";
let activeProjectDetailId = getProjectIdFromPath();
let taskTreeExpanded = {
  taskList: {},
  projectStage: {},
  projectDetail: {},
};
let expandedProjectIds = new Set(Array.isArray(preferences.expandedProjectIds) ? preferences.expandedProjectIds : []);
let selectedProjectStageIds = {};
let searchRenderTimer = null;
let ganttCollapsed = {
  systems: {},
  projects: {},
  phaseGroups: {},
  stages: {},
  taskGroups: {},
  ...(preferences.ganttCollapsed || {}),
};
ganttCollapsed.systems ||= {};
ganttCollapsed.projects ||= {};
ganttCollapsed.phaseGroups ||= {};
ganttCollapsed.stages ||= {};
ganttCollapsed.taskGroups ||= {};
let projectGroupCollapsed = preferences.projectGroupCollapsed && typeof preferences.projectGroupCollapsed === "object"
  ? { ...preferences.projectGroupCollapsed }
  : {};
let selectedTodoTaskId = null;
let drawerMode = "view";
let activeTaskDrawerTab = "summary";
let toastTimer = null;
let completionAudioContext = null;
let auth = null;
let db = null;
let cloudFunctions = null;
let currentFirebaseUser = null;
let currentSafeUser = sanitizeUser(null);
let currentProfile = null;
let cloudReady = false;
let previewMode = false;
let cloudTaskSaveTimer = null;
let cloudProjectSaveTimer = null;
let cloudFullSaveTimer = null;
let cloudSaveChain = Promise.resolve();
let pendingTaskCloudWriteScope = null;
let pendingProjectCloudWriteScope = null;
let pendingFullCloudSave = false;
let pendingRecurringOccurrenceCleanupTaskIds = [];
let pendingRecurringOccurrenceUpdateTaskIds = [];
let deferredProjectStageIdsByProject = new Map();
let profileDialogRequired = false;
let authSessionVersion = 0;
let profileUnsubscribe = null;
let cloudUnsubscribes = [];
let adminUnsubscribes = [];
let currentAccountRequest = null;
let remoteState = createEmptyState();
let remoteLoaded = { systems: false, projects: false, projectStages: false, tasks: false };
let lastSyncedState = createEmptyStateMaps();
let adminUsers = [];
let adminAllowedUsers = [];
let adminAccountRequests = [];
let adminAuditLogs = [];
let assignableOwners = [];
let adminFilters = {
  query: "",
  action: "all",
  date: "",
};

const els = {
  authScreen: document.querySelector("#authScreen"),
  authActions: document.querySelector("#authActions"),
  googleSignInButton: document.querySelector("#googleSignInButton"),
  previewModeButton: document.querySelector("#previewModeButton"),
  accountRequestPanel: document.querySelector("#accountRequestPanel"),
  accountRequestForm: document.querySelector("#accountRequestForm"),
  accountRequestEmail: document.querySelector("#accountRequestEmail"),
  accountRequestName: document.querySelector("#accountRequestName"),
  accountRequestSubmitButton: document.querySelector("#accountRequestSubmitButton"),
  accountRequestCheckButton: document.querySelector("#accountRequestCheckButton"),
  accountRequestSignOutButton: document.querySelector("#accountRequestSignOutButton"),
  authStatusText: document.querySelector("#authStatusText"),
  authHelpText: document.querySelector("#authHelpText"),
  appShell: document.querySelector("#appShell") || document.querySelector(".app-shell"),
  adminButton: document.querySelector("#adminButton"),
  editSystemButton: document.querySelector("#editSystemButton"),
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
  ownerFilter: document.querySelector("#ownerFilter"),
  collaborationFilter: document.querySelector("#collaborationFilter"),
  phaseFilter: document.querySelector("#phaseFilter"),
  projectStatusFilter: document.querySelector("#projectStatusFilter"),
  projectPriorityFilter: document.querySelector("#projectPriorityFilter"),
  projectScheduleFilter: document.querySelector("#projectScheduleFilter"),
  projectDateFilter: document.querySelector("#projectDateFilter"),
  projectDateStart: document.querySelector("#projectDateStart"),
  projectDateEnd: document.querySelector("#projectDateEnd"),
  projectMoreFilter: document.querySelector("#projectMoreFilter"),
  projectActiveFilters: document.querySelector("#projectActiveFilters"),
  tagFilterBar: document.querySelector("#tagFilterBar"),
  projectSummaryCards: document.querySelector("#projectSummaryCards"),
  projectDisplayToggle: document.querySelector("#projectDisplayToggle"),
  taskDisplayToggle: document.querySelector("#taskDisplayToggle"),
  taskSearchInput: document.querySelector("#taskSearchInput"),
  taskProjectFilter: document.querySelector("#taskProjectFilter"),
  taskPhaseFilter: document.querySelector("#taskPhaseFilter"),
  taskStatusFilter: document.querySelector("#taskStatusFilter"),
  taskOwnerFilter: document.querySelector("#taskOwnerFilter"),
  taskCollaborationFilter: document.querySelector("#taskCollaborationFilter"),
  taskPriorityFilter: document.querySelector("#taskPriorityFilter"),
  taskDueFilter: document.querySelector("#taskDueFilter"),
  taskDateFilter: document.querySelector("#taskDateFilter"),
  taskDateStart: document.querySelector("#taskDateStart"),
  taskDateEnd: document.querySelector("#taskDateEnd"),
  taskMoreFilter: document.querySelector("#taskMoreFilter"),
  taskActiveFilters: document.querySelector("#taskActiveFilters"),
  taskViewToggle: document.querySelector("#taskViewToggle"),
  taskGroupToggle: document.querySelector("#taskGroupToggle"),
  todoDashboard: document.querySelector("#todoDashboard"),
  openTodoPageButton: document.querySelector("#openTodoPageButton"),
  openTodoWorkbenchButton: document.querySelector("#openTodoWorkbenchButton"),
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
  todoOwnerFilter: document.querySelector("#todoOwnerFilter"),
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
  ganttPeriodFilter: document.querySelector("#ganttPeriodFilter"),
  ganttPeriodStart: document.querySelector("#ganttPeriodStart"),
  ganttPeriodEnd: document.querySelector("#ganttPeriodEnd"),
  ganttSystemFilter: document.querySelector("#ganttSystemFilter"),
  ganttProjectFilter: document.querySelector("#ganttProjectFilter"),
  ganttOwnerFilter: document.querySelector("#ganttOwnerFilter"),
  ganttCollaborationFilter: document.querySelector("#ganttCollaborationFilter"),
  ganttPhaseFilter: document.querySelector("#ganttPhaseFilter"),
  ganttSortMode: document.querySelector("#ganttSortMode"),
  ganttShowRecurring: document.querySelector("#ganttShowRecurring"),
  ganttShowUndatedPhases: document.querySelector("#ganttShowUndatedPhases"),
  ganttShowUndatedItems: document.querySelector("#ganttShowUndatedItems"),
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
  deleteSystemButton: document.querySelector("#deleteSystemButton"),
  projectDialog: document.querySelector("#projectDialog"),
  projectForm: document.querySelector("#projectForm"),
  deleteProjectButton: document.querySelector("#deleteProjectButton"),
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
  adminAccountRequestsTable: document.querySelector("#adminAccountRequestsTable"),
  adminUsersTable: document.querySelector("#adminUsersTable"),
  auditLogTable: document.querySelector("#auditLogTable"),
  auditSearchInput: document.querySelector("#auditSearchInput"),
  auditActionFilter: document.querySelector("#auditActionFilter"),
  auditDateFilter: document.querySelector("#auditDateFilter"),
  exportJsonButton: document.querySelector("#exportJsonButton"),
  exportCsvButton: document.querySelector("#exportCsvButton"),
  projectDetailPage: document.querySelector("#projectDetailPage"),
  closeProjectDetailButton: document.querySelector("#closeProjectDetailButton"),
  projectDetailContent: document.querySelector("#projectDetailContent"),
};

const systemFields = {
  id: document.querySelector("#systemId"),
  owner: document.querySelector("#systemOwner"),
  name: document.querySelector("#systemName"),
  tags: document.querySelector("#systemTags"),
  collaborationTags: document.querySelector("#systemCollaborationTags"),
  description: document.querySelector("#systemDescription"),
};

const projectFields = {
  id: document.querySelector("#projectId"),
  systemId: document.querySelector("#projectSystem"),
  owner: document.querySelector("#projectOwner"),
  category: document.querySelector("#projectCategory"),
  status: document.querySelector("#projectStatus"),
  priority: document.querySelector("#projectPriority"),
  name: document.querySelector("#projectName"),
  description: document.querySelector("#projectDescription"),
  tags: document.querySelector("#projectTags"),
  collaborationTags: document.querySelector("#projectCollaborationTags"),
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
  stageField: document.querySelector("#taskStageField"),
  stageId: document.querySelector("#taskStage"),
  typeField: document.querySelector("#taskTypeField"),
  taskType: document.querySelector("#taskType"),
  parentField: document.querySelector("#taskParentField"),
  parentTaskId: document.querySelector("#taskParent"),
  title: document.querySelector("#taskTitle"),
  description: document.querySelector("#taskDescription"),
  status: document.querySelector("#taskStatus"),
  priority: document.querySelector("#taskPriority"),
  rangeStartField: document.querySelector("#taskRangeStart")?.closest(".field"),
  rangeStart: document.querySelector("#taskRangeStart"),
  rangeEndField: document.querySelector("#taskRangeEnd")?.closest(".field"),
  rangeEnd: document.querySelector("#taskRangeEnd"),
  executionDateField: document.querySelector("#taskExecutionDate")?.closest(".field"),
  executionDate: document.querySelector("#taskExecutionDate"),
  deadlineField: document.querySelector("#taskDeadline")?.closest(".field"),
  deadline: document.querySelector("#taskDeadline"),
  completedDateField: document.querySelector("#taskCompletedDateField"),
  completedDate: document.querySelector("#taskCompletedDate"),
  owner: document.querySelector("#taskOwner"),
  tags: document.querySelector("#taskTags"),
  stakeholders: document.querySelector("#taskStakeholders"),
  isRecurring: document.querySelector("#taskIsRecurring"),
  recurrenceType: document.querySelector("#taskRecurrenceType"),
  recurrenceDailyField: document.querySelector("#taskRecurrenceDailyField"),
  recurrenceDailyMode: document.querySelector("#taskRecurrenceDailyMode"),
  recurrenceIntervalField: document.querySelector("#taskRecurrenceIntervalField"),
  recurrenceIntervalLabel: document.querySelector("#taskRecurrenceIntervalLabel"),
  recurrenceInterval: document.querySelector("#taskRecurrenceInterval"),
  recurrenceIntervalUnit: document.querySelector("#taskRecurrenceIntervalUnit"),
  recurrenceRulePanel: document.querySelector("#taskRecurrenceRulePanel"),
  recurrenceStartDate: document.querySelector("#taskRecurrenceStartDate"),
  recurrenceEndMode: document.querySelector("#taskRecurrenceEndMode"),
  recurrenceEndDateField: document.querySelector("#taskRecurrenceEndDateField"),
  recurrenceEndDate: document.querySelector("#taskRecurrenceEndDate"),
  recurrenceCountField: document.querySelector("#taskRecurrenceCountField"),
  recurrenceCount: document.querySelector("#taskRecurrenceCount"),
  recurrenceWeekdayField: document.querySelector("#taskRecurrenceWeekdayField"),
  recurrenceWeekdays: document.querySelectorAll('[name="taskRecurrenceWeekday"]'),
  recurrenceMonthlyField: document.querySelector("#taskRecurrenceMonthlyField"),
  recurrenceMonthlyMode: document.querySelector("#taskRecurrenceMonthlyMode"),
  recurrenceMonthDayField: document.querySelector("#taskRecurrenceMonthDayField"),
  recurrenceMonthDay: document.querySelector("#taskRecurrenceMonthDay"),
  recurrenceYearlyField: document.querySelector("#taskRecurrenceYearlyField"),
  recurrenceYearlyMode: document.querySelector("#taskRecurrenceYearlyMode"),
  recurrenceYearlyMonth: document.querySelector("#taskRecurrenceYearlyMonth"),
  recurrenceYearlyDayField: document.querySelector("#taskRecurrenceYearlyDayField"),
  recurrenceYearlyDay: document.querySelector("#taskRecurrenceYearlyDay"),
  recurrenceNthWeekdayField: document.querySelector("#taskRecurrenceNthWeekdayField"),
  recurrenceWeekOrder: document.querySelector("#taskRecurrenceWeekOrder"),
  recurrenceWeekday: document.querySelector("#taskRecurrenceWeekday"),
  recurrenceStartTime: document.querySelector("#taskRecurrenceStartTime"),
  recurrenceEndTime: document.querySelector("#taskRecurrenceEndTime"),
  recurrenceDuration: document.querySelector("#taskRecurrenceDuration"),
  dueRuleType: document.querySelector("#taskDueRuleType"),
  dueRuleDaysField: document.querySelector("#taskDueRuleDaysField"),
  dueRuleDays: document.querySelector("#taskDueRuleDays"),
  recurrencePreviewList: document.querySelector("#taskRecurrencePreviewList"),
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
els.accountRequestForm?.addEventListener("submit", handleAccountRequestSubmit);
els.accountRequestCheckButton?.addEventListener("click", handleAccountRequestCheck);
els.accountRequestSignOutButton?.addEventListener("click", signOutCurrentUser);
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
els.adminAccountRequestsTable?.addEventListener("click", handleAccountRequestReview);
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
els.editSystemButton?.addEventListener("click", () => openSystemDialog(getSystem(selectedSystemId)));
els.quickSystemButton.addEventListener("click", () => openSystemDialog());
els.addProjectButton.addEventListener("click", () => openProjectDialog());
els.addTaskButton.addEventListener("click", () => openTaskDialog());
els.sidebarToggle.addEventListener("click", () => {
  sidebarCollapsed = !sidebarCollapsed;
  syncSidebarCollapsed();
  persistViewPreferences();
});
els.projectDisplayToggle?.addEventListener("click", handleMainDisplayModeToggle);
els.taskDisplayToggle?.addEventListener("click", handleMainDisplayModeToggle);
els.openTodoPageButton.addEventListener("click", () => openTodoPage("today"));
els.openTodoWorkbenchButton?.addEventListener("click", () => openTodoPage("today"));
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
els.ganttPeriodFilter?.addEventListener("change", () => {
  ganttPeriodFilter = normalizeGanttPeriodFilter(els.ganttPeriodFilter.value);
  syncGanttPeriodControls({ updatePresetDates: true });
  persistViewPreferences();
  renderGanttPage();
});
els.ganttPeriodStart?.addEventListener("change", () => {
  ganttPeriodStart = els.ganttPeriodStart.value;
  persistViewPreferences();
  renderGanttPage();
});
els.ganttPeriodEnd?.addEventListener("change", () => {
  ganttPeriodEnd = els.ganttPeriodEnd.value;
  persistViewPreferences();
  renderGanttPage();
});
els.ganttSystemFilter?.addEventListener("change", () => {
  ganttSystemFilterIds = getSelectedValues(els.ganttSystemFilter);
  ganttSystemFilter = ganttSystemFilterIds[0] || "all";
  ganttProjectFilterIds = filterGanttProjectFiltersBySystem(ganttProjectFilterIds);
  ganttProjectFilter = ganttProjectFilterIds[0] || "all";
  persistViewPreferences();
  renderGanttPage();
});
els.ganttProjectFilter?.addEventListener("change", () => {
  ganttProjectFilterIds = getSelectedValues(els.ganttProjectFilter);
  ganttProjectFilter = ganttProjectFilterIds[0] || "all";
  persistViewPreferences();
  renderGanttPage();
});
els.ganttOwnerFilter?.addEventListener("change", () => {
  ganttOwnerFilterIds = getSelectedValues(els.ganttOwnerFilter);
  persistViewPreferences();
  renderGanttPage();
});
els.ganttCollaborationFilter?.addEventListener("change", () => {
  ganttCollaborationFilters = getSelectedValues(els.ganttCollaborationFilter);
  persistViewPreferences();
  renderGanttPage();
});
els.ganttPhaseFilter?.addEventListener("change", () => {
  ganttPhaseFilterIds = getSelectedValues(els.ganttPhaseFilter);
  persistViewPreferences();
  renderGanttPage();
});
els.ganttSortMode?.addEventListener("change", () => {
  ganttSortMode = els.ganttSortMode.value;
  persistViewPreferences();
  renderGanttPage();
});
els.ganttShowRecurring?.addEventListener("change", () => {
  ganttShowRecurring = Boolean(els.ganttShowRecurring.checked);
  persistViewPreferences();
  renderGanttPage();
});
els.ganttShowUndatedPhases?.addEventListener("change", () => {
  ganttShowUndatedPhases = Boolean(els.ganttShowUndatedPhases.checked);
  persistViewPreferences();
  renderGanttPage();
});
els.ganttShowUndatedItems?.addEventListener("change", () => {
  ganttShowUndatedItems = Boolean(els.ganttShowUndatedItems.checked);
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
els.todoOwnerFilter?.addEventListener("change", () => {
  todoOwnerFilterIds = getSelectedValues(els.todoOwnerFilter);
  persistViewPreferences();
  closeTodoDrawer();
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
els.searchInput.addEventListener("input", scheduleRender);
els.ownerFilter?.addEventListener("change", () => {
  projectOwnerFilterIds = getSelectedValues(els.ownerFilter);
  selectedProjectId = "all";
  persistViewPreferences();
  render();
});
els.collaborationFilter?.addEventListener("change", () => {
  projectCollaborationFilters = getSelectedValues(els.collaborationFilter);
  selectedProjectId = "all";
  persistViewPreferences();
  render();
});
els.phaseFilter.addEventListener("change", () => {
  selectedTagFilter = "";
  selectedProjectId = "all";
  projectFilters.phase = getSelectedValues(els.phaseFilter);
  persistViewPreferences();
  render();
});
els.projectStatusFilter?.addEventListener("change", () => {
  projectFilters.status = getSelectedValues(els.projectStatusFilter);
  selectedProjectId = "all";
  persistViewPreferences();
  render();
});
els.projectPriorityFilter?.addEventListener("change", () => {
  projectFilters.priority = getSelectedValues(els.projectPriorityFilter);
  selectedProjectId = "all";
  persistViewPreferences();
  render();
});
els.projectScheduleFilter?.addEventListener("change", () => {
  projectFilters.schedule = getSelectedValues(els.projectScheduleFilter);
  selectedProjectId = "all";
  persistViewPreferences();
  render();
});
els.projectDateFilter?.addEventListener("change", () => {
  projectFilters.date = els.projectDateFilter.value;
  syncDateRangeVisibility();
  selectedProjectId = "all";
  persistViewPreferences();
  render();
});
els.projectDateStart?.addEventListener("change", () => {
  projectFilters.dateStart = els.projectDateStart.value;
  render();
});
els.projectDateEnd?.addEventListener("change", () => {
  projectFilters.dateEnd = els.projectDateEnd.value;
  render();
});
els.projectMoreFilter?.addEventListener("change", () => {
  projectFilters.more = getSelectedValues(els.projectMoreFilter);
  selectedProjectId = "all";
  persistViewPreferences();
  render();
});
els.projectActiveFilters?.addEventListener("click", handleProjectFilterChipClick);
els.taskSearchInput?.addEventListener("input", () => {
  taskFilters.query = els.taskSearchInput.value.trim();
  scheduleRender();
});
els.taskProjectFilter?.addEventListener("change", () => {
  taskFilters.projectIds = getSelectedValues(els.taskProjectFilter);
  persistViewPreferences();
  render();
});
els.taskPhaseFilter?.addEventListener("change", () => {
  taskFilters.phase = getSelectedValues(els.taskPhaseFilter);
  persistViewPreferences();
  render();
});
els.taskStatusFilter?.addEventListener("change", () => {
  taskFilters.status = getSelectedValues(els.taskStatusFilter);
  persistViewPreferences();
  render();
});
els.taskOwnerFilter?.addEventListener("change", () => {
  taskFilters.ownerIds = getSelectedValues(els.taskOwnerFilter);
  persistViewPreferences();
  render();
});
els.taskCollaborationFilter?.addEventListener("change", () => {
  taskFilters.collaborationTags = getSelectedValues(els.taskCollaborationFilter);
  persistViewPreferences();
  render();
});
els.taskPriorityFilter?.addEventListener("change", () => {
  taskFilters.priority = getSelectedValues(els.taskPriorityFilter);
  persistViewPreferences();
  render();
});
els.taskDueFilter?.addEventListener("change", () => {
  taskFilters.due = getSelectedValues(els.taskDueFilter);
  persistViewPreferences();
  render();
});
els.taskDateFilter?.addEventListener("change", () => {
  taskFilters.date = els.taskDateFilter.value;
  syncDateRangeVisibility();
  persistViewPreferences();
  render();
});
els.taskDateStart?.addEventListener("change", () => {
  taskFilters.dateStart = els.taskDateStart.value;
  render();
});
els.taskDateEnd?.addEventListener("change", () => {
  taskFilters.dateEnd = els.taskDateEnd.value;
  render();
});
els.taskMoreFilter?.addEventListener("change", () => {
  taskFilters.more = getSelectedValues(els.taskMoreFilter);
  persistViewPreferences();
  render();
});
els.taskActiveFilters?.addEventListener("click", handleTaskFilterChipClick);
els.taskViewToggle?.addEventListener("click", handleTaskViewToggle);
els.taskGroupToggle?.addEventListener("click", handleTaskGroupToggle);
els.systemForm.addEventListener("submit", handleSystemSubmit);
els.projectForm.addEventListener("submit", handleProjectSubmit);
els.taskForm.addEventListener("submit", handleTaskSubmit);
els.deleteSystemButton?.addEventListener("click", handleSystemDelete);
els.deleteProjectButton?.addEventListener("click", handleProjectDelete);
els.deleteTaskButton.addEventListener("click", handleTaskDelete);
els.addProjectEmailButton.addEventListener("click", () => addEmailRow(projectFields.relatedEmails));
els.addProjectLinkButton.addEventListener("click", () => addLinkRow(projectFields.relatedLinks));
els.addTaskEmailButton.addEventListener("click", () => addEmailRow(taskFields.relatedEmails));
els.addTaskLinkButton.addEventListener("click", () => addLinkRow(taskFields.relatedLinks));
els.addTodoEmailButton.addEventListener("click", () => addEmailRow(todoAddFields.relatedEmails));
els.addTodoLinkButton.addEventListener("click", () => addLinkRow(todoAddFields.relatedLinks));
projectFields.category.addEventListener("change", () => syncProjectCategoryFields());
projectFields.systemId.addEventListener("change", () => syncProjectOwnerOptions());
projectFields.phase.addEventListener("change", () => {
  projectFields.phaseChangedAt.value = todayString();
  if (projectFields.phase.value === "closed" && projectFields.status) projectFields.status.value = "closed";
});
taskFields.scope.addEventListener("change", () => {
  syncTaskScopeFields(taskFields);
  syncTaskOwnerOptions(taskFields);
  syncTaskStageAndParentOptions(taskFields);
});
taskFields.systemId.addEventListener("change", () => {
  populateTaskProjectSelect(taskFields.systemId.value);
  syncTaskScopeFields(taskFields, false);
  syncTaskOwnerOptions(taskFields);
  syncTaskStageAndParentOptions(taskFields);
});
taskFields.projectId.addEventListener("change", () => {
  syncTaskOwnerOptions(taskFields);
  syncTaskStageAndParentOptions(taskFields);
});
taskFields.taskType?.addEventListener("change", () => syncTaskStageAndParentOptions(taskFields));
taskFields.status.addEventListener("change", () => syncTaskCompletedField(taskFields));
taskFields.rangeStart.addEventListener("change", () => updateTaskDateConstraints(taskFields));
taskFields.rangeEnd.addEventListener("change", () => updateTaskDateConstraints(taskFields));
taskFields.executionDate.addEventListener("change", () => updateTaskDateConstraints(taskFields, false));
taskFields.deadline.addEventListener("change", () => updateTaskDateConstraints(taskFields, false));
taskFields.isRecurring?.addEventListener("change", () => syncTaskRecurrenceFields(taskFields));
taskFields.recurrenceType?.addEventListener("change", () => syncTaskRecurrenceFields(taskFields));
taskFields.recurrenceDailyMode?.addEventListener("change", () => syncTaskRecurrenceFields(taskFields));
taskFields.recurrenceMonthlyMode?.addEventListener("change", () => syncTaskRecurrenceFields(taskFields));
taskFields.recurrenceYearlyMode?.addEventListener("change", () => syncTaskRecurrenceFields(taskFields));
taskFields.recurrenceEndMode?.addEventListener("change", () => syncTaskRecurrenceFields(taskFields));
taskFields.recurrenceStartDate?.addEventListener("change", () => syncTaskRecurrenceFields(taskFields));
taskFields.recurrenceStartTime?.addEventListener("change", () => handleRecurrenceTimeInput(taskFields, "start"));
taskFields.recurrenceEndTime?.addEventListener("change", () => handleRecurrenceTimeInput(taskFields, "end"));
taskFields.recurrenceDuration?.addEventListener("input", () => handleRecurrenceTimeInput(taskFields, "duration"));
[
  taskFields.recurrenceInterval,
  taskFields.recurrenceEndDate,
  taskFields.recurrenceCount,
  taskFields.recurrenceMonthDay,
  taskFields.recurrenceYearlyMonth,
  taskFields.recurrenceYearlyDay,
  taskFields.recurrenceWeekOrder,
  taskFields.recurrenceWeekday,
  taskFields.dueRuleType,
  taskFields.dueRuleDays,
  ...taskFields.recurrenceWeekdays,
].filter(Boolean).forEach((field) => {
  field.addEventListener("input", () => syncTaskRecurrenceFields(taskFields));
  field.addEventListener("change", () => syncTaskRecurrenceFields(taskFields));
});
todoAddFields.mode.addEventListener("change", updateTodoAddMode);
todoAddFields.scope.addEventListener("change", () => {
  syncTaskScopeFields(todoAddFields);
  populateTodoExistingTaskSelect();
  syncTaskOwnerOptions(todoAddFields);
  if (todoAddFields.mode.value === "existing") fillTodoAddFromExistingTask();
});
todoAddFields.systemId.addEventListener("change", () => {
  populateTodoProjectSelect(todoAddFields.systemId.value);
  syncTaskScopeFields(todoAddFields, false);
  populateTodoExistingTaskSelect();
  syncTaskOwnerOptions(todoAddFields);
  if (todoAddFields.mode.value === "existing") fillTodoAddFromExistingTask();
});
todoAddFields.projectId.addEventListener("change", () => {
  populateTodoExistingTaskSelect();
  syncTaskOwnerOptions(todoAddFields);
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
els.closeProjectDetailButton?.addEventListener("click", closeProjectDetailPage);
window.addEventListener("popstate", () => {
  activeProjectDetailId = getProjectIdFromPath();
  render();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".account-panel")) {
    els.accountMenu?.classList.add("hidden");
    els.accountButton?.setAttribute("aria-expanded", "false");
  }
  const clickedMultiSelect = event.composedPath?.().some((item) => item.classList?.contains("search-multi-select"))
    || event.target.closest(".search-multi-select");
  const clickedMultiSelectLayer = event.target.closest(".search-multi-select-layer");
  if (!clickedMultiSelect && !clickedMultiSelectLayer) {
    closeOpenSearchMultiSelects();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeOpenSearchMultiSelects();
  }
});
window.addEventListener("resize", closeOpenSearchMultiSelects);
document.addEventListener("scroll", repositionOpenSearchMultiSelect, true);

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.closeDialog === "profileDialog" && profileDialogRequired) return;
    document.querySelector(`#${button.dataset.closeDialog}`).close();
  });
});

initializeCloudApp().catch((error) => {
  logSafeError("firebase.initialize", error);
  showAuthScreen("Firebase initialization failed.", getReadableError(error), false, true);
});

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
    projectStages: [],
    tasks: [],
  };
}

function createEmptyStateMaps() {
  return {
    systems: new Map(),
    projects: new Map(),
    projectStages: new Map(),
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
    mainProjectDisplayMode,
    mainTaskDisplayMode,
    todoSortKey,
    todoSortDirection,
    todoGroupBySystem,
    todoOwnerFilterIds,
    sidebarCollapsed,
    todoSectionCollapsed,
    ganttScale,
    ganttSystemFilterIds,
    ganttProjectFilterIds,
    ganttPhaseFilterIds,
    ganttSystemFilter,
    ganttProjectFilter,
    ganttPeriodFilter,
    ganttPeriodStart,
    ganttPeriodEnd,
    ganttSortMode,
    ganttShowRecurring,
    ganttShowUndatedPhases,
    ganttShowUndatedItems,
    ganttUndatedPhasePreferenceVersion,
    projectOwnerFilterIds,
    projectCollaborationFilters,
    projectFilters,
    taskFilters,
    projectListSort,
    taskListSort,
    taskViewMode,
    taskGroupMode,
    ganttOwnerFilterIds,
    ganttCollaborationFilters,
    ganttCollapsed,
    projectGroupCollapsed,
    expandedProjectIds: [...expandedProjectIds],
  };
  localStorage.setItem(preferencesKey, JSON.stringify(nextPreferences));
}

function normalizeListSort(value = {}, defaultSort = {}, columns = []) {
  const fallbackColumn = getListSortColumn(columns, defaultSort.key) || columns[0] || { key: "", defaultDirection: "asc" };
  const column = getListSortColumn(columns, value?.key) || fallbackColumn;
  const direction = value?.direction === "desc" || value?.direction === "asc"
    ? value.direction
    : column.defaultDirection || defaultSort.direction || "asc";
  return { key: column.key, direction };
}

function getListSortColumn(columns = [], key = "") {
  return columns.find((column) => column.key === key) || null;
}

function renderProjectListHeader() {
  return `
    <div class="project-list-header">
      ${projectListSortColumns.map((column) => renderListSortButton("project", column)).join("")}
      <span class="table-header-static">操作</span>
    </div>
  `;
}

function renderTaskListHeader() {
  return `
    <div class="task-table-header">
      ${taskListSortColumns.map((column) => renderListSortButton("task", column)).join("")}
      <span class="table-header-static">操作</span>
    </div>
  `;
}

function renderListSortButton(scope, column) {
  const sortState = scope === "project" ? projectListSort : taskListSort;
  const active = sortState.key === column.key;
  const direction = active ? sortState.direction : column.defaultDirection || "asc";
  const sortAttr = scope === "project" ? "data-project-list-sort" : "data-task-list-sort";
  const icon = active ? (direction === "desc" ? "↓" : "↑") : "↕";
  const directionLabel = direction === "desc" ? "降冪" : "升冪";
  const activeLabel = active ? `目前${directionLabel}` : `點選後${directionLabel}`;
  return `
    <button class="table-sort-button ${active ? "active" : ""}" type="button" ${sortAttr}="${escapeHtml(column.key)}" aria-pressed="${String(active)}" aria-label="${escapeHtml(column.label)}排序，${activeLabel}">
      <span class="table-sort-label">${escapeHtml(column.label)}</span>
      <span class="table-sort-icon" aria-hidden="true">${icon}</span>
    </button>
  `;
}

function attachProjectListSortHandlers() {
  els.projectList.querySelectorAll("[data-project-list-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      projectListSort = getNextListSort(projectListSort, button.dataset.projectListSort, projectListSortColumns, projectListSortDefault);
      persistViewPreferences();
      renderProjects();
    });
  });
}

function attachTaskListSortHandlers() {
  els.board.querySelectorAll("[data-task-list-sort]").forEach((button) => {
    button.addEventListener("click", () => {
      taskListSort = getNextListSort(taskListSort, button.dataset.taskListSort, taskListSortColumns, taskListSortDefault);
      persistViewPreferences();
      renderBoard();
    });
  });
}

function getNextListSort(currentSort = {}, key = "", columns = [], defaultSort = {}) {
  const column = getListSortColumn(columns, key) || getListSortColumn(columns, defaultSort.key);
  if (!column) return normalizeListSort(currentSort, defaultSort, columns);
  const direction = currentSort.key === column.key
    ? currentSort.direction === "desc" ? "asc" : "desc"
    : column.defaultDirection || defaultSort.direction || "asc";
  return normalizeListSort({ key: column.key, direction }, defaultSort, columns);
}

function compareProjectsForList(a, b) {
  return compareListItemsBySort(a, b, projectListSort, getProjectListSortValue);
}

function compareTasksForList(a, b) {
  return compareListItemsBySort(a, b, taskListSort, getTaskListSortValue);
}

function compareListItemsBySort(a, b, sortState, valueGetter) {
  const first = valueGetter(a, sortState.key);
  const second = valueGetter(b, sortState.key);
  const sortOrder = compareListSortValues(first, second, sortState.direction);
  return sortOrder || compareManualThenName(a, b);
}

function compareListSortValues(first = {}, second = {}, direction = "asc") {
  if (first.missing && !second.missing) return 1;
  if (!first.missing && second.missing) return -1;
  const firstValue = first.value ?? "";
  const secondValue = second.value ?? "";
  const firstType = first.type || second.type || "string";
  let result = 0;
  if (firstType === "number") {
    result = Number(firstValue || 0) - Number(secondValue || 0);
  } else {
    result = String(firstValue).localeCompare(String(secondValue), "zh-Hant", { numeric: true, sensitivity: "base" });
  }
  return direction === "desc" ? -result : result;
}

function makeListSortValue(value, options = {}) {
  return {
    value,
    type: options.type || (typeof value === "number" ? "number" : "string"),
    missing: Boolean(options.missing),
  };
}

function getProjectListSortValue(project = {}, key = "") {
  if (key === "name") return makeListSortValue(project.name || "");
  if (key === "stage") {
    const currentStage = getProjectCurrentStageInfo(project);
    const phaseRank = currentStage.phaseId ? getOptionRank(phases, currentStage.phaseId) : phases.length;
    return makeListSortValue(`${String(phaseRank).padStart(2, "0")}-${String(currentStage.index || 0).padStart(3, "0")}-${currentStage.label || ""}`);
  }
  if (key === "status") return makeListSortValue(getOptionRank(projectStatusOptions, getProjectStatus(project)), { type: "number" });
  if (key === "priority") return makeListSortValue(getPrioritySortRank(project.priority), { type: "number" });
  if (key === "schedule") {
    const date = getProjectListScheduleSortDate(project);
    return makeListSortValue(date, { missing: !date });
  }
  if (key === "owner") return makeListSortValue(getOwnerDisplayName(project));
  if (key === "collaboration") return makeListSortValue((project.collaborationTags || []).join(" "));
  if (key === "taskStats") return makeListSortValue(getProjectTaskStats(project.id).total, { type: "number" });
  return makeListSortValue(project.name || "");
}

function getTaskListSortValue(task = {}, key = "") {
  if (key === "title") return makeListSortValue(task.title || "");
  if (key === "project") {
    const project = getProject(task.projectId);
    return makeListSortValue(project?.name || getTaskScopeLabel(getTaskScope(task)));
  }
  if (key === "stage") {
    const stage = getTaskStage(task);
    const stageOrder = stage ? Number(stage.sortOrder) || 0 : Number.MAX_SAFE_INTEGER;
    return makeListSortValue(`${String(stageOrder).padStart(6, "0")}-${stage?.name || getTaskStageLabel(task)}`);
  }
  if (key === "status") return makeListSortValue(getOptionRank(taskColumns, task.status), { type: "number" });
  if (key === "priority") return makeListSortValue(getPrioritySortRank(task.priority), { type: "number" });
  if (key === "deadline") {
    const date = getTaskListDeadlineSortDate(task);
    return makeListSortValue(date, { missing: !date });
  }
  if (key === "owner") return makeListSortValue(task.owner || task.ownerName || "");
  if (key === "collaboration") return makeListSortValue((task.collaborationTags || task.stakeholders || []).join(" "));
  return makeListSortValue(task.title || "");
}

function getProjectListScheduleSortDate(project = {}) {
  const range = getProjectScheduleDates(project);
  return range.start || range.end || "";
}

function getTaskListDeadlineSortDate(task = {}) {
  return task.deadline || task.executionDate || "";
}

function getOptionRank(options = [], value = "") {
  const index = options.findIndex((option) => String(option.id ?? option.value ?? "") === String(value || ""));
  return index === -1 ? options.length : index;
}

function getPrioritySortRank(priority = "medium") {
  return { high: 3, medium: 2, low: 1 }[normalizePriority(priority)] || 2;
}

function normalizeState(rawState = {}) {
  const systems = Array.isArray(rawState.systems) ? rawState.systems.map(normalizeSystem) : [];
  const projects = Array.isArray(rawState.projects) ? rawState.projects.map(normalizeProject) : [];
  const rawStages = Array.isArray(rawState.projectStages) ? rawState.projectStages.map(normalizeProjectStage) : [];
  const projectStages = ensureProjectStages(projects, rawStages).map(normalizeProjectStage);
  const normalizedTasks = Array.isArray(rawState.tasks) ? rawState.tasks.map(normalizeTask) : [];
  const migratedTasks = migrateLegacyCompletedOccurrences(normalizedTasks);
  const recurrenceRepair = repairDuplicateRecurringOccurrences(migratedTasks);
  pendingRecurringOccurrenceCleanupTaskIds = recurrenceRepair.removedIds;
  pendingRecurringOccurrenceUpdateTaskIds = recurrenceRepair.updatedIds;
  const tasks = recurrenceRepair.tasks;
  return normalizeDerivedScheduling({ systems, projects, projectStages, tasks });
}

function normalizeSystem(system = {}) {
  const { ownerEmail, createdAt, createdBy, createdByEmail, updatedAt, updatedBy, updatedByEmail, ...baseSystem } = system;
  const ownerIds = normalizeOwnerIds(system.internalOwnerIds, system);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, system), system);
  return {
    ...baseSystem,
    description: system.description || "",
    tags: normalizeTextList(system.tags),
    collaborationTags: normalizeTextList(system.collaborationTags),
    internalOwnerIds: ownerIds,
    ownerUid: owner.ownerUid,
    ownerName: getOwnerNames(ownerIds, system),
    visibleToUids: normalizeVisibleToUids(system.visibleToUids),
  };
}

function normalizeTask(task = {}) {
  const { ownerEmail, createdAt, createdBy, createdByEmail, updatedAt, updatedBy, updatedByEmail, ...baseTask } = task;
  const rangeStart = task.startDate || task.rangeStart || task.dueDate || "";
  const rangeEnd = task.endDate || task.rangeEnd || task.startDate || task.dueDate || "";
  const executionDate = task.executionDate || "";
  const deadline = task.deadline || "";
  const scope = normalizeTaskScope(task);
  const ownerIds = normalizeOwnerIds(task.internalOwnerIds, task);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, task), task);
  const collaborationTags = normalizeTextList(task.collaborationTags?.length ? task.collaborationTags : task.stakeholders);
  const recurrenceRule = normalizeRecurrenceRule(task.recurrenceRule, task);
  const isRecurringOccurrence = Boolean(task.isRecurringOccurrence || (task.templateTaskId && task.occurrenceDate));
  const isRecurringTemplate = !isRecurringOccurrence
    && Boolean(task.isRecurringTemplate || task.recurrenceEnabled || (task.isRecurring && recurrenceRule.type));
  const isDeleted = Boolean(task.isDeleted);
  const recurrenceEnabled = Boolean(isRecurringTemplate && !isDeleted && task.recurrenceEnabled !== false);
  const templateStartDate = isRecurringTemplate ? recurrenceRule.startDate || rangeStart : rangeStart;
  const templateEndDate = isRecurringTemplate
    ? recurrenceRule.endMode === "date"
      ? recurrenceRule.endDate || templateStartDate
      : templateStartDate
    : rangeEnd;
  const startTime = normalizeTimeValue(task.startTime || task.time?.startTime || recurrenceRule.startTime || "");
  const endTime = normalizeTimeValue(task.endTime || task.time?.endTime || recurrenceRule.endTime || "");
  const durationMinutes = clampInteger(
    task.durationMinutes || task.time?.durationMinutes || recurrenceRule.durationMinutes || getTimeDurationMinutes(startTime, endTime),
    0,
    1440,
  );

  return {
    ...baseTask,
    scope,
    systemId: scope === "general" ? "" : task.systemId || "",
    projectId: scope === "project" ? task.projectId || "" : "",
    stageId: scope === "project" ? task.stageId || "" : "",
    parentTaskId: task.parentTaskId || "",
    taskType: normalizeTaskType(task),
    internalOwnerIds: ownerIds,
    ...owner,
    ownerName: getOwnerNames(ownerIds, task),
    owner: getOwnerNames(ownerIds, task) || task.owner || "",
    visibleToUids: normalizeVisibleToUids(task.visibleToUids),
    status: normalizeTaskStatus(task.status),
    priority: normalizePriority(task.priority),
    tags: Array.isArray(task.tags) ? task.tags : [],
    collaborationTags,
    stakeholders: collaborationTags,
    startDate: templateStartDate,
    endDate: templateEndDate,
    rangeStart: templateStartDate,
    rangeEnd: templateEndDate,
    executionDate: isRecurringTemplate ? "" : executionDate,
    executionStartDate: task.executionStartDate || (isRecurringOccurrence ? templateStartDate : ""),
    executionEndDate: task.executionEndDate || (isRecurringOccurrence ? templateEndDate : ""),
    deadline: isRecurringTemplate ? "" : deadline,
    dueDate: isRecurringTemplate ? "" : task.dueDate || deadline || "",
    startTime,
    endTime,
    durationMinutes,
    isRecurring: isRecurringTemplate,
    recurrenceEnabled,
    isRecurringTemplate,
    isRecurringOccurrence,
    templateTaskId: isRecurringOccurrence ? task.templateTaskId || "" : "",
    occurrenceDate: isRecurringOccurrence ? task.occurrenceDate || executionDate || rangeStart || "" : "",
    recurringLabel: task.recurringLabel || "",
    recurrenceType: isRecurringTemplate ? recurrenceRule.type : "",
    recurrenceRule: isRecurringTemplate ? recurrenceRule : {},
    dueRule: normalizeDueRule(task.dueRule),
    completedOccurrences: normalizeTextList(task.completedOccurrences),
    sortOrder: Number.isFinite(Number(task.sortOrder)) ? Number(task.sortOrder) : 0,
    relatedEmails: normalizeEmailList(task.relatedEmails),
    relatedLinks: normalizeLinkList(task.relatedLinks),
    completedDate: normalizeTaskStatus(task.status) === "done" ? task.completedDate || todayString() : "",
    important: Boolean(task.important),
    steps: normalizeTaskSteps(task.steps),
    files: normalizeTaskFiles(task.files),
    notes: task.notes || "",
    history: normalizeTaskHistory(task.history),
    isDeleted,
    deletedAt: task.deletedAt || "",
    deletedBy: task.deletedBy || "",
    deletedReason: task.deletedReason || "",
    templateDeleted: Boolean(task.templateDeleted),
    templateDeletedAt: task.templateDeletedAt || "",
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

function normalizeTaskTypeValue(value = "") {
  return taskTypeOptions.some((option) => option.id === value) ? value : "normal";
}

function normalizeTaskType(task = {}) {
  if (task.parentTaskId) return "child";
  const taskType = normalizeTaskTypeValue(task.taskType);
  return taskType === "child" ? "normal" : taskType;
}

function getTaskType(task = {}) {
  return normalizeTaskType(task);
}

function getTaskTypeLabel(taskType = "normal") {
  return taskTypeOptions.find((option) => option.id === taskType)?.label || "獨立任務";
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

function taskMatchesProjectScope(task, projectIds = selectedProjectId) {
  const selectedProjectIds = normalizeFilterValues(projectIds);
  if (!selectedProjectIds.length) return true;
  const scope = getTaskScope(task);
  const matchesNoProject = selectedProjectIds.includes(taskNoProjectFilterValue) && (scope === "system" || scope === "general");
  const matchesProject = scope === "project" && selectedProjectIds.includes(task.projectId);
  return matchesNoProject || matchesProject;
}

function taskMatchesPhaseScope(task, phaseProjectIds, phases = projectFilters.phase) {
  const selectedPhases = normalizeFilterValues(phases);
  if (!selectedPhases.length) return true;
  const stage = task.stageId ? state.projectStages.find((item) => item.id === task.stageId) : null;
  if (selectedPhases.includes("unset") && !stage) return true;
  if (stage) return selectedPhases.includes(stage.phaseId || getPhaseIdByLabel(stage.name));
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
  if (status === "paused") return "paused";
  if (status === "doing" || status === "review") return "doing";
  return "not_started";
}

function normalizeProjectStatus(status) {
  return projectStatusOptions.some((option) => option.id === status) ? status : "doing";
}

function normalizePriority(priority) {
  return priorityOptions.some((option) => option.id === priority) ? priority : "medium";
}

function inferProjectStatusFromDates(project = {}) {
  if (project.closed || project.phase === "closed") return "closed";
  const start = project.plannedStart || project.startDate || "";
  if (start && start > todayString()) return "not_started";
  return "doing";
}

function normalizeProjectCategory(category) {
  return category === "general" ? "general" : "development";
}

function normalizeRecurrenceType(type = "") {
  if (type === "custom") return "daily";
  return ["daily", "weekly", "monthly", "yearly"].includes(type) ? type : "";
}

function normalizeRecurrenceRule(rule = {}, task = {}) {
  const dailyRule = rule.daily || {};
  const weeklyRule = rule.weekly || {};
  const monthlyRule = rule.monthly || {};
  const yearlyRule = rule.yearly || {};
  const rangeRule = rule.range || {};
  const timeRule = rule.time || task.time || {};
  const rawType = task.recurrenceType || rule.type || rule.frequency;
  const type = normalizeRecurrenceType(rawType);
  if (!type) return {};
  const startDate = rangeRule.startDate || rule.startDate || task.recurrenceStartDate || task.executionDate || task.rangeStart || task.startDate || "";
  const interval = clampInteger(
    rule.interval || rule.intervalDays || rule.intervalWeeks || rule.intervalMonths || rule.intervalYears || task.recurrenceInterval || task.recurrenceIntervalDays || 1,
    1,
    365,
  );
  const anchorDate = startDate ? parseDateString(startDate) : null;
  const anchorWeekday = anchorDate ? anchorDate.getDay() : todayDate().getDay();
  const anchorMonthDay = anchorDate ? anchorDate.getDate() : todayDate().getDate();
  const anchorMonth = anchorDate ? anchorDate.getMonth() + 1 : todayDate().getMonth() + 1;
  const dailyMode = normalizeDailyMode(rule.dailyMode || dailyRule.mode);
  const monthlyMode = normalizeMonthlyMode(
    rule.monthlyMode || monthlyRule.mode,
    ["dayOfMonth", "nthWeekday"],
    rule.weekOrder && rule.weekday !== undefined ? "nthWeekday" : "dayOfMonth",
  );
  const yearlyMode = normalizeYearlyMode(
    rule.yearlyMode || yearlyRule.mode,
    ["date", "nthWeekday"],
    rule.weekOrder && rule.weekday !== undefined && !rule.yearlyDay ? "nthWeekday" : "date",
  );
  const rawWeekDays = rule.weekDays || rule.daysOfWeek || weeklyRule.daysOfWeek;
  const weekDays = Array.isArray(rawWeekDays)
    ? normalizeWeekDays(rawWeekDays)
    : type === "weekly"
      ? [anchorWeekday]
      : [];
  const monthDay = clampInteger(rule.monthDay || rule.dayOfMonth || monthlyRule.dayOfMonth || anchorMonthDay, 1, 31);
  const yearlyMonth = clampInteger(rule.yearlyMonth || rule.month || yearlyRule.month || anchorMonth, 1, 12);
  const yearlyDay = clampInteger(rule.yearlyDay || yearlyRule.dayOfMonth || yearlyRule.day || monthDay, 1, 31);
  const weekOrder = normalizeWeekOrder(rule.weekOrder ?? rule.weekOrdinal ?? monthlyRule.weekOrdinal ?? yearlyRule.weekOrdinal);
  const weekday = normalizeWeekdayValue(rule.weekday ?? monthlyRule.weekday ?? yearlyRule.weekday, anchorWeekday);
  const occurrenceCount = clampInteger(rule.occurrenceCount || rule.count || rangeRule.count || 0, 0, 999);
  const rawEndMode = rule.endMode || rangeRule.endType || rangeRule.endMode;
  const rawEndDate = rule.endDate || rangeRule.endDate || "";
  const endMode = ["date", "count", "none"].includes(rawEndMode)
    ? rawEndMode
    : rawEndDate
      ? "date"
      : occurrenceCount
        ? "count"
        : "none";
  const startTime = normalizeTimeValue(rule.startTime || timeRule.startTime);
  const endTime = normalizeTimeValue(rule.endTime || timeRule.endTime);
  const durationMinutes = clampInteger(rule.durationMinutes || timeRule.durationMinutes || getTimeDurationMinutes(startTime, endTime), 0, 1440);

  return {
    type,
    startDate,
    interval,
    dailyMode: type === "daily" ? dailyMode : "interval",
    weekDays,
    monthlyMode: type === "monthly" ? monthlyMode : "dayOfMonth",
    monthDay,
    yearlyMode: type === "yearly" ? yearlyMode : "date",
    yearlyMonth,
    yearlyDay,
    weekOrder,
    weekday,
    endMode,
    endDate: endMode === "date" ? rawEndDate : "",
    occurrenceCount: endMode === "count" ? occurrenceCount : 0,
    startTime,
    endTime,
    durationMinutes,
  };
}

function normalizeDailyMode(value = "") {
  if (value === "weekday" || value === "weekdays") return "weekday";
  if (value === "everyNDays") return "interval";
  return normalizeRecurrenceMode(value, ["interval", "weekday"], "interval");
}

function normalizeMonthlyMode(value = "", allowed = [], fallback = "") {
  if (value === "nthWeekdayOfMonth") return "nthWeekday";
  return normalizeRecurrenceMode(value, allowed, fallback);
}

function normalizeYearlyMode(value = "", allowed = [], fallback = "") {
  if (value === "monthDay") return "date";
  if (value === "nthWeekdayOfMonth") return "nthWeekday";
  return normalizeRecurrenceMode(value, allowed, fallback);
}

function normalizeDueRule(rule = {}) {
  const type = ["sameDay", "afterDays", "manual"].includes(rule?.type) ? rule.type : "sameDay";
  return {
    type,
    daysAfterOccurrence: type === "afterDays" ? clampInteger(rule?.daysAfterOccurrence || 0, 0, 365) : 0,
  };
}

function normalizeRecurrenceMode(value = "", allowed = [], fallback = "") {
  return allowed.includes(value) ? value : fallback;
}

function normalizeWeekOrder(value = 1) {
  const aliases = {
    first: 1,
    second: 2,
    third: 3,
    fourth: 4,
    last: -1,
  };
  if (Object.prototype.hasOwnProperty.call(aliases, value)) return aliases[value];
  const number = Number(value);
  return [1, 2, 3, 4, -1].includes(number) ? number : 1;
}

function normalizeWeekdayValue(value = 0, fallback = 0) {
  const aliases = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
  };
  const textValue = String(value || "").toUpperCase();
  if (Object.prototype.hasOwnProperty.call(aliases, textValue)) return aliases[textValue];
  const number = Number(value);
  if (Number.isInteger(number) && number >= 0 && number <= 6) return number;
  return normalizeWeekdayValue(fallback, 0);
}

function clampInteger(value, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return min;
  return Math.min(max, Math.max(min, Math.floor(number)));
}

function normalizeWeekDays(values = []) {
  return [...new Set(values.map((value) => normalizeWeekdayValue(value, -1)).filter((value) => Number.isInteger(value) && value >= 0 && value <= 6))]
    .sort((a, b) => a - b);
}

function normalizeTimeValue(value = "") {
  const text = String(value || "").trim();
  return /^\d{2}:\d{2}$/.test(text) ? text : "";
}

function getTimeDurationMinutes(startTime = "", endTime = "") {
  const startMinutes = getTimeMinutes(startTime);
  const endMinutes = getTimeMinutes(endTime);
  if (startMinutes === null || endMinutes === null) return 0;
  const diff = endMinutes - startMinutes;
  return diff >= 0 ? diff : 0;
}

function getTimeMinutes(time = "") {
  const normalized = normalizeTimeValue(time);
  if (!normalized) return null;
  const [hour, minute] = normalized.split(":").map(Number);
  return hour * 60 + minute;
}

function formatTimeMinutes(minutes) {
  const value = clampInteger(minutes, 0, 1439);
  const hour = String(Math.floor(value / 60)).padStart(2, "0");
  const minute = String(value % 60).padStart(2, "0");
  return `${hour}:${minute}`;
}

function getDurationValue(value = "", max = 1439) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return 0;
  return Math.min(max, Math.floor(number));
}

function addMinutesToTime(startTime = "", durationMinutes = 0) {
  const startMinutes = getTimeMinutes(startTime);
  if (startMinutes === null) return "";
  const maxDuration = Math.max(0, 1439 - startMinutes);
  return formatTimeMinutes(startMinutes + getDurationValue(durationMinutes, maxDuration));
}

function handleRecurrenceTimeInput(fields, source = "") {
  syncRecurrenceTimeFields(fields, source);
  syncTaskRecurrenceFields(fields, { skipTimeSync: true });
}

function syncRecurrenceTimeFields(fields, source = "") {
  const startField = fields.recurrenceStartTime;
  const endField = fields.recurrenceEndTime;
  const durationField = fields.recurrenceDuration;
  if (!startField || !endField || !durationField) return;

  const startMinutes = getTimeMinutes(startField.value);
  const endMinutes = getTimeMinutes(endField.value);
  const hasDuration = durationField.value !== "";
  const duration = getDurationValue(durationField.value);

  if (source === "start") {
    if (startMinutes !== null && hasDuration) {
      const maxDuration = Math.max(0, 1439 - startMinutes);
      const nextDuration = getDurationValue(durationField.value, maxDuration);
      durationField.value = String(nextDuration);
      endField.value = addMinutesToTime(startField.value, nextDuration);
    } else if (startMinutes !== null && endMinutes !== null) {
      durationField.value = String(getTimeDurationMinutes(startField.value, endField.value));
    }
    return;
  }

  if (source === "end") {
    if (startMinutes !== null && endMinutes !== null && endMinutes < startMinutes) {
      endField.value = startField.value;
      durationField.value = "0";
      return;
    }
    if (startMinutes !== null && endMinutes !== null) {
      durationField.value = String(getTimeDurationMinutes(startField.value, endField.value));
    }
    return;
  }

  if (source === "duration") {
    if (startMinutes !== null && hasDuration) {
      const maxDuration = Math.max(0, 1439 - startMinutes);
      const nextDuration = getDurationValue(durationField.value, maxDuration);
      durationField.value = String(nextDuration);
      endField.value = addMinutesToTime(startField.value, nextDuration);
    }
    return;
  }

  if (startMinutes !== null && endMinutes !== null && !hasDuration) {
    durationField.value = String(getTimeDurationMinutes(startField.value, endField.value));
  } else if (startMinutes !== null && hasDuration && !endField.value) {
    endField.value = addMinutesToTime(startField.value, duration);
  }
}

function todayDate() {
  return parseDateString(todayString());
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

function getSelectedValues(select) {
  if (!select) return [];
  if (select.classList?.contains("search-multi-select")) {
    return parseSearchMultiSelectValues(select);
  }
  return [...select.selectedOptions]
    .map((option) => option.value)
    .filter(Boolean);
}

function setMultiSelectValues(select, values = []) {
  if (!select) return;
  if (select.classList?.contains("search-multi-select")) {
    setSearchMultiSelectValues(select, values, false);
    return;
  }
  const selected = new Set(values);
  [...select.options].forEach((option) => {
    option.selected = selected.has(option.value);
  });
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
  const { ownerEmail, createdAt, createdBy, createdByEmail, updatedAt, updatedBy, updatedByEmail, ...baseProject } = project;
  const phaseSchedules = project.phaseSchedules || createPhaseSchedules({
    [project.phase || "planning"]: {
      start: project.plannedStart || "",
      end: project.plannedEnd || "",
    },
  });
  const normalizedSchedules = createPhaseSchedules(phaseSchedules);
  const plannedRange = getProjectScheduleRange(project.plannedStart || "", project.plannedEnd || "", normalizedSchedules);
  const ownerIds = normalizeOwnerIds(project.internalOwnerIds, project);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, project), project);

  return {
    ...baseProject,
    ...owner,
    internalOwnerIds: ownerIds,
    ownerName: getOwnerNames(ownerIds, project),
    visibleToUids: normalizeVisibleToUids(project.visibleToUids),
    category: normalizeProjectCategory(project.category),
    description: project.description || "",
    tags: normalizeTextList(project.tags),
    collaborationTags: normalizeTextList(project.collaborationTags),
    phase: project.phase || "deal",
    status: normalizeProjectStatus(project.status || inferProjectStatusFromDates(project)),
    priority: normalizePriority(project.priority),
    phaseChangedAt: project.phaseChangedAt || todayString(),
    requirementRequest: project.requirementRequest || "",
    phaseSchedules: normalizedSchedules,
    plannedStart: plannedRange.start,
    plannedEnd: plannedRange.end,
    stageIds: normalizeTextList(project.stageIds),
    sortOrder: Number.isFinite(Number(project.sortOrder)) ? Number(project.sortOrder) : 0,
    relatedEmails: normalizeEmailList(project.relatedEmails),
    relatedLinks: normalizeLinkList(project.relatedLinks),
    closed: Boolean(project.closed || project.phase === "closed"),
    closedAt: project.closedAt || "",
    createdAt: project.createdAt || "",
    createdBy: project.createdBy || "",
    updatedAt: project.updatedAt || "",
    updatedBy: project.updatedBy || "",
  };
}

function normalizeProjectStage(stage = {}) {
  return {
    id: stage.id || createId(),
    projectId: stage.projectId || "",
    phaseId: stage.phaseId || getPhaseIdByLabel(stage.name) || "",
    name: String(stage.name || "").trim() || "未命名階段",
    description: stage.description || "",
    startDate: stage.startDate || stage.start || "",
    endDate: stage.endDate || stage.end || "",
    status: normalizeTaskStatus(stage.status || "not_started"),
    sortOrder: Number.isFinite(Number(stage.sortOrder)) ? Number(stage.sortOrder) : 0,
    taskIds: normalizeTextList(stage.taskIds),
    visibleToUids: normalizeVisibleToUids(stage.visibleToUids),
  };
}

function ensureProjectStages(projects = [], stages = []) {
  const rows = [...stages];
  const existingKeys = new Set(rows.map((stage) => `${stage.projectId}:${stage.phaseId || stage.name}`));

  projects.forEach((project) => {
    if (project.category === "general") return;
    const currentPhaseIndex = Math.max(0, phases.findIndex((phase) => phase.id === project.phase));
    phases.forEach((phase, index) => {
      const key = `${project.id}:${phase.label}`;
      if (existingKeys.has(key) || rows.some((stage) => stage.projectId === project.id && stage.id.endsWith(`-${phase.id}`))) return;
      const schedule = project.phaseSchedules?.[phase.id] || {};
      rows.push({
        id: `stage-${project.id}-${phase.id}`,
        projectId: project.id,
        phaseId: phase.id,
        name: phase.label,
        description: "",
        startDate: schedule.start || "",
        endDate: schedule.end || "",
        status: project.phase === phase.id ? "doing" : index < currentPhaseIndex ? "done" : "not_started",
        sortOrder: index + 1,
        taskIds: [],
      });
    });
  });

  return rows;
}

function normalizeDerivedScheduling(nextState) {
  const taskById = new Map(nextState.tasks.map((task) => [task.id, task]));
  const childrenByParent = new Map();
  nextState.tasks.forEach((task) => {
    if (!task.parentTaskId) return;
    if (!childrenByParent.has(task.parentTaskId)) childrenByParent.set(task.parentTaskId, []);
    childrenByParent.get(task.parentTaskId).push(task);
  });

  nextState.tasks = nextState.tasks.map((task) => {
    const children = childrenByParent.get(task.id) || [];
    return {
      ...task,
      taskType: task.parentTaskId ? "child" : children.length ? "parent" : normalizeTaskType(task),
    };
  });

  const tasksByStage = new Map();
  nextState.tasks.forEach((task) => {
    if (!task.stageId) return;
    if (!tasksByStage.has(task.stageId)) tasksByStage.set(task.stageId, []);
    tasksByStage.get(task.stageId).push(task);
  });

  const projectsById = new Map(nextState.projects.map((project) => [project.id, project]));
  nextState.projectStages = nextState.projectStages.map((stage) => {
    const stageTasks = tasksByStage.get(stage.id) || [];
    const project = projectsById.get(stage.projectId);
    const start = getEarliestDate(stageTasks.map((task) => getTaskTimelineStartFromTasks(task, nextState.tasks)).filter(Boolean));
    const end = getLatestDate(stageTasks.map((task) => getTaskTimelineEndFromTasks(task, nextState.tasks)).filter(Boolean));
    return {
      ...stage,
      startDate: start || stage.startDate || "",
      endDate: end || stage.endDate || "",
      taskIds: stageTasks.map((task) => task.id),
      visibleToUids: project ? normalizeVisibleToUids(project.visibleToUids) : normalizeVisibleToUids(stage.visibleToUids),
    };
  });

  const stageIdsByProject = new Map();
  nextState.projectStages.forEach((stage) => {
    if (!stageIdsByProject.has(stage.projectId)) stageIdsByProject.set(stage.projectId, []);
    stageIdsByProject.get(stage.projectId).push(stage.id);
  });
  nextState.projects = nextState.projects.map((project) => ({
    ...project,
    stageIds: stageIdsByProject.get(project.id) || [],
  }));

  return nextState;
}

function syncStateOwnershipVisibility() {
  state.systems = state.systems.map(syncSystemOwnershipVisibility);
  state.projects = state.projects.map(syncProjectOwnershipVisibility);
  state.projectStages = state.projectStages.map(syncProjectStageVisibility);
  state.tasks = state.tasks.map(syncTaskOwnershipVisibility);
  state = normalizeDerivedScheduling(state);
}

function syncSystemOwnershipVisibility(system) {
  const ownerIds = normalizeOwnerIds(system.internalOwnerIds, system);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, system), system);
  const visibleUids = normalizeVisibleToUids(system.visibleToUids);
  return {
    ...system,
    internalOwnerIds: ownerIds,
    ...owner,
    ownerName: getOwnerNames(ownerIds, system),
    visibleToUids: uniqueUids([...visibleUids, ...ownerIds]),
  };
}

function syncProjectOwnershipVisibility(project) {
  const ownerIds = normalizeOwnerIds(project.internalOwnerIds, project);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, project), project);
  const system = getSystem(project.systemId);
  const visibleUids = normalizeVisibleToUids(project.visibleToUids);
  const systemVisibleUids = system ? getVisibleOrOwnerUids(system) : [];
  return {
    ...project,
    internalOwnerIds: ownerIds,
    ...owner,
    ownerName: getOwnerNames(ownerIds, project),
    visibleToUids: uniqueUids([...visibleUids, ...systemVisibleUids, ...ownerIds]),
  };
}

function syncProjectStageVisibility(stage) {
  const project = getProject(stage.projectId);
  const visibleUids = normalizeVisibleToUids(stage.visibleToUids);
  return {
    ...stage,
    visibleToUids: project ? normalizeVisibleToUids(project.visibleToUids) : visibleUids,
  };
}

function syncTaskOwnershipVisibility(task) {
  const ownerIds = normalizeOwnerIds(task.internalOwnerIds, task);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, task), task);
  const scope = getTaskScope(task);
  let parentVisibleUids = [];

  if (scope === "system") {
    const system = getSystem(task.systemId);
    parentVisibleUids = system ? getVisibleOrOwnerUids(system) : normalizeVisibleToUids(task.visibleToUids);
  } else if (scope === "project") {
    const project = getProject(task.projectId);
    const system = getSystem(project?.systemId || task.systemId);
    parentVisibleUids = project
      ? normalizeVisibleToUids(project.visibleToUids).length
        ? normalizeVisibleToUids(project.visibleToUids)
        : uniqueUids([...getInternalOwnerIds(system), ...getInternalOwnerIds(project)])
      : normalizeVisibleToUids(task.visibleToUids);
  }

  const parentTask = task.parentTaskId ? getProjectTask(task.parentTaskId) : null;
  if (parentTask) parentVisibleUids = uniqueUids([...parentVisibleUids, ...normalizeVisibleToUids(parentTask.visibleToUids), ...getInternalOwnerIds(parentTask)]);

  return {
    ...task,
    internalOwnerIds: ownerIds,
    ...owner,
    ownerName: getOwnerNames(ownerIds, task),
    owner: getOwnerNames(ownerIds, task) || task.owner || "",
    visibleToUids: uniqueUids([...parentVisibleUids, ...ownerIds]),
  };
}

function saveState(options = {}) {
  syncStateOwnershipVisibility();
  persistViewPreferences();
  if (previewMode) {
    try {
      localStorage.setItem(previewStorageKey, JSON.stringify(state));
    } catch (error) {
      logSafeError("preview.save", error);
      showToast("預覽資料儲存失敗，請稍後再試。");
    }
    return;
  }
  if (!cloudReady) return;
  queueCloudSave(options.cloudWriteScope || null);
}

function saveTaskState(taskIds = []) {
  saveState({ cloudWriteScope: createCloudWriteScope("tasks", taskIds) });
}

function saveProjectOnlyState(projectIds = []) {
  saveState({ cloudWriteScope: createCloudWriteScope("projects", projectIds) });
}

function saveProjectStageState(stageIds = []) {
  saveState({ cloudWriteScope: createCloudWriteScope("projectStages", stageIds) });
}

function saveProjectState(projectIds = [], stageIds = [], taskIds = []) {
  saveState({
    cloudWriteScope: createCloudWriteScopeFromCollections({
      projects: projectIds,
      projectStages: stageIds,
      tasks: taskIds,
    }),
  });
}

function queueCloudSave(writeScope = null) {
  const normalizedScope = normalizeCloudWriteScope(writeScope);
  if (isTaskOnlyCloudWriteScope(normalizedScope)) {
    queueTaskCloudSave(normalizedScope);
    return;
  }
  if (isScopedCloudWriteScope(normalizedScope)) {
    queueProjectCloudSave(normalizedScope);
    return;
  }
  queueFullCloudSave();
}

function createCloudWriteScope(collectionName, ids = []) {
  const normalizedIds = uniqueUids(ids);
  return normalizedIds.length ? { collectionIds: { [collectionName]: normalizedIds } } : null;
}

function createCloudWriteScopeFromCollections(collectionIds = {}) {
  return normalizeCloudWriteScope({ collectionIds });
}

function normalizeCloudWriteScope(writeScope = null) {
  if (!writeScope?.collectionIds) return null;
  const collectionIds = Object.entries(writeScope.collectionIds).reduce((result, [collectionName, ids]) => {
    const normalizedIds = uniqueUids(ids || []);
    if (collectionName && normalizedIds.length) result[collectionName] = normalizedIds;
    return result;
  }, {});
  return Object.keys(collectionIds).length ? { collectionIds } : null;
}

function mergeCloudWriteScopes(currentScope = null, nextScope = null) {
  const normalizedNext = normalizeCloudWriteScope(nextScope);
  if (!normalizedNext) return currentScope ? normalizeCloudWriteScope(currentScope) : null;
  if (!currentScope) return normalizedNext;
  const collectionIds = { ...currentScope.collectionIds };
  Object.entries(normalizedNext.collectionIds).forEach(([collectionName, ids]) => {
    collectionIds[collectionName] = uniqueUids([...(collectionIds[collectionName] || []), ...ids]);
  });
  return { collectionIds };
}

function isScopedCloudWriteScope(writeScope = null) {
  return Boolean(normalizeCloudWriteScope(writeScope));
}

function isSingleCollectionCloudWriteScope(writeScope = null, collectionName = "") {
  const normalizedScope = normalizeCloudWriteScope(writeScope);
  if (!normalizedScope) return false;
  const collectionNames = Object.keys(normalizedScope.collectionIds);
  return collectionNames.length === 1 && collectionNames[0] === collectionName;
}

function isTaskOnlyCloudWriteScope(writeScope = null) {
  return isSingleCollectionCloudWriteScope(writeScope, "tasks");
}

function isProjectOnlyCloudWriteScope(writeScope = null) {
  return isSingleCollectionCloudWriteScope(writeScope, "projects");
}

function isProjectStageOnlyCloudWriteScope(writeScope = null) {
  return isSingleCollectionCloudWriteScope(writeScope, "projectStages");
}

function queueTaskCloudSave(writeScope) {
  pendingTaskCloudWriteScope = mergeCloudWriteScopes(pendingTaskCloudWriteScope, writeScope);
  window.clearTimeout(cloudTaskSaveTimer);
  cloudTaskSaveTimer = window.setTimeout(() => {
    const queuedScope = pendingTaskCloudWriteScope;
    pendingTaskCloudWriteScope = null;
    enqueueCloudSaveJob(queuedScope, { notifyOnFailure: true });
  }, 350);
}

function queueProjectCloudSave(writeScope) {
  pendingProjectCloudWriteScope = mergeCloudWriteScopes(pendingProjectCloudWriteScope, writeScope);
  window.clearTimeout(cloudProjectSaveTimer);
  cloudProjectSaveTimer = window.setTimeout(() => {
    const queuedScope = pendingProjectCloudWriteScope;
    pendingProjectCloudWriteScope = null;
    enqueueCloudSaveJob(queuedScope, { notifyOnFailure: true });
  }, 250);
}

function queueFullCloudSave() {
  pendingFullCloudSave = true;
  window.clearTimeout(cloudFullSaveTimer);
  cloudFullSaveTimer = window.setTimeout(() => {
    if (!pendingFullCloudSave) return;
    pendingFullCloudSave = false;
    enqueueCloudSaveJob(null, { notifyOnFailure: false });
  }, 250);
}

function enqueueCloudSaveJob(writeScope = null, options = {}) {
  cloudSaveChain = cloudSaveChain
    .then(() => pushStateToCloud(writeScope))
    .catch((error) => {
      logSafeError("cloud.save", error);
      if (options.notifyOnFailure) {
        showToast(`雲端儲存失敗：${getReadableError(error)}`);
      }
    });
}

function getCloudWriteCollections(writeScope = null) {
  if (!writeScope) return ["systems", "projects", "projectStages", "tasks"];
  return ["systems", "projects", "projectStages", "tasks"].filter((collectionName) => {
    return (writeScope.collectionIds?.[collectionName] || []).length;
  });
}

function getCloudWriteTaskIds(writeScope = null) {
  return uniqueUids(writeScope?.collectionIds?.tasks || []);
}

function getCloudWriteProjectIds(writeScope = null) {
  return uniqueUids(writeScope?.collectionIds?.projects || []);
}

function getCloudWriteProjectStageIds(writeScope = null) {
  return uniqueUids(writeScope?.collectionIds?.projectStages || []);
}

function cloudWriteScopeAllows(writeScope = null, collectionName, id) {
  if (!writeScope) return true;
  return (writeScope.collectionIds?.[collectionName] || []).includes(id);
}

async function initializeCloudApp() {
  setAuthStatus("正在初始化雲端服務...", "請稍候。");

  if (!configureFirebase()) return;

  try {
    const removedLegacyAuthCache = clearLegacyAuthLocalStorage();
    await enforceSessionAuthPersistence();
    if (removedLegacyAuthCache) {
      await auth.signOut().catch((error) => logSafeError("auth.forceSignOutAfterLegacyCache", error));
    }
  } catch (error) {
    logSafeError("auth.persistence", error);
    showAuthScreen("Secure sign-in setup failed.", getReadableError(error), false, true);
    return;
  }

  auth.useDeviceLanguage?.();
  auth.onAuthStateChanged(async (user) => {
    const sessionVersion = ++authSessionVersion;
    if (previewMode) return;
    cleanupCloudSubscriptions();
    closeAdminPage();
    cloudReady = false;
    currentFirebaseUser = user;
    currentSafeUser = sanitizeUser(user);

    if (!user) {
      currentProfile = null;
      currentSafeUser = sanitizeUser(null);
      currentAccountRequest = null;
      assignableOwners = [];
      state = createEmptyState();
      remoteState = createEmptyState();
      remoteLoaded = { systems: false, projects: false, projectStages: false, tasks: false };
      lastSyncedState = createEmptyStateMaps();
      showAuthScreen("請使用 Google 帳號登入。管理員需先在後台建立使用者帳號。");
      updateAccountUi();
      return;
    }

    showAuthScreen("正在確認帳號權限...", "第一次登入可能需要幾秒鐘建立雲端帳號。", true);

    try {
      const result = await callFunction("bootstrapCurrentUser", {
        name: currentSafeUser.displayName || "",
      });
      await handleBootstrapResult(result.data || {}, user, sessionVersion);
    } catch (error) {
      logSafeError("auth.bootstrap", error);
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
    logSafeError("firebase.configure", error);
    showAuthScreen("Firebase 初始化失敗。", getReadableError(error), false, true);
    return false;
  }
}

function showAuthScreen(message, helpText = "若尚未被授權，請聯絡系統管理員開通帳號。", loading = false, disabled = false, keepRequestPanel = false) {
  els.authScreen?.classList.remove("hidden");
  els.appShell?.classList.add("hidden");
  els.adminPage?.classList.add("hidden");
  if (!keepRequestPanel) hideAccountRequestPanel();
  setAuthStatus(message, helpText, loading || disabled);
}

async function enforceSessionAuthPersistence() {
  const sessionPersistence = firebase?.auth?.Auth?.Persistence?.SESSION;
  if (!auth?.setPersistence || !sessionPersistence) return;
  await auth.setPersistence(sessionPersistence);
}

function clearLegacyAuthLocalStorage() {
  try {
    const legacyKeys = Object.keys(localStorage)
      .filter((key) => key.startsWith("firebase:authUser:") || key.includes(":authUser:"));
    legacyKeys.forEach((key) => localStorage.removeItem(key));
    return legacyKeys.length;
  } catch (error) {
    logSafeError("auth.clearLegacyLocalStorage", error);
    return 0;
  }
}

function setAuthStatus(message, helpText = "", buttonDisabled = false) {
  if (els.authStatusText) els.authStatusText.textContent = message;
  if (els.authHelpText) els.authHelpText.textContent = helpText;
  if (els.googleSignInButton) els.googleSignInButton.disabled = buttonDisabled;
}

function showAppShell() {
  els.authScreen?.classList.add("hidden");
  els.appShell?.classList.remove("hidden");
  hideAccountRequestPanel();
}

async function handleBootstrapResult(data, user, sessionVersion) {
  if (sessionVersion !== authSessionVersion || user?.uid !== auth?.currentUser?.uid) return;

  const outcome = data.outcome || (data.profile ? "active" : "needs_request");
  if (outcome === "active" && data.profile) {
    await user.getIdToken(true);
    if (sessionVersion !== authSessionVersion || user.uid !== auth?.currentUser?.uid) return;
    currentProfile = normalizeProfile(data.profile || {});
    currentAccountRequest = null;
    await refreshAssignableOwners();
    updateAccountUi();
    startProfileListener(user.uid);
    startCloudListeners();
    return;
  }

  currentProfile = null;
  assignableOwners = [];
  state = createEmptyState();
  remoteState = createEmptyState();
  remoteLoaded = { systems: false, projects: false, projectStages: false, tasks: false };
  lastSyncedState = createEmptyStateMaps();
  cloudReady = false;
  currentAccountRequest = normalizeAccountRequest({
    uid: user.uid,
    emailMasked: currentSafeUser.emailMasked,
    name: currentSafeUser.displayName || "",
    ...(data.request || {}),
    status: outcome === "rejected" ? "rejected" : outcome === "pending" ? "pending" : "needs_request",
  });
  showAccountRequestPanel(outcome, currentAccountRequest);
  updateAccountUi();
}

function showAccountRequestPanel(outcome, request = currentAccountRequest) {
  const normalizedRequest = normalizeAccountRequest(request);
  currentAccountRequest = normalizedRequest;
  const panelOutcome = outcome || normalizedRequest.status || "needs_request";
  const isPending = panelOutcome === "pending";
  const isRejected = panelOutcome === "rejected";
  const message = isPending
    ? "帳號申請已送出，等待管理員審核。"
    : isRejected
      ? "帳號申請未通過。"
      : "建立帳號申請";
  const helpText = isPending
    ? "審核通過後，按「重新檢查」即可進入系統。"
    : isRejected
      ? "可修改名稱後重新送出，或聯絡管理員確認。"
      : "請填寫顯示名稱，送出後由管理員審核。";

  showAuthScreen(message, helpText, false, true, true);
  els.authActions?.classList.add("hidden");
  els.accountRequestPanel?.classList.remove("hidden");
  if (els.accountRequestEmail) {
    const accountLabel = normalizedRequest.emailMasked || maskEmail(normalizedRequest.email) || currentSafeUser.emailMasked || "";
    els.accountRequestEmail.textContent = `目前登入：${accountLabel}`;
  }
  if (els.accountRequestName) {
    els.accountRequestName.value = normalizedRequest.name || currentSafeUser.displayName || "";
    els.accountRequestName.disabled = isPending;
  }
  if (els.accountRequestSubmitButton) {
    els.accountRequestSubmitButton.textContent = isRejected ? "重新送出申請" : "送出帳號申請";
    els.accountRequestSubmitButton.classList.toggle("hidden", isPending);
    els.accountRequestSubmitButton.disabled = false;
  }
  if (els.accountRequestCheckButton) {
    els.accountRequestCheckButton.classList.toggle("hidden", !isPending && !isRejected);
    els.accountRequestCheckButton.disabled = false;
  }
  if (els.accountRequestSignOutButton) els.accountRequestSignOutButton.disabled = false;
}

function hideAccountRequestPanel() {
  els.accountRequestPanel?.classList.add("hidden");
  els.authActions?.classList.remove("hidden");
  if (els.accountRequestName) els.accountRequestName.disabled = false;
  setAccountRequestControlsDisabled(false);
}

function setAccountRequestControlsDisabled(disabled) {
  if (els.accountRequestSubmitButton) els.accountRequestSubmitButton.disabled = disabled;
  if (els.accountRequestCheckButton) els.accountRequestCheckButton.disabled = disabled;
  if (els.accountRequestSignOutButton) els.accountRequestSignOutButton.disabled = disabled;
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
  currentSafeUser = sanitizeUser(null);
  currentAccountRequest = null;
  currentProfile = {
    uid: "preview",
    email: "",
    name: "預覽模式",
    role: "user",
    status: "active",
  };
  assignableOwners = [normalizeOwnerAccount(currentProfile)];
  state = loadPreviewState();
  remoteState = createEmptyState();
  remoteLoaded = { systems: false, projects: false, projectStages: false, tasks: false };
  lastSyncedState = createEmptyStateMaps();

  showAppShell();
  updateAccountUi();
  render();
  showToast("已進入預覽模式，資料只會保存在這台瀏覽器。");
}

function exitPreviewMode() {
  previewMode = false;
  currentProfile = null;
  currentAccountRequest = null;
  assignableOwners = [];
  currentFirebaseUser = auth?.currentUser || null;
  currentSafeUser = sanitizeUser(currentFirebaseUser);
  state = createEmptyState();
  remoteState = createEmptyState();
  remoteLoaded = { systems: false, projects: false, projectStages: false, tasks: false };
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
    logSafeError("auth.signIn", error);
    setAuthStatus("Google 登入失敗。", getReadableError(error));
  } finally {
    if (!auth.currentUser && els.googleSignInButton) els.googleSignInButton.disabled = false;
  }
}

async function handleAccountRequestSubmit(event) {
  event.preventDefault();
  if (!auth?.currentUser) return;

  const name = (els.accountRequestName?.value || "").trim();
  if (!name) {
    setAuthStatus("請先輸入顯示名稱。", "送出後管理員會在後台審核你的帳號。", false, true, true);
    return;
  }

  setAccountRequestControlsDisabled(true);
  setAuthStatus("正在送出帳號申請...", "請稍候。", false, true);

  try {
    const result = await callFunction("submitAccountRequest", { name });
    currentAccountRequest = normalizeAccountRequest(result.data?.request || {
      uid: auth.currentUser.uid,
      emailMasked: currentSafeUser.emailMasked,
      name,
      status: "pending",
    });
    showAccountRequestPanel("pending", currentAccountRequest);
  } catch (error) {
    logSafeError("accountRequest.submit", error);
    showAccountRequestPanel(currentAccountRequest?.status || "needs_request", {
      ...currentAccountRequest,
      name,
    });
    setAuthStatus("帳號申請送出失敗。", getReadableError(error), false, true, true);
  } finally {
    setAccountRequestControlsDisabled(false);
  }
}

async function handleAccountRequestCheck() {
  const user = auth?.currentUser;
  if (!user) return;

  const sessionVersion = authSessionVersion;
  setAccountRequestControlsDisabled(true);
  setAuthStatus("正在重新檢查審核狀態...", "請稍候。", false, true, true);

  try {
    const result = await callFunction("bootstrapCurrentUser", {
      name: els.accountRequestName?.value || currentSafeUser.displayName || "",
    });
    await handleBootstrapResult(result.data || {}, user, sessionVersion);
  } catch (error) {
    logSafeError("accountRequest.check", error);
    showAccountRequestPanel(currentAccountRequest?.status || "pending", currentAccountRequest);
    setAuthStatus("重新檢查失敗。", getReadableError(error), false, true, true);
  } finally {
    setAccountRequestControlsDisabled(false);
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
  currentAccountRequest = null;
  currentFirebaseUser = null;
  currentSafeUser = sanitizeUser(null);
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
  remoteLoaded = { systems: false, projects: false, projectStages: false, tasks: false };

  if (!isAdminProfile()) {
    loadVisibleWorkspaceFromCloud().catch((error) => {
      logSafeError("workspace.loadVisible", error);
      showToast(`雲端資料讀取失敗：${getReadableError(error)}`);
      if (error.code === "permission-denied") signOutCurrentUser();
    });
    return;
  }

  ["systems", "projects", "projectStages", "tasks"].forEach((collectionName) => {
    const collectionRef = db.collection(collectionName);
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      remoteState[collectionName] = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort(compareCloudRecords);
      remoteLoaded[collectionName] = true;
      if (Object.values(remoteLoaded).every(Boolean)) {
        applyRemoteState();
      }
    }, (error) => {
      logSafeError(`firestore.listen.${collectionName}`, error);
      showToast(`雲端資料讀取失敗：${getReadableError(error)}`);
      if (error.code === "permission-denied") signOutCurrentUser();
    });
    cloudUnsubscribes.push(unsubscribe);
  });
}

async function loadVisibleWorkspaceFromCloud() {
  const requestUid = currentFirebaseUser?.uid || "";
  const result = await callFunction("loadVisibleWorkspace");
  if (!requestUid || requestUid !== currentFirebaseUser?.uid) return false;
  remoteState = hydrateCloudState(result.data?.state || {});
  remoteLoaded = { systems: true, projects: true, projectStages: true, tasks: true };
  applyRemoteState();
  return true;
}

async function refreshVisibleWorkspaceAfterSave() {
  try {
    await loadVisibleWorkspaceFromCloud();
  } catch (error) {
    logSafeError("workspace.refreshAfterSave", error);
    showToast(`雲端資料重新整理失敗：${getReadableError(error)}`);
  }
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
  const recurringCleanupTaskIds = consumePendingRecurringOccurrenceCleanupTaskIds();
  showAppShell();
  updateAccountUi();
  if (recurringCleanupTaskIds.length) saveTaskState(recurringCleanupTaskIds);
  render();
  refreshAssignableOwners()
    .then(() => render())
    .catch((error) => logSafeError("owners.refreshAfterRemote", error));

  if (currentProfile && !currentProfile.name) {
    openProfileDialog(true);
  }
}

async function pushStateToCloud(writeScope = null) {
  if (!cloudReady || !db || !currentFirebaseUser) return;

  const deferredProjectWrites = syncProjectVisibilityForCloudCreate(getCloudWriteProjectIds(writeScope));
  if (deferredProjectWrites.length && isProjectOnlyCloudWriteScope(writeScope)) {
    logDeferredCloudWrites(deferredProjectWrites);
    return;
  }

  const deferredStageWrites = syncProjectStageVisibilityForCloudWrite(getCloudWriteProjectStageIds(writeScope));
  if (deferredStageWrites.length && isProjectStageOnlyCloudWriteScope(writeScope)) {
    logDeferredCloudWrites(deferredStageWrites);
    return;
  }

  const deferredTaskWrites = syncTaskVisibilityForCloudWrite(getCloudWriteTaskIds(writeScope));
  if (deferredTaskWrites.length && isTaskOnlyCloudWriteScope(writeScope)) {
    logDeferredCloudWrites(deferredTaskWrites);
    return;
  }

  const currentMaps = stateToMaps(state);
  const previousMaps = getLastSyncedStateMaps();
  const writeContext = {
    uid: currentProfile?.uid || currentFirebaseUser?.uid || "",
    currentMaps,
    previousMaps,
  };
  const skippedWrites = [];
  let batch = db.batch();
  let operations = 0;
  let committedChanges = false;
  let batchWrites = [];
  const committedWrites = [];

  const commitIfNeeded = async (force = false) => {
    if (!operations) return;
    if (!force && operations < 450) return;
    const writes = batchWrites;
    try {
      await batch.commit();
    } catch (error) {
      logFailedCloudWrites(writes, error);
      throw error;
    }
    committedChanges = true;
    committedWrites.push(...writes);
    batch = db.batch();
    operations = 0;
    batchWrites = [];
  };

  for (const collectionName of getCloudWriteCollections(writeScope)) {
    const currentMap = currentMaps[collectionName];
    const previousMap = previousMaps[collectionName];
    const collectionRef = db.collection(collectionName);

    for (const [id, item] of currentMap.entries()) {
      if (!cloudWriteScopeAllows(writeScope, collectionName, id)) continue;
      const previous = previousMap.get(id);
      if (!previous || hasCloudDataChanged(item, previous)) {
        const action = previous ? "update" : "create";
        if (!canWriteCloudRecord(collectionName, action, item, previous, writeContext)) {
          skippedWrites.push(createCloudWriteLogEntry(collectionName, action, id, item));
          continue;
        }
        const documentRef = collectionRef.doc(id);
        const documentData = prepareCloudDocument(item, previous);
        const projectCreatePayloadDebug = collectionName === "projects" && action === "create"
          ? getProjectCreatePayloadDebug(id, documentData)
          : null;
        if (projectCreatePayloadDebug) {
          logProjectCreatePayload(id, documentData, projectCreatePayloadDebug);
        }
        if (previous) {
          batch.set(documentRef, documentData, { merge: true });
        } else {
          batch.set(documentRef, documentData);
        }
        operations += 1;
        batchWrites.push(createCloudWriteLogEntry(
          collectionName,
          action,
          id,
          item,
          projectCreatePayloadDebug ? { finalPayload: projectCreatePayloadDebug } : {},
        ));
        await commitIfNeeded();
      }
    }

    for (const id of previousMap.keys()) {
      if (!cloudWriteScopeAllows(writeScope, collectionName, id)) continue;
      if (!currentMap.has(id)) {
        const previous = previousMap.get(id);
        if (!canWriteCloudRecord(collectionName, "delete", null, previous, writeContext)) {
          skippedWrites.push(createCloudWriteLogEntry(collectionName, "delete", id, previous));
          continue;
        }
        batch.delete(collectionRef.doc(id));
        operations += 1;
        batchWrites.push(createCloudWriteLogEntry(collectionName, "delete", id, previous));
        await commitIfNeeded();
      }
    }
  }

  await commitIfNeeded(true);

  if (skippedWrites.length) {
    logSkippedCloudWrites(skippedWrites);
    if (isScopedCloudWriteScope(writeScope) && !committedWrites.length) {
      throw createCloudWriteSkippedError(skippedWrites);
    }
  }

  if (committedWrites.length && (!skippedWrites.length || isScopedCloudWriteScope(writeScope))) {
    updateLastSyncedStateAfterCloudWrite(committedWrites, currentMaps, writeScope);
    queueDeferredProjectStagesAfterProjectCommit(committedWrites);
  }

  if (!isAdminProfile() && (committedChanges || skippedWrites.length)) {
    await refreshVisibleWorkspaceAfterSave();
  }
}

function getLastSyncedStateMaps() {
  return {
    systems: lastSyncedState.systems || new Map(),
    projects: lastSyncedState.projects || new Map(),
    projectStages: lastSyncedState.projectStages || new Map(),
    tasks: lastSyncedState.tasks || new Map(),
  };
}

function syncProjectVisibilityForCloudCreate(projectIds = []) {
  const normalizedProjectIds = uniqueUids(projectIds);
  if (!normalizedProjectIds.length) return [];

  const projectIdSet = new Set(normalizedProjectIds);
  const syncedMaps = getLastSyncedStateMaps();
  const deferredWrites = [];

  state.projects = state.projects.map((project) => {
    if (!projectIdSet.has(project.id) || syncedMaps.projects.has(project.id)) return project;

    const syncedSystem = getSyncedSystemForProjectCreate(project.systemId);
    if (!syncedSystem && !isAdminProfile()) {
      deferredWrites.push(createCloudWriteLogEntry("projects", "create", project.id, project, {
        reason: "system-parent-not-synced",
      }));
      return project;
    }

    if (!syncedSystem) return project;

    const ownerIds = getRuleOwnerIds(project);
    return {
      ...project,
      visibleToUids: uniqueUids([...getRuleVisibleIds(syncedSystem), ...ownerIds]),
    };
  });

  return deferredWrites;
}

function syncProjectStageVisibilityForCloudWrite(stageIds = []) {
  const normalizedStageIds = uniqueUids(stageIds);
  if (!normalizedStageIds.length) return [];

  const stageIdSet = new Set(normalizedStageIds);
  const syncedMaps = getLastSyncedStateMaps();
  const deferredWrites = [];

  state.projectStages = state.projectStages.map((stage) => {
    if (!stageIdSet.has(stage.id)) return stage;

    const syncedProject = syncedMaps.projects.get(stage.projectId);
    if (!syncedProject && !syncedMaps.projectStages.has(stage.id)) {
      const localProject = getProject(stage.projectId);
      if (localProject) {
        const reason = "project-parent-not-synced";
        rememberDeferredProjectStageWrites(stage.projectId, [stage.id]);
        deferredWrites.push(createCloudWriteLogEntry("projectStages", "create", stage.id, stage, {
          reason,
          projectId: stage.projectId || "",
        }));
        return stage;
      }
    }

    return {
      ...stage,
      visibleToUids: syncedProject ? cloudVisibleIds(syncedProject) : normalizeVisibleToUids(stage.visibleToUids),
    };
  });

  return deferredWrites;
}

function syncTaskVisibilityForCloudWrite(taskIds = []) {
  const normalizedTaskIds = uniqueUids(taskIds);
  if (!normalizedTaskIds.length) return [];

  const taskIdSet = new Set(normalizedTaskIds);
  const syncedMaps = getLastSyncedStateMaps();
  const deferredWrites = [];

  state.tasks = state.tasks.map((task) => {
    if (!taskIdSet.has(task.id)) return task;

    const ownerIds = normalizeOwnerIds(task.internalOwnerIds, task);
    const parent = getSyncedParentVisibleUidsForTask(task, syncedMaps);
    if (parent.deferCreate && !syncedMaps.tasks.has(task.id)) {
      deferredWrites.push(createCloudWriteLogEntry("tasks", "create", task.id, task, {
        reason: parent.reason,
      }));
      return task;
    }

    return {
      ...task,
      visibleToUids: uniqueUids([...parent.visibleUids, ...ownerIds]),
    };
  });

  return deferredWrites;
}

function getSyncedParentVisibleUidsForTask(task = {}, syncedMaps = getLastSyncedStateMaps()) {
  const scope = getTaskScope(task);
  if (scope === "general") return { visibleUids: [] };

  if (scope === "system") {
    const syncedSystem = syncedMaps.systems.get(task.systemId);
    if (syncedSystem) return { visibleUids: getVisibleOrOwnerUids(syncedSystem) };
    const localSystem = getSystem(task.systemId);
    return {
      visibleUids: localSystem ? getVisibleOrOwnerUids(localSystem) : normalizeVisibleToUids(task.visibleToUids),
      deferCreate: Boolean(localSystem),
      reason: "system-parent-not-synced",
    };
  }

  if (scope === "project") {
    const syncedProject = syncedMaps.projects.get(task.projectId);
    if (syncedProject) return { visibleUids: getVisibleOrOwnerUids(syncedProject) };
    const localProject = getProject(task.projectId);
    return {
      visibleUids: localProject ? getVisibleOrOwnerUids(localProject) : normalizeVisibleToUids(task.visibleToUids),
      deferCreate: Boolean(localProject),
      reason: "project-parent-not-synced",
    };
  }

  return { visibleUids: normalizeVisibleToUids(task.visibleToUids) };
}

function getSyncedSystemForProjectCreate(systemId) {
  const normalizedSystemId = String(systemId || "").trim();
  return normalizedSystemId ? getLastSyncedStateMaps().systems.get(normalizedSystemId) || null : null;
}

function getProjectCreateRuleCheck(project = {}) {
  const diagnostics = getProjectCreateRuleDiagnostics(project.systemId, project);

  if (isAdminProfile()) {
    return {
      allowed: true,
      reason: "",
      expectedVisibleToUids: diagnostics.expectedVisibleToUids.length
        ? diagnostics.expectedVisibleToUids
        : normalizeVisibleToUids(project.visibleToUids),
    };
  }

  return {
    allowed: diagnostics.canCreate,
    reason: getProjectCreateFailureReason(diagnostics),
    expectedVisibleToUids: diagnostics.expectedVisibleToUids,
  };
}

function logBlockedCloudProjectCreate(project = {}, reason = "current-user-not-system-owner") {
  console.warn("[cloud.project.create.blocked]", {
    reason,
    details: getProjectCreateDebugDetails(project.systemId, project),
  });
}

function getProjectCreateRuleDiagnostics(systemId, project = {}) {
  const syncedSystem = getSyncedSystemForProjectCreate(systemId);
  const currentUid = currentProfile?.uid || currentFirebaseUser?.uid || "";
  const systemOwnerIds = getRuleOwnerIds(syncedSystem);
  const systemVisibleToUids = getRuleVisibleIds(syncedSystem);
  const projectOwnerIds = getRuleOwnerIds(project);
  const projectVisibleToUids = normalizeVisibleToUids(project.visibleToUids);
  const expectedVisibleToUids = syncedSystem ? uniqueUids([...systemVisibleToUids, ...projectOwnerIds]) : [];
  const ownerUid = String(project.ownerUid || "").trim();
  const validOwnerFields = Boolean(
    ownerUid
    && typeof project.ownerName === "string"
    && projectOwnerIds.includes(ownerUid)
    && isRuleOwnerKnownActive(ownerUid),
  );
  const visibleMatches = Boolean(syncedSystem && cloudUidListEquals(projectVisibleToUids, expectedVisibleToUids));
  const systemExists = Boolean(syncedSystem);
  const isCurrentSystemOwner = systemOwnerIds.includes(currentUid);

  return {
    systemId: String(systemId || "").trim(),
    currentUid,
    ownerUid,
    ownerNameType: typeof project.ownerName,
    systemExists,
    systemOwnerIds,
    systemVisibleToUids,
    projectOwnerIds,
    projectOwnerIsKnownActive: isRuleOwnerKnownActive(ownerUid),
    ownerUidInProjectOwnerIds: projectOwnerIds.includes(ownerUid),
    projectVisibleToUids,
    expectedVisibleToUids,
    visibleMatches,
    validOwnerFields,
    isCurrentSystemOwner,
    canCreate: systemExists && isCurrentSystemOwner && validOwnerFields && visibleMatches,
  };
}

function getProjectCreateFailureReason(details = {}) {
  if (!details.systemExists) return "system-parent-not-synced";
  if (!details.isCurrentSystemOwner) return "current-user-not-system-owner";
  if (!details.validOwnerFields) return "project-owner-not-active";
  if (!details.visibleMatches) return "project-visible-mismatch";
  return details.canCreate ? "" : "project-create-rule-mismatch";
}

function isRuleOwnerKnownActive(uid) {
  const normalizedUid = String(uid || "").trim();
  if (!normalizedUid) return false;
  const owner = assignableOwners.find((item) => item.uid === normalizedUid)
    || (currentProfile?.uid === normalizedUid ? normalizeOwnerAccount(currentProfile) : null);
  return owner?.status === "active";
}

function rememberDeferredProjectStageWrites(projectId, stageIds = []) {
  const normalizedProjectId = String(projectId || "").trim();
  const normalizedStageIds = uniqueUids(stageIds);
  if (!normalizedProjectId || !normalizedStageIds.length) return [];

  const existingStageIds = deferredProjectStageIdsByProject.get(normalizedProjectId) || [];
  const nextStageIds = uniqueUids([...existingStageIds, ...normalizedStageIds]);
  deferredProjectStageIdsByProject.set(normalizedProjectId, nextStageIds);
  return nextStageIds;
}

function deferProjectStageCloudWrites(projectId, stageIds = [], reason = "project-parent-not-synced") {
  const nextStageIds = rememberDeferredProjectStageWrites(projectId, stageIds);
  if (!nextStageIds.length) return;

  const deferredWrites = uniqueUids(stageIds).map((stageId) => {
    const stage = state.projectStages.find((item) => item.id === stageId) || { id: stageId, projectId };
    return createCloudWriteLogEntry("projectStages", "create", stageId, stage, {
      reason,
      projectId: stage.projectId || projectId || "",
    });
  });
  logDeferredCloudWrites(deferredWrites);
}

function queueDeferredProjectStagesAfterProjectCommit(committedWrites = []) {
  const projectIds = uniqueUids(committedWrites
    .filter((write) => write.collectionName === "projects" && write.action !== "delete")
    .map((write) => write.id));
  if (!projectIds.length || !deferredProjectStageIdsByProject.size) return;

  const syncedMaps = getLastSyncedStateMaps();
  projectIds.forEach((projectId) => {
    const stageIds = uniqueUids(deferredProjectStageIdsByProject.get(projectId) || []);
    if (!stageIds.length) return;

    if (!syncedMaps.projects.has(projectId)) {
      const deferredWrites = stageIds.map((stageId) => {
        const stage = state.projectStages.find((item) => item.id === stageId) || { id: stageId, projectId };
        return createCloudWriteLogEntry("projectStages", "create", stageId, stage, {
          reason: "project-parent-not-synced",
          projectId,
        });
      });
      logDeferredCloudWrites(deferredWrites);
      return;
    }

    deferredProjectStageIdsByProject.delete(projectId);
    const availableStageIds = stageIds.filter((stageId) => state.projectStages.some((stage) => stage.id === stageId));
    if (!availableStageIds.length) return;

    console.info("[cloud.write.resumed]", availableStageIds.map((stageId) => {
      const stage = state.projectStages.find((item) => item.id === stageId) || { id: stageId, projectId };
      return createCloudWriteLogEntry("projectStages", "create", stageId, stage, {
        reason: "project-parent-synced",
        projectId,
      });
    }));
    saveProjectStageState(availableStageIds);
  });
}

function updateLastSyncedStateAfterCloudWrite(committedWrites = [], currentMaps, writeScope = null) {
  if (!isScopedCloudWriteScope(writeScope)) {
    lastSyncedState = stateToMaps(state);
    return;
  }

  const nextSyncedState = getLastSyncedStateMaps();
  const nextMaps = {
    systems: new Map(nextSyncedState.systems),
    projects: new Map(nextSyncedState.projects),
    projectStages: new Map(nextSyncedState.projectStages),
    tasks: new Map(nextSyncedState.tasks),
  };
  committedWrites.forEach((write) => {
    const syncedMap = nextMaps[write.collectionName];
    const currentMap = currentMaps[write.collectionName];
    if (!syncedMap || !currentMap) return;
    if (write.action === "delete") {
      syncedMap.delete(write.id);
      return;
    }
    const currentRecord = currentMap.get(write.id);
    if (currentRecord) syncedMap.set(write.id, currentRecord);
  });
  lastSyncedState = {
    ...nextMaps,
  };
}

function canWriteCloudRecord(collectionName, action, next, previous, context) {
  if (isAdminProfile()) return true;
  if (!context.uid || currentProfile?.status !== "active") return false;

  if (collectionName === "systems") {
    if (action === "create") return canCreateCloudSystem(next, context);
    if (action === "update") return canUpdateCloudSystem(next, previous, context);
    return false;
  }

  if (collectionName === "projects") {
    if (action === "create") return canCreateCloudProject(next, context);
    if (action === "update") return canUpdateCloudProject(next, previous, context);
    if (action === "delete") return canDeleteCloudProject(previous, context);
  }

  if (collectionName === "projectStages") {
    if (action === "create") return canCreateCloudProjectStage(next, context);
    if (action === "update") return canUpdateCloudProjectStage(next, previous, context);
    if (action === "delete") return canDeleteCloudProjectStage(previous, context);
  }

  if (collectionName === "tasks") {
    if (action === "create") return canCreateCloudTask(next, context);
    if (action === "update") return canUpdateCloudTask(next, previous, context);
    if (action === "delete") return canDeleteCloudTask(previous, context);
  }

  return false;
}

function canCreateCloudSystem(system, context) {
  const ownerIds = getCloudOwnerIds(system);
  return validCloudSystem(system, context)
    && (ownerIds.includes(context.uid) || cloudOwnerIsAdmin(system?.ownerUid));
}

function canUpdateCloudSystem(next, previous, context) {
  return Boolean(previous)
    && getCloudOwnerIds(previous).includes(context.uid)
    && cloudOwnerIdentityUnchanged(next, previous)
    && validCloudSystem(next, context);
}

function canCreateCloudProject(project, context) {
  return validCloudProject(project, context)
    && cloudIsSystemOwner(project?.systemId, context);
}

function canUpdateCloudProject(next, previous, context) {
  return Boolean(previous)
    && validCloudProject(next, context, previous)
    && next?.systemId === previous.systemId
    && (
      cloudIsSystemOwner(previous.systemId, context)
      || (
        getCloudOwnerIds(previous).includes(context.uid)
        && cloudOwnerIdentityUnchanged(next, previous)
      )
    );
}

function canDeleteCloudProject(project, context) {
  return Boolean(project) && cloudIsSystemOwner(project.systemId, context);
}

function canCreateCloudProjectStage(stage, context) {
  const project = getCloudProjectAfter(stage?.projectId, context);
  return validCloudProjectStageAfter(stage, context)
    && (
      cloudIsProjectOwnerAfter(stage.projectId, context)
      || cloudIsSystemOwner(project?.systemId, context)
    );
}

function canUpdateCloudProjectStage(next, previous, context) {
  const project = getCloudProject(previous?.projectId, context);
  return Boolean(previous)
    && validCloudProjectStageAfter(next, context)
    && next?.projectId === previous.projectId
    && (
      cloudIsProjectOwner(previous.projectId, context)
      || cloudIsSystemOwner(project?.systemId, context)
    );
}

function canDeleteCloudProjectStage(stage, context) {
  const project = getCloudProject(stage?.projectId, context);
  return Boolean(stage)
    && (
      cloudIsProjectOwner(stage.projectId, context)
      || cloudIsSystemOwner(project?.systemId, context)
    );
}

function canCreateCloudTask(task, context) {
  const scope = getTaskScope(task);
  return validCloudTask(task, context)
    && (
      (scope === "general" && (getCloudOwnerIds(task).includes(context.uid) || cloudOwnerIsAdmin(task?.ownerUid)))
      || (scope === "system" && cloudCanSeeSystem(task?.systemId, context))
      || (scope === "project" && cloudCanSeeProject(task?.projectId, context))
    );
}

function canUpdateCloudTask(next, previous, context) {
  const visibleOwnerScopeUpdate = Boolean(previous)
    && cloudVisibleToCurrentUser(previous, context)
    && cloudOwnerIdentityUnchanged(next, previous)
    && cloudTaskScopeUnchanged(next, previous);

  return Boolean(previous)
    && (
      (
        visibleOwnerScopeUpdate
        && validCloudTaskWithVisibleFallback(next, previous, context)
      )
      || (
        validCloudTask(next, context)
        &&
        canAssignCloudTaskInScope(previous, context)
        && canAssignCloudTaskInScope(next, context)
      )
    );
}

function canDeleteCloudTask(task, context) {
  return Boolean(task) && cloudVisibleToCurrentUser(task, context);
}

function canAssignCloudTaskInScope(task, context) {
  const scope = getTaskScope(task);
  if (scope === "system") return cloudIsSystemOwner(task?.systemId, context);
  if (scope === "project") {
    const project = getCloudProject(task?.projectId, context);
    return cloudIsSystemOwner(project?.systemId, context)
      || cloudIsProjectOwner(task?.projectId, context);
  }
  return false;
}

function validCloudSystem(system) {
  return validCloudOwnerFields(system)
    && cloudUidListEquals(system.visibleToUids, getCloudOwnerIds(system));
}

function validCloudProject(project, context, previous = null) {
  const system = getCloudSystem(project?.systemId, context);
  if (!system) {
    return Boolean(previous)
      && validCloudOwnerFields(project)
      && project?.systemId === previous.systemId
      && cloudUidListEquals(project.visibleToUids, previous.visibleToUids);
  }

  return validCloudOwnerFields(project)
    && cloudUidListEquals(project.visibleToUids, [
      ...cloudVisibleIds(system),
      ...getCloudOwnerIds(project),
    ]);
}

function validCloudProjectStage(stage, context) {
  const project = getCloudProject(stage?.projectId, context);
  if (!project || typeof stage?.name !== "string") return false;
  return cloudUidListEquals(stage.visibleToUids, cloudVisibleIds(project));
}

function validCloudProjectStageAfter(stage, context) {
  const project = getCloudProjectAfter(stage?.projectId, context);
  if (!project || typeof stage?.name !== "string") return false;
  return cloudUidListEquals(stage.visibleToUids, cloudVisibleIds(project));
}

function validCloudTask(task, context) {
  const scope = getTaskScope(task);
  if (scope === "general") return validCloudGeneralTask(task);
  if (scope === "system") return validCloudSystemTask(task, context);
  if (scope === "project") return validCloudProjectTask(task, context);
  return false;
}

function validCloudGeneralTask(task) {
  return getTaskScope(task) === "general"
    && validCloudOwnerFields(task)
    && cloudUidListEquals(task.visibleToUids, getCloudOwnerIds(task));
}

function validCloudSystemTask(task, context) {
  const system = getCloudSystem(task?.systemId, context);
  return getTaskScope(task) === "system"
    && validCloudOwnerFields(task)
    && Boolean(system)
    && task.projectId === ""
    && cloudUidListEquals(task.visibleToUids, [
      ...cloudVisibleIds(system),
      ...getCloudOwnerIds(task),
    ]);
}

function validCloudProjectTask(task, context) {
  const project = getCloudProject(task?.projectId, context);
  if (!project) return false;
  const parentVisibleUids = cloudVisibleIds(project);
  return getTaskScope(task) === "project"
    && validCloudOwnerFields(task)
    && task.systemId === project.systemId
    && cloudUidListEquals(task.visibleToUids, [
      ...parentVisibleUids,
      ...getCloudOwnerIds(task),
    ]);
}

function validCloudTaskWithVisibleFallback(task, previous, context) {
  if (validCloudTask(task, context)) return true;
  return validCloudOwnerFields(task)
    && cloudTaskParentUnavailableForValidation(task, context)
    && cloudUidListEquals(task.visibleToUids, previous.visibleToUids)
    && (
      (getTaskScope(task) === "system" && task.projectId === "")
      || (getTaskScope(task) === "project" && task.projectId === previous.projectId && task.systemId === previous.systemId)
    );
}

function cloudTaskParentUnavailableForValidation(task, context) {
  const scope = getTaskScope(task);
  if (scope === "system") return !getCloudSystem(task?.systemId, context);
  if (scope === "project") return !getCloudProject(task?.projectId, context);
  return false;
}

function validCloudOwnerFields(data = {}) {
  data ||= {};
  const ownerIds = getCloudOwnerIds(data);
  return typeof data.ownerUid === "string"
    && data.ownerUid !== ""
    && typeof data.ownerName === "string"
    && ownerIds.includes(data.ownerUid)
    && cloudOwnerIsActive(data.ownerUid, data);
}

function getRuleOwnerIds(data = {}) {
  data ||= {};
  const direct = Array.isArray(data.internalOwnerIds) && data.internalOwnerIds.length
    ? data.internalOwnerIds
    : [data.ownerUid];
  return uniqueUids(direct);
}

function getRuleVisibleIds(data = {}) {
  const visibleIds = normalizeVisibleToUids(data?.visibleToUids);
  return visibleIds.length ? visibleIds : getRuleOwnerIds(data);
}

function getCloudOwnerIds(data = {}) {
  return getRuleOwnerIds(data);
}

function cloudOwnerIdentityUnchanged(next = {}, previous = {}) {
  return next.ownerUid === previous.ownerUid
    && cloudUidListEquals(getCloudOwnerIds(next), getCloudOwnerIds(previous));
}

function cloudTaskScopeUnchanged(next = {}, previous = {}) {
  return getTaskScope(next) === getTaskScope(previous)
    && next.systemId === previous.systemId
    && next.projectId === previous.projectId;
}

function cloudVisibleIds(data = {}) {
  return getRuleVisibleIds(data);
}

function cloudVisibleToCurrentUser(data = {}, context) {
  return cloudVisibleIds(data).includes(context.uid);
}

function cloudUidListEquals(actual = [], expected = []) {
  const actualIds = normalizeVisibleToUids(actual);
  const expectedIds = uniqueUids(expected);
  return actualIds.length === expectedIds.length
    && expectedIds.every((uid) => actualIds.includes(uid));
}

function cloudOwnerIsActive(uid, fallback = {}) {
  const owner = getKnownOwner(uid, fallback);
  return owner?.status === "active";
}

function cloudOwnerIsAdmin(uid) {
  const owner = getKnownOwner(uid);
  return owner?.status === "active" && owner.role === "admin";
}

function cloudIsSystemOwner(systemId, context) {
  const system = getCloudSystem(systemId, context);
  return Boolean(system && getCloudOwnerIds(system).includes(context.uid));
}

function cloudIsProjectOwner(projectId, context) {
  const project = getCloudProject(projectId, context);
  return Boolean(project && getCloudOwnerIds(project).includes(context.uid));
}

function cloudIsProjectOwnerAfter(projectId, context) {
  const project = getCloudProjectAfter(projectId, context);
  return Boolean(project && getCloudOwnerIds(project).includes(context.uid));
}

function cloudCanSeeSystem(systemId, context) {
  const system = getCloudSystem(systemId, context);
  return Boolean(system && cloudVisibleIds(system).includes(context.uid));
}

function cloudCanSeeProject(projectId, context) {
  const project = getCloudProject(projectId, context);
  return Boolean(project && cloudVisibleIds(project).includes(context.uid));
}

function getCloudSystem(systemId, context) {
  return systemId ? context.previousMaps.systems.get(systemId) || null : null;
}

function getCloudProject(projectId, context) {
  return projectId ? context.previousMaps.projects.get(projectId) || null : null;
}

function getCloudProjectAfter(projectId, context) {
  return projectId ? context.currentMaps.projects.get(projectId) || null : null;
}

function createCloudWriteLogEntry(collectionName, action, id, item = {}, extra = {}) {
  const details = getCloudWriteDebugDetails(collectionName, item);
  return {
    collectionName,
    action,
    id,
    ...(details ? { details } : {}),
    ...extra,
  };
}

function getCloudWriteDebugDetails(collectionName, item = {}) {
  if (!item) return null;
  if (collectionName === "projects") {
    return getProjectCreateDebugDetails(item.systemId, item);
  }
  if (collectionName === "projectStages") {
    return {
      projectId: item.projectId || "",
      phaseId: item.phaseId || "",
      visibleToUids: normalizeVisibleToUids(item.visibleToUids),
    };
  }
  if (collectionName !== "tasks") return null;
  return {
    scope: getTaskScope(item),
    systemId: item.systemId || "",
    projectId: item.projectId || "",
    ownerUid: item.ownerUid || "",
    internalOwnerIds: getCloudOwnerIds(item),
    visibleToUids: normalizeVisibleToUids(item.visibleToUids),
  };
}

function getProjectCreateDebugDetails(systemId, project = {}) {
  return {
    ...getProjectCreateRuleDiagnostics(systemId, project),
    fieldContract: getProjectCreatePayloadDebug(project.id || "", project),
  };
}

function getProjectCreatePayloadDebug(id, project = {}) {
  const payload = project || {};
  const pathId = String(id || "").trim();
  const payloadId = String(payload.id || "").trim();
  const hasInternalOwnerIds = Object.prototype.hasOwnProperty.call(payload, "internalOwnerIds");
  const hasVisibleToUids = Object.prototype.hasOwnProperty.call(payload, "visibleToUids");
  const hasProjectOwnerIds = Object.prototype.hasOwnProperty.call(payload, "projectOwnerIds");
  const hasProjectVisibleToUids = Object.prototype.hasOwnProperty.call(payload, "projectVisibleToUids");

  return {
    path: pathId ? `projects/${pathId}` : "projects/",
    id: pathId,
    projectId: payloadId,
    documentIdMatchesPayload: Boolean(pathId && payloadId && pathId === payloadId),
    keys: Object.keys(payload).sort(),
    ownerUid: String(payload.ownerUid || "").trim(),
    ownerNameType: typeof payload.ownerName,
    systemId: String(payload.systemId || "").trim(),
    hasInternalOwnerIds,
    internalOwnerIds: hasInternalOwnerIds ? getRuleOwnerIds(payload) : [],
    hasVisibleToUids,
    visibleToUids: hasVisibleToUids ? normalizeVisibleToUids(payload.visibleToUids) : [],
    hasProjectOwnerIds,
    hasProjectVisibleToUids,
  };
}

function logProjectCreatePayload(id, project = {}, payloadDebug = getProjectCreatePayloadDebug(id, project)) {
  console.info("[project.create.payload]", {
    ...payloadDebug,
    project,
  });
}

async function logProjectCreateFailureContext(writes = []) {
  const projectWrite = writes.find((write) => write.collectionName === "projects" && write.action === "create");
  if (!projectWrite || !db || !currentFirebaseUser) return;

  const currentUid = currentFirebaseUser.uid || "";
  const systemId = projectWrite.finalPayload?.systemId || projectWrite.details?.systemId || "";
  const [tokenResult, userResult, systemResult] = await Promise.all([
    currentFirebaseUser.getIdTokenResult?.().catch((error) => ({ error })),
    getDebugDocumentSnapshot(`users/${currentUid}`),
    systemId ? getDebugDocumentSnapshot(`systems/${systemId}`) : Promise.resolve({ exists: false, data: null }),
  ]);

  console.info("[project.create.failure.context]", {
    currentUid,
    token: getTokenDebugDetails(tokenResult),
    currentProfile: {
      uid: currentProfile?.uid || "",
      role: currentProfile?.role || "",
      status: currentProfile?.status || "",
    },
    userDoc: getUserDebugDetails(userResult),
    systemDoc: getSystemDebugDetails(systemResult),
    browserBlockedHint: "If the console also shows net::ERR_BLOCKED_BY_CLIENT for firestore.googleapis.com, retest in an InPrivate window or temporarily disable blocking/privacy extensions.",
    write: {
      id: projectWrite.id || "",
      systemId,
      canCreate: Boolean(projectWrite.details?.canCreate),
      documentIdMatchesPayload: Boolean(projectWrite.finalPayload?.documentIdMatchesPayload),
      finalPayloadKeys: projectWrite.finalPayload?.keys || [],
      finalPayloadOwnerIds: projectWrite.finalPayload?.internalOwnerIds || [],
      finalPayloadVisibleToUids: projectWrite.finalPayload?.visibleToUids || [],
    },
  });
}

async function getDebugDocumentSnapshot(path) {
  try {
    const snapshot = await db.doc(path).get();
    return {
      exists: snapshot.exists,
      data: snapshot.exists ? snapshot.data() : null,
    };
  } catch (error) {
    return {
      exists: false,
      data: null,
      error: {
        code: error?.code || "",
        message: error?.message || "",
      },
    };
  }
}

function getTokenDebugDetails(tokenResult = {}) {
  if (tokenResult?.error) {
    return {
      error: {
        code: tokenResult.error?.code || "",
        message: tokenResult.error?.message || "",
      },
    };
  }
  const claims = tokenResult?.claims || {};
  return {
    admin: Boolean(claims.admin),
    role: claims.role || "",
    status: claims.status || "",
  };
}

function getUserDebugDetails(result = {}) {
  const data = result.data || {};
  return {
    exists: Boolean(result.exists),
    uid: data.uid || "",
    role: data.role || "",
    status: data.status || "",
    ...(result.error ? { error: result.error } : {}),
  };
}

function getSystemDebugDetails(result = {}) {
  const data = result.data || {};
  return {
    exists: Boolean(result.exists),
    ownerUid: data.ownerUid || "",
    internalOwnerIds: getRuleOwnerIds(data),
    visibleToUids: normalizeVisibleToUids(data.visibleToUids),
    ...(result.error ? { error: result.error } : {}),
  };
}

function logDeferredCloudWrites(deferredWrites = []) {
  if (!deferredWrites.length) return;
  console.info("[cloud.write.deferred]", deferredWrites);
}

function logSkippedCloudWrites(skippedWrites = []) {
  const summary = skippedWrites.reduce((rows, item) => {
    const key = `${item.collectionName}.${item.action}`;
    rows[key] = (rows[key] || 0) + 1;
    return rows;
  }, {});
  console.warn("[cloud.save.skipped]", summary, skippedWrites.slice(0, 20));
}

function createCloudWriteSkippedError(skippedWrites = []) {
  const error = new Error("No permitted cloud writes were available for this scoped change.");
  error.code = "permission-denied";
  error.skippedWrites = skippedWrites;
  return error;
}

function logFailedCloudWrites(writes = [], error = {}) {
  const summary = writes.reduce((rows, item) => {
    const key = `${item.collectionName}.${item.action}`;
    rows[key] = (rows[key] || 0) + 1;
    return rows;
  }, {});
  console.error("[cloud.save.failed]", {
    code: error?.code || "",
    message: error?.message || "",
    summary,
    writes: writes.slice(0, 50),
  });
  logProjectCreateFailureContext(writes).catch((diagnosticError) => {
    logSafeError("cloud.projectCreate.diagnostics", diagnosticError);
  });
}

function prepareCloudDocument(item, previous = {}) {
  const documentData = stripUndefinedDeep({ ...item });
  if ("ownerEmail" in previous && !("ownerEmail" in item)) {
    documentData.ownerEmail = firebase.firestore.FieldValue.delete();
  }
  if ("createdByEmail" in previous && !("createdByEmail" in item)) {
    documentData.createdByEmail = firebase.firestore.FieldValue.delete();
  }
  if ("updatedByEmail" in previous && !("updatedByEmail" in item)) {
    documentData.updatedByEmail = firebase.firestore.FieldValue.delete();
  }
  documentData.createdAt = previous.createdAt || firebase.firestore.FieldValue.serverTimestamp();
  documentData.createdBy = previous.createdBy || currentFirebaseUser?.uid || "";
  documentData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  documentData.updatedBy = currentFirebaseUser?.uid || "";
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
    projectStages: new Map((sourceState.projectStages || []).map((item) => [item.id, item])),
    tasks: new Map((sourceState.tasks || []).map((item) => [item.id, item])),
  };
}

function hydrateCloudState(sourceState = {}) {
  return {
    systems: hydrateCloudCollection(sourceState.systems),
    projects: hydrateCloudCollection(sourceState.projects),
    projectStages: hydrateCloudCollection(sourceState.projectStages),
    tasks: hydrateCloudCollection(sourceState.tasks),
  };
}

function hydrateCloudCollection(records) {
  return (Array.isArray(records) ? records.map(hydrateCloudValue) : []).sort(compareCloudRecords);
}

function hydrateCloudValue(value) {
  if (Array.isArray(value)) return value.map(hydrateCloudValue);

  if (value && typeof value === "object" && Object.keys(value).length === 1 && Number.isFinite(value.__pmTimestampMillis)) {
    return hydrateCloudTimestamp(value.__pmTimestampMillis);
  }

  if (value && typeof value === "object") {
    return Object.entries(value).reduce((result, [key, item]) => {
      result[key] = hydrateCloudValue(item);
      return result;
    }, {});
  }

  return value;
}

function hydrateCloudTimestamp(millis) {
  const timestampFactory = firebase?.firestore?.Timestamp;
  return timestampFactory?.fromMillis
    ? timestampFactory.fromMillis(millis)
    : { toMillis: () => millis, toDate: () => new Date(millis) };
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
  const email = normalizeEmail(profile.email || "");
  const safeUser = currentSafeUser || sanitizeUser(currentFirebaseUser);
  const displayName = String(profile.displayName || profile.name || safeUser.displayName || "").trim();
  return {
    uid: String(profile.uid || safeUser.uid || "").trim(),
    email: "",
    emailMasked: profile.emailMasked || maskEmail(email) || safeUser.emailMasked,
    emailVerified: Boolean(profile.emailVerified ?? safeUser.emailVerified),
    photoURL: getSafePhotoURL(profile.photoURL) || safeUser.photoURL,
    displayName,
    name: displayName,
    role: profile.role === "admin" ? "admin" : "user",
    status: profile.status === "disabled" ? "disabled" : "active",
    lastLoginAt: profile.lastLoginAt || "",
  };
}

function normalizeAccountRequest(request = {}) {
  const status = ["approved", "rejected", "needs_request"].includes(request.status) ? request.status : "pending";
  const email = normalizeEmail(request.email || "");
  return {
    uid: String(request.uid || currentFirebaseUser?.uid || "").trim(),
    email,
    emailMasked: request.emailMasked || maskEmail(email) || currentSafeUser.emailMasked,
    name: (request.name || request.displayName || currentSafeUser.displayName || "").trim(),
    role: request.role === "admin" ? "admin" : "user",
    status,
    requestedAt: request.requestedAt || "",
    updatedAt: request.updatedAt || "",
    reviewedAt: request.reviewedAt || "",
    reviewedByEmail: normalizeEmail(request.reviewedByEmail || ""),
  };
}

function normalizeOwnerAccount(user = {}) {
  const email = normalizeEmail(user.email);
  const uid = String(user.uid || "").trim();
  const name = String(user.name || user.displayName || "").trim();
  return {
    uid,
    email,
    name,
    role: user.role === "admin" ? "admin" : "user",
    status: user.status === "disabled" ? "disabled" : "active",
  };
}

async function refreshAssignableOwners() {
  if (previewMode) {
    assignableOwners = currentProfile ? [normalizeOwnerAccount(currentProfile)] : [];
    return assignableOwners;
  }

  if (!cloudFunctions || !currentProfile) {
    assignableOwners = [];
    return assignableOwners;
  }

  try {
    const result = await callFunction("listAssignableOwners");
    assignableOwners = uniqueOwners(result.data?.owners || []);
  } catch (error) {
    logSafeError("owners.list", error);
    assignableOwners = uniqueOwners([currentProfile]);
  }

  return assignableOwners;
}

function uniqueOwners(owners = []) {
  const rows = new Map();
  owners.map(normalizeOwnerAccount).forEach((owner) => {
    if (!owner.uid) return;
    rows.set(owner.uid, { ...rows.get(owner.uid), ...owner });
  });
  return [...rows.values()]
    .filter((owner) => owner.status === "active")
    .sort((a, b) => getOwnerDisplayName(a).localeCompare(getOwnerDisplayName(b), "zh-Hant"));
}

function getOwnerDisplayName(owner = {}) {
  return (owner.ownerName || owner.name || owner.owner || "").trim() || "未命名使用者";
}

function getInternalOwnerIds(entity = {}) {
  return normalizeOwnerIds(entity?.internalOwnerIds, entity || {});
}

function getPrimaryOwnerUid(ownerIds = [], fallback = {}) {
  const currentOwnerUid = String(fallback?.ownerUid || "").trim();
  return ownerIds.includes(currentOwnerUid) ? currentOwnerUid : ownerIds[0] || "";
}

function normalizeOwnerIds(value, fallback = {}) {
  fallback ||= {};
  const direct = Array.isArray(value) ? value : [];
  const fallbackIds = [
    fallback.ownerUid,
    fallback.uid,
    fallback.ownerId,
  ];
  return uniqueUids([
    ...direct,
    ...(!direct.length ? fallbackIds : []),
    ...(!direct.length && !fallback.ownerUid && currentProfile?.uid ? [currentProfile.uid] : []),
  ]);
}

function getOwnerNames(ownerIds = [], fallback = {}) {
  const names = normalizeOwnerIds(ownerIds, fallback)
    .map((uid) => getKnownOwner(uid, fallback))
    .filter(Boolean)
    .map(getOwnerDisplayName)
    .filter(Boolean);
  if (names.length) return [...new Set(names)].join(", ");
  return fallback.ownerName || fallback.owner || "";
}

function getOwnerFromEntity(entity = {}) {
  if (!entity.ownerUid) return null;
  return normalizeOwnerAccount({
    uid: entity.ownerUid,
    name: entity.ownerName || entity.owner,
    status: "active",
  });
}

function getOwnersFromEntity(entity = {}) {
  entity ||= {};
  return uniqueOwners(getInternalOwnerIds(entity).map((uid) => ({
    uid,
    name: getKnownOwner(uid, entity)?.name || entity.ownerName || entity.owner || uid,
    status: "active",
  })));
}

function getKnownOwner(uid, fallback = {}) {
  const normalizedUid = String(uid || "").trim();
  if (!normalizedUid) return null;
  const entityOwner = getOwnerFromEntity(fallback);
  return assignableOwners.find((owner) => owner.uid === normalizedUid)
    || (currentProfile?.uid === normalizedUid ? normalizeOwnerAccount(currentProfile) : null)
    || (entityOwner?.uid === normalizedUid ? entityOwner : null);
}

function getOwnerPayload(uid, fallback = {}) {
  const owner = getKnownOwner(uid, fallback);
  const ownerUid = String(uid || owner?.uid || "").trim();
  if (!ownerUid) {
    return { ownerUid: "", ownerName: "" };
  }
  return {
    ownerUid,
    ownerName: String(owner?.name || fallback.ownerName || fallback.owner || "").trim(),
  };
}

function getAllAssignableOwners() {
  return uniqueOwners([
    ...assignableOwners,
    currentProfile,
  ].filter(Boolean));
}

function getDefaultAssignableOwners() {
  return uniqueOwners(getAllAssignableOwners().filter((owner) => {
    return owner.uid === currentProfile?.uid || owner.role === "admin";
  }));
}

function renderOwnerOptions(owners, selectedUid = "", fallback = {}) {
  const selectedIds = getOwnerSelectedValues(selectedUid, fallback);
  const rows = getOwnerOptionRows(owners, fallback);
  const options = rows.map((owner) => {
    const selected = selectedIds.includes(owner.uid);
    const label = getOwnerDisplayName(owner);
    return `<option value="${escapeHtml(owner.uid)}" ${selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
  });

  if (!selectedIds.length) {
    options.unshift(`<option value="" selected>請選擇負責人</option>`);
  }

  return options.length ? options.join("") : `<option value="">沒有可指派帳號</option>`;
}

function getOwnerSelectedValues(selectedUid = "", fallback = {}) {
  return Array.isArray(selectedUid)
    ? normalizeOwnerIds(selectedUid, fallback)
    : normalizeOwnerIds(selectedUid ? [selectedUid] : fallback.internalOwnerIds, fallback);
}

function getOwnerOptionRows(owners = [], fallback = {}) {
  return uniqueOwners([
    ...(owners || []),
    ...getOwnersFromEntity(fallback),
  ].filter(Boolean));
}

function getOwnerDropdownOptions(owners = [], fallback = {}) {
  return getOwnerOptionRows(owners, fallback).map((owner) => ({
    value: owner.uid,
    label: getOwnerDisplayName(owner),
  }));
}

function renderOwnerDropdown(container, owners, selectedUid = "", fallback = {}, config = {}) {
  if (!container) return;
  renderMultiSelectDropdown(
    container,
    getOwnerDropdownOptions(owners, fallback),
    getOwnerSelectedValues(selectedUid, fallback),
    {
      placeholder: "請選擇負責人",
      summaryUnit: "人",
      searchPlaceholder: "搜尋負責人",
      ...config,
    },
  );
}

function ownerSelectValue(select, fallback = {}) {
  fallback ||= {};
  const selected = getSelectedValues(select);
  return selected.length ? selected : normalizeOwnerIds(fallback.internalOwnerIds, fallback);
}

function isAdminProfile() {
  return currentProfile?.role === "admin" && currentProfile?.status === "active";
}

function isCurrentSystemOwner(systemOrId) {
  const system = typeof systemOrId === "string" ? getSystem(systemOrId) : systemOrId;
  return Boolean(currentProfile?.uid && getInternalOwnerIds(system).includes(currentProfile.uid));
}

function isCurrentSyncedSystemOwner(systemId) {
  const system = getSyncedSystemForProjectCreate(systemId);
  const currentUid = currentProfile?.uid || currentFirebaseUser?.uid || "";
  return Boolean(currentUid && getRuleOwnerIds(system).includes(currentUid));
}

function isCurrentProjectOwner(projectOrId) {
  const project = typeof projectOrId === "string" ? getProject(projectOrId) : projectOrId;
  return Boolean(currentProfile?.uid && getInternalOwnerIds(project).includes(currentProfile.uid));
}

function canEditSystem(system) {
  return !system || isAdminProfile() || isCurrentSystemOwner(system);
}

function canAssignSystemOwner(system) {
  return isAdminProfile() || !system?.id;
}

function canAssignProjectOwner(project, systemId) {
  const targetSystemId = systemId || project?.systemId || "";
  return isAdminProfile() || isCurrentSyncedSystemOwner(targetSystemId);
}

function canAssignTaskOwner(task = null, scopeValues = null) {
  const scope = scopeValues?.scope || getTaskScope(task || {});
  const systemId = scopeValues?.systemId ?? task?.systemId ?? "";
  const projectId = scopeValues?.projectId ?? task?.projectId ?? "";

  if (isAdminProfile()) return true;
  if (scope === "system") return isCurrentSystemOwner(systemId);
  if (scope === "project") {
    const project = getProject(projectId);
    return isCurrentSystemOwner(systemId || project?.systemId) || isCurrentProjectOwner(project);
  }
  return !task?.id;
}

function getSystemOwnerChoices(system = null) {
  if (canAssignSystemOwner(system)) {
    return system?.id && isAdminProfile() ? getAllAssignableOwners() : getDefaultAssignableOwners();
  }
  return getOwnersFromEntity(system);
}

function getProjectOwnerChoices(project = null, systemId = "") {
  if (canAssignProjectOwner(project, systemId)) return getAllAssignableOwners();
  if (project?.id) return getOwnersFromEntity(project);
  return getDefaultAssignableOwners();
}

function getTaskOwnerChoices(task = null, scopeValues = null) {
  if (canAssignTaskOwner(task, scopeValues)) return getAllAssignableOwners();
  if (task?.id) return getOwnersFromEntity(task);
  return getDefaultAssignableOwners();
}

function normalizeVisibleToUids(value) {
  return uniqueUids(Array.isArray(value) ? value : []);
}

function getVisibleOrOwnerUids(entity = {}) {
  entity ||= {};
  const visibleIds = normalizeVisibleToUids(entity.visibleToUids);
  return visibleIds.length ? visibleIds : getInternalOwnerIds(entity);
}

function uniqueUids(values = []) {
  return [...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))].sort();
}

function updateAccountUi() {
  const isAdmin = currentProfile?.role === "admin" && currentProfile?.status === "active";
  els.accountRole && (els.accountRole.textContent = previewMode ? "本機預覽" : isAdmin ? "管理員" : "一般使用者");
  els.signOutButton && (els.signOutButton.textContent = previewMode ? "離開預覽" : "登出");
  const displayName = currentProfile?.displayName || currentProfile?.name || currentSafeUser.displayName;
  const emailMasked = currentProfile?.emailMasked || currentSafeUser.emailMasked;
  if (els.accountName) els.accountName.textContent = displayName || emailMasked || "使用者";
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
    logSafeError("profile.update", error);
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

  const requestUnsubscribe = db.collection("accountRequests").orderBy("requestedAt", "desc").onSnapshot((snapshot) => {
    adminAccountRequests = snapshot.docs.map((doc) => normalizeAccountRequest({ uid: doc.id, ...doc.data() }));
    renderAdminPage();
  }, handleAdminReadError);

  const auditUnsubscribe = db.collection("auditLogs").orderBy("createdAt", "desc").limit(100).onSnapshot((snapshot) => {
    adminAuditLogs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    renderAuditLogs();
  }, handleAdminReadError);

  adminUnsubscribes = [userUnsubscribe, allowedUnsubscribe, requestUnsubscribe, auditUnsubscribe];
}

function cleanupAdminSubscriptions() {
  adminUnsubscribes.forEach((unsubscribe) => unsubscribe());
  adminUnsubscribes = [];
}

function handleAdminReadError(error) {
  logSafeError("admin.read", error);
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
  const pendingRequests = adminAccountRequests.filter((request) => request.status === "pending").length;

  els.adminMetrics.innerHTML = [
    ["使用者", rows.length],
    ["管理員", admins],
    ["啟用帳號", activeUsers],
    ["停用帳號", disabled],
    ["待審申請", pendingRequests],
  ].map(([label, value]) => `
    <article class="admin-metric">
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `).join("");

  renderAccountRequests();
  renderAdminUsers(rows);
  renderAuditLogs();
}

function renderAccountRequests() {
  if (!els.adminAccountRequestsTable) return;
  const rows = adminAccountRequests
    .filter((request) => request.status !== "approved")
    .sort((a, b) => {
      const statusDiff = (a.status === "pending" ? 0 : 1) - (b.status === "pending" ? 0 : 1);
      if (statusDiff) return statusDiff;
      return getSortableTimestamp(b.requestedAt || b.updatedAt) - getSortableTimestamp(a.requestedAt || a.updatedAt);
    });

  if (!rows.length) {
    els.adminAccountRequestsTable.innerHTML = `<p class="empty-state">目前沒有待審帳號申請。</p>`;
    return;
  }

  els.adminAccountRequestsTable.innerHTML = `
    <table class="admin-table account-requests-table">
      <thead>
        <tr>
          <th>Email</th>
          <th>名稱</th>
          <th>狀態</th>
          <th>申請時間</th>
          <th>角色</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row) => `
          <tr data-account-request-row data-uid="${escapeHtml(row.uid)}">
            <td>
              <strong>${escapeHtml(row.email)}</strong>
              ${row.reviewedByEmail ? `<small>審核者：${escapeHtml(row.reviewedByEmail)}</small>` : ""}
            </td>
            <td>${escapeHtml(row.name || "尚未填寫")}</td>
            <td><span class="status-pill ${row.status === "rejected" ? "disabled" : "pending"}">${row.status === "rejected" ? "已拒絕" : "待審"}</span></td>
            <td>${formatDateTime(row.requestedAt || row.updatedAt)}</td>
            <td>
              <select data-account-request-role>
                <option value="user" ${row.role === "user" ? "selected" : ""}>一般使用者</option>
                <option value="admin" ${row.role === "admin" ? "selected" : ""}>管理員</option>
              </select>
            </td>
            <td>
              <div class="admin-row-actions">
                <button class="primary-button" type="button" data-approve-account-request>核准</button>
                <button class="secondary-button" type="button" data-reject-account-request ${row.status === "rejected" ? "disabled" : ""}>拒絕</button>
              </div>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
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
    logSafeError("admin.createAllowedUser", error);
    alert(`建立帳號失敗：${getReadableError(error)}`);
  }
}

async function handleAccountRequestReview(event) {
  const approveButton = event.target.closest("[data-approve-account-request]");
  const rejectButton = event.target.closest("[data-reject-account-request]");
  if (!approveButton && !rejectButton) return;

  const row = event.target.closest("[data-account-request-row]");
  const uid = row?.dataset.uid || "";
  const role = row?.querySelector("[data-account-request-role]")?.value === "admin" ? "admin" : "user";
  if (!uid) return;

  row.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });

  try {
    if (approveButton) {
      await callFunction("approveAccountRequest", { uid, role });
      showToast("帳號申請已核准。");
    } else {
      await callFunction("rejectAccountRequest", { uid });
      showToast("帳號申請已拒絕。");
    }
  } catch (error) {
    logSafeError("admin.accountRequestReview", error);
    alert(`帳號申請審核失敗：${getReadableError(error)}`);
    renderAccountRequests();
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
    logSafeError("admin.roleUpdate", error);
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
    logSafeError("admin.statusUpdate", error);
    alert(`狀態更新失敗：${getReadableError(error)}`);
  }
}

function exportProjectDataJson() {
  downloadTextFile(`project-desk-${todayString()}.json`, JSON.stringify(state, null, 2), "application/json");
}

function exportProjectDataCsv() {
  const rows = [
    ["type", "system", "project", "title", "status", "owner", "executionDate", "deadline"],
    ...state.systems.map((system) => ["system", system.name, "", "", "", getOwnerDisplayName(system), "", ""]),
    ...state.projects.map((project) => [project.category || "project", getSystem(project.systemId)?.name || "", project.name, "", project.phase || "", getOwnerDisplayName(project), project.plannedStart || "", project.plannedEnd || ""]),
    ...state.tasks.map((task) => ["task", getSystem(task.systemId)?.name || "", getProject(task.projectId)?.name || "", task.title, task.status, getOwnerDisplayName(task), task.executionDate, task.deadline]),
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
    "account.request.submit": "送出帳號申請",
    "account.request.approve": "核准帳號申請",
    "account.request.reject": "拒絕帳號申請",
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

function getSafePhotoURL(photoURL = "") {
  return photoURL ? "available" : "";
}

function sanitizeUser(user) {
  const email = normalizeEmail(user?.email || "");
  return {
    uid: String(user?.uid || "").trim(),
    displayName: String(user?.displayName || "").trim(),
    emailMasked: maskEmail(email),
    emailVerified: Boolean(user?.emailVerified),
    photoURL: getSafePhotoURL(user?.photoURL || ""),
  };
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
    .replace(/[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "[redacted-token]")
    .replace(/[A-Za-z0-9_/-]{120,}={0,2}/g, "[redacted-token]");
}

function sanitizeAuthError(error = {}) {
  return {
    name: String(error.name || "Error"),
    code: String(error.code || ""),
    message: redactSensitiveText(error.message || ""),
  };
}

function logSafeError(context, error = {}) {
  console.error(`[${context}]`, sanitizeAuthError(error));
}

function getReadableError(error = {}) {
  const code = error.code || "";
  const message = redactSensitiveText(error.message || "");
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
  syncProjectManagementFilterOptions();
  renderMetrics();
  renderTodoDashboard();
  renderProjectSummaryCards();
  syncMainDisplayModeControls();
  renderProjects();
  renderProjectTabs();
  renderTagFilterBar();
  renderBoard();
  if (activeProjectDetailId) {
    renderProjectDetailPage();
  } else if (!els.todoPage.classList.contains("hidden")) {
    renderTodoPage();
  } else if (!els.ganttPage.classList.contains("hidden")) {
    renderGanttPage();
  } else {
    renderTodoDrawer();
  }
}

function scheduleRender() {
  window.clearTimeout(searchRenderTimer);
  searchRenderTimer = window.setTimeout(() => {
    searchRenderTimer = null;
    render();
  }, 180);
}

function syncSidebarCollapsed() {
  els.appShell.classList.toggle("sidebar-collapsed", sidebarCollapsed);
  els.sidebarToggle.textContent = sidebarCollapsed ? "›" : "‹";
  els.sidebarToggle.setAttribute("aria-expanded", String(!sidebarCollapsed));
  els.sidebarToggle.setAttribute("aria-label", sidebarCollapsed ? "展開側邊欄" : "收合側邊欄");
}

function handleMainDisplayModeToggle(event) {
  const button = event.target.closest("[data-display-target][data-display-mode]");
  if (!button) return;
  const mode = button.dataset.displayMode === "detailed" ? "detailed" : "compact";
  if (button.dataset.displayTarget === "project") {
    mainProjectDisplayMode = mode;
  } else if (button.dataset.displayTarget === "task") {
    mainTaskDisplayMode = mode;
  } else {
    return;
  }
  persistViewPreferences();
  render();
}

function syncMainDisplayModeControls() {
  syncDisplayModeControl(els.projectDisplayToggle, mainProjectDisplayMode);
  syncDisplayModeControl(els.taskDisplayToggle, mainTaskDisplayMode);
}

function syncDisplayModeControl(container, activeMode) {
  container?.querySelectorAll("[data-display-mode]").forEach((button) => {
    const active = button.dataset.displayMode === activeMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
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
  const visibleSystems = state.systems.filter((system) => systemMatchesOwnerContext(system) || system.id === selectedSystemId);
  const visibleSystemIds = new Set(visibleSystems.map((system) => system.id));
  const allProjects = projectOwnerFilterIds.length
    ? state.projects.filter((project) => visibleSystemIds.has(project.systemId) && projectMatchesOwnerContext(project)).length
    : state.projects.length;
  const allTasks = projectOwnerFilterIds.length
    ? state.tasks.filter((task) => isManagementCountTask(task) && (getTaskScope(task) === "general" || visibleSystemIds.has(task.systemId)) && taskMatchesOwnerContext(task)).length
    : state.tasks.filter(isManagementCountTask).length;
  const generalTasks = state.tasks.filter((task) => isManagementCountTask(task) && getTaskScope(task) === "general" && taskMatchesOwnerContext(task)).length;

  const buttons = [
    `<button class="system-item ${allActive ? "active" : ""}" type="button" data-system-id="" title="全部系統">
      <strong class="system-name-full">全部系統</strong>
      <strong class="system-name-short">全部</strong>
      <span>${allProjects} 個專案・${allTasks} 個任務</span>
    </button>`,
    ...visibleSystems.map((system) => {
      const projectCount = state.projects.filter((project) => project.systemId === system.id && projectMatchesOwnerContext(project)).length;
      const taskCount = state.tasks.filter((task) => isManagementCountTask(task) && taskMatchesSystemScope(task, system.id) && taskMatchesOwnerContext(task)).length;
      const shortLabel = getSystemShortLabel(system.name);
      const ownerLabel = getOwnerDisplayName(system);

      return `
        <button class="system-item ${selectedSystemId === system.id ? "active" : ""}" type="button" data-system-id="${system.id}" title="${escapeHtml(system.name)}">
          <strong class="system-name-full">${escapeHtml(system.name)}</strong>
          <strong class="system-name-short">${escapeHtml(shortLabel)}</strong>
          <span>${projectCount} 個專案・${taskCount} 個任務・負責人 ${escapeHtml(ownerLabel)}</span>
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
  const selectedSystem = getSystem(selectedSystemId);
  els.editSystemButton?.classList.toggle("hidden", !selectedSystem || !canEditSystem(selectedSystem));

  if (selectedScopeIsGeneral()) {
    els.pageTitle.textContent = "一般工作";
    els.pageSubtitle.textContent = "管理不屬於特定系統或專案的任務與待辦事項。";
    return;
  }

  const system = selectedSystem;
  els.pageTitle.textContent = system ? system.name : "全部系統";
  els.pageSubtitle.textContent = system?.description || "依系統管理專案，再由專案掌握任務與實際時程。";
}

function renderMetrics() {
  const projects = getScopedProjects(true);
  const projectIds = projects.map((project) => project.id);
  const tasks = state.tasks.filter((task) => isManagementCountTask(task) && taskMatchesSystemScope(task) && taskMatchesOwnerContext(task));
  const visibleSystemCount = selectedScopeIsGeneral()
    ? 0
    : selectedSystemId
      ? 1
      : state.systems.filter((system) => systemMatchesOwnerContext(system)).length;
  const activeTasks = tasks.filter((task) => task.status !== "done").length;
  const dueSoon = tasks.filter((task) => {
    if (!task.deadline || task.status === "done") return false;
    const diff = getDayDiff(new Date(), new Date(`${task.deadline}T00:00:00`));
    return diff >= 0 && diff <= 7;
  }).length;

  els.systemCount.textContent = visibleSystemCount;
  els.projectCount.textContent = projectIds.length;
  els.activeTaskCount.textContent = activeTasks;
  els.deadlineCount.textContent = dueSoon;
}

function syncProjectManagementFilterOptions() {
  if (!els.ownerFilter || !els.collaborationFilter) return;
  const ownerOptions = getAllAssignableOwners().map((owner) => ({
    value: owner.uid,
    label: getOwnerDisplayName(owner),
  }));
  projectOwnerFilterIds = normalizeMultiSelectSelectedValues(projectOwnerFilterIds, ownerOptions);
  renderMultiSelectOptions(els.ownerFilter, ownerOptions, projectOwnerFilterIds, "全部負責人", {
    summaryUnit: "人",
    searchPlaceholder: "搜尋負責人",
  });

  const collaborations = getAllCollaborationTags();
  const collaborationOptions = collaborations.map((tag) => ({ value: tag, label: tag }));
  projectCollaborationFilters = normalizeMultiSelectSelectedValues(projectCollaborationFilters, collaborationOptions);
  renderMultiSelectOptions(els.collaborationFilter, collaborationOptions, projectCollaborationFilters, "全部協作對象", {
    summaryUnit: "組",
    searchPlaceholder: "搜尋協作對象",
  });

  const projectPhaseOptions = getMultiFilterOptions(getPhaseFilterOptions());
  projectFilters.phase = normalizeMultiSelectSelectedValues(projectFilters.phase, projectPhaseOptions);
  renderMultiSelectOptions(els.phaseFilter, projectPhaseOptions, projectFilters.phase, "全部階段", {
    summaryUnit: "階段",
    searchPlaceholder: "搜尋階段",
  });

  projectFilters.status = normalizeMultiSelectSelectedValues(projectFilters.status, projectStatusOptions);
  renderMultiSelectOptions(els.projectStatusFilter, projectStatusOptions, projectFilters.status, "全部狀態", {
    summaryUnit: "項",
    searchPlaceholder: "搜尋狀態",
  });

  projectFilters.priority = normalizeMultiSelectSelectedValues(projectFilters.priority, priorityOptions);
  renderMultiSelectOptions(els.projectPriorityFilter, priorityOptions, projectFilters.priority, "全部優先級", {
    summaryUnit: "項",
    searchPlaceholder: "搜尋優先級",
  });

  const projectScheduleOptions = getMultiFilterOptions(scheduleStatusOptions);
  projectFilters.schedule = normalizeMultiSelectSelectedValues(projectFilters.schedule, projectScheduleOptions);
  renderMultiSelectOptions(els.projectScheduleFilter, projectScheduleOptions, projectFilters.schedule, "全部時程狀態", {
    summaryUnit: "項",
    searchPlaceholder: "搜尋時程狀態",
  });

  if (els.projectDateFilter) renderNativeSelectOptions(els.projectDateFilter, dateFilterOptions, projectFilters.date);
  if (els.projectDateStart) els.projectDateStart.value = projectFilters.dateStart || "";
  if (els.projectDateEnd) els.projectDateEnd.value = projectFilters.dateEnd || "";
  projectFilters.more = normalizeMultiSelectSelectedValues(projectFilters.more, projectMoreFilterOptions);
  renderMultiSelectOptions(els.projectMoreFilter, projectMoreFilterOptions, projectFilters.more, "更多篩選", {
    summaryUnit: "項",
    searchPlaceholder: "搜尋更多篩選",
  });

  syncTaskFilterOptions(ownerOptions, collaborationOptions);
  syncDateRangeVisibility();
}

function syncTaskFilterOptions(ownerOptions = [], collaborationOptions = []) {
  taskFilters.ownerIds = normalizeMultiSelectSelectedValues(taskFilters.ownerIds, ownerOptions);
  renderMultiSelectOptions(els.taskOwnerFilter, ownerOptions, taskFilters.ownerIds, "全部負責人", {
    summaryUnit: "人",
    searchPlaceholder: "搜尋負責人",
  });

  taskFilters.collaborationTags = normalizeMultiSelectSelectedValues(taskFilters.collaborationTags, collaborationOptions);
  renderMultiSelectOptions(els.taskCollaborationFilter, collaborationOptions, taskFilters.collaborationTags, "全部協作對象", {
    summaryUnit: "組",
    searchPlaceholder: "搜尋協作對象",
  });

  const taskProjectOptions = getTaskProjectFilterOptions();
  const taskProjectFilterOptions = getMultiFilterOptions(taskProjectOptions);
  taskFilters.projectIds = normalizeMultiSelectSelectedValues(taskFilters.projectIds, taskProjectFilterOptions);
  renderMultiSelectOptions(els.taskProjectFilter, taskProjectFilterOptions, taskFilters.projectIds, taskProjectOptions[0]?.label || "全部專案", {
    summaryUnit: "個",
    searchPlaceholder: "搜尋專案",
  });

  const taskPhaseOptions = getMultiFilterOptions(getPhaseFilterOptions());
  taskFilters.phase = normalizeMultiSelectSelectedValues(taskFilters.phase, taskPhaseOptions);
  renderMultiSelectOptions(els.taskPhaseFilter, taskPhaseOptions, taskFilters.phase, "全部階段", {
    summaryUnit: "階段",
    searchPlaceholder: "搜尋階段",
  });

  const taskStatusOptions = taskColumns.map((column) => ({ id: column.id, label: column.title }));
  taskFilters.status = normalizeMultiSelectSelectedValues(taskFilters.status, taskStatusOptions);
  renderMultiSelectOptions(els.taskStatusFilter, taskStatusOptions, taskFilters.status, "全部任務狀態", {
    summaryUnit: "項",
    searchPlaceholder: "搜尋任務狀態",
  });

  taskFilters.priority = normalizeMultiSelectSelectedValues(taskFilters.priority, priorityOptions);
  renderMultiSelectOptions(els.taskPriorityFilter, priorityOptions, taskFilters.priority, "全部優先級", {
    summaryUnit: "項",
    searchPlaceholder: "搜尋優先級",
  });

  const taskDueOptions = getMultiFilterOptions(dueStatusOptions);
  taskFilters.due = normalizeMultiSelectSelectedValues(taskFilters.due, taskDueOptions);
  renderMultiSelectOptions(els.taskDueFilter, taskDueOptions, taskFilters.due, "全部到期狀態", {
    summaryUnit: "項",
    searchPlaceholder: "搜尋到期狀態",
  });

  renderNativeSelectOptions(els.taskDateFilter, dateFilterOptions, taskFilters.date);
  if (els.taskDateStart) els.taskDateStart.value = taskFilters.dateStart || "";
  if (els.taskDateEnd) els.taskDateEnd.value = taskFilters.dateEnd || "";
  if (els.taskSearchInput && els.taskSearchInput.value !== taskFilters.query) els.taskSearchInput.value = taskFilters.query || "";
  taskFilters.more = normalizeMultiSelectSelectedValues(taskFilters.more, taskMoreFilterOptions);
  renderMultiSelectOptions(els.taskMoreFilter, taskMoreFilterOptions, taskFilters.more, "更多篩選", {
    summaryUnit: "項",
    searchPlaceholder: "搜尋更多篩選",
  });
}

function renderNativeSelectOptions(select, options = [], selectedValue = "all") {
  if (!select) return;
  const value = options.some((option) => option.id === selectedValue || option.value === selectedValue) ? selectedValue : "all";
  select.innerHTML = options
    .map((option) => {
      const optionValue = option.id ?? option.value;
      const label = option.label ?? optionValue;
      return `<option value="${escapeHtml(optionValue)}" ${optionValue === value ? "selected" : ""}>${escapeHtml(label)}</option>`;
    })
    .join("");
}

function getPhaseFilterOptions() {
  return [
    { id: "all", label: "全部階段" },
    ...phases.map((phase) => ({ id: phase.id, label: phase.label })),
    { id: "unset", label: "未設定階段" },
  ];
}

function getTaskProjectFilterOptions() {
  const projects = getScopedProjects(false, { ignoreProjectFilters: true }).sort(compareManualThenName);
  return [
    { id: "all", label: `全部專案（${projects.length}）` },
    { id: taskNoProjectFilterValue, label: "無專案" },
    ...projects.map((project) => ({ id: project.id, label: project.name })),
  ];
}

function getTaskProjectFilterLabel(value = "") {
  if (value === taskNoProjectFilterValue) return "無專案";
  return getProject(value)?.name || "未顯示專案";
}

function syncDateRangeVisibility() {
  const projectCustom = projectFilters.date === "custom";
  els.projectDateStart?.closest(".filter-date-range")?.classList.toggle("hidden", !projectCustom);
  els.projectDateEnd?.closest(".filter-date-range")?.classList.toggle("hidden", !projectCustom);
  const taskCustom = taskFilters.date === "custom";
  els.taskDateStart?.closest(".filter-date-range")?.classList.toggle("hidden", !taskCustom);
  els.taskDateEnd?.closest(".filter-date-range")?.classList.toggle("hidden", !taskCustom);
}

function renderMultiSelectOptions(select, options = [], selectedValues = [], placeholder = "全部", config = {}) {
  if (!select) return;
  const shouldRenderDropdown = select.classList?.contains("search-multi-select")
    || select.dataset?.multiSelect === "search"
    || select.tagName !== "SELECT";
  if (shouldRenderDropdown) {
    select.classList?.add("search-multi-select");
    if (select.dataset) select.dataset.multiSelect = "search";
    renderMultiSelectDropdown(select, options, selectedValues, { placeholder, ...config });
    return;
  }

  const selected = new Set(selectedValues);
  select.innerHTML = [
    `<option value="" ${selected.size ? "" : "selected"}>${escapeHtml(placeholder)}</option>`,
    ...options.map((option) => `<option value="${escapeHtml(option.value)}" ${selected.has(option.value) ? "selected" : ""}>${escapeHtml(option.label)}</option>`),
  ].join("");
}

function renderMultiSelectDropdown(container, options = [], selectedValues = [], config = {}) {
  if (!container) return;
  const normalizedOptions = normalizeMultiSelectOptions(options);
  const normalizedSelectedValues = normalizeMultiSelectSelectedValues(selectedValues, normalizedOptions);
  const selectedOptions = normalizedSelectedValues
    .map((value) => normalizedOptions.find((option) => option.value === value))
    .filter(Boolean);
  const placeholder = config.placeholder || container.dataset.placeholder || "全部";
  const summaryUnit = config.summaryUnit || container.dataset.summaryUnit || "項";
  const searchPlaceholder = config.searchPlaceholder || "搜尋";
  const disabled = Boolean(config.disabled ?? container.disabled ?? container.dataset.disabled === "true");
  const isOpen = !disabled && container.dataset.open === "true";

  container._searchMultiSelect = {
    options: normalizedOptions,
    placeholder,
    summaryUnit,
    searchPlaceholder,
    disabled,
    showAllSelectedAsPlaceholder: config.showAllSelectedAsPlaceholder,
    countFrom: config.countFrom,
  };
  writeSearchMultiSelectValues(container, normalizedSelectedValues);
  container.classList.toggle("open", isOpen);
  container.classList.toggle("disabled", disabled);
  container.dataset.placeholder = placeholder;
  container.dataset.disabled = disabled ? "true" : "false";
  container.disabled = disabled;

  container.innerHTML = `
      <div class="search-multi-select-control" role="button" tabindex="${disabled ? "-1" : "0"}" aria-haspopup="listbox" aria-expanded="${isOpen}" aria-disabled="${disabled}">
      <div class="search-multi-select-value">
        ${renderSearchMultiSelectSummary(selectedOptions, placeholder, summaryUnit, normalizedOptions, config)}
      </div>
      <span class="search-multi-select-arrow" aria-hidden="true">▾</span>
    </div>
  `;

  attachSearchMultiSelectHandlers(container);
  if (isOpen) {
    renderSearchMultiSelectPanel(container);
  } else if (!document.querySelector(".search-multi-select.open")) {
    hideSearchMultiSelectLayer();
  }
}

function renderSearchMultiSelectSummary(selectedOptions, placeholder, summaryUnit, options = [], config = {}) {
  const allSelected = Boolean(
    config.showAllSelectedAsPlaceholder
      && options.length
      && selectedOptions.length === options.length,
  );
  if (!selectedOptions.length || allSelected) {
    return `<span class="search-multi-select-placeholder">${escapeHtml(placeholder)}</span>`;
  }

  const countFrom = Number(config.countFrom) || 3;
  if (selectedOptions.length >= countFrom) {
    return `<span class="search-multi-select-count">已選 ${selectedOptions.length} ${escapeHtml(summaryUnit)}</span>`;
  }

  return `<span class="search-multi-select-text">${escapeHtml(selectedOptions.map((option) => option.label).join("、"))}</span>`;
}

function attachSearchMultiSelectHandlers(container) {
  container.querySelector(".search-multi-select-control")?.addEventListener("click", () => {
    if (container._searchMultiSelect?.disabled) return;
    setSearchMultiSelectOpen(container, container.dataset.open !== "true");
  });

  container.querySelector(".search-multi-select-control")?.addEventListener("keydown", (event) => {
    if (container._searchMultiSelect?.disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSearchMultiSelectOpen(container, container.dataset.open !== "true");
    } else if (event.key === "Escape") {
      setSearchMultiSelectOpen(container, false);
    }
  });
}

function getSearchMultiSelectLayer(container = null) {
  const root = container?.closest("dialog[open]") || document.body;
  let layer = [...root.children].find((child) => child.classList?.contains("search-multi-select-layer"));
  if (!layer) {
    layer = document.createElement("div");
    layer.className = "search-multi-select-layer";
    layer.hidden = true;
    root.appendChild(layer);
  }
  return layer;
}

function hideSearchMultiSelectLayer() {
  document.querySelectorAll(".search-multi-select-layer").forEach((layer) => {
    layer.hidden = true;
    layer.innerHTML = "";
    layer.removeAttribute("style");
  });
}

function renderSearchMultiSelectPanel(container) {
  const config = container._searchMultiSelect || {};
  if (config.disabled) {
    hideSearchMultiSelectLayer();
    return;
  }

  const layer = getSearchMultiSelectLayer(container);
  const options = config.options || [];
  const selectedValues = parseSearchMultiSelectValues(container);
  const selectedSet = new Set(selectedValues);
  const searchValue = container.dataset.search || "";
  const optionRows = options.map((option) => {
    const checked = selectedSet.has(option.value);
    return `
      <label class="search-multi-select-option" data-search-multi-row data-label="${escapeHtml(option.label.toLowerCase())}">
        <input type="checkbox" value="${escapeHtml(option.value)}" data-search-multi-option ${checked ? "checked" : ""} />
        <span>${escapeHtml(option.label)}</span>
      </label>
    `;
  }).join("");

  layer.innerHTML = `
    <div class="search-multi-select-panel">
      <input class="search-multi-select-search" type="search" value="${escapeHtml(searchValue)}" placeholder="${escapeHtml(config.searchPlaceholder || "搜尋")}" data-search-multi-input />
      <div class="search-multi-select-actions">
        <button type="button" data-search-multi-select-all ${options.length ? "" : "disabled"}>全選</button>
        <button type="button" data-search-multi-clear ${selectedValues.length ? "" : "disabled"}>清除</button>
      </div>
      <div class="search-multi-select-options" role="listbox" aria-multiselectable="true">
        ${optionRows}
      </div>
      <p class="search-multi-select-empty" data-search-multi-empty>沒有符合的選項</p>
    </div>
  `;
  layer.hidden = false;
  positionSearchMultiSelectLayer(container, layer);
  attachSearchMultiSelectPanelHandlers(container, layer);
  filterSearchMultiSelectOptions(layer, searchValue);
}

function positionSearchMultiSelectLayer(container, layer = getSearchMultiSelectLayer(container)) {
  if (!container || layer.hidden) return;
  const rect = container.getBoundingClientRect();
  const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
  const viewportHeight = document.documentElement.clientHeight || window.innerHeight;
  const gap = 6;
  const margin = 8;
  const width = Math.min(Math.max(rect.width, 240), viewportWidth - margin * 2);
  let left = Math.min(Math.max(rect.left, margin), viewportWidth - width - margin);
  let top = rect.bottom + gap;

  layer.style.width = `${width}px`;
  layer.style.left = `${left}px`;
  layer.style.top = `${top}px`;
  layer.style.maxHeight = `${Math.max(180, viewportHeight - margin * 2)}px`;

  const layerHeight = layer.offsetHeight;
  if (top + layerHeight > viewportHeight - margin && rect.top > layerHeight + gap + margin) {
    top = rect.top - layerHeight - gap;
    layer.style.top = `${Math.max(margin, top)}px`;
  }

  left = Math.min(Math.max(left, margin), viewportWidth - width - margin);
  layer.style.left = `${left}px`;
}

function attachSearchMultiSelectPanelHandlers(container, layer) {
  layer.querySelector("[data-search-multi-input]")?.addEventListener("input", (event) => {
    container.dataset.search = event.target.value;
    filterSearchMultiSelectOptions(layer, event.target.value);
  });

  layer.querySelector("[data-search-multi-select-all]")?.addEventListener("click", () => {
    const options = container._searchMultiSelect?.options || [];
    setSearchMultiSelectValues(container, options.map((option) => option.value));
  });

  layer.querySelector("[data-search-multi-clear]")?.addEventListener("click", () => {
    setSearchMultiSelectValues(container, []);
  });

  layer.querySelectorAll("[data-search-multi-option]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selected = new Set(getSelectedValues(container));
      if (checkbox.checked) {
        selected.add(checkbox.value);
      } else {
        selected.delete(checkbox.value);
      }
      setSearchMultiSelectValues(container, [...selected]);
    });
  });
}

function normalizeMultiSelectOptions(options = []) {
  const rows = new Map();
  options.forEach((option) => {
    const value = getFilterOptionValue(option);
    const label = String(option?.label || value).trim();
    if (!value) return;
    rows.set(value, { value, label });
  });
  return [...rows.values()];
}

function normalizeMultiSelectSelectedValues(values = [], options = []) {
  const allowedValues = new Set(normalizeMultiSelectOptions(options).map((option) => option.value));
  return [...new Set((Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).filter(Boolean))]
    .filter((value) => allowedValues.has(value));
}

function parseSearchMultiSelectValues(container) {
  try {
    const parsed = JSON.parse(container.dataset.selectedValues || "[]");
    return Array.isArray(parsed) ? parsed.map((value) => String(value || "").trim()).filter(Boolean) : [];
  } catch {
    return [];
  }
}

function writeSearchMultiSelectValues(container, values = []) {
  container.dataset.selectedValues = JSON.stringify([...new Set(values.map((value) => String(value || "").trim()).filter(Boolean))]);
}

function setSearchMultiSelectValues(container, values = [], notify = true) {
  const config = container._searchMultiSelect || {};
  const normalizedValues = normalizeMultiSelectSelectedValues(values, config.options || []);
  writeSearchMultiSelectValues(container, normalizedValues);
  rerenderSearchMultiSelect(container);
  if (notify) container.dispatchEvent(new Event("change", { bubbles: true }));
}

function setSearchMultiSelectOpen(container, open) {
  if (container._searchMultiSelect?.disabled) return;
  if (open) closeOpenSearchMultiSelects(container);
  container.dataset.open = open ? "true" : "false";
  if (!open) container.dataset.search = "";
  rerenderSearchMultiSelect(container);
  if (open) {
    requestAnimationFrame(() => getSearchMultiSelectLayer(container).querySelector("[data-search-multi-input]")?.focus());
  }
}

function closeOpenSearchMultiSelects(except = null) {
  document.querySelectorAll(".search-multi-select.open").forEach((container) => {
    if (container === except) return;
    container.dataset.open = "false";
    container.dataset.search = "";
    rerenderSearchMultiSelect(container);
  });
  if (!document.querySelector(".search-multi-select.open")) {
    hideSearchMultiSelectLayer();
  }
}

function rerenderSearchMultiSelect(container) {
  const config = container._searchMultiSelect || {};
  renderMultiSelectDropdown(
    container,
    config.options || [],
    parseSearchMultiSelectValues(container),
    {
      ...config,
      placeholder: config.placeholder || container.dataset.placeholder || "全部",
    },
  );
}

function repositionOpenSearchMultiSelect() {
  const openContainer = document.querySelector(".search-multi-select.open");
  if (openContainer) positionSearchMultiSelectLayer(openContainer);
}

function filterSearchMultiSelectOptions(root, query = "") {
  const normalizedQuery = query.trim().toLowerCase();
  let visibleCount = 0;
  root.querySelectorAll("[data-search-multi-row]").forEach((row) => {
    const matches = !normalizedQuery || (row.dataset.label || "").includes(normalizedQuery);
    row.hidden = !matches;
    if (matches) visibleCount += 1;
  });
  const empty = root.querySelector("[data-search-multi-empty]");
  if (empty) empty.hidden = visibleCount > 0;
}

function getAllCollaborationTags() {
  return [...new Set([
    ...state.systems.flatMap((item) => item.collaborationTags || []),
    ...state.projects.flatMap((item) => item.collaborationTags || []),
    ...state.tasks.flatMap((item) => item.collaborationTags || item.stakeholders || []),
  ].map((tag) => String(tag || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "zh-Hant"));
}

function renderProjectSummaryCards() {
  if (!els.projectSummaryCards) return;
  const show = !selectedScopeIsGeneral();
  els.projectSummaryCards.classList.toggle("hidden", !show);
  if (!show) {
    els.projectSummaryCards.innerHTML = "";
    return;
  }

  const projects = getScopedProjects(true);
  const projectIds = new Set(projects.map((project) => project.id));
  const tasks = getUniqueTasksForDisplay(state.tasks)
    .filter((task) => task.projectId && projectIds.has(task.projectId) && isProjectListTask(task));
  const activeProjects = projects.filter((project) => getProjectStatus(project) === "doing").length;
  const reviewProjects = projects.filter((project) => getProjectStatus(project) === "review").length;
  const delayedProjects = projects.filter((project) => isProjectDelayed(project) || getProjectTaskStats(project.id).delay > 0).length;
  const overdueTasks = tasks.filter((task) => taskDeadlineOverdue(task)).length;

  els.projectSummaryCards.innerHTML = [
    { label: "專案總數", value: projects.length, note: "目前篩選結果" },
    { label: "任務總數", value: tasks.length, note: "目前專案範圍" },
    { label: "進行中專案", value: activeProjects, note: "狀態為進行中" },
    { label: "待確認專案", value: reviewProjects, note: "狀態為待確認" },
    { label: "延遲專案", value: delayedProjects, note: "階段或任務延遲" },
    { label: "逾期任務", value: overdueTasks, note: "未完成且已過最後期限" },
  ].map((card) => `
    <article>
      <span>${escapeHtml(card.label)}</span>
      <strong>${escapeHtml(card.value)}</strong>
      <small>${escapeHtml(card.note)}</small>
    </article>
  `).join("");
}

function getOwnerWorkloadSummary(tasks = []) {
  const counts = new Map();
  tasks.filter((task) => task.status !== "done").forEach((task) => {
    getInternalOwnerIds(task).forEach((uid) => counts.set(uid, (counts.get(uid) || 0) + 1));
  });
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
  if (!top) return { value: "0", note: "沒有未完成任務" };
  return {
    value: top[1],
    note: getOwnerDisplayName(getKnownOwner(top[0], { ownerName: top[0] }) || { name: top[0] }),
  };
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
  ensureRecurringOccurrencesForRange(today, week.end);
  const tasks = getUniqueTasksForDisplay(state.tasks)
    .filter((task) => isTodoDisplayTask(task) && task.status !== "done" && taskMatchesSystemScope(task))
    .sort(compareTasksByUrgency);
  const assigned = new Set();
  const take = (predicate) => {
    const matches = tasks.filter((task) => !assigned.has(getTaskDisplayIdentity(task)) && predicate(task));
    matches.forEach((task) => assigned.add(getTaskDisplayIdentity(task)));
    return matches;
  };

  const deadlineToday = take((task) => task.deadline === today);
  const overdue = take((task) => taskIsOverdue(task, today));
  const todayTasks = take((task) => taskMatchesTodayTodo(task, today));
  const tomorrowTasks = take((task) => taskMatchesDate(task, tomorrow));
  const thisWeekPlanned = take((task) => taskMatchesRange(task, week.start, week.end));

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
  return taskDeadlineOverdue(task, today);
}

function dateInRange(date, start, end) {
  return Boolean(date && date >= start && date <= end);
}

function getTodoBuckets() {
  const today = todayString();
  const tomorrow = getDateOffset(1);
  const thisWeek = getWeekRange(0);
  const nextWeek = getWeekRange(1);
  ensureRecurringOccurrencesForRange(today, nextWeek.end);
  const scopedTasks = getUniqueTasksForDisplay(state.tasks)
    .filter((task) => {
      return isTodoDisplayTask(task)
        && task.status !== "done"
        && taskMatchesSystemScope(task)
        && taskMatchesTodoOwnerFilter(task);
    })
    .sort(compareTasksByUrgency);
  const tasks = scopedTasks;

  return [
    {
      id: "incomplete",
      title: "未完成任務",
      tasks,
    },
    {
      id: "today",
      title: "今日待辦事項",
      tasks: scopedTasks.filter((task) => taskMatchesTodayTodo(task, today)),
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
  const recurrenceBadge = isRecurringOccurrenceTask(task)
    ? `<span class="todo-recurring-badge">週期</span>`
    : "";

  return `
    <article class="todo-item ${section.variant ? `todo-item-${section.variant}` : ""}">
      <input type="checkbox" data-complete-task="${task.id}" aria-label="完成 ${escapeHtml(task.title)}" />
      <button class="todo-item-content" type="button" data-dashboard-task-open="${task.id}" aria-label="查看 ${escapeHtml(task.title)}">
        <strong>${escapeHtml(task.title)} ${recurrenceBadge}</strong>
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
  if (completed && isRecurringTemplateTask(task)) {
    alert("這是一個週期任務模板，不能標示單次完成。請開啟已產生的當次任務，或將模板狀態改為已完成來結束整個週期。");
    return;
  }
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
  saveTaskState([taskId]);
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
  activeProjectDetailId = "";
  els.projectDetailPage?.classList.add("hidden");
  els.projectDetailPage?.setAttribute("aria-hidden", "true");
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
  activeProjectDetailId = "";
  els.projectDetailPage?.classList.add("hidden");
  els.projectDetailPage?.setAttribute("aria-hidden", "true");

  els.ganttSearchInput.value = els.searchInput.value;
  els.ganttScaleSelect.value = ganttScale;
  if (selectedSystemId && !selectedScopeIsGeneral()) {
    ganttSystemFilterIds = [selectedSystemId];
  } else if (selectedScopeIsGeneral()) {
    ganttSystemFilterIds = [generalWorkScopeId];
  }
  ganttSystemFilter = ganttSystemFilterIds[0] || "all";
  ganttProjectFilterIds = selectedProjectId !== "all" ? [selectedProjectId] : [];
  ganttProjectFilterIds = filterGanttProjectFiltersBySystem(ganttProjectFilterIds);
  ganttProjectFilter = ganttProjectFilterIds[0] || "all";
  els.ganttPage.classList.remove("hidden");
  els.ganttPage.setAttribute("aria-hidden", "false");
  renderGanttPage();
}

function closeGanttPage() {
  closeTodoDrawer();
  els.ganttPage.classList.add("hidden");
  els.ganttPage.setAttribute("aria-hidden", "true");
}

function openProjectDetailPage(projectId, push = true) {
  const project = getProject(projectId);
  if (!project) {
    showToast("你沒有權限檢視此專案，或專案不存在。");
    closeProjectDetailPage(false);
    return;
  }
  closeTodoPage();
  closeGanttPage();
  closeTodoDrawer();
  activeProjectDetailId = project.id;
  if (push) window.history.pushState({ projectId: project.id }, "", `/projects/${encodeURIComponent(project.id)}`);
  renderProjectDetailPage();
}

function closeProjectDetailPage(push = true) {
  activeProjectDetailId = "";
  els.projectDetailPage?.classList.add("hidden");
  els.projectDetailPage?.setAttribute("aria-hidden", "true");
  if (push && getProjectIdFromPath()) window.history.pushState({}, "", "/");
  render();
}

function getProjectIdFromPath() {
  const match = window.location.pathname.match(/^\/projects\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : "";
}

function renderTodoPage() {
  syncTodoOwnerFilterOptions();
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

function syncTodoOwnerFilterOptions() {
  const ownerOptions = getAllAssignableOwners().map((owner) => ({
    value: owner.uid,
    label: getOwnerDisplayName(owner),
  }));
  todoOwnerFilterIds = normalizeMultiSelectSelectedValues(todoOwnerFilterIds, ownerOptions);
  renderMultiSelectOptions(els.todoOwnerFilter, ownerOptions, todoOwnerFilterIds, "全部負責人", {
    summaryUnit: "人",
    searchPlaceholder: "搜尋負責人",
    showAllSelectedAsPlaceholder: true,
    countFrom: 2,
  });
}

function renderGanttPage() {
  els.ganttSearchInput.value = els.searchInput.value;
  els.ganttScaleSelect.value = ganttScale;
  syncGanttPeriodControls();
  els.ganttSortMode && (els.ganttSortMode.value = ganttSortMode);
  els.ganttShowRecurring && (els.ganttShowRecurring.checked = ganttShowRecurring);
  els.ganttShowUndatedPhases && (els.ganttShowUndatedPhases.checked = ganttShowUndatedPhases);
  els.ganttShowUndatedItems && (els.ganttShowUndatedItems.checked = ganttShowUndatedItems);
  syncGanttFilterOptions();
  syncGanttProjectFilterOptions();

  const periodRange = getGanttPeriodRange();
  const baseGroups = getGanttGroups({ includeRecurring: false, periodRange });
  const baseTimeline = buildGanttTimeline(baseGroups, periodRange);
  const groups = ganttShowRecurring
    ? getGanttGroups({ includeRecurring: true, recurrenceRange: periodRange || baseTimeline, periodRange })
    : baseGroups;
  const timeline = periodRange ? buildGanttTimeline(groups, periodRange) : baseTimeline;
  const scaleLabel = ganttScale === "week" ? "以日檢視" : ganttScale === "month" ? "以週檢視" : "以月檢視";
  els.ganttRangeLabel.textContent = [
    formatRange(timeline.startString, timeline.endString),
    getGanttPeriodRangeLabel(periodRange),
    scaleLabel,
  ].filter(Boolean).join("・");

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
  focusGanttTimelineOnToday(timeline);
}

function syncGanttProjectFilterOptions() {
  const projectOptions = getGanttProjectFilterOptions();
  ganttProjectFilterIds = normalizeMultiSelectSelectedValues(
    filterGanttProjectFiltersBySystem(ganttProjectFilterIds),
    projectOptions,
  );
  ganttProjectFilter = ganttProjectFilterIds[0] || "all";
  renderMultiSelectOptions(els.ganttProjectFilter, projectOptions, ganttProjectFilterIds, "全部專案", {
    summaryUnit: "個專案",
    searchPlaceholder: "搜尋專案",
    showAllSelectedAsPlaceholder: true,
    countFrom: 2,
  });
}

function syncGanttFilterOptions() {
  if (els.ganttSystemFilter) {
    const systemOptions = getGanttSystemFilterOptions();
    ganttSystemFilterIds = normalizeMultiSelectSelectedValues(ganttSystemFilterIds, systemOptions);
    ganttSystemFilter = ganttSystemFilterIds[0] || "all";
    renderMultiSelectOptions(els.ganttSystemFilter, systemOptions, ganttSystemFilterIds, "全部系統", {
      summaryUnit: "個系統",
      searchPlaceholder: "搜尋系統",
      showAllSelectedAsPlaceholder: true,
      countFrom: 2,
    });
  }
  if (els.ganttOwnerFilter) {
    const ownerOptions = getAllAssignableOwners().map((owner) => ({
      value: owner.uid,
      label: getOwnerDisplayName(owner),
    }));
    ganttOwnerFilterIds = normalizeMultiSelectSelectedValues(ganttOwnerFilterIds, ownerOptions);
    renderMultiSelectOptions(els.ganttOwnerFilter, ownerOptions, ganttOwnerFilterIds, "全部負責人", {
      summaryUnit: "位負責人",
      searchPlaceholder: "搜尋負責人",
      showAllSelectedAsPlaceholder: true,
      countFrom: 2,
    });
  }
  if (els.ganttCollaborationFilter) {
    const collaborationOptions = getAllCollaborationTags().map((tag) => ({
      value: tag,
      label: tag,
    }));
    ganttCollaborationFilters = normalizeMultiSelectSelectedValues(ganttCollaborationFilters, collaborationOptions);
    renderMultiSelectOptions(els.ganttCollaborationFilter, collaborationOptions, ganttCollaborationFilters, "全部協作", {
      summaryUnit: "個協作",
      searchPlaceholder: "搜尋協作",
      showAllSelectedAsPlaceholder: true,
      countFrom: 2,
    });
  }
  if (els.ganttPhaseFilter) {
    const phaseOptions = getMultiFilterOptions(getPhaseFilterOptions());
    ganttPhaseFilterIds = normalizeMultiSelectSelectedValues(ganttPhaseFilterIds, phaseOptions);
    renderMultiSelectOptions(els.ganttPhaseFilter, phaseOptions, ganttPhaseFilterIds, "全部階段", {
      summaryUnit: "個階段",
      searchPlaceholder: "搜尋階段",
      showAllSelectedAsPlaceholder: true,
      countFrom: 2,
    });
  }
}

function syncGanttPeriodControls(options = {}) {
  const customVisible = ganttPeriodFilter === "custom";

  if (customVisible && !ganttPeriodStart && !ganttPeriodEnd) {
    const year = getGanttPeriodYear();
    ganttPeriodStart = `${year}-01-01`;
    ganttPeriodEnd = `${year}-12-31`;
  }

  if (els.ganttPeriodFilter) els.ganttPeriodFilter.value = ganttPeriodFilter;
  if (els.ganttPeriodStart) els.ganttPeriodStart.value = ganttPeriodStart;
  if (els.ganttPeriodEnd) els.ganttPeriodEnd.value = ganttPeriodEnd;
  document.querySelectorAll("[data-gantt-period-custom], .gantt-period-custom").forEach((field) => {
    field.hidden = !customVisible;
    field.classList.toggle("is-visible", customVisible);
    field.classList.toggle("hidden", !customVisible);
  });
}

function getGanttSystemFilterOptions() {
  return [
    { value: generalWorkScopeId, label: "一般工作" },
    ...state.systems.map((system) => ({ value: system.id, label: system.name })),
  ];
}

function getGanttProjectFilterOptions() {
  return getGanttFilterProjects().map((project) => ({ value: project.id, label: project.name }));
}

function getGanttSelectedSystemIds() {
  return normalizeFilterValues(ganttSystemFilterIds);
}

function getGanttSelectedRealSystemIds() {
  return getGanttSelectedSystemIds().filter((systemId) => systemId !== generalWorkScopeId);
}

function ganttSystemFilterIncludesGeneral() {
  return getGanttSelectedSystemIds().includes(generalWorkScopeId);
}

function taskMatchesGanttSystemFilters(task, systemIds = getGanttSelectedSystemIds()) {
  if (!systemIds.length) return true;
  const scope = getTaskScope(task);
  if (scope === "general") return systemIds.includes(generalWorkScopeId);
  return systemIds.includes(task.systemId);
}

function ganttProjectMatchesSystemScope(project, systemIds = getGanttSelectedSystemIds()) {
  const realSystemIds = systemIds.filter((systemId) => systemId !== generalWorkScopeId);
  if (!realSystemIds.length) return !systemIds.length;
  return realSystemIds.includes(project.systemId);
}

function filterGanttProjectFiltersBySystem(values = []) {
  const allowedProjectIds = new Set(getGanttFilterProjects().map((project) => project.id));
  return normalizeFilterValues(values).filter((projectId) => allowedProjectIds.has(projectId));
}

function hasActiveGanttEntityFilters() {
  return Boolean(ganttOwnerFilterIds.length || ganttCollaborationFilters.length);
}

function entityMatchesGanttEntityFilters(entity) {
  return entityMatchesOwnerFilter(entity, ganttOwnerFilterIds)
    && entityMatchesCollaborationFilter(entity, ganttCollaborationFilters);
}

function systemMatchesGanttSearch(system, query) {
  if (!query) return true;
  const haystack = [
    system?.name,
    system?.description,
    system?.ownerName,
    getInternalOwnerIds(system).map((uid) => getOwnerDisplayName(getKnownOwner(uid, system) || { name: uid })).join(" "),
    (system?.tags || []).join(" "),
    (system?.collaborationTags || []).join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function getGanttFilterTaskProjectIds(systemId, phase) {
  const phaseProjectIds = state.projects
    .filter((project) => projectMatchesPhaseFilters(project, phase))
    .map((project) => project.id);

  return new Set(
    state.tasks
      .filter((task) => {
        return !isTaskDeleted(task)
          && getTaskScope(task) === "project"
          && task.projectId
          && (ganttShowRecurring || (!isRecurringTemplateTask(task) && !isRecurringOccurrenceTask(task)))
          && taskMatchesSystemScope(task, systemId)
          && taskMatchesPhaseScope(task, phaseProjectIds, phase)
          && entityMatchesGanttEntityFilters(task);
      })
      .map((task) => task.projectId),
  );
}

function getGanttFilterProjects() {
  const selectedSystemIds = getGanttSelectedSystemIds();
  if (ganttSystemFilterIncludesGeneral() && !getGanttSelectedRealSystemIds().length) return [];
  return state.projects
    .filter((project) => ganttProjectMatchesSystemScope(project, selectedSystemIds))
    .sort(compareManualThenName);
}

function getGanttGroups(options = {}) {
  const periodRange = options.periodRange ?? getGanttPeriodRange();
  const visibleTasks = getGanttVisibleTasks({
    includeRecurring: options.includeRecurring,
    recurrenceRange: options.recurrenceRange,
    periodRange,
  });
  const projects = getGanttScopedProjects(visibleTasks, { periodRange });
  const groups = [];
  const selectedSystemIds = getGanttSelectedSystemIds();
  const selectedRealSystemIds = getGanttSelectedRealSystemIds();
  const includeGeneral = !selectedSystemIds.length || ganttSystemFilterIncludesGeneral();

  if (ganttSystemFilterIncludesGeneral() && !selectedRealSystemIds.length) {
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
    return groups;
  }

  const query = els.searchInput.value.trim().toLowerCase();
  const hasEntityFilters = hasActiveGanttEntityFilters();
  const systems = selectedRealSystemIds.length
    ? getProjectGroupSystems(projects, visibleTasks).filter((system) => selectedRealSystemIds.includes(system.id))
    : getProjectGroupSystems(projects, visibleTasks);

  systems.forEach((system) => {
    const systemProjects = projects
      .filter((project) => project.systemId === system.id)
      .sort(compareGanttEntity)
      .map((project) => ({
        project,
        tasks: visibleTasks.filter((task) => getTaskScope(task) === "project" && task.projectId === project.id).sort(compareGanttEntity),
      }));
    const systemTasks = visibleTasks.filter((task) => getTaskScope(task) === "system" && task.systemId === system.id).sort(compareGanttEntity);
    const systemMatchesFilters = entityMatchesGanttEntityFilters(system) && systemMatchesGanttSearch(system, query);
    const keepMatchingSystem = !periodRange
      && !ganttProjectFilterIds.length
      && !ganttPhaseFilterIds.length
      && (hasEntityFilters ? systemMatchesFilters : selectedRealSystemIds.includes(system.id) && systemMatchesGanttSearch(system, query));

    if (systemProjects.length || systemTasks.length || keepMatchingSystem) {
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

  if (includeGeneral) {
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

function getGanttVisibleTasks(options = {}) {
  const periodRange = options.periodRange ?? getGanttPeriodRange();
  const contextPool = getGanttTaskContextPool({ includeRecurring: options.includeRecurring });
  let visibleTasks = getVisibleTasks({
    projectId: ganttProjectFilterIds,
    systemIds: getGanttSelectedSystemIds(),
    phase: ganttPhaseFilterIds,
    ownerIds: ganttOwnerFilterIds,
    collaborationTags: ganttCollaborationFilters,
    strictEntityFilters: true,
    includeOccurrences: options.includeRecurring,
  });

  visibleTasks = options.includeRecurring
    ? expandGanttRecurringTasks(visibleTasks, options.recurrenceRange || periodRange)
    : visibleTasks.filter((task) => !isRecurringTemplateTask(task) && !isRecurringOccurrenceTask(task));

  visibleTasks = visibleTasks
    .filter((task) => !isRecurringTemplateTask(task))
    .filter((task) => ganttTaskMatchesPeriod(task, periodRange, { allowUndated: ganttShowUndatedItems }));

  return includeGanttTaskAncestors(visibleTasks, contextPool);
}

function getGanttTaskContextPool(options = {}) {
  return getUniqueTasksForDisplay(state.tasks).filter((task) => {
    if (isTaskDeleted(task)) return false;
    if (!options.includeRecurring && (isRecurringTemplateTask(task) || isRecurringOccurrenceTask(task))) return false;
    return taskMatchesGanttSystemFilters(task)
      && taskMatchesProjectScope(task, ganttProjectFilterIds);
  });
}

function includeGanttTaskAncestors(tasks = [], pool = []) {
  const rows = [];
  const seenIds = new Set();
  const poolById = new Map(pool.map((task) => [task.id, task]));
  const addWithAncestors = (task) => {
    if (!task || seenIds.has(task.id)) return;
    const ancestors = [];
    let parent = task.parentTaskId ? poolById.get(task.parentTaskId) : null;
    while (parent && !seenIds.has(parent.id)) {
      ancestors.unshift(parent);
      parent = parent.parentTaskId ? poolById.get(parent.parentTaskId) : null;
    }
    ancestors.forEach((ancestor) => {
      if (!seenIds.has(ancestor.id)) {
        seenIds.add(ancestor.id);
        rows.push(ancestor);
      }
    });
    if (!seenIds.has(task.id)) {
      seenIds.add(task.id);
      rows.push(task);
    }
  };
  tasks.forEach(addWithAncestors);
  return rows;
}

function expandGanttRecurringTasks(tasks = [], timeline = null) {
  if (!timeline) return tasks;
  const range = normalizeGanttRangeLike(timeline);
  if (!range) return tasks;
  const visibleTasks = tasks.filter((task) => {
    if (isRecurringOccurrenceTask(task)) return ganttTaskMatchesPeriod(task, range, { allowUndated: false });
    return true;
  });
  const virtualOccurrences = visibleTasks
    .filter(isRecurringTemplateTask)
    .flatMap((task) => getVirtualRecurringOccurrencesForRange(task, range.start, range.end));
  return [...visibleTasks, ...virtualOccurrences];
}

function getGanttScopedProjects(visibleTasks, options = {}) {
  const query = els.searchInput.value.trim().toLowerCase();
  const phase = ganttPhaseFilterIds;
  const periodRange = options.periodRange ?? getGanttPeriodRange();
  const visibleTaskProjectIds = new Set(
    visibleTasks
      .filter((task) => getTaskScope(task) === "project" && task.projectId)
      .map((task) => task.projectId),
  );

  return state.projects.filter((project) => {
    const system = getSystem(project.systemId);
    const matchSystem = ganttProjectMatchesSystemScope(project);
    const matchProject = filterIncludesValue(ganttProjectFilterIds, project.id);
    const matchPhase = projectMatchesGanttPhaseFilters(project, phase) || visibleTaskProjectIds.has(project.id);
    const matchQuery = !query || projectMatchesSearch(project, system, query) || visibleTaskProjectIds.has(project.id);
    const matchFilters = entityMatchesGanttEntityFilters(project) || visibleTaskProjectIds.has(project.id);
    const matchPeriod = visibleTaskProjectIds.has(project.id) || ganttProjectMatchesPeriod(project, periodRange);
    return matchSystem && matchProject && matchPhase && matchQuery && matchFilters && matchPeriod;
  });
}

function getGanttPeriodYear() {
  return todayDate().getFullYear();
}

function getGanttPresetPeriodRange(period = ganttPeriodFilter) {
  const year = getGanttPeriodYear();
  const ranges = {
    year: [`${year}-01-01`, `${year}-12-31`],
    firstHalf: [`${year}-01-01`, `${year}-06-30`],
    secondHalf: [`${year}-07-01`, `${year}-12-31`],
    q1: [`${year}-01-01`, `${year}-03-31`],
    q2: [`${year}-04-01`, `${year}-06-30`],
    q3: [`${year}-07-01`, `${year}-09-30`],
    q4: [`${year}-10-01`, `${year}-12-31`],
  };
  const range = ranges[period];
  return range ? { start: range[0], end: range[1] } : null;
}

function getGanttCustomPeriodRange() {
  return normalizeGanttRange(ganttPeriodStart, ganttPeriodEnd || ganttPeriodStart);
}

function getGanttPeriodRange() {
  if (ganttPeriodFilter === "custom") return getGanttCustomPeriodRange();
  return getGanttPresetPeriodRange(ganttPeriodFilter);
}

function getGanttPeriodRangeLabel(periodRange = getGanttPeriodRange()) {
  if (!periodRange) return "";
  const periodLabel = ganttPeriodOptions.find((option) => option.value === ganttPeriodFilter)?.label || "期間";
  return `${periodLabel} ${formatDateRangeYmd(periodRange.start, periodRange.end)}`;
}

function normalizeGanttRangeLike(range = null) {
  if (!range) return null;
  return normalizeGanttRange(range.start || range.startString || "", range.end || range.endString || "");
}

function ganttRangeMatchesPeriod(start = "", end = "", periodRange = getGanttPeriodRange(), options = {}) {
  const range = normalizeGanttRange(start, end);
  if (!range) return Boolean(options.allowUndated);
  if (!periodRange) return true;
  return range.start <= periodRange.end && range.end >= periodRange.start;
}

function ganttTaskMatchesPeriod(task = {}, periodRange = getGanttPeriodRange(), options = {}) {
  const start = getTaskTimelineStart(task);
  const end = getTaskTimelineEnd(task) || start;
  return ganttRangeMatchesPeriod(start, end, periodRange, options);
}

function ganttPhaseMatchesPeriod(phaseItem = {}, periodRange = getGanttPeriodRange(), options = {}) {
  return ganttRangeMatchesPeriod(phaseItem.start, phaseItem.end || phaseItem.start, periodRange, options);
}

function projectMatchesGanttPhaseFilters(project = {}, phaseFilters = ganttPhaseFilterIds) {
  const selectedPhases = normalizeFilterValues(phaseFilters);
  if (!selectedPhases.length) return true;
  if (projectMatchesPhaseFilters(project, selectedPhases)) return true;
  return getGanttProjectPhases(project).some((phaseItem) => {
    if (selectedPhases.includes("unset") && phaseItem.unassigned) return true;
    return selectedPhases.includes(phaseItem.phaseId);
  });
}

function ganttPhaseMatchesFilters(phaseItem = {}, phaseFilters = ganttPhaseFilterIds) {
  const selectedPhases = normalizeFilterValues(phaseFilters);
  if (!selectedPhases.length) return true;
  if (phaseItem.unassigned || phaseItem.undatedPhaseTasks) return selectedPhases.includes("unset");
  return selectedPhases.includes(phaseItem.phaseId);
}

function ganttProjectMatchesPeriod(project = {}, periodRange = getGanttPeriodRange()) {
  const projectRange = getGanttProjectRange(project, []);
  if (ganttRangeMatchesPeriod(projectRange?.start, projectRange?.end, periodRange, { allowUndated: false })) {
    return true;
  }
  return getGanttProjectPhases(project).some((phaseItem) => {
    return ganttPhaseMatchesFilters(phaseItem)
      && ganttPhaseMatchesPeriod(phaseItem, periodRange, { allowUndated: ganttShowUndatedPhases });
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
    group.kind === "general" ? "一般工作任務" : "系統層級任務",
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
  const phases = getGanttProjectPhases(project);
  const phaseRows = renderGanttPhaseBlock(project, phases, tasks, timeline);
  const taskRows = project.category === "general"
    ? renderGanttTaskBlock("專案任務", tasks, timeline, "project-task", `project-${project.id}-tasks`)
    : "";
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

function renderGanttPhaseBlock(project, phases, tasks, timeline) {
  if (project.category === "general") return "";

  const groupId = `project-${project.id}-phases`;
  const collapsed = Boolean(ganttCollapsed.phaseGroups[groupId]);
  const summary = getGanttProjectPhaseSummary(project, phases);
  const phaseTaskGroups = getGanttPhaseTaskGroups(project, phases, tasks);
  if (!ganttShowUndatedPhases && !phaseTaskGroups.length) return "";
  const phaseRows = collapsed ? "" : phaseTaskGroups
    .map(({ phase, tasks: phaseTasks }) => renderGanttPhaseRow(project, phase, phaseTasks, timeline))
    .join("");

  return `
    ${renderGanttRow({
      className: `gantt-phase-group-row gantt-level-2 status-${summary.status}`,
      label: renderGanttTreeLabel({
        level: 2,
        type: "階段",
        typeClass: `phase-summary ${summary.status}`,
        name: "專案階段",
        meta: summary.meta,
        toggle: {
          id: groupId,
          target: "phase-group",
          collapsed,
        },
      }),
      grid: renderGanttBar(summary.start, summary.end, timeline, {
        className: `phase summary ${summary.status}`,
        title: `${project.name} / ${summary.meta}`,
        content: summary.content,
      }),
      timeline,
    })}
    ${phaseRows}
  `;
}

function getGanttPhaseTaskGroups(project, phases, tasks = []) {
  const validStageIds = new Set(phases.map((phase) => phase.id).filter(Boolean));
  const tasksByStage = new Map(phases.map((phase) => [phase.id, []]));
  const unassignedTasks = [];

  tasks.forEach((task) => {
    if (task.stageId && validStageIds.has(task.stageId)) {
      tasksByStage.get(task.stageId).push(task);
      return;
    }
    unassignedTasks.push(task);
  });

  const periodRange = getGanttPeriodRange();
  const groups = phases.reduce((rows, phase) => {
    const phaseTasks = (tasksByStage.get(phase.id) || []).sort(compareGanttEntity);
    const phaseMatchesFilters = ganttPhaseMatchesFilters(phase);
    const phaseMatchesPeriod = ganttPhaseMatchesPeriod(phase, periodRange, { allowUndated: ganttShowUndatedPhases });
    if (phaseTasks.length || (phaseMatchesFilters && phaseMatchesPeriod)) {
      rows.push({ phase, tasks: phaseTasks });
    }
    return rows;
  }, []);

  if (!ganttShowUndatedPhases) {
    const undatedPhaseTasks = phases
      .filter((phase) => !phase.hasDate)
      .flatMap((phase) => tasksByStage.get(phase.id) || []);
    if (undatedPhaseTasks.length) {
      const range = getGanttTasksRange(undatedPhaseTasks);
      groups.push({
        phase: {
          id: `undated-${project.id}`,
          label: "無日期階段任務",
          start: range?.start || "",
          end: range?.end || "",
          hasDate: false,
          undatedPhaseTasks: true,
        },
        tasks: undatedPhaseTasks.sort(compareGanttEntity),
      });
    }
  }

  if (unassignedTasks.length) {
    const range = getGanttTasksRange(unassignedTasks);
    groups.push({
      phase: {
        id: `unassigned-${project.id}`,
        label: "未指定階段",
        start: range?.start || "",
        end: range?.end || "",
        unassigned: true,
      },
      tasks: unassignedTasks.sort(compareGanttEntity),
    });
  }

  return groups;
}

function getGanttStageCollapseId(project, phaseItem) {
  return `project-${project.id}-stage-${phaseItem.id || "unassigned"}`;
}

function renderGanttPhaseRow(project, phaseItem, phaseTasks, timeline) {
  const current = !phaseItem.undatedPhaseTasks && isDateWithinGanttPhase(todayString(), phaseItem);
  const stageId = getGanttStageCollapseId(project, phaseItem);
  const collapsed = Boolean(ganttCollapsed.stages[stageId]);
  const taskCount = phaseTasks.length;
  const rangeLabel = formatRange(phaseItem.start, phaseItem.end);
  const meta = [
    rangeLabel,
    `${taskCount} 任務`,
    current ? "目前階段" : "",
  ].filter(Boolean).join("・");

  return `
    ${renderGanttRow({
      className: `gantt-phase-row gantt-level-3 ${current ? "active" : ""} ${phaseItem.unassigned ? "unassigned" : ""} ${phaseItem.undatedPhaseTasks ? "undated-phase-tasks" : ""}`,
      label: renderGanttTreeLabel({
        level: 3,
        type: phaseItem.undatedPhaseTasks ? "任務" : "階段",
        typeClass: `${current ? "phase active" : "phase"} ${phaseItem.unassigned ? "unassigned" : ""} ${phaseItem.undatedPhaseTasks ? "undated-phase-tasks" : ""}`,
        name: phaseItem.label,
        meta,
        toggle: {
          id: stageId,
          target: "stage",
          collapsed,
        },
      }),
      grid: renderGanttBar(phaseItem.start, phaseItem.end, timeline, {
        className: `phase ${current ? "active" : ""} ${phaseItem.unassigned ? "unassigned" : ""} ${phaseItem.undatedPhaseTasks ? "undated-phase-tasks" : ""}`,
        title: `${project.name} / ${phaseItem.label}`,
        content: current ? "目前階段" : phaseItem.undatedPhaseTasks ? "任務" : phaseItem.label,
      }),
      timeline,
    })}
    ${collapsed ? "" : renderGanttTaskRows(phaseTasks, timeline, 4)}
  `;
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
    ${collapsed ? "" : renderGanttTaskRows(tasks, timeline)}
  `;
}

function renderGanttTaskRows(tasks = [], timeline, level = 3) {
  const byParent = new Map();
  const taskIds = new Set(tasks.map((task) => task.id));
  tasks.forEach((task) => {
    const parentId = task.parentTaskId && taskIds.has(task.parentTaskId) ? task.parentTaskId : "";
    if (!byParent.has(parentId)) byParent.set(parentId, []);
    byParent.get(parentId).push(task);
  });
  const renderRows = (parentId = "", currentLevel = level) => (byParent.get(parentId) || [])
    .sort(parentId ? compareSubtasksByStartTime : compareGanttEntity)
    .map((task) => {
      const taskKey = task.id;
      return `${renderGanttTaskRow(task, timeline, currentLevel)}${renderRows(taskKey, currentLevel + 1)}`;
    })
    .join("");
  return renderRows();
}

function renderGanttTaskRow(task, timeline, level = 3) {
  const priority = getPriorityLabel(task.priority);
  const overdue = task.status !== "done" && taskIsOverdue(task);
  const status = overdue ? "逾期" : getStatusLabel(task.status);
  const owner = task.owner || "未指定";
  const taskId = task.originalTaskId || task.id;
  const taskActionAttributes = isVirtualRecurringOccurrenceTask(task)
    ? `data-gantt-task="${escapeHtml(task.id)}" data-gantt-virtual-template="${escapeHtml(task.templateTaskId || "")}" data-gantt-virtual-date="${escapeHtml(task.occurrenceDate || "")}"`
    : `data-gantt-task="${escapeHtml(taskId)}"`;
  const start = getTaskTimelineStart(task);
  const end = getTaskTimelineEnd(task) || start;
  const timeLabel = isRecurringTemplateTask(task)
    ? getRecurrenceLabel(task)
    : isRecurringOccurrenceTask(task)
      ? `${formatRange(start, end)}・${task.recurringLabel || "週期"}`
      : formatRange(start, end);
  const grid = [
    renderGanttBar(start, end, timeline, {
      className: `task status-${overdue ? "overdue" : task.status} priority-${task.priority} ${task.isRecurringOccurrence ? "recurring" : ""}`,
      title: `${task.title} ${timeLabel}`,
      content: `${status}・${task.title}`,
      data: taskActionAttributes,
    }),
    renderGanttMarker(task.executionDate, timeline, "execution", `執行日：${formatDate(task.executionDate)}`),
    renderGanttMarker(task.deadline, timeline, "deadline", `截止日：${formatDate(task.deadline)}`),
  ].join("");

  return renderGanttRow({
    className: `gantt-task-row gantt-level-${level} priority-${task.priority} ${task.isRecurringOccurrence ? "recurring" : ""}`,
    label: renderGanttTreeLabel({
      level,
      type: "任務",
      typeClass: `task priority-${task.priority} ${overdue ? "overdue" : ""}`,
      name: task.title,
      meta: `${owner}・${status}・${timeLabel}${task.occurrenceDate ? `・${formatDate(task.occurrenceDate)}` : ""}・優先級 ${priority}`,
      actionAttributes: taskActionAttributes,
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

  els.ganttChart.querySelectorAll("[data-gantt-toggle-phase-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.ganttTogglePhaseGroup;
      ganttCollapsed.phaseGroups[id] = !ganttCollapsed.phaseGroups[id];
      persistViewPreferences();
      renderGanttPage();
    });
  });

  els.ganttChart.querySelectorAll("[data-gantt-toggle-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.ganttToggleStage;
      ganttCollapsed.stages[id] = !ganttCollapsed.stages[id];
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
    button.addEventListener("click", () => {
      if (button.dataset.ganttVirtualTemplate) {
        const occurrence = materializeRecurringOccurrence(button.dataset.ganttVirtualTemplate, button.dataset.ganttVirtualDate);
        if (!occurrence) {
          alert("無法建立這次週期任務，請確認週期模板仍可產生任務。");
          return;
        }
        openTodoDrawer(occurrence.id, "view");
        return;
      }
      openTodoDrawer(button.dataset.ganttTask, "view");
    });
  });
}

function buildGanttTimeline(groups, forcedRange = null) {
  const today = todayString();
  const normalizedForcedRange = normalizeGanttRangeLike(forcedRange);
  const dates = normalizedForcedRange
    ? [normalizedForcedRange.start, normalizedForcedRange.end]
    : [...collectGanttDates(groups), today].filter(Boolean).sort();
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

function focusGanttTimelineOnToday(timeline) {
  if (!timeline?.units?.length || !els.ganttChart) return;
  const todayIndex = getGanttUnitIndex(todayString(), timeline);
  if (todayIndex < 0) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const chart = els.ganttChart;
      const inner = chart.querySelector(".gantt-chart-inner");
      const labelCell = chart.querySelector(".gantt-label-cell");
      const labelWidth = Number.parseFloat(getComputedStyle(inner || chart).getPropertyValue("--gantt-label-width"))
        || labelCell?.getBoundingClientRect().width
        || 0;
      const visibleGridWidth = Math.max(0, chart.clientWidth - labelWidth);
      const preferredOffset = Math.max(timeline.unitWidth, Math.floor(visibleGridWidth * 0.25));
      const maxScroll = Math.max(0, chart.scrollWidth - chart.clientWidth);
      const targetLeft = Math.min(maxScroll, Math.max(0, todayIndex * timeline.unitWidth - preferredOffset));
      chart.scrollTo({ left: targetLeft, top: chart.scrollTop, behavior: "auto" });
    });
  });
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
    dates.push(getTaskTimelineStart(task), getTaskTimelineEnd(task), task.executionDate, task.deadline);
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
  const stageRange = getGanttRangeFromDates(getProjectStages(project.id).flatMap((stage) => [stage.startDate, stage.endDate]));
  if (stageRange) return stageRange;
  const plannedRange = getProjectScheduleRange(project.plannedStart, project.plannedEnd, project.phaseSchedules || {});
  if (plannedRange.start || plannedRange.end) return normalizeGanttRange(plannedRange.start, plannedRange.end);
  return getGanttTasksRange(tasks);
}

function getGanttProjectPhases(project) {
  if (project.category === "general") return [];
  return getProjectStages(project.id)
    .sort(compareGanttEntity)
    .map((stage) => {
      const phaseId = stage.phaseId || getPhaseIdByLabel(stage.name);
      const plannedSchedule = getGanttPhasePlannedSchedule(project, phaseId);
      const start = plannedSchedule.start || stage.startDate || "";
      const end = plannedSchedule.end || stage.endDate || "";
      const hasDate = Boolean(plannedSchedule.hasPlannedDate || stage.startDate || stage.endDate);
      const range = normalizeGanttRange(start, end);
      return range ? { id: stage.id, phaseId, label: stage.name, start: range.start, end: range.end, hasDate } : {
        id: stage.id,
        phaseId,
        label: stage.name,
        start: "",
        end: "",
        hasDate,
      };
    });
}

function getGanttPhasePlannedSchedule(project = {}, phaseId = "") {
  const schedule = phaseId ? project.phaseSchedules?.[phaseId] || {} : {};
  return {
    start: schedule.start || "",
    end: schedule.end || "",
    hasPlannedDate: Boolean(schedule.start || schedule.end),
  };
}

function getGanttProjectPhaseSummary(project, phases = getGanttProjectPhases(project)) {
  const scheduledPhases = phases
    .map((phaseItem) => {
      const start = phaseItem.start || phaseItem.end || "";
      const end = phaseItem.end || phaseItem.start || "";
      return { ...phaseItem, start, end };
    })
    .filter((phaseItem) => phaseItem.start || phaseItem.end)
    .sort((a, b) => {
      const first = a.start || a.end || "9999-12-31";
      const second = b.start || b.end || "9999-12-31";
      if (first !== second) return first.localeCompare(second);
      return (a.end || "").localeCompare(b.end || "");
    });

  if (!scheduledPhases.length) {
    return {
      status: "unset",
      meta: "未設定階段排程",
      content: "",
      start: "",
      end: "",
    };
  }

  const today = todayString();
  const current = scheduledPhases.find((phaseItem) => isDateWithinGanttPhase(today, phaseItem));
  if (current) {
    return {
      status: "active",
      meta: `目前階段：${current.label}｜${formatRange(current.start, current.end)}`,
      content: "目前階段",
      start: current.start,
      end: current.end,
    };
  }

  const next = scheduledPhases.find((phaseItem) => phaseItem.start && phaseItem.start > today);
  if (next) {
    const first = scheduledPhases[0];
    const status = first.start && today < first.start ? "upcoming" : "gap";
    return {
      status,
      meta: `${status === "upcoming" ? "尚未開始" : "階段空窗"}｜下一階段：${next.label} ${formatDate(next.start)} 開始`,
      content: "下一階段",
      start: next.start,
      end: next.end,
    };
  }

  const last = scheduledPhases[scheduledPhases.length - 1];
  const closed = project.closed || project.phase === "closed";
  return {
    status: closed ? "closed" : "overrun",
    meta: `${closed ? "已結案" : "已超出規劃"}｜最後階段：${last.label} ${formatDate(last.end || last.start)} 結束`,
    content: closed ? "已結案" : "已超出規劃",
    start: last.start,
    end: last.end,
  };
}

function isDateWithinGanttPhase(dateString, phaseItem = {}) {
  if (!dateString) return false;
  const start = phaseItem.start || phaseItem.end || "";
  const end = phaseItem.end || phaseItem.start || "";
  if (!start && !end) return false;
  return (!start || dateString >= start) && (!end || dateString <= end);
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
  const visibleStart = range.start < timeline.startString ? timeline.startString : range.start;
  const visibleEnd = range.end > timeline.endString ? timeline.endString : range.end;
  if (visibleEnd < timeline.startString || visibleStart > timeline.endString) return null;
  const startIndex = getGanttUnitIndex(visibleStart, timeline);
  const endIndex = getGanttUnitIndex(visibleEnd, timeline);
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
  const tasks = getProjectTasks(projectId);
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
  const displayTasks = getUniqueTasksForDisplay(tasks);
  const activeTasks = sortTodoTasks(displayTasks.filter((task) => task.status !== "done"));
  const completedTasks = sortTodoTasks(displayTasks.filter((task) => task.status === "done"));

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
      <span>標題</span>
      <span>所屬</span>
      <span>最後期限</span>
      <span>負責人</span>
      <span>狀態</span>
      <span>優先級</span>
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
  const completed = task.status === "done";
  const today = todayString();
  const shouldMarkOverdue = activeTodoView === "incomplete" && !completed;
  const deadlineOverdueClass = shouldMarkOverdue && task.deadline && task.deadline < today ? "todo-overdue-date" : "";
  const completedMeta = completed ? `<span class="todo-subtitle">已完成 ${formatDate(task.completedDate)}</span>` : "";
  const recurrenceMeta = isRecurringTemplateTask(task)
    ? `<span class="todo-subtitle recurrence">${escapeHtml(getRecurrenceLabel(task))}</span>`
    : isRecurringOccurrenceTask(task)
      ? `<span class="todo-subtitle recurrence">週期・${escapeHtml(task.recurringLabel || "")}</span>`
      : "";
  const draggable = todoSortKey === "manual" ? ` draggable="true"` : "";

  return `
    <article class="todo-task-row ${completed ? "completed" : ""} ${isRecurringTemplateTask(task) || isRecurringOccurrenceTask(task) ? "recurring" : ""}" data-task-row="${task.id}"${draggable}>
      <div class="todo-title-cell">
        <strong class="todo-task-title">${escapeHtml(task.title)}</strong>
        ${completedMeta}
        ${recurrenceMeta}
      </div>
      <span class="todo-task-meta-cell">${escapeHtml(getTaskContextLabel(task))}</span>
      <span class="todo-task-meta-cell ${deadlineOverdueClass}">${getTaskDeadlineSummary(task)}</span>
      <span class="todo-task-meta-cell">${escapeHtml(task.owner || task.ownerName || "未指定")}</span>
      <span class="todo-pill status-${task.status}">${escapeHtml(getStatusLabel(task.status))}</span>
      <span class="todo-pill priority-${task.priority}">${escapeHtml(getPriorityLabel(task.priority))}</span>
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

  if (todoSortKey === "manual") attachTodoManualSortHandlers();
}

function attachTodoManualSortHandlers() {
  els.todoPageList.querySelectorAll("[data-task-row]").forEach((row) => {
    row.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", row.dataset.taskRow);
      event.dataTransfer.effectAllowed = "move";
      row.classList.add("dragging");
    });
    row.addEventListener("dragend", () => {
      row.classList.remove("dragging");
    });
  });

  els.todoPageList.querySelectorAll(".todo-standard-section, .todo-section-content, .todo-completed-list, .todo-group-block").forEach((list) => {
    list.addEventListener("dragover", (event) => {
      if (!Array.from(event.dataTransfer.types || []).includes("text/plain")) return;
      event.preventDefault();
      list.classList.add("drag-over");
      event.dataTransfer.dropEffect = "move";
    });
    list.addEventListener("dragleave", () => {
      list.classList.remove("drag-over");
    });
    list.addEventListener("drop", (event) => {
      event.preventDefault();
      event.stopPropagation();
      list.classList.remove("drag-over");
      const taskId = event.dataTransfer.getData("text/plain");
      if (!taskId || !getProjectTask(taskId)) return;
      const beforeId = getDropBeforeId(list, event.clientY, "[data-task-row]", "taskRow");
      const orderedIds = getReorderedIds(list, "[data-task-row]", "taskRow", taskId, beforeId);
      applyTaskManualOrder(orderedIds);
    });
  });
}

function applyTaskManualOrder(taskIds = []) {
  const orderMap = new Map(taskIds.map((id, index) => [id, index + 1]));
  state.tasks = state.tasks.map((task) => {
    return orderMap.has(task.id) ? { ...task, sortOrder: orderMap.get(task.id) } : task;
  });
  saveTaskState(taskIds);
  render();
}

function getTasksForTodoView(viewId, systemId = selectedSystemId) {
  const today = todayString();
  const tomorrow = getDateOffset(1);
  const thisWeek = getWeekRange(0);
  const nextWeek = getWeekRange(1);
  if (viewId === "tomorrow") ensureRecurringOccurrencesForRange(tomorrow, tomorrow);
  else if (viewId === "thisWeek") ensureRecurringOccurrencesForRange(thisWeek.start, thisWeek.end);
  else if (viewId === "nextWeek") ensureRecurringOccurrencesForRange(nextWeek.start, nextWeek.end);
  else ensureRecurringOccurrencesForRange(today, today);

  const normalizedTagFilter = selectedTagFilter.trim().toLowerCase();
  const scopedTasks = getUniqueTasksForDisplay(state.tasks).filter((task) => {
    const matchTag = !normalizedTagFilter || (task.tags || []).some((tag) => tag.toLowerCase() === normalizedTagFilter);
    return isTodoDisplayTask(task)
      && taskMatchesSystemScope(task, systemId)
      && matchTag
      && taskMatchesTodoOwnerFilter(task);
  });

  if (viewId === "today") {
    return scopedTasks
      .filter((task) => taskMatchesTodayTodo(task, today));
  }
  if (viewId === "tomorrow") return scopedTasks.filter((task) => taskMatchesDate(task, tomorrow));
  if (viewId === "thisWeek") return scopedTasks.filter((task) => taskMatchesRange(task, thisWeek.start, thisWeek.end));
  if (viewId === "nextWeek") return scopedTasks.filter((task) => taskMatchesRange(task, nextWeek.start, nextWeek.end));
  return scopedTasks;
}

function recurringOccurrenceCompleted(task = {}, date = "") {
  if (!date) return false;
  const persistedOccurrence = state.tasks.find((item) => {
    return isRecurringOccurrenceTask(item) && item.templateTaskId === task.id && item.occurrenceDate === date;
  });
  return Boolean(persistedOccurrence?.status === "done" || (task.completedOccurrences || []).includes(date));
}

function getTodayTodoSections(tasks) {
  const today = todayString();
  const displayTasks = getUniqueTasksForDisplay(tasks);
  const incompleteTasks = displayTasks.filter((task) => isTodoDisplayTask(task) && task.status !== "done");
  const deadlineTasks = incompleteTasks.filter((task) => task.deadline === today);
  const deadlineIds = new Set(deadlineTasks.map((task) => task.id));
  const generalTasks = incompleteTasks.filter((task) => {
    const runsToday = task.executionDate === today;
    return runsToday && !deadlineIds.has(task.id);
  });
  const generalIds = new Set(generalTasks.map((task) => task.id));
  const rangeTasks = incompleteTasks.filter((task) => {
    return taskRangeIncludesDate(task, today) && !deadlineIds.has(task.id) && !generalIds.has(task.id);
  });

  return {
    deadline: sortTodoTasks(deadlineTasks),
    general: sortTodoTasks(generalTasks),
    range: sortTodoTasks(rangeTasks),
    completed: sortTodoTasks(displayTasks.filter((task) => isTodoDisplayTask(task) && task.status === "done" && task.completedDate === today)),
  };
}

function taskMatchesTodayTodo(task, today = todayString()) {
  if (isRecurringTemplateTask(task)) return false;
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
    task.ownerName,
    getInternalOwnerIds(task).map((uid) => getOwnerDisplayName(getKnownOwner(uid, task) || { name: uid })).join(" "),
    (task.collaborationTags || []).join(" "),
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
    (system?.tags || []).join(" "),
    (system?.collaborationTags || []).join(" "),
    project?.name,
    project?.description,
    project?.ownerName,
    (project?.tags || []).join(" "),
    (project?.collaborationTags || []).join(" "),
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

function taskMatchesTodoOwnerFilter(task, ownerIds = todoOwnerFilterIds) {
  const selectedOwnerIds = normalizeFilterValues(ownerIds);
  if (!selectedOwnerIds.length) return true;
  const selectedOwners = new Set(selectedOwnerIds);
  return getInternalOwnerIds(task).some((ownerId) => selectedOwners.has(ownerId));
}

function sortTodoTasks(tasks) {
  const priorityRank = { low: 0, medium: 1, high: 2 };
  if (todoSortKey === "manual") {
    return [...tasks].sort((a, b) => {
      const result = compareManualThenName(a, b);
      return todoSortDirection === "desc" ? -result : result;
    });
  }
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
  updatedTask.completedAt = nextStatus === "done"
    ? previous.completedAt || new Date().toISOString()
    : null;
  updatedTask.completedBy = nextStatus === "done"
    ? previous.completedBy || currentProfile?.uid || currentFirebaseUser?.uid || currentSafeUser?.uid || ""
    : null;

  if (previousTask && !isRecurringTemplateTask(previous) && nextStatus === "doing" && previous.status !== "doing" && previous.rangeStart && previous.rangeStart > today) {
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

  saveTaskState([taskId]);
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

  saveTaskState([taskId]);
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
  const taskChanged = selectedTodoTaskId !== taskId;
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
  if (taskChanged || mode !== "view") activeTaskDrawerTab = "summary";
  getInactiveTaskDrawers().forEach(hideTaskDrawer);
  drawer.classList.remove("hidden");
  drawer.setAttribute("aria-hidden", "false");
  syncTaskDrawerShell(true);
  renderTodoDrawer();
}

function closeTodoDrawer() {
  selectedTodoTaskId = null;
  drawerMode = "view";
  activeTaskDrawerTab = "summary";
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
    activeTaskDrawerTab = "summary";
    renderTodoDrawer();
  });
  drawer.querySelectorAll("[data-drawer-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTaskDrawerTab = normalizeTaskDrawerTab(button.dataset.drawerTab);
      renderTodoDrawer();
    });
  });
  drawer.querySelector("[data-drawer-complete]")?.addEventListener("click", () => {
    markTaskDone(task.id, task.status !== "done");
  });
  drawer.querySelectorAll("[data-template-status]").forEach((button) => {
    button.addEventListener("click", () => updateTaskStatusFromBoard(task.id, button.dataset.templateStatus));
  });
  drawer.querySelector("[data-drawer-important]")?.addEventListener("click", () => toggleTaskImportant(task.id));
  drawer.querySelector("[data-drawer-delete]")?.addEventListener("click", handleDrawerTaskDelete);
  drawer.querySelector("[data-add-subtask]")?.addEventListener("click", () => {
    openTaskDialog(null, {
      scope: getTaskScope(task),
      systemId: task.systemId,
      projectId: task.projectId,
      stageId: task.stageId,
      taskType: "child",
      parentTaskId: task.id,
      ownerIds: task.internalOwnerIds,
      collaborationTags: task.collaborationTags,
      tags: task.tags,
    });
  });
  drawer.querySelectorAll("[data-open-child-task]").forEach((button) => {
    button.addEventListener("click", () => openTodoDrawer(button.dataset.openChildTask, "view"));
  });
  drawer.querySelectorAll("[data-open-parent-task]").forEach((button) => {
    button.addEventListener("click", () => openTodoDrawer(button.dataset.openParentTask, "view"));
  });
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
  const drawerRecurrenceFields = getDrawerRecurrenceFields(form);
  const updateDrawerDates = (autoCorrect = true) => updateTaskDateConstraints(drawerFields, autoCorrect);
  const syncDrawerRecurrence = () => syncTaskRecurrenceFields(drawerRecurrenceFields);
  const syncDrawerCompletedDate = () => {
    const isDone = normalizeTaskStatus(form.elements.status.value) === "done";
    const field = form.querySelector("[data-drawer-completed-date-field]");
    field?.classList.toggle("hidden", !isDone);
    form.elements.completedDate.required = isDone;
    if (isDone && !form.elements.completedDate.value) form.elements.completedDate.value = todayString();
    if (!isDone) form.elements.completedDate.value = "";
  };

  form.elements.scope.addEventListener("change", () => {
    syncDrawerScopeFields(form);
    syncDrawerOwnerOptions(form, task);
    syncDrawerTaskPermissions(form, task);
    syncDrawerStageAndParentOptions(form, task);
  });
  form.elements.systemId.addEventListener("change", () => {
    form.elements.projectId.innerHTML = renderProjectOptionsForSystem(form.elements.systemId.value, "");
    syncDrawerScopeFields(form, false);
    syncDrawerOwnerOptions(form, task);
    syncDrawerTaskPermissions(form, task);
    syncDrawerStageAndParentOptions(form, task);
  });
  form.elements.projectId.addEventListener("change", () => {
    syncDrawerOwnerOptions(form, task);
    syncDrawerTaskPermissions(form, task);
    syncDrawerStageAndParentOptions(form, task);
  });
  form.elements.taskType?.addEventListener("change", () => syncDrawerStageAndParentOptions(form, task));
  form.elements.status.addEventListener("change", syncDrawerCompletedDate);
  drawerFields.rangeStart.addEventListener("change", () => updateDrawerDates(true));
  drawerFields.rangeEnd.addEventListener("change", () => updateDrawerDates(true));
  drawerFields.executionDate.addEventListener("change", () => updateDrawerDates(false));
  drawerFields.deadline.addEventListener("change", () => updateDrawerDates(false));
  drawerRecurrenceFields.isRecurring?.addEventListener("change", syncDrawerRecurrence);
  drawerRecurrenceFields.recurrenceType?.addEventListener("change", syncDrawerRecurrence);
  drawerRecurrenceFields.recurrenceDailyMode?.addEventListener("change", syncDrawerRecurrence);
  drawerRecurrenceFields.recurrenceMonthlyMode?.addEventListener("change", syncDrawerRecurrence);
  drawerRecurrenceFields.recurrenceYearlyMode?.addEventListener("change", syncDrawerRecurrence);
  drawerRecurrenceFields.recurrenceEndMode?.addEventListener("change", syncDrawerRecurrence);
  drawerRecurrenceFields.recurrenceStartDate?.addEventListener("change", syncDrawerRecurrence);
  drawerRecurrenceFields.recurrenceStartTime?.addEventListener("change", () => handleRecurrenceTimeInput(drawerRecurrenceFields, "start"));
  drawerRecurrenceFields.recurrenceEndTime?.addEventListener("change", () => handleRecurrenceTimeInput(drawerRecurrenceFields, "end"));
  drawerRecurrenceFields.recurrenceDuration?.addEventListener("input", () => handleRecurrenceTimeInput(drawerRecurrenceFields, "duration"));
  [
    drawerRecurrenceFields.recurrenceInterval,
    drawerRecurrenceFields.recurrenceEndDate,
    drawerRecurrenceFields.recurrenceCount,
    drawerRecurrenceFields.recurrenceMonthDay,
    drawerRecurrenceFields.recurrenceYearlyMonth,
    drawerRecurrenceFields.recurrenceYearlyDay,
    drawerRecurrenceFields.recurrenceWeekOrder,
    drawerRecurrenceFields.recurrenceWeekday,
    drawerRecurrenceFields.dueRuleType,
    drawerRecurrenceFields.dueRuleDays,
    ...drawerRecurrenceFields.recurrenceWeekdays,
  ].filter(Boolean).forEach((field) => {
    field.addEventListener("input", syncDrawerRecurrence);
    field.addEventListener("change", syncDrawerRecurrence);
  });
  form.addEventListener("submit", handleDrawerTaskSubmit);
  syncDrawerScopeFields(form, false);
  syncDrawerOwnerOptions(form, task);
  syncDrawerTaskPermissions(form, task);
  syncDrawerStageAndParentOptions(form, task);
  syncDrawerCompletedDate();
  syncDrawerRecurrence();
  updateDrawerDates(false);
}

function renderRecurringTaskNotice(task = {}) {
  if (isRecurringTemplateTask(task)) {
    return `
      <div class="recurring-task-notice template">
        <strong>這是一個週期性任務模板</strong>
        <span>系統會依照設定日期產生當次待辦；模板本身不代表某一次工作完成。</span>
      </div>
    `;
  }
  if (isRecurringOccurrenceTask(task)) {
    const completed = task.status === "done";
    return `
      <div class="recurring-task-notice occurrence">
        <strong>${completed ? "此週期任務的本次執行已完成" : "此任務為週期性任務的本次執行"}</strong>
        <span>它可以像一般任務一樣處理、記錄歷程與標示完成，不會影響週期模板。</span>
      </div>
    `;
  }
  return "";
}

function renderTodoDrawerView(task) {
  const system = getSystem(task.systemId);
  const project = getProject(task.projectId);
  const parentTask = task.parentTaskId ? getProjectTask(task.parentTaskId) : null;
  const parentHeader = renderTaskParentHeader(parentTask, "返回母任務");
  const childTasks = getUniqueTasksForDisplay(state.tasks)
    .filter((item) => item.parentTaskId === task.id)
    .sort(compareSubtasksByStartTime);
  const activeTab = normalizeTaskDrawerTab(activeTaskDrawerTab);
  const tabs = getTaskDrawerTabs(task, childTasks);
  const systemName = getTaskScope(task) === "general" ? "一般工作" : system?.name || "未指定系統";
  const projectName = getTaskScope(task) === "project" ? project?.name || "未指定專案" : getTaskScope(task) === "system" ? "系統層級任務" : "無專案";
  const tagList = task.tags?.length ? `<div class="tags drawer-header-tags">${renderTagButtons(task.tags)}</div>` : `<span class="drawer-muted">無標籤</span>`;
  const recurringNotice = renderRecurringTaskNotice(task);
  const completeButton = isRecurringTemplateTask(task)
    ? ""
    : `<button class="secondary-button" type="button" data-drawer-complete>${task.status === "done" ? "還原未完成" : "標示完成"}</button>`;
  const templateActions = isRecurringTemplateTask(task)
    ? `
      <button class="secondary-button" type="button" data-template-status="${task.status === "paused" ? "doing" : "paused"}">${task.status === "paused" ? "恢復週期" : "暫停週期"}</button>
      <button class="secondary-button" type="button" data-template-status="done">結束週期</button>
    `
    : "";

  return `
    <div class="drawer-sticky-header">
      <div class="drawer-header">
        <div class="drawer-title-block">
          <div class="drawer-context-grid" aria-label="任務歸屬">
            <span>系統</span>
            <strong>${escapeHtml(systemName)}</strong>
            <span>專案</span>
            <strong>${escapeHtml(projectName)}</strong>
          </div>
          <h2>${escapeHtml(task.title)}</h2>
          ${parentHeader}
          ${tagList}
        </div>
        <button class="drawer-close" type="button" data-close-drawer aria-label="關閉">×</button>
      </div>
      <div class="drawer-actions drawer-primary-actions">
        <button class="primary-button" type="button" data-drawer-edit>編輯任務</button>
        ${completeButton}
        ${templateActions}
        <button class="secondary-button" type="button" data-drawer-important>${task.important ? "★ 重要" : "☆ 標記重要"}</button>
        <button class="ghost-button" type="button" data-drawer-delete>刪除任務</button>
      </div>
      ${recurringNotice}
      <div class="drawer-tabs" role="tablist" aria-label="任務詳情分頁">
        ${tabs.map((tab) => `
          <button class="${activeTab === tab.id ? "active" : ""}" type="button" role="tab" data-drawer-tab="${tab.id}" aria-selected="${activeTab === tab.id}">
            ${tab.label}${tab.count !== "" ? `<span>${tab.count}</span>` : ""}
          </button>
        `).join("")}
      </div>
    </div>
    <div class="drawer-tab-panel" role="tabpanel">
      ${renderTaskDrawerTabPanel(task, activeTab, childTasks)}
    </div>
  `;
}

function normalizeTaskDrawerTab(tab = "") {
  return ["summary", "history", "subtasks", "relations"].includes(tab) ? tab : "summary";
}

function getTaskDrawerTabs(task, childTasks = []) {
  return [
    { id: "summary", label: "概要", count: "" },
    { id: "history", label: "歷程", count: (task.history || []).length },
    { id: "subtasks", label: "子任務", count: childTasks.length },
    { id: "relations", label: "關聯資料", count: (task.relatedEmails || []).length + (task.relatedLinks || []).length },
  ];
}

function renderTaskDrawerTabPanel(task, tab, childTasks = []) {
  if (tab === "history") return renderTaskDrawerHistoryTab(task);
  if (tab === "subtasks") return renderTaskDrawerSubtasksTab(task, childTasks);
  if (tab === "relations") return renderTaskDrawerRelationsTab(task);
  return renderTaskDrawerSummaryTab(task);
}

function renderTaskDrawerSummaryTab(task) {
  const stage = task.stageId ? state.projectStages.find((item) => item.id === task.stageId) : null;
  const parentTask = task.parentTaskId ? getProjectTask(task.parentTaskId) : null;
  const stepProgress = getTaskStepProgress(task);
  const recurrenceLabel = isRecurringTemplateTask(task)
    ? getRecurrenceLabel(task)
    : isRecurringOccurrenceTask(task)
      ? task.recurringLabel || "週期當次任務"
      : "否";
  const stakeholders = task.collaborationTags?.length ? task.collaborationTags.join(", ") : "無";
  const recurringLog = isRecurringTemplateTask(task) ? renderRecurringExecutionLog(task) : "";

  return `
    <section class="drawer-info-card">
      <div class="drawer-section-heading">
        <h3>任務主資訊</h3>
      </div>
      <div class="drawer-description">${escapeHtml(task.description || "沒有描述")}</div>
      <div class="drawer-section-heading">
        <span>細項步驟</span>
        <strong>${stepProgress.done} / ${stepProgress.total}</strong>
      </div>
      <div class="task-step-list">${renderTaskSteps(task)}</div>
      <div class="task-inline-add">
        <input data-new-step-title maxlength="100" placeholder="下一個步驟" />
        <button type="button" data-add-step>新增</button>
      </div>
    </section>
    <section class="drawer-info-card">
      <div class="drawer-section-heading">
        <h3>時程與狀態</h3>
      </div>
      <dl class="drawer-info-grid">
        <div><dt>狀態</dt><dd>${escapeHtml(getStatusLabel(task.status))}</dd></div>
        <div><dt>優先級</dt><dd>${escapeHtml(getPriorityLabel(task.priority))}</dd></div>
        <div><dt>執行日期</dt><dd>${formatDate(task.executionDate)}</dd></div>
        <div><dt>最後期限</dt><dd>${formatDate(task.deadline)}</dd></div>
        <div><dt>執行區間</dt><dd>${formatRange(task.startDate || task.rangeStart, task.endDate || task.rangeEnd)}</dd></div>
        <div><dt>完成日期</dt><dd>${task.completedDate ? formatDate(task.completedDate) : "未完成"}</dd></div>
        <div><dt>週期性</dt><dd>${escapeHtml(recurrenceLabel)}</dd></div>
      </dl>
    </section>
    <section class="drawer-info-card">
      <div class="drawer-section-heading">
        <h3>人員與分類</h3>
      </div>
      <dl class="drawer-info-grid">
        <div><dt>內部負責人</dt><dd>${escapeHtml(task.owner || task.ownerName || "未指定")}</dd></div>
        <div><dt>協作對象</dt><dd>${escapeHtml(stakeholders)}</dd></div>
        <div><dt>專案階段</dt><dd>${escapeHtml(stage?.name || "未指定")}</dd></div>
        <div><dt>母任務</dt><dd>${parentTask ? `<button class="drawer-parent-link" type="button" data-open-parent-task="${parentTask.id}">${escapeHtml(parentTask.title)}</button>` : "無"}</dd></div>
      </dl>
    </section>
    ${recurringLog}
  `;
}

function getRecurringExecutionRows(template = {}, referenceDate = todayString(), limit = 12) {
  const getOccurrenceDate = (task = {}) => task.occurrenceDate || task.executionDate || "";
  const occurrences = state.tasks
    .filter((task) => isRecurringOccurrenceTask(task) && task.templateTaskId === template.id)
    .filter((task) => !isTaskDeleted(task))
    .filter((task) => getOccurrenceDate(task))
    .sort((a, b) => getOccurrenceDate(a).localeCompare(getOccurrenceDate(b)));
  const upcoming = occurrences.filter((task) => getOccurrenceDate(task) >= referenceDate);
  const past = occurrences
    .filter((task) => getOccurrenceDate(task) < referenceDate)
    .sort((a, b) => getOccurrenceDate(b).localeCompare(getOccurrenceDate(a)));
  return [...upcoming, ...past].slice(0, limit);
}

function renderRecurringExecutionLog(template = {}) {
  const occurrences = getRecurringExecutionRows(template, todayString(), 12);
  const rule = normalizeRecurrenceRule(template.recurrenceRule || {}, template);
  const upcomingDates = getUpcomingRecurringPreviewDates(rule, 5);
  const timeLabel = rule.startTime && rule.endTime
    ? `${rule.startTime} 到 ${rule.endTime}`
    : rule.startTime || rule.endTime || "未設定時間";

  return `
    <section class="drawer-info-card recurring-execution-log">
      <div class="drawer-section-heading">
        <h3>近期執行紀錄</h3>
        <strong>${occurrences.length} 筆</strong>
      </div>
      ${occurrences.length ? `
        <div class="recurring-execution-list">
          ${occurrences.map((occurrence) => `
            <button type="button" class="recurring-execution-row" data-open-child-task="${occurrence.id}">
              <span>${escapeHtml(occurrence.occurrenceDate || occurrence.executionDate || "")} ${escapeHtml(formatGanttWeekday(occurrence.occurrenceDate || occurrence.executionDate || todayString()))}</span>
              <strong>${escapeHtml(getStatusLabel(occurrence.status))}</strong>
              <small>${escapeHtml([occurrence.startTime, occurrence.endTime].filter(Boolean).join(" 到 ") || "未設定時間")}</small>
              <small>${occurrence.completedDate ? `完成：${escapeHtml(formatDate(occurrence.completedDate))}` : "尚未完成"}</small>
            </button>
          `).join("")}
        </div>
      ` : `<p class="drawer-empty">尚未產生當次任務。</p>`}
      <div class="drawer-section-heading compact">
        <h3>未來 5 次預覽</h3>
      </div>
      <ol class="recurrence-preview-list static">
        ${upcomingDates.length ? upcomingDates.map((date) => `<li><span>${escapeHtml(date)} ${escapeHtml(formatGanttWeekday(date))}</span><strong>${escapeHtml(timeLabel)}</strong></li>`).join("") : `<li class="recurrence-preview-empty">目前沒有未來預覽。</li>`}
      </ol>
    </section>
  `;
}

function renderTaskDrawerHistoryTab(task) {
  return `
    <section class="drawer-info-card">
      <div class="drawer-section-heading">
        <h3>歷程紀錄</h3>
        <strong>${(task.history || []).length} 筆</strong>
      </div>
      <div class="task-history-list">${renderTaskHistory(task)}</div>
    </section>
    <section class="drawer-info-card">
      <div class="drawer-section-heading">
        <h3>新增歷程</h3>
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
        <div class="history-link-inputs" data-history-link-inputs>${renderHistoryLinkInputRow()}</div>
        <div class="drawer-actions">
          <button class="secondary-button" type="button" data-add-history-link>新增連結</button>
          <button class="primary-button" type="submit">新增歷程</button>
        </div>
      </form>
    </section>
  `;
}

function renderTaskDrawerSubtasksTab(task, childTasks = []) {
  const canAddSubtask = getTaskType(task) === "parent" && getTaskScope(task) === "project";
  return `
    <section class="drawer-info-card">
      <div class="drawer-section-heading">
        <h3>子任務</h3>
        <strong>${childTasks.length} 筆</strong>
      </div>
      ${childTasks.length ? `<div class="subtask-list">${childTasks.map(renderDrawerSubtaskRow).join("")}</div>` : `<p class="drawer-empty">尚未新增子任務。</p>`}
      ${canAddSubtask ? `<button class="secondary-button" type="button" data-add-subtask="${task.id}">新增子任務</button>` : ""}
    </section>
  `;
}

function renderDrawerSubtaskRow(child) {
  return `
    <button type="button" class="subtask-row drawer-subtask-row" data-open-child-task="${child.id}">
      <span>${escapeHtml(child.title)}</span>
      <small>${escapeHtml(getTaskContextLabel(child))}</small>
      <strong>${escapeHtml(getStatusLabel(child.status))}・${escapeHtml(getPriorityLabel(child.priority))}</strong>
      <small>期限 ${formatDate(child.deadline)}・負責人 ${escapeHtml(child.owner || child.ownerName || "未指定")}</small>
    </button>
  `;
}

function renderTaskDrawerRelationsTab(task) {
  const emailList = task.relatedEmails?.length
    ? `<ul class="drawer-related-list">${task.relatedEmails.map((title) => `<li>${escapeHtml(title)}</li>`).join("")}</ul>`
    : `<p class="drawer-empty">無關聯信件。</p>`;
  const linkList = task.relatedLinks?.length
    ? `<ul class="drawer-related-list">${task.relatedLinks.map((link) => `<li><a href="${escapeHtml(link.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(link.title || link.url)}</a></li>`).join("")}</ul>`
    : `<p class="drawer-empty">無關聯連結。</p>`;

  return `
    <section class="drawer-info-card">
      <div class="drawer-section-heading">
        <h3>關聯信件</h3>
        <strong>${task.relatedEmails?.length || 0}</strong>
      </div>
      ${emailList}
    </section>
    <section class="drawer-info-card">
      <div class="drawer-section-heading">
        <h3>關聯連結</h3>
        <strong>${task.relatedLinks?.length || 0}</strong>
      </div>
      ${linkList}
    </section>
    <section class="drawer-info-card">
      <div class="drawer-section-heading">
        <h3>記事</h3>
      </div>
      <textarea class="task-notes-field" data-task-notes rows="6" placeholder="新增記事">${escapeHtml(task.notes || "")}</textarea>
    </section>
  `;
}

function renderDrawerRecurrenceFields(task = {}) {
  const rule = normalizeRecurrenceRule(task.recurrenceRule || {}, task);
  const enabled = Boolean(isRecurringTemplateTask(task) && rule.type);
  const dueRule = normalizeDueRule(task.dueRule);
  const weekDays = rule.weekDays || [];
  const weekdayCheckboxes = [
    ["0", "日"],
    ["1", "一"],
    ["2", "二"],
    ["3", "三"],
    ["4", "四"],
    ["5", "五"],
    ["6", "六"],
  ].map(([value, label]) => {
    const checked = weekDays.includes(Number(value)) ? "checked" : "";
    return `<label><input type="checkbox" name="recurrenceWeekday" value="${value}" ${checked} />${label}</label>`;
  }).join("");

  return `
    <section class="phase-schedule-editor recurrence-editor drawer-recurrence-editor" aria-label="週期性任務">
      <div>
        <h3>週期性任務</h3>
        <p>週期任務只會在符合執行日期時出現在今日待辦。</p>
      </div>
      <label class="checkbox-field">
        <input name="isRecurring" type="checkbox" ${enabled ? "checked" : ""} />
        啟用週期設定
      </label>
      <div class="recurrence-rule-panel ${enabled ? "" : "hidden"}" data-drawer-recurrence-rule-panel>
        <section class="recurrence-editor-section" aria-label="每次任務時間">
          <h4>每次任務時間</h4>
          <div class="drawer-edit-grid">
            <label>
              開始時間
              <input name="recurrenceStartTime" type="time" value="${enabled ? rule.startTime || "" : ""}" />
            </label>
            <label>
              結束時間
              <input name="recurrenceEndTime" type="time" value="${enabled ? rule.endTime || "" : ""}" />
            </label>
            <label>
              執行期間（分鐘）
              <input name="recurrenceDuration" type="number" min="0" max="1439" value="${enabled && rule.durationMinutes ? rule.durationMinutes : ""}" readonly />
            </label>
          </div>
        </section>

        <section class="recurrence-editor-section" aria-label="重複規則">
          <h4>重複規則</h4>
          <div class="drawer-edit-grid">
            <label>
              週期類型
              <select name="recurrenceType">
                ${renderRecurrenceTypeOptions(rule.type)}
              </select>
            </label>
            <label data-drawer-recurrence-interval-field>
              <span data-drawer-recurrence-interval-label>每隔</span>
              <span class="inline-number-field">
                <input name="recurrenceInterval" type="number" min="1" max="365" value="${enabled ? rule.interval || 1 : ""}" />
                <span data-drawer-recurrence-interval-unit>天</span>
              </span>
            </label>
          </div>
          <div class="recurrence-pattern-section" data-drawer-recurrence-daily-field>
            <label>
              每日規則
              <select name="recurrenceDailyMode">
                <option value="interval" ${rule.dailyMode === "interval" ? "selected" : ""}>每隔 N 天</option>
                <option value="weekday" ${rule.dailyMode === "weekday" ? "selected" : ""}>每個工作日</option>
              </select>
            </label>
          </div>
          <div class="recurrence-weekday-field" data-drawer-recurrence-weekday-field>
            <span>重複於星期</span>
            <div class="weekday-picker">${weekdayCheckboxes}</div>
          </div>
          <div class="recurrence-pattern-section" data-drawer-recurrence-monthly-field>
            <div class="drawer-edit-grid">
              <label>
                每月設定
                <select name="recurrenceMonthlyMode">
                  <option value="dayOfMonth" ${rule.monthlyMode === "dayOfMonth" ? "selected" : ""}>固定日期</option>
                  <option value="nthWeekday" ${rule.monthlyMode === "nthWeekday" ? "selected" : ""}>星期規則</option>
                </select>
              </label>
              <label data-drawer-recurrence-month-day-field>
                日期
                <input name="recurrenceMonthDay" type="number" min="1" max="31" value="${enabled && rule.monthDay ? rule.monthDay : ""}" />
              </label>
            </div>
          </div>
          <div class="recurrence-pattern-section" data-drawer-recurrence-yearly-field>
            <div class="drawer-edit-grid">
              <label>
                每年設定
                <select name="recurrenceYearlyMode">
                  <option value="date" ${rule.yearlyMode === "date" ? "selected" : ""}>固定日期</option>
                  <option value="nthWeekday" ${rule.yearlyMode === "nthWeekday" ? "selected" : ""}>星期規則</option>
                </select>
              </label>
              <label>
                月份
                <input name="recurrenceYearlyMonth" type="number" min="1" max="12" value="${enabled && rule.yearlyMonth ? rule.yearlyMonth : ""}" />
              </label>
              <label data-drawer-recurrence-yearly-day-field>
                日期
                <input name="recurrenceYearlyDay" type="number" min="1" max="31" value="${enabled && rule.yearlyDay ? rule.yearlyDay : ""}" />
              </label>
            </div>
          </div>
          <div class="drawer-edit-grid" data-drawer-recurrence-nth-weekday-field>
            <label>
              第幾個
              <select name="recurrenceWeekOrder">
                ${renderWeekOrderOptions(rule.weekOrder)}
              </select>
            </label>
            <label>
              星期
              <select name="recurrenceNthWeekday">
                ${renderWeekdaySelectOptions(rule.weekday)}
              </select>
            </label>
          </div>
        </section>

        <section class="recurrence-editor-section" aria-label="週期有效期間">
          <h4>週期有效期間</h4>
          <div class="drawer-edit-grid">
            <label>
              開始日期
              <input name="recurrenceStartDate" type="date" value="${enabled ? rule.startDate || "" : ""}" />
            </label>
            <label>
              結束條件
              <select name="recurrenceEndMode">
                <option value="none" ${rule.endMode === "none" ? "selected" : ""}>沒有結束日期</option>
                <option value="date" ${rule.endMode === "date" ? "selected" : ""}>結束於指定日期</option>
                <option value="count" ${rule.endMode === "count" ? "selected" : ""}>反覆 N 次之後結束</option>
              </select>
            </label>
          </div>
          <div class="drawer-edit-grid">
            <label data-drawer-recurrence-end-date-field>
              結束日期
              <input name="recurrenceEndDate" type="date" value="${enabled ? rule.endDate || "" : ""}" />
            </label>
            <label data-drawer-recurrence-count-field>
              次數
              <input name="recurrenceCount" type="number" min="1" max="999" value="${enabled && rule.occurrenceCount ? rule.occurrenceCount : ""}" />
            </label>
          </div>
        </section>
        <section class="recurrence-editor-section" aria-label="每次任務期限規則">
          <h4>每次任務期限規則</h4>
          <div class="drawer-edit-grid">
            <label>
              期限規則
              <select name="dueRuleType">
                <option value="sameDay" ${dueRule.type === "sameDay" ? "selected" : ""}>當天完成</option>
                <option value="afterDays" ${dueRule.type === "afterDays" ? "selected" : ""}>執行日後 N 天</option>
                <option value="manual" ${dueRule.type === "manual" ? "selected" : ""}>產生後手動設定</option>
              </select>
            </label>
            <label data-drawer-due-rule-days-field>
              執行日後
              <span class="inline-number-field">
                <input name="dueRuleDays" type="number" min="0" max="365" value="${dueRule.type === "afterDays" ? dueRule.daysAfterOccurrence : ""}" />
                <span>天</span>
              </span>
            </label>
          </div>
        </section>
        <section class="recurrence-editor-section" aria-label="未來執行預覽">
          <h4>未來 5 次執行預覽</h4>
          <ol class="recurrence-preview-list" data-drawer-recurrence-preview-list></ol>
        </section>
      </div>
    </section>
  `;
}

function renderRecurrenceTypeOptions(selectedType = "") {
  return [
    ["", "不設定"],
    ["daily", "每日"],
    ["weekly", "每週"],
    ["monthly", "每月"],
    ["yearly", "每年"],
  ].map(([value, label]) => `<option value="${value}" ${value === selectedType ? "selected" : ""}>${label}</option>`).join("");
}

function renderWeekOrderOptions(selectedOrder = 1) {
  return [
    ["1", "第 1 個"],
    ["2", "第 2 個"],
    ["3", "第 3 個"],
    ["4", "第 4 個"],
    ["-1", "最後一個"],
  ].map(([value, label]) => `<option value="${value}" ${String(selectedOrder) === value ? "selected" : ""}>${label}</option>`).join("");
}

function renderWeekdaySelectOptions(selectedWeekday = 1) {
  return [
    ["0", "星期日"],
    ["1", "星期一"],
    ["2", "星期二"],
    ["3", "星期三"],
    ["4", "星期四"],
    ["5", "星期五"],
    ["6", "星期六"],
  ].map(([value, label]) => `<option value="${value}" ${String(selectedWeekday) === value ? "selected" : ""}>${label}</option>`).join("");
}

function renderTodoDrawerEdit(task) {
  const parentTask = task.parentTaskId ? getProjectTask(task.parentTaskId) : null;
  const parentHeader = renderTaskParentHeader(parentTask);
  return `
    <div class="drawer-header">
      <div>
        <p class="eyebrow">編輯任務</p>
        <h2>${escapeHtml(task.title)}</h2>
        ${parentHeader}
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
        <label data-drawer-stage-field>
          專案階段
          <select name="stageId">${renderStageOptionsForProject(task.projectId, task.stageId)}</select>
        </label>
        <label data-drawer-type-field>
          任務層級
          <select name="taskType">${renderTaskTypeOptions(getTaskType(task), { allowChild: getTaskScope(task) === "project" })}</select>
        </label>
        <label data-drawer-parent-field>
          母任務
          <select name="parentTaskId">${renderParentTaskOptions(task, { scope: getTaskScope(task), systemId: task.systemId, projectId: task.projectId }, task.parentTaskId)}</select>
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
          <input name="executionDate" type="date" value="${task.executionDate}" />
        </label>
        <label>
          最後期限
          <input name="deadline" type="date" value="${task.deadline}" />
        </label>
      </div>
      <div class="drawer-edit-grid">
        <label>
          執行區間開始
          <input name="rangeStart" type="date" value="${task.rangeStart}" />
        </label>
        <label>
          執行區間結束
          <input name="rangeEnd" type="date" value="${task.rangeEnd}" />
        </label>
      </div>
      <label data-drawer-completed-date-field class="${task.status === "done" ? "" : "hidden"}">
        已完成日期
        <input name="completedDate" type="date" value="${task.completedDate || ""}" />
      </label>
      <div class="drawer-edit-grid">
        <div class="drawer-edit-field">
          <span>內部負責人</span>
          <div class="search-multi-select" data-drawer-owner data-summary-unit="人"></div>
        </div>
        <label>
          標籤
          <input name="tags" value="${escapeHtml(task.tags?.join(", ") || "")}" placeholder="以逗號分隔" />
        </label>
      </div>
      <label>
        協作對象
        <input name="stakeholders" maxlength="160" value="${escapeHtml((task.collaborationTags || task.stakeholders || []).join(", ") || "")}" placeholder="以逗號分隔" />
      </label>
      ${renderDrawerRecurrenceFields(task)}
      <label>
        關聯信件
        <textarea name="relatedEmails" rows="3" placeholder="一行一個信件標題">${escapeHtml((task.relatedEmails || []).join("\n"))}</textarea>
      </label>
      <label>
        關聯連結
        <textarea name="relatedLinks" rows="3" placeholder="一行一筆：標題 | https://example.com">${escapeHtml(formatLinksForTextarea(task.relatedLinks || []))}</textarea>
      </label>
      <div class="drawer-actions">
        <button class="ghost-button" type="button" data-drawer-delete>刪除任務</button>
        ${getTaskType(task) === "parent" && getTaskScope(task) === "project" ? `<button class="secondary-button" type="button" data-add-subtask="${task.id}">新增子任務</button>` : ""}
        <button class="primary-button" type="submit">儲存</button>
        <button class="secondary-button" type="button" data-drawer-view>返回查看</button>
      </div>
    </form>
  `;
}

function renderTaskParentHeader(parentTask, label = "母任務") {
  if (!parentTask) return "";
  return `
    <button class="drawer-parent-link header" type="button" data-open-parent-task="${parentTask.id}">
      ${escapeHtml(label)}：${escapeHtml(parentTask.title)}
    </button>
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
        ? `<ul>${item.links.map((link) => `<li><span>${escapeHtml(link.name || "未命名連結")}</span><a href="${escapeHtml(link.url || "#")}" target="_blank" rel="noreferrer">${escapeHtml(link.url || link.name)}</a></li>`).join("")}</ul>`
        : "";

      return `
        <article class="task-history-card">
          <div class="task-history-card-header">
            <div>
              <span>日期</span>
              <strong>${formatDate(item.date)}</strong>
            </div>
            <button class="drawer-remove-button" type="button" data-remove-history="${item.id}" aria-label="刪除歷程">×</button>
          </div>
          <dl class="task-history-fields">
            <div>
              <dt>歷程描述</dt>
              <dd>${escapeHtml(item.description || "未填寫")}</dd>
            </div>
            <div>
              <dt>補充說明</dt>
              <dd>${escapeHtml(item.note || "無")}</dd>
            </div>
          </dl>
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
  saveTaskState([taskId]);
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
  saveTaskState([taskId]);
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
  saveTaskState([taskId]);
  render();
}

function updateTaskNotes(taskId, notes) {
  state.tasks = state.tasks.map((task) => {
    return task.id === taskId ? { ...task, notes: notes.trim() } : task;
  });
  saveTaskState([taskId]);
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
  saveTaskState([taskId]);
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
  saveTaskState([taskId]);
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

function getDrawerRecurrenceFields(form) {
  return {
    isRecurring: form.elements.isRecurring,
    recurrenceType: form.elements.recurrenceType,
    recurrenceDailyField: form.querySelector("[data-drawer-recurrence-daily-field]"),
    recurrenceDailyMode: form.elements.recurrenceDailyMode,
    recurrenceIntervalField: form.querySelector("[data-drawer-recurrence-interval-field]"),
    recurrenceIntervalLabel: form.querySelector("[data-drawer-recurrence-interval-label]"),
    recurrenceInterval: form.elements.recurrenceInterval,
    recurrenceIntervalUnit: form.querySelector("[data-drawer-recurrence-interval-unit]"),
    recurrenceRulePanel: form.querySelector("[data-drawer-recurrence-rule-panel]"),
    recurrenceStartDate: form.elements.recurrenceStartDate,
    recurrenceEndMode: form.elements.recurrenceEndMode,
    recurrenceEndDateField: form.querySelector("[data-drawer-recurrence-end-date-field]"),
    recurrenceEndDate: form.elements.recurrenceEndDate,
    recurrenceCountField: form.querySelector("[data-drawer-recurrence-count-field]"),
    recurrenceCount: form.elements.recurrenceCount,
    recurrenceWeekdayField: form.querySelector("[data-drawer-recurrence-weekday-field]"),
    recurrenceWeekdays: form.querySelectorAll('[name="recurrenceWeekday"]'),
    recurrenceMonthlyField: form.querySelector("[data-drawer-recurrence-monthly-field]"),
    recurrenceMonthlyMode: form.elements.recurrenceMonthlyMode,
    recurrenceMonthDayField: form.querySelector("[data-drawer-recurrence-month-day-field]"),
    recurrenceMonthDay: form.elements.recurrenceMonthDay,
    recurrenceYearlyField: form.querySelector("[data-drawer-recurrence-yearly-field]"),
    recurrenceYearlyMode: form.elements.recurrenceYearlyMode,
    recurrenceYearlyMonth: form.elements.recurrenceYearlyMonth,
    recurrenceYearlyDayField: form.querySelector("[data-drawer-recurrence-yearly-day-field]"),
    recurrenceYearlyDay: form.elements.recurrenceYearlyDay,
    recurrenceNthWeekdayField: form.querySelector("[data-drawer-recurrence-nth-weekday-field]"),
    recurrenceWeekOrder: form.elements.recurrenceWeekOrder,
    recurrenceWeekday: form.elements.recurrenceNthWeekday,
    recurrenceStartTime: form.elements.recurrenceStartTime,
    recurrenceEndTime: form.elements.recurrenceEndTime,
    recurrenceDuration: form.elements.recurrenceDuration,
    dueRuleType: form.elements.dueRuleType,
    dueRuleDaysField: form.querySelector("[data-drawer-due-rule-days-field]"),
    dueRuleDays: form.elements.dueRuleDays,
    recurrencePreviewList: form.querySelector("[data-drawer-recurrence-preview-list]"),
    rangeStartField: form.elements.rangeStart?.closest("label"),
    rangeEndField: form.elements.rangeEnd?.closest("label"),
    executionDateField: form.elements.executionDate?.closest("label"),
    deadlineField: form.elements.deadline?.closest("label"),
    executionDate: form.elements.executionDate,
    rangeStart: form.elements.rangeStart,
    rangeEnd: form.elements.rangeEnd,
    deadline: form.elements.deadline,
  };
}

function handleDrawerTaskSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const fields = getDrawerDateFields(form);
  updateTaskDateConstraints(fields);
  const recurrenceFields = getDrawerRecurrenceFields(form);
  const recurrenceRule = collectTaskRecurrenceRule(recurrenceFields);
  const isRecurring = Boolean(form.elements.isRecurring?.checked && recurrenceRule.type);
  const dueRule = collectTaskDueRule(recurrenceFields);

  const rangeStart = isRecurring ? recurrenceRule.startDate || "" : fields.rangeStart.value;
  const rangeEnd = isRecurring
    ? recurrenceRule.endMode === "date"
      ? recurrenceRule.endDate || recurrenceRule.startDate || ""
      : recurrenceRule.startDate || ""
    : fields.rangeEnd.value;
  const executionDate = isRecurring ? "" : fields.executionDate.value;
  const deadline = isRecurring ? "" : fields.deadline.value;

  if (!isRecurring && !validateTaskDates(rangeStart, rangeEnd, executionDate, deadline)) return;

  const existingTask = getProjectTask(selectedTodoTaskId);
  if (!existingTask) return;
  const scopeValues = getTaskScopeValuesFromForm(form);
  if (!validateTaskScopeValues(scopeValues)) return;
  const taskType = normalizeTaskTypeValue(form.elements.taskType?.value || "normal");
  const parentTaskId = scopeValues.scope === "project" && taskType === "child" ? form.elements.parentTaskId?.value || "" : "";
  if (!validateTaskTypeSelection({ taskType, parentTaskId, scope: scopeValues.scope, projectId: scopeValues.projectId, existingTask })) return;

  const status = normalizeTaskStatus(form.elements.status.value);
  if (status === "done" && !isRecurringTemplateTask(existingTask) && !canCompleteTask(existingTask)) {
    alert("請先完成所有細項步驟，才能將任務狀態改為已完成。");
    return;
  }

  const requestedCompletedDate = status === "done" ? form.elements.completedDate.value || todayString() : "";
  const ownerIds = ownerSelectValue(getDrawerOwnerControl(form), existingTask);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, existingTask || {}), existingTask || {});
  if (isRecurring && !validateRecurrenceRule(recurrenceRule)) return;

  const updatedTask = applyTaskStatusSideEffects({
    ...existingTask,
    scope: scopeValues.scope,
    systemId: scopeValues.systemId,
    projectId: scopeValues.projectId,
    stageId: scopeValues.scope === "project" ? form.elements.stageId?.value || "" : "",
    parentTaskId,
    taskType: parentTaskId ? "child" : taskType,
    internalOwnerIds: ownerIds,
    ...owner,
    ownerName: getOwnerNames(ownerIds, existingTask || {}),
    title: form.elements.title.value.trim() || "未命名任務",
    description: form.elements.description.value.trim(),
    status,
    priority: form.elements.priority.value,
    owner: getOwnerNames(ownerIds, existingTask || {}),
    startDate: rangeStart,
    endDate: rangeEnd,
    rangeStart,
    rangeEnd,
    executionDate,
    deadline,
    dueDate: deadline,
    tags: splitCommaList(form.elements.tags.value),
    collaborationTags: splitCommaList(form.elements.stakeholders.value),
    stakeholders: splitCommaList(form.elements.stakeholders.value),
    isRecurring,
    recurrenceEnabled: isRecurring,
    isRecurringTemplate: isRecurring,
    isRecurringOccurrence: isRecurring ? false : existingTask.isRecurringOccurrence || false,
    templateTaskId: isRecurring ? "" : existingTask.templateTaskId || "",
    occurrenceDate: isRecurring ? "" : existingTask.occurrenceDate || "",
    recurrenceType: isRecurring ? recurrenceRule.type : "",
    recurrenceRule: isRecurring ? recurrenceRule : {},
    dueRule: isRecurring ? dueRule : normalizeDueRule(existingTask.dueRule),
    relatedEmails: parseEmailTextarea(form.elements.relatedEmails.value),
    relatedLinks: parseLinkTextarea(form.elements.relatedLinks.value),
  }, existingTask, requestedCompletedDate);

  state.tasks = state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
  selectedSystemId = updatedTask.scope === "general" ? generalWorkScopeId : updatedTask.systemId;
  selectedProjectId = updatedTask.projectId || "all";
  drawerMode = "view";
  saveTaskState([updatedTask.id]);
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

function renderTaskTypeOptions(selectedTaskType = "normal", options = {}) {
  const allowChild = options.allowChild !== false;
  const normalizedType = allowChild ? normalizeTaskTypeValue(selectedTaskType) : selectedTaskType === "parent" ? "parent" : "normal";
  return taskTypeOptions
    .map((option) => {
      const disabled = option.id === "child" && !allowChild;
      return `<option value="${option.id}" ${option.id === normalizedType ? "selected" : ""} ${disabled ? "disabled" : ""}>${option.label}</option>`;
    })
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

function syncTaskStageAndParentOptions(fields, task = null) {
  const scope = fields.scope?.value || "project";
  const systemId = scope === "general" ? "" : fields.systemId?.value || "";
  const projectId = scope === "project" ? fields.projectId?.value || "" : "";
  fields.stageField?.classList.toggle("hidden", scope !== "project");
  if (fields.stageId) fields.stageId.innerHTML = renderStageOptionsForProject(projectId, task?.stageId || fields.stageId.value);
  syncTaskTypeFields(fields, task);
  if (fields.parentTaskId) fields.parentTaskId.innerHTML = renderParentTaskOptions(
    task || getProjectTask(fields.id?.value),
    { scope, systemId, projectId },
    task?.parentTaskId || fields.parentTaskId.value,
  );
  syncTaskTypeFields(fields, task);
}

function syncTaskTypeFields(fields, task = null) {
  if (!fields.taskType) {
    fields.parentField?.classList.toggle("hidden", true);
    return;
  }

  const scope = fields.scope?.value || "project";
  const isProject = scope === "project";
  const selectedType = normalizeTaskTypeValue(fields.taskType.value || getTaskType(task || getProjectTask(fields.id?.value) || {}));
  fields.taskType.innerHTML = renderTaskTypeOptions(selectedType, { allowChild: isProject });
  if (!isProject && fields.taskType.value === "child") fields.taskType.value = "normal";

  const isChild = isProject && fields.taskType.value === "child";
  fields.parentField?.classList.toggle("hidden", !isChild);
  if (fields.parentTaskId) {
    fields.parentTaskId.required = isChild;
    if (!isChild) fields.parentTaskId.value = "";
  }
}

function validateTaskTypeSelection({ taskType = "normal", parentTaskId = "", scope = "project", projectId = "", existingTask = null } = {}) {
  const normalizedType = normalizeTaskTypeValue(taskType);
  const existingChildren = existingTask?.id ? state.tasks.filter((task) => task.parentTaskId === existingTask.id && !isTaskDeleted(task)) : [];
  if (existingChildren.length && normalizedType !== "parent") {
    alert(`此任務底下還有 ${existingChildren.length} 筆子任務，請先移出子任務後再變更為獨立任務或子任務。`);
    return false;
  }
  if (existingChildren.length && (scope !== "project" || existingChildren.some((child) => child.projectId !== projectId))) {
    alert("已有子任務的母任務需保留在原專案底下。");
    return false;
  }

  if (normalizedType !== "child") return true;
  if (scope !== "project") {
    alert("子任務需綁定同一專案底下的母任務。");
    return false;
  }
  if (!parentTaskId) {
    alert("請選擇所屬母任務。");
    return false;
  }

  const parentTask = getProjectTask(parentTaskId);
  if (!parentTask || parentTask.projectId !== projectId || getTaskType(parentTask) !== "parent" || parentTask.parentTaskId) {
    alert("所屬母任務只能選擇同一專案底下的母任務。");
    return false;
  }

  if (existingTask?.id && parentTask.id === existingTask.id) {
    alert("任務不能選擇自己作為母任務。");
    return false;
  }

  return true;
}

function syncTaskOwnerOptions(fields, task = null) {
  const scopeValues = getTaskScopeFormValues(fields);
  const existingTask = task || (fields.id?.value ? getProjectTask(fields.id.value) : null);
  const selectedOwnerUid = existingTask?.internalOwnerIds || existingTask?.ownerUid || currentProfile?.uid || "";
  renderOwnerDropdown(
    fields.owner,
    getTaskOwnerChoices(existingTask, scopeValues),
    selectedOwnerUid,
    existingTask || {},
    {
      disabled: Boolean(existingTask?.id && !canAssignTaskOwner(existingTask, scopeValues)),
    },
  );
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

function syncDrawerStageAndParentOptions(form, task = null) {
  const scope = form.elements.scope?.value || "project";
  const systemId = scope === "general" ? "" : form.elements.systemId?.value || "";
  const projectId = scope === "project" ? form.elements.projectId?.value || "" : "";
  const stageField = form.querySelector("[data-drawer-stage-field]");
  stageField?.classList.toggle("hidden", scope !== "project");
  if (form.elements.stageId) form.elements.stageId.innerHTML = renderStageOptionsForProject(projectId, task?.stageId || form.elements.stageId.value);
  syncDrawerTaskTypeFields(form, task);
  if (form.elements.parentTaskId) form.elements.parentTaskId.innerHTML = renderParentTaskOptions(
    task,
    { scope, systemId, projectId },
    task?.parentTaskId || form.elements.parentTaskId.value,
  );
  syncDrawerTaskTypeFields(form, task);
}

function syncDrawerTaskTypeFields(form, task = null) {
  const taskTypeSelect = form.elements.taskType;
  const parentField = form.querySelector("[data-drawer-parent-field]");
  if (!taskTypeSelect) {
    parentField?.classList.toggle("hidden", true);
    return;
  }

  const scope = form.elements.scope?.value || "project";
  const isProject = scope === "project";
  const selectedType = normalizeTaskTypeValue(taskTypeSelect.value || getTaskType(task || {}));
  taskTypeSelect.innerHTML = renderTaskTypeOptions(selectedType, { allowChild: isProject });
  if (!isProject && taskTypeSelect.value === "child") taskTypeSelect.value = "normal";

  const isChild = isProject && taskTypeSelect.value === "child";
  parentField?.classList.toggle("hidden", !isChild);
  if (form.elements.parentTaskId) {
    form.elements.parentTaskId.required = isChild;
    if (!isChild) form.elements.parentTaskId.value = "";
  }
}

function getTaskScopeValuesFromForm(form) {
  const scope = form.elements.scope?.value || "project";
  return {
    scope,
    systemId: scope === "general" ? "" : form.elements.systemId.value,
    projectId: scope === "project" ? form.elements.projectId.value : "",
  };
}

function getDrawerOwnerControl(form) {
  return form.querySelector("[data-drawer-owner]");
}

function syncDrawerOwnerOptions(form, task) {
  const ownerSelect = getDrawerOwnerControl(form);
  if (!ownerSelect) return;
  const scopeValues = getTaskScopeValuesFromForm(form);
  renderOwnerDropdown(
    ownerSelect,
    getTaskOwnerChoices(task, scopeValues),
    task?.internalOwnerIds || task?.ownerUid || currentProfile?.uid || "",
    task || {},
    {
      disabled: Boolean(task?.id && !canAssignTaskOwner(task, scopeValues)),
    },
  );
}

function syncDrawerTaskPermissions(form, task) {
  const locked = Boolean(task?.id && !canAssignTaskOwner(task, getTaskScopeValuesFromForm(form)));
  form.elements.scope.disabled = locked;
  form.elements.systemId.disabled = locked;
  form.elements.projectId.disabled = locked;
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

function renderStageOptionsForProject(projectId, selectedStageId = "") {
  if (!projectId) return `<option value="">未指定階段</option>`;
  const stages = getProjectStages(projectId);
  return [
    `<option value="" ${!selectedStageId ? "selected" : ""}>未指定階段</option>`,
    ...stages.map((stage) => `<option value="${stage.id}" ${stage.id === selectedStageId ? "selected" : ""}>${escapeHtml(stage.name)}</option>`),
  ].join("");
}

function renderParentTaskOptions(task = null, scopeValues = {}, selectedParentTaskId = "") {
  const scope = scopeValues.scope || getTaskScope(task || {});
  const projectId = scopeValues.projectId || task?.projectId || "";
  const blockedIds = getTaskDescendantIds(task?.id);
  const candidates = state.tasks.filter((candidate) => {
    if (isTaskDeleted(candidate)) return false;
    if (candidate.id === task?.id) return false;
    if (blockedIds.has(candidate.id)) return false;
    if (scope !== "project") return false;
    if (getTaskScope(candidate) !== "project") return false;
    if (candidate.projectId !== projectId) return false;
    if (candidate.parentTaskId) return false;
    return getTaskType(candidate) === "parent";
  });
  return [
    `<option value="" ${!selectedParentTaskId ? "selected" : ""}>無母任務</option>`,
    ...candidates.sort(compareManualThenName).map((candidate) => `<option value="${candidate.id}" ${candidate.id === selectedParentTaskId ? "selected" : ""}>${escapeHtml(candidate.title)}</option>`),
  ].join("");
}

function getTaskDescendantIds(taskId = "") {
  const descendants = new Set();
  if (!taskId) return descendants;
  let changed = true;
  while (changed) {
    changed = false;
    state.tasks.forEach((task) => {
      if (!task.parentTaskId || descendants.has(task.id)) return;
      if (task.parentTaskId === taskId || descendants.has(task.parentTaskId)) {
        descendants.add(task.id);
        changed = true;
      }
    });
  }
  return descendants;
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
  if (status === "done" && !isRecurringTemplateTask(existingTask) && !canCompleteTask(existingTask)) {
    alert("請先完成所有細項步驟，才能將任務狀態改為已完成。");
    return;
  }

  const requestedCompletedDate = status === "done" ? todoAddFields.completedDate.value || todayString() : "";
  const ownerIds = ownerSelectValue(todoAddFields.owner, existingTask);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, existingTask || {}), existingTask || {});

  const task = applyTaskStatusSideEffects({
    id: todoAddFields.mode.value === "existing" ? todoAddFields.existingTaskId.value : createId(),
    scope,
    systemId,
    projectId,
    internalOwnerIds: ownerIds,
    ...owner,
    ownerName: getOwnerNames(ownerIds, existingTask || {}),
    title: todoAddFields.title.value.trim(),
    description: todoAddFields.description.value.trim(),
    status,
    priority: todoAddFields.priority.value,
    owner: getOwnerNames(ownerIds, existingTask || {}),
    startDate: rangeStart,
    endDate: rangeEnd,
    rangeStart,
    rangeEnd,
    executionDate,
    deadline,
    dueDate: deadline,
    tags: splitCommaList(todoAddFields.tags.value),
    collaborationTags: splitCommaList(todoAddFields.stakeholders.value),
    stakeholders: splitCommaList(todoAddFields.stakeholders.value),
    isRecurring: existingTask?.isRecurring || false,
    recurrenceEnabled: existingTask?.recurrenceEnabled || false,
    isRecurringTemplate: existingTask?.isRecurringTemplate || false,
    isRecurringOccurrence: existingTask?.isRecurringOccurrence || false,
    templateTaskId: existingTask?.templateTaskId || "",
    occurrenceDate: existingTask?.occurrenceDate || "",
    recurringLabel: existingTask?.recurringLabel || "",
    recurrenceType: existingTask?.recurrenceType || "",
    recurrenceRule: existingTask?.recurrenceRule || {},
    dueRule: normalizeDueRule(existingTask?.dueRule),
    completedOccurrences: existingTask?.completedOccurrences || [],
    sortOrder: existingTask?.sortOrder || getNextSortOrder(getTaskSortScopeItems({ scope, systemId, projectId })),
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
  saveTaskState([task.id]);
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
  const selectedProject = selectedProjectId === "all" ? null : getProject(selectedProjectId);
  const defaultSystemId = defaultScope === "general" ? "" : selectedProject?.systemId || selectedSystemId || state.systems[0]?.id || "";
  todoAddFields.scope.value = defaultScope;
  todoAddFields.systemId.innerHTML = renderSystemOptions(defaultSystemId);
  populateTodoProjectSelect(todoAddFields.systemId.value, defaultScope === "project" ? selectedProjectId : "");
  todoAddFields.status.value = "not_started";
  todoAddFields.priority.value = "medium";
  todoAddFields.rangeStart.value = "";
  todoAddFields.rangeEnd.value = "";
  todoAddFields.executionDate.value = "";
  todoAddFields.deadline.value = "";
  todoAddFields.completedDate.value = "";
  todoAddFields.stakeholders.value = "";
  renderEmailRows(todoAddFields.relatedEmails, []);
  renderLinkRows(todoAddFields.relatedLinks, []);
  syncTaskScopeFields(todoAddFields, false);
  syncTaskOwnerOptions(todoAddFields);
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
  const tasks = getUniqueTasksForDisplay(state.tasks).filter((task) => {
    if (isTaskDeleted(task)) return false;
    if (isRecurringTemplateTask(task)) return false;
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
  syncTaskOwnerOptions(todoAddFields, task);
  todoAddFields.rangeStart.value = task.rangeStart || task.startDate || "";
  todoAddFields.rangeEnd.value = task.rangeEnd || task.endDate || "";
  todoAddFields.executionDate.value = task.executionDate || "";
  todoAddFields.deadline.value = task.deadline || "";
  todoAddFields.completedDate.value = task.completedDate || "";
  todoAddFields.tags.value = Array.isArray(task.tags) ? task.tags.join(", ") : "";
  todoAddFields.stakeholders.value = Array.isArray(task.collaborationTags || task.stakeholders) ? (task.collaborationTags || task.stakeholders).join(", ") : "";
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

function getProjectTasks(projectId) {
  return getUniqueTasksForDisplay(state.tasks)
    .filter((task) => getTaskScope(task) === "project" && task.projectId === projectId && isProjectListTask(task));
}

function getProjectActivityTasks(projectId) {
  return getUniqueTasksForDisplay(state.tasks)
    .filter((task) => getTaskScope(task) === "project" && task.projectId === projectId && !isRecurringTemplateTask(task) && !isTaskDeleted(task));
}

function getProjectTaskCount(projectId) {
  return getProjectTasks(projectId).length;
}

function getProjectStatus(project = {}) {
  if (!project?.id) return normalizeProjectStatus(project.status || inferProjectStatusFromDates(project));
  if (project.closed || project.phase === "closed") return "closed";
  const tasks = getProjectTasks(project.id);
  if (tasks.length && tasks.every((task) => task.status === "done")) return "done";
  const current = getProjectCurrentStageInfo(project);
  const stages = getProjectStages(project.id);
  if (stages.length && stages.every((stage) => normalizeTaskStatus(stage.status) === "done")) return "done";
  if (current.stage?.status === "paused") return "paused";
  if (current.stage?.status === "review") return "review";
  return normalizeProjectStatus(project.status || inferProjectStatusFromDates(project));
}

function getProjectStatusLabel(status) {
  return projectStatusOptions.find((option) => option.id === status)?.label || "進行中";
}

function getProjectCurrentStageInfo(project = {}) {
  if (!project?.id || project.category === "general") {
    return { stage: null, label: project.category === "general" ? "一般專案" : "未設定階段", index: 0, total: 0, phaseId: "" };
  }
  const stages = getProjectStages(project.id);
  if (!stages.length) return { stage: null, label: "未設定階段", index: 0, total: 0, phaseId: "" };
  const projectPhaseStage = stages.find((stage) => (stage.phaseId || getPhaseIdByLabel(stage.name)) === project.phase);
  const doing = stages.find((stage) => normalizeTaskStatus(stage.status) === "doing");
  const pending = stages.find((stage) => normalizeTaskStatus(stage.status) !== "done");
  const stage = projectPhaseStage || doing || pending || stages[stages.length - 1];
  const index = Math.max(0, stages.findIndex((item) => item.id === stage.id));
  const phaseId = stage.phaseId || getPhaseIdByLabel(stage.name);
  return {
    stage,
    label: `${stage.name} ${index + 1}/${stages.length}`,
    index: index + 1,
    total: stages.length,
    phaseId,
  };
}

function getStageDisplayStatus(stage = {}, currentStageId = "", stageIndex = -1, currentStageIndex = -1) {
  const status = normalizeTaskStatus(stage.status);
  if (stageIndex >= 0 && currentStageIndex >= 0 && stageIndex < currentStageIndex) return "done";
  if (status === "done") return "done";
  if (stage.id === currentStageId || status === "doing") {
    if (stage.endDate && stage.endDate < todayString()) return "delay";
    return "doing";
  }
  if (status !== "done" && stage.endDate && stage.endDate < todayString()) return "delay";
  return "not_started";
}

function getStageDisplayStatusLabel(status) {
  return {
    done: "已完成",
    doing: "進行中",
    not_started: "未開始",
    delay: "延遲",
  }[status] || "未開始";
}

function getTaskStage(task = {}) {
  return task.stageId ? state.projectStages.find((stage) => stage.id === task.stageId) || null : null;
}

function getTaskStageLabel(task = {}) {
  return getTaskStage(task)?.name || "未設定階段";
}

function taskDeadlineOverdue(task, today = todayString()) {
  if (isRecurringTemplateTask(task)) return false;
  return Boolean(task.status !== "done" && task.deadline && task.deadline < today);
}

function taskIsDelayed(task, today = todayString()) {
  if (isRecurringTemplateTask(task)) return false;
  if (task.status === "done") return false;
  const plannedEnd = task.rangeEnd || task.endDate || task.executionDate || "";
  return Boolean(plannedEnd && plannedEnd < today);
}

function getProjectTaskStats(projectId) {
  const tasks = getProjectTasks(projectId);
  return {
    total: tasks.length,
    delay: tasks.filter(taskIsDelayed).length,
    overdue: tasks.filter(taskDeadlineOverdue).length,
  };
}

function getProjectScheduleStatus(project = {}) {
  const range = getProjectScheduleDates(project);
  if (!range.start && !range.end) return "unset";
  if (projectIsClosed(project)) return "done";
  if (isProjectDelayed(project)) return "delay";
  const stats = getProjectTaskStats(project.id);
  if (stats.overdue) return "overdue";
  const today = todayString();
  if (range.start && today < range.start) return "not_started";
  if (range.end && today > range.end) return "overdue";
  return "doing";
}

function getProjectScheduleDates(project = {}) {
  const stages = project?.id ? getProjectStages(project.id) : [];
  const stageRange = getGanttRangeFromDates(stages.flatMap((stage) => [stage.startDate, stage.endDate]));
  if (stageRange) return stageRange;
  const range = getProjectScheduleRange(project.plannedStart, project.plannedEnd, project.phaseSchedules || {});
  return { start: range.start || "", end: range.end || "" };
}

function scheduleStatusMatchesProject(project, filter) {
  if (!filter || filter === "all") return true;
  const range = getProjectScheduleDates(project);
  if (filter === "this_week" || filter === "this_month") {
    const dateRange = getDateFilterRange(filter);
    return Boolean(range.end && dateInRange(range.end, dateRange.start, dateRange.end));
  }
  return getProjectScheduleStatus(project) === filter;
}

function getTaskDueStatus(task = {}) {
  if (!task.deadline && !task.executionDate && !task.rangeEnd) return "unset";
  if (taskDeadlineOverdue(task)) return "overdue";
  if (taskIsDelayed(task)) return "delay";
  if (task.deadline === todayString()) return "today";
  if (!task.deadline) return "no_deadline";
  const week = getWeekRange(0);
  if (dateInRange(task.deadline, week.start, week.end)) return "this_week";
  return "scheduled";
}

function dueStatusMatchesTask(task, filter) {
  if (!filter || filter === "all") return true;
  if (filter === "this_week") {
    const week = getWeekRange(0);
    return Boolean(task.deadline && dateInRange(task.deadline, week.start, week.end));
  }
  if (filter === "no_deadline") return !task.deadline;
  return getTaskDueStatus(task) === filter;
}

function dateFilterMatchesDates(dates = [], filter = "all", start = "", end = "") {
  if (!filter || filter === "all") return true;
  const range = getDateFilterRange(filter, start, end);
  if (!range.start && !range.end) return true;
  return dates.filter(Boolean).some((date) => (!range.start || date >= range.start) && (!range.end || date <= range.end));
}

function getDateFilterRange(filter = "all", customStart = "", customEnd = "") {
  if (filter === "this_week") return getWeekRange(0);
  if (filter === "this_month") return getMonthRange(0);
  if (filter === "custom") {
    return {
      start: customStart || "",
      end: customEnd || customStart || "",
    };
  }
  return { start: "", end: "" };
}

function getMonthRange(offsetMonths = 0) {
  const now = todayDate();
  const first = new Date(now.getFullYear(), now.getMonth() + offsetMonths, 1);
  const last = new Date(now.getFullYear(), now.getMonth() + offsetMonths + 1, 0);
  return { start: toDateInputValue(first), end: toDateInputValue(last) };
}

function formatDateYmd(dateString) {
  return dateString ? dateString.replaceAll("-", "/") : "未設定";
}

function formatDateRangeYmd(start, end) {
  if (!start && !end) return "未設定";
  if (start && !end) return formatDateYmd(start);
  if (!start && end) return formatDateYmd(end);
  return `${formatDateYmd(start)} - ${formatDateYmd(end)}`;
}

function formatFirestoreDate(value) {
  if (!value) return "未記錄";
  const date = typeof value.toDate === "function"
    ? value.toDate()
    : value.seconds
      ? new Date(value.seconds * 1000)
      : value instanceof Date
        ? value
        : null;
  if (!date || Number.isNaN(date.getTime())) return "未記錄";
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
}

function matchesFuzzyText(haystack = "", query = "") {
  const normalizedQuery = String(query || "").trim().toLowerCase();
  if (!normalizedQuery) return true;
  const normalizedHaystack = String(haystack || "").toLowerCase();
  return normalizedQuery
    .split(/\s+/)
    .filter(Boolean)
    .every((token) => normalizedHaystack.includes(token));
}

function renderProjects() {
  const projects = getScopedProjects(true);
  const systems = selectedScopeIsGeneral()
    ? []
    : selectedSystemId
      ? state.systems.filter((system) => system.id === selectedSystemId)
      : getProjectGroupSystems(projects).filter((system) => systemMatchesOwnerContext(system));

  els.projectList.classList.add("project-group-list");
  els.projectList.classList.remove("project-compact-list");
  renderProjectActiveFilterChips();

  if (selectedScopeIsGeneral()) {
    els.projectList.innerHTML = `<p class="empty-state">一般工作不需要專案。可直接在上方新增一般工作任務，或在待辦工作台切到一般工作新增待辦。</p>`;
    return;
  }

  if (!projects.length) {
    els.projectList.innerHTML = `<p class="empty-state">找不到符合條件的專案，請調整搜尋關鍵字或篩選條件。</p>`;
    return;
  }

  els.projectList.innerHTML = systems.map((system) => {
    const systemProjects = projects.filter((project) => project.systemId === system.id).sort(compareProjectsForList);
    if (!systemProjects.length) return "";
    const summary = getProjectGroupSummary(systemProjects);
    const collapsed = Boolean(projectGroupCollapsed[system.id]);
    const ownerLabel = getOwnerDisplayName(system);
    const projectRows = systemProjects.map(renderProjectListRow).join("");
    const addProjectButton = !system.missing && canAssignProjectOwner(null, system.id)
      ? `<button class="secondary-button" type="button" data-add-project-for-system="${system.id}">新增專案</button>`
      : "";

    return `
      <section class="project-system-group ${collapsed ? "collapsed" : ""}">
        <div class="project-system-group-header">
          <div class="project-system-group-title">
            <button class="project-group-toggle" type="button" data-project-group-toggle="${system.id}" aria-expanded="${String(!collapsed)}" aria-label="${collapsed ? "展開" : "收合"} ${escapeHtml(system.name)}">
              <span aria-hidden="true">${collapsed ? "+" : "-"}</span>
            </button>
            <div>
              <h3>${escapeHtml(system.name)}</h3>
              <p>${escapeHtml(system.description || "未設定描述")}</p>
              <p class="project-system-owner">負責人 ${escapeHtml(ownerLabel)}</p>
            </div>
          </div>
          <div class="project-system-group-actions">
            <div class="project-group-stats" aria-label="${escapeHtml(system.name)} 專案摘要">
              <span>專案 ${summary.total}</span>
              <span>進行中 ${summary.active}</span>
              <span>結案 ${summary.closed}</span>
              <span>延遲 ${summary.delayed}</span>
              <span>任務 ${summary.tasks}</span>
            </div>
            ${addProjectButton}
          </div>
        </div>
        ${collapsed ? "" : `
          <div class="project-list-shell" data-project-sort-system="${system.id}">
            ${renderProjectListHeader()}
            ${projectRows}
          </div>
        `}
      </section>
    `;
  }).join("");

  attachProjectListSortHandlers();

  els.projectList.querySelectorAll("[data-project-group-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const groupId = button.dataset.projectGroupToggle;
      projectGroupCollapsed[groupId] = !projectGroupCollapsed[groupId];
      persistViewPreferences();
      renderProjects();
    });
  });

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

  els.projectList.querySelectorAll("[data-project-view]").forEach((button) => {
    button.addEventListener("click", () => openProjectDetailPage(button.dataset.projectView));
  });

  els.projectList.querySelectorAll("[data-project-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = getProject(button.dataset.projectFilter);
      selectedTagFilter = "";
      selectedSystemId = project.systemId;
      selectedProjectId = "all";
      taskFilters.projectIds = [project.id];
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

  els.projectList.querySelectorAll("[data-project-create-child]").forEach((button) => {
    button.addEventListener("click", () => {
      const project = getProject(button.dataset.projectCreateChild);
      openProjectDialog(null, { systemId: project?.systemId });
    });
  });

  els.projectList.querySelectorAll("[data-project-gantt]").forEach((button) => {
    button.addEventListener("click", () => openGanttForProject(button.dataset.projectGantt));
  });

  els.projectList.querySelectorAll("[data-project-toggle]").forEach((button) => {
    button.addEventListener("click", () => toggleProjectExpanded(button.dataset.projectToggle));
  });

  els.projectList.querySelectorAll("[data-project-row]").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.closest("button, a, details, summary, select, input")) return;
      toggleProjectExpanded(row.dataset.projectRow);
    });
  });

  els.projectList.querySelectorAll("[data-project-task-view]").forEach((button) => {
    button.addEventListener("click", () => openTodoDrawer(button.dataset.projectTaskView, "view"));
  });

  els.projectList.querySelectorAll("[data-project-stage-select]").forEach((button) => {
    button.addEventListener("click", () => {
      const projectId = button.dataset.projectStageProject;
      const stageId = button.dataset.projectStageSelect;
      if (!projectId || !stageId) return;
      selectedProjectStageIds[projectId] = stageId;
      renderProjects();
    });
  });

  attachTaskTreeToggleHandlers(els.projectList, renderProjects);
}

function renderProjectListRow(project) {
  const system = getSystem(project.systemId);
  const ownerLabel = getOwnerDisplayName(project);
  const currentStage = getProjectCurrentStageInfo(project);
  const status = getProjectStatus(project);
  const priority = normalizePriority(project.priority);
  const range = getProjectScheduleDates(project);
  const scheduleStatus = getProjectScheduleStatus(project);
  const stats = getProjectTaskStats(project.id);
  const expanded = expandedProjectIds.has(project.id);
  const collaborators = renderCollaboratorSummary(project.collaborationTags || []);
  const isDevelopmentProject = project.category !== "general";
  const overdueHint = scheduleStatus === "overdue" ? `<small class="schedule-alert">逾期</small>` : scheduleStatus === "delay" ? `<small class="schedule-delay">延遲</small>` : "";

  return `
    <article class="project-list-item ${expanded ? "expanded" : ""}" data-project-card="${project.id}">
      <div class="project-list-row" data-project-row="${project.id}">
        <div class="project-name-cell">
          <button class="project-expand-button" type="button" data-project-toggle="${project.id}" aria-expanded="${expanded}" aria-label="${expanded ? "收合" : "展開"} ${escapeHtml(project.name)}">
            <span aria-hidden="true">${expanded ? "⌄" : "›"}</span>
          </button>
          <div class="project-row-title">
            <h3>${escapeHtml(project.name)}</h3>
            <div class="project-system">${escapeHtml(system?.name || "未指定系統")}・${getProjectCategoryLabel(project.category)}・負責人 ${escapeHtml(ownerLabel)}</div>
          </div>
        </div>
        <div class="project-stage-cell">
          <span class="phase-badge ${currentStage.stage ? "" : "muted"}">${escapeHtml(isDevelopmentProject ? currentStage.label : "一般專案")}</span>
        </div>
        <div>${renderStatusBadge(status, "project")}</div>
        <div>${renderPriorityBadge(priority)}</div>
        <div class="project-schedule-cell">
          <span>${escapeHtml(formatDateRangeYmd(range.start, range.end))}</span>
          ${overdueHint}
        </div>
        <div class="project-owner-cell">${renderOwnerAvatar(ownerLabel)}<span>${escapeHtml(ownerLabel || "未指定")}</span></div>
        <div class="project-collab-cell">${collaborators}</div>
        <div class="task-stat-cell">
          <span>任務 ${stats.total}</span>
          <span class="stat-delay">延遲 ${stats.delay}</span>
          <span class="stat-overdue">逾期 ${stats.overdue}</span>
        </div>
        <div class="project-row-actions">
          <button class="chip-button" type="button" data-project-view="${project.id}">檢視</button>
          ${renderProjectMoreMenu(project)}
        </div>
      </div>
      ${expanded ? renderProjectExpandedSummary(project, currentStage) : ""}
    </article>
  `;
}

function renderProjectMoreMenu(project) {
  const closed = projectIsClosed(project);
  return `
    <details class="row-more-menu">
      <summary aria-label="更多操作">...</summary>
      <div class="row-more-menu-panel">
        <button type="button" data-project-add-task="${project.id}">新增任務</button>
        <button type="button" data-project-edit="${project.id}">專案設定</button>
        <button type="button" data-project-create-child="${project.id}">建立子專案</button>
        <button type="button" data-project-gantt="${project.id}">檢視甘特圖</button>
        ${project.category !== "general" ? `<button type="button" data-project-close="${project.id}">${closed ? "重新開啟" : "標記結案"}</button>` : ""}
      </div>
    </details>
  `;
}

function renderProjectExpandedSummary(project, currentStage) {
  const system = getSystem(project.systemId);
  const tasks = getProjectTasks(project.id).sort(compareTaskForDisplay);
  const stages = getProjectStages(project.id);
  const selectedStage = stages.find((stage) => stage.id === selectedProjectStageIds[project.id])
    || currentStage.stage
    || stages[0]
    || null;
  const tasksByDisplayStage = getProjectDetailStageTasks(tasks);
  const selectedStageTasks = selectedStage
    ? tasksByDisplayStage.get(selectedStage.id) || []
    : tasksByDisplayStage.get("") || [];
  const selectedStageLabel = selectedStage?.name || "未設定階段";
  const createdAt = formatFirestoreDate(project.createdAt);
  const creator = project.createdBy ? getOwnerDisplayName(getKnownOwner(project.createdBy, project) || { name: project.createdBy }) : "未記錄";

  return `
    <div class="project-expanded-panel">
      <section class="project-expanded-info">
        <h4>專案資訊</h4>
        <dl>
          <div><dt>所屬系統</dt><dd>${escapeHtml(system?.name || "未指定系統")}</dd></div>
          <div><dt>專案類型</dt><dd>${escapeHtml(getProjectCategoryLabel(project.category))}</dd></div>
          <div><dt>建立人</dt><dd>${escapeHtml(creator)}</dd></div>
          <div><dt>建立時間</dt><dd>${escapeHtml(createdAt)}</dd></div>
          <div class="wide"><dt>專案描述</dt><dd>${escapeHtml(project.description || "沒有描述")}</dd></div>
        </dl>
      </section>
      <section class="project-expanded-flow">
        <h4>專案階段流程</h4>
        ${renderProjectStageFlow(project, currentStage.stage?.id || "", selectedStage?.id || "")}
      </section>
      <section class="project-expanded-tasks">
        <div class="project-expanded-heading">
          <h4>階段任務（選取：${escapeHtml(selectedStageLabel)}）</h4>
          <button class="chip-button" type="button" data-project-filter="${project.id}">查看全部 ${tasks.length} 個任務</button>
        </div>
        ${renderProjectStageTaskList(selectedStageTasks)}
      </section>
    </div>
  `;
}

function renderProjectStageFlow(project, currentStageId = "", selectedStageId = "") {
  const stages = getProjectStages(project.id);
  if (!stages.length) return `<p class="empty-state">未設定階段</p>`;
  const currentStageIndex = stages.findIndex((stage) => stage.id === currentStageId);
  return `
    <div class="stage-flow">
      ${stages.map((stage, index) => {
        const status = getStageDisplayStatus(stage, currentStageId, index, currentStageIndex);
        const selected = stage.id === selectedStageId;
        return `
          <button class="stage-flow-step ${status} ${selected ? "selected" : ""}" type="button" data-project-stage-project="${project.id}" data-project-stage-select="${stage.id}" aria-pressed="${selected}">
            <span class="stage-flow-dot"></span>
            <strong>${escapeHtml(stage.name)}</strong>
            <small>${escapeHtml(formatDateRangeYmd(stage.startDate, stage.endDate))}</small>
            <em>${escapeHtml(getStageDisplayStatusLabel(status))}</em>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function renderProjectStageTaskList(tasks = []) {
  if (!tasks.length) return `<p class="empty-state">此階段目前沒有任務。</p>`;
  const childrenByParent = getProjectDetailChildrenByParent(tasks);
  const topLevelTasks = getTopLevelTasksForHierarchy(tasks)
    .sort((a, b) => compareProjectDetailTopLevelTasks(a, b, childrenByParent))
    .slice(0, 6);
  return `
    <div class="stage-task-table">
      <div class="stage-task-header" aria-hidden="true">
        <span>任務名稱</span>
        <span>負責人</span>
        <span>優先級</span>
        <span>狀態</span>
        <span>時程</span>
        <span>協作對象</span>
        <span>操作</span>
      </div>
      ${topLevelTasks.map((task) => renderProjectStageTaskRow(task, {
        children: childrenByParent.get(task.id) || [],
      })).join("")}
    </div>
  `;
}

function renderProjectStageTaskRow(task, options = {}) {
  const children = options.children || [];
  const isParent = getTaskType(task) === "parent" || children.length > 0;
  const isChild = Boolean(options.isChild) || getTaskType(task) === "child";
  const expanded = isTaskTreeExpanded("projectStage", task.id);
  const childRows = isParent && expanded ? children
    .sort(compareProjectDetailSubtasks)
    .map((child) => renderProjectStageTaskRow(child, { isChild: true, children: [] }))
    .join("") : "";
  return `
    <div class="stage-task-row ${isParent ? "parent-task-row" : ""} ${isChild ? "child-task-row" : ""}">
      <div class="stage-task-title-cell">
        <div class="task-tree-title-line">
          ${renderTaskTreeToggle("projectStage", task.id, children.length)}
          ${isChild ? `<span class="hierarchy-branch" aria-hidden="true">↳</span>` : `<span class="hierarchy-branch-placeholder" aria-hidden="true"></span>`}
          <strong>${escapeHtml(task.title)}</strong>
        </div>
        <small>${escapeHtml(getTaskTypeLabel(getTaskType(task)))}</small>
      </div>
      <span>${escapeHtml(task.owner || task.ownerName || "未指定")}</span>
      <span>${renderPriorityBadge(task.priority)}</span>
      <span>${renderStatusBadge(task.status, "task")}</span>
      <span>${escapeHtml(getProjectDetailTaskScheduleLabel(task))}</span>
      <span>${renderCollaboratorSummary(task.collaborationTags || task.stakeholders || [])}</span>
      <span><button class="chip-button" type="button" data-project-task-view="${task.id}">檢視</button></span>
    </div>
    ${childRows}
  `;
}

function renderCollaboratorSummary(collaborators = []) {
  const list = normalizeTextList(collaborators);
  if (!list.length) return `<span class="muted-text">未設定</span>`;
  const visible = list.slice(0, 2).map((tag) => `<span class="mini-chip">${escapeHtml(tag)}</span>`).join("");
  const more = list.length > 2 ? `<span class="mini-chip more">+${list.length - 2}</span>` : "";
  return `${visible}${more}`;
}

function renderOwnerAvatar(label = "") {
  const initial = String(label || "?").trim().slice(0, 1).toUpperCase();
  return `<span class="owner-avatar" aria-hidden="true">${escapeHtml(initial || "?")}</span>`;
}

function renderStatusBadge(status, type = "project") {
  const label = type === "project" ? getProjectStatusLabel(status) : getStatusLabel(status);
  return `<span class="status-badge status-${escapeHtml(status)}">${escapeHtml(label)}</span>`;
}

function renderPriorityBadge(priority = "medium") {
  const normalized = normalizePriority(priority);
  return `<span class="priority-pill priority-${normalized}">優先 ${escapeHtml(getPriorityLabel(normalized))}</span>`;
}

function toggleProjectExpanded(projectId) {
  if (!projectId) return;
  if (expandedProjectIds.has(projectId)) expandedProjectIds.delete(projectId);
  else expandedProjectIds.add(projectId);
  persistViewPreferences();
  renderProjects();
}

function openGanttForProject(projectId) {
  const project = getProject(projectId);
  if (!project) return;
  selectedSystemId = project.systemId;
  selectedProjectId = project.id;
  ganttSystemFilterIds = project.systemId ? [project.systemId] : [];
  ganttProjectFilterIds = [project.id];
  ganttSystemFilter = ganttSystemFilterIds[0] || "all";
  ganttProjectFilter = ganttProjectFilterIds[0] || "all";
  persistViewPreferences();
  openGanttPage();
}

function renderProjectActiveFilterChips() {
  if (!els.projectActiveFilters) return;
  const chips = [];
  const query = els.searchInput?.value.trim() || "";
  if (query) chips.push({ key: "query", label: `搜尋：${query}` });
  projectOwnerFilterIds.forEach((uid) => chips.push({ key: "owner", value: uid, label: `負責人：${getOwnerDisplayName(getKnownOwner(uid) || { name: uid })}` }));
  projectCollaborationFilters.forEach((tag) => chips.push({ key: "collaboration", value: tag, label: `協作：${tag}` }));
  projectFilters.phase.forEach((value) => chips.push({ key: "phase", value, label: `階段：${getFilterOptionLabel(getPhaseFilterOptions(), value)}` }));
  projectFilters.status.forEach((value) => chips.push({ key: "status", value, label: `狀態：${getFilterOptionLabel(projectStatusOptions, value)}` }));
  projectFilters.priority.forEach((value) => chips.push({ key: "priority", value, label: `優先級：${getFilterOptionLabel(priorityOptions, value)}` }));
  projectFilters.schedule.forEach((value) => chips.push({ key: "schedule", value, label: getFilterOptionLabel(scheduleStatusOptions, value) }));
  if (projectFilters.date !== "all") chips.push({ key: "date", label: getDateChipLabel(projectFilters) });
  projectFilters.more.forEach((value) => chips.push({ key: "more", value, label: getFilterOptionLabel(projectMoreFilterOptions, value) }));
  renderActiveFilterChips(els.projectActiveFilters, chips, "project");
}

function renderTaskActiveFilterChips() {
  if (!els.taskActiveFilters) return;
  const chips = [];
  if (taskFilters.query) chips.push({ key: "query", label: `搜尋：${taskFilters.query}` });
  taskFilters.projectIds.forEach((value) => chips.push({ key: "project", value, label: `專案：${getTaskProjectFilterLabel(value)}` }));
  taskFilters.phase.forEach((value) => chips.push({ key: "phase", value, label: `階段：${getFilterOptionLabel(getPhaseFilterOptions(), value)}` }));
  taskFilters.status.forEach((value) => chips.push({ key: "status", value, label: `狀態：${getFilterOptionLabel(taskColumns.map((column) => ({ id: column.id, label: column.title })), value)}` }));
  taskFilters.ownerIds.forEach((uid) => chips.push({ key: "owner", value: uid, label: `負責人：${getOwnerDisplayName(getKnownOwner(uid) || { name: uid })}` }));
  taskFilters.collaborationTags.forEach((tag) => chips.push({ key: "collaboration", value: tag, label: `協作：${tag}` }));
  taskFilters.priority.forEach((value) => chips.push({ key: "priority", value, label: `優先級：${getFilterOptionLabel(priorityOptions, value)}` }));
  taskFilters.due.forEach((value) => chips.push({ key: "due", value, label: getFilterOptionLabel(dueStatusOptions, value) }));
  if (taskFilters.date !== "all") chips.push({ key: "date", label: getDateChipLabel(taskFilters) });
  taskFilters.more.forEach((value) => chips.push({ key: "more", value, label: getFilterOptionLabel(taskMoreFilterOptions, value) }));
  renderActiveFilterChips(els.taskActiveFilters, chips, "task");
}

function renderActiveFilterChips(container, chips = [], scope) {
  if (!chips.length) {
    container.innerHTML = `<span class="all-visible-note">目前顯示全部${scope === "project" ? "專案" : "任務"}</span>`;
    return;
  }
  container.innerHTML = `
    ${chips.map((chip) => `<button class="filter-chip" type="button" data-${scope}-filter-chip="${escapeHtml(chip.key)}" data-filter-value="${escapeHtml(chip.value || "")}">${escapeHtml(chip.label)} ×</button>`).join("")}
    <button class="filter-chip clear" type="button" data-${scope}-filter-clear>清除全部</button>
  `;
}

function getFilterOptionLabel(options = [], value = "") {
  const normalizedValue = String(value || "").trim();
  return options.find((option) => getFilterOptionValue(option) === normalizedValue)?.label || normalizedValue;
}

function getDateChipLabel(filters) {
  if (filters.date === "custom") {
    return `日期：${formatDateRangeYmd(filters.dateStart, filters.dateEnd)}`;
  }
  return getFilterOptionLabel(dateFilterOptions, filters.date);
}

function handleProjectFilterChipClick(event) {
  const clear = event.target.closest("[data-project-filter-clear]");
  if (clear) {
    clearProjectFilters();
    return;
  }
  const chip = event.target.closest("[data-project-filter-chip]");
  if (!chip) return;
  removeProjectFilter(chip.dataset.projectFilterChip, chip.dataset.filterValue || "");
}

function handleTaskFilterChipClick(event) {
  const clear = event.target.closest("[data-task-filter-clear]");
  if (clear) {
    clearTaskFilters();
    return;
  }
  const chip = event.target.closest("[data-task-filter-chip]");
  if (!chip) return;
  removeTaskFilter(chip.dataset.taskFilterChip, chip.dataset.filterValue || "");
}

function clearProjectFilters() {
  els.searchInput.value = "";
  projectOwnerFilterIds = [];
  projectCollaborationFilters = [];
  projectFilters = { phase: [], status: [], priority: [], schedule: [], date: "all", dateStart: "", dateEnd: "", more: [] };
  selectedTagFilter = "";
  selectedProjectId = "all";
  persistViewPreferences();
  render();
}

function clearTaskFilters() {
  taskFilters = {
    query: "",
    projectIds: [],
    phase: [],
    status: [],
    ownerIds: [],
    collaborationTags: [],
    priority: [],
    due: [],
    date: "all",
    dateStart: "",
    dateEnd: "",
    more: [],
  };
  persistViewPreferences();
  render();
}

function removeProjectFilter(key, value = "") {
  if (key === "query") els.searchInput.value = "";
  if (key === "owner") projectOwnerFilterIds = projectOwnerFilterIds.filter((uid) => uid !== value);
  if (key === "collaboration") projectCollaborationFilters = projectCollaborationFilters.filter((tag) => tag !== value);
  if (key === "phase") projectFilters.phase = projectFilters.phase.filter((item) => item !== value);
  if (key === "status") projectFilters.status = projectFilters.status.filter((item) => item !== value);
  if (key === "priority") projectFilters.priority = projectFilters.priority.filter((item) => item !== value);
  if (key === "schedule") projectFilters.schedule = projectFilters.schedule.filter((item) => item !== value);
  if (key === "date") Object.assign(projectFilters, { date: "all", dateStart: "", dateEnd: "" });
  if (key === "more") projectFilters.more = projectFilters.more.filter((item) => item !== value);
  persistViewPreferences();
  render();
}

function removeTaskFilter(key, value = "") {
  if (key === "query") taskFilters.query = "";
  if (key === "project") taskFilters.projectIds = taskFilters.projectIds.filter((item) => item !== value);
  if (key === "phase") taskFilters.phase = taskFilters.phase.filter((item) => item !== value);
  if (key === "status") taskFilters.status = taskFilters.status.filter((item) => item !== value);
  if (key === "owner") taskFilters.ownerIds = taskFilters.ownerIds.filter((uid) => uid !== value);
  if (key === "collaboration") taskFilters.collaborationTags = taskFilters.collaborationTags.filter((tag) => tag !== value);
  if (key === "priority") taskFilters.priority = taskFilters.priority.filter((item) => item !== value);
  if (key === "due") taskFilters.due = taskFilters.due.filter((item) => item !== value);
  if (key === "date") Object.assign(taskFilters, { date: "all", dateStart: "", dateEnd: "" });
  if (key === "more") taskFilters.more = taskFilters.more.filter((item) => item !== value);
  persistViewPreferences();
  render();
}

function attachProjectSortHandlers() {
  els.projectList.querySelectorAll("[data-project-card]").forEach((card) => {
    card.addEventListener("dragstart", (event) => {
      if (event.target.closest("button, select, input, textarea, a")) {
        event.preventDefault();
        return;
      }
      event.dataTransfer.setData("text/plain", card.dataset.projectCard);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("dragging");
    });
    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
    });
  });

  els.projectList.querySelectorAll("[data-project-sort-system]").forEach((list) => {
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
      const projectId = event.dataTransfer.getData("text/plain");
      const project = getProject(projectId);
      if (!project || project.systemId !== list.dataset.projectSortSystem) return;
      const beforeId = getDropBeforeId(list, event.clientY, "[data-project-card]", "projectCard");
      const orderedIds = getReorderedIds(list, "[data-project-card]", "projectCard", projectId, beforeId);
      applyProjectManualOrder(orderedIds);
    });
  });
}

function applyProjectManualOrder(projectIds = []) {
  const orderMap = new Map(projectIds.map((id, index) => [id, index + 1]));
  state.projects = state.projects.map((project) => {
    return orderMap.has(project.id) ? { ...project, sortOrder: orderMap.get(project.id) } : project;
  });
  saveState();
  renderProjects();
  renderGanttPageIfOpen();
}

function getDropBeforeId(container, pointerY, selector, datasetKey) {
  const candidates = [...container.querySelectorAll(`${selector}:not(.dragging)`)];
  let closest = { offset: Number.NEGATIVE_INFINITY, id: "" };
  candidates.forEach((item) => {
    const box = item.getBoundingClientRect();
    const offset = pointerY - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      closest = { offset, id: item.dataset[datasetKey] || "" };
    }
  });
  return closest.id;
}

function getReorderedIds(container, selector, datasetKey, draggedId, beforeId = "") {
  const ids = [...container.querySelectorAll(selector)]
    .map((item) => item.dataset[datasetKey])
    .filter((id) => id && id !== draggedId);
  const insertAt = beforeId ? ids.indexOf(beforeId) : -1;
  if (insertAt >= 0) ids.splice(insertAt, 0, draggedId);
  else ids.push(draggedId);
  return ids;
}

function renderGanttPageIfOpen() {
  if (ganttPageIsOpen()) renderGanttPage();
}

function getProjectGroupSystems(projects = [], tasks = []) {
  const systems = [...state.systems];
  const knownSystemIds = new Set(systems.map((system) => system.id));
  [...projects, ...tasks].forEach((item) => {
    if (!item.systemId || knownSystemIds.has(item.systemId)) return;
    knownSystemIds.add(item.systemId);
    systems.push({
      id: item.systemId,
      name: "未顯示系統",
      description: "你可以看到這個專案，但系統資料未在目前權限範圍內。",
      missing: true,
    });
  });
  return systems;
}

function getProjectGroupSummary(projects = []) {
  return projects.reduce((summary, project) => {
    const closed = projectIsClosed(project);
    summary.total += 1;
    summary.closed += closed ? 1 : 0;
    summary.active += closed ? 0 : 1;
    summary.delayed += project.category !== "general" && isProjectDelayed(project) ? 1 : 0;
    summary.tasks += getProjectTaskCount(project.id);
    return summary;
  }, { total: 0, active: 0, closed: 0, delayed: 0, tasks: 0 });
}

function projectIsClosed(project) {
  return project.category !== "general" && (project.closed || project.phase === "closed");
}

function renderProjectCompactRow(project) {
  const system = getSystem(project.systemId);
  const ownerLabel = getOwnerDisplayName(project);
  const isDevelopmentProject = project.category !== "general";
  const actualRange = getProjectActualRange(project.id);
  const plannedRange = isDevelopmentProject ? getProjectPlannedRange(project) : "";
  const currentStage = getProjectStages(project.id).find((stage) => (stage.phaseId || getPhaseIdByLabel(stage.name)) === project.phase);
  const stageRange = formatRange(currentStage?.startDate, currentStage?.endDate);
  const taskCount = getProjectTaskCount(project.id);
  const closed = projectIsClosed(project);
  const delayed = isDevelopmentProject && isProjectDelayed(project);
  const dateSummary = isDevelopmentProject
    ? stageRange || plannedRange || actualRange || "尚無日期"
    : actualRange || "尚無任務日期";
  const phaseControl = isDevelopmentProject
    ? `
      <select class="phase-select project-row-phase" data-project-phase="${project.id}" aria-label="專案階段">
        ${renderPhaseOptions(project.phase)}
      </select>
    `
    : `<span class="phase-badge">一般</span>`;

  return `
    <article class="project-card project-card-compact ${closed ? "closed" : ""}" data-project-card="${project.id}" draggable="true">
      <div class="project-row-main">
        <div class="project-row-title">
          <h3>${escapeHtml(project.name)}</h3>
          <div class="project-system">${escapeHtml(system?.name || "未指定系統")}・${getProjectCategoryLabel(project.category)}・負責人 ${escapeHtml(ownerLabel)}</div>
        </div>
        ${delayed ? `<span class="project-warning-pill">延遲</span>` : ""}
      </div>
      <div class="project-row-status">
        ${phaseControl}
        <span class="status-badge ${closed ? "closed" : ""}">${isDevelopmentProject ? (closed ? "已結案" : "進行中") : "一般"}</span>
      </div>
      <div class="project-row-meta">
        <span>${escapeHtml(isDevelopmentProject ? getPhaseLabel(project.phase) || "未設定階段" : "一般專案")}・${escapeHtml(dateSummary)}</span>
        <span>任務 ${taskCount} 筆</span>
      </div>
      <div class="project-card-actions project-row-actions">
        <button class="chip-button" type="button" data-project-view="${project.id}">檢視</button>
        <button class="chip-button" type="button" data-project-filter="${project.id}">任務</button>
        <button class="chip-button" type="button" data-project-add-task="${project.id}">新增</button>
        <button class="chip-button" type="button" data-project-edit="${project.id}">設定</button>
        ${isDevelopmentProject ? `<button class="chip-button" type="button" data-project-close="${project.id}">${closed ? "重開" : "結案"}</button>` : ""}
      </div>
    </article>
  `;
}

function renderProjectCard(project) {
  const system = getSystem(project.systemId);
  const ownerLabel = getOwnerDisplayName(project);
  const isDevelopmentProject = project.category !== "general";
  const actualRange = getProjectActualRange(project.id);
  const plannedRange = isDevelopmentProject ? getProjectPlannedRange(project) : "";
  const currentStage = getProjectStages(project.id).find((stage) => (stage.phaseId || getPhaseIdByLabel(stage.name)) === project.phase);
  const taskCount = getProjectTaskCount(project.id);
  const relatedSummary = getProjectRelatedSummary(project);
  const tagList = project.tags?.length ? `<div class="tags">${renderTagButtons(project.tags)}</div>` : "";
  const collaborationList = project.collaborationTags?.length ? `<div class="project-system">協作 ${escapeHtml(project.collaborationTags.join(", "))}</div>` : "";
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
        <div><strong>目前階段</strong> ${getPhaseLabel(project.phase)}・${formatRange(currentStage?.startDate, currentStage?.endDate)}</div>
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
    <article class="project-card ${closed ? "closed" : ""}" data-project-card="${project.id}" draggable="true">
      <div class="project-card-header">
        <div>
          <h3>${escapeHtml(project.name)}</h3>
          <div class="project-system">${escapeHtml(system?.name || "未指定系統")}・${getProjectCategoryLabel(project.category)}・負責人 ${escapeHtml(ownerLabel)}</div>
        </div>
        <span class="status-badge ${closed ? "closed" : ""}">${isDevelopmentProject ? (closed ? "已結案" : "進行中") : "一般"}</span>
      </div>

      <p class="project-description">${escapeHtml(project.description || "沒有描述")}</p>
      ${tagList}
      ${collaborationList}

      ${phaseControl}
      ${delayed ? `<div class="delay-alert">時程延遲，需調整時程或加強追蹤</div>` : ""}

      <div class="project-dates">
        ${dateRows}
      </div>

      ${relatedSummary ? `<div class="related-summary">${relatedSummary}</div>` : ""}

      ${scheduleDetails}

      <div class="project-card-actions">
        <button class="chip-button" type="button" data-project-view="${project.id}">檢視</button>
        <button class="chip-button" type="button" data-project-filter="${project.id}">查看任務</button>
        <button class="chip-button" type="button" data-project-add-task="${project.id}">新增任務</button>
        <button class="chip-button" type="button" data-project-edit="${project.id}">設定</button>
        ${isDevelopmentProject ? `<button class="chip-button" type="button" data-project-close="${project.id}">${closed ? "重開" : "結案"}</button>` : ""}
      </div>
    </article>
  `;
}

function renderProjectDetailPage() {
  if (!activeProjectDetailId || !els.projectDetailPage || !els.projectDetailContent) return;
  const project = getProject(activeProjectDetailId);
  if (!project) {
    els.projectDetailPage.classList.add("hidden");
    els.projectDetailPage.setAttribute("aria-hidden", "true");
    showToast("你沒有權限檢視此專案，或專案不存在。");
    activeProjectDetailId = "";
    return;
  }

  const system = getSystem(project.systemId);
  const tasks = getProjectTasks(project.id).sort(compareTaskForDisplay);
  const activityTasks = getProjectActivityTasks(project.id);
  const stages = getProjectStages(project.id);
  const statusCounts = taskColumns.map((column) => ({
    label: column.title,
    count: tasks.filter((task) => task.status === column.id).length,
  }));
  const overdueCount = tasks.filter((task) => taskIsOverdue(task)).length;
  const todos = tasks.filter((task) => task.status !== "done").slice(0, 8);
  const histories = activityTasks
    .flatMap((task) => (task.history || []).map((entry) => ({
      ...entry,
      taskTitle: task.title,
      occurrenceDate: task.occurrenceDate || "",
      recurringLabel: task.recurringLabel || "",
    })))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 8);

  els.projectDetailPage.classList.remove("hidden");
  els.projectDetailPage.setAttribute("aria-hidden", "false");
  els.projectDetailContent.innerHTML = `
    <section class="project-detail-hero">
      <div>
        <p class="eyebrow">${escapeHtml(system?.name || "未指定系統")}</p>
        <h1>${escapeHtml(project.name)}</h1>
        <p>${escapeHtml(project.description || "沒有描述")}</p>
      </div>
      <div class="project-detail-actions">
        <button class="secondary-button" type="button" data-detail-add-task="${project.id}">新增任務</button>
        <button class="secondary-button" type="button" data-detail-edit-project="${project.id}">設定專案</button>
      </div>
    </section>

    <section class="project-detail-grid">
      <article>
        <span>專案狀態</span>
        <strong>${escapeHtml(project.closed || project.phase === "closed" ? "已完成" : getPhaseLabel(project.phase) || "進行中")}</strong>
      </article>
      <article>
        <span>內部負責人</span>
        <strong>${escapeHtml(project.ownerName || getOwnerNames(project.internalOwnerIds, project) || "未指定")}</strong>
      </article>
      <article>
        <span>協作對象</span>
        <strong>${escapeHtml((project.collaborationTags || []).join(", ") || "無")}</strong>
      </article>
      <article>
        <span>專案起訖</span>
        <strong>${escapeHtml(getProjectPlannedRange(project) || "未設定")}</strong>
      </article>
      <article>
        <span>任務狀態</span>
        <strong>${statusCounts.map((item) => `${item.label} ${item.count}`).join(" / ")}</strong>
      </article>
      <article>
        <span>逾期任務</span>
        <strong>${overdueCount}</strong>
      </article>
    </section>

    <section class="project-detail-panel">
      <div class="drawer-section-heading">
        <h2>專案標籤</h2>
      </div>
      ${project.tags?.length ? `<div class="tags">${renderTagButtons(project.tags)}</div>` : `<p class="drawer-empty">尚未設定標籤。</p>`}
    </section>

    <section class="project-detail-panel">
      <div class="drawer-section-heading">
        <h2>專案階段與任務</h2>
        <strong>${tasks.length} 筆任務</strong>
      </div>
      ${renderProjectStageTaskGroups(project, stages, tasks)}
    </section>

    <section class="project-detail-two-col">
      <article class="project-detail-panel">
        <div class="drawer-section-heading">
          <h2>相關待辦事項</h2>
          <strong>${todos.length}</strong>
        </div>
        ${todos.length ? todos.map(renderProjectDetailTodo).join("") : `<p class="drawer-empty">目前沒有未完成待辦。</p>`}
      </article>
      <article class="project-detail-panel">
        <div class="drawer-section-heading">
          <h2>任務歷程或更新紀錄</h2>
          <strong>${histories.length}</strong>
        </div>
        ${histories.length ? histories.map((entry) => `
          <div class="project-history-row">
            <strong>${formatDate(entry.date)}・${escapeHtml(entry.taskTitle)}</strong>
            <span>${escapeHtml(entry.description || entry.note || "")}</span>
          </div>
        `).join("") : `<p class="drawer-empty">尚未新增歷程紀錄。</p>`}
      </article>
    </section>
  `;

  els.projectDetailContent.querySelector("[data-detail-edit-project]")?.addEventListener("click", () => openProjectDialog(project));
  els.projectDetailContent.querySelector("[data-detail-add-task]")?.addEventListener("click", () => openTaskDialog(null, { systemId: project.systemId, projectId: project.id }));
  els.projectDetailContent.querySelectorAll("[data-detail-task]").forEach((button) => {
    button.addEventListener("click", () => openTodoDrawer(button.dataset.detailTask, "view"));
  });
  attachTaskTreeToggleHandlers(els.projectDetailContent, renderProjectDetailPage);
}

function renderProjectStageTaskGroups(project, stages, tasks) {
  const stageTasks = getProjectDetailStageTasks(tasks);
  const unassigned = stageTasks.get("") || [];
  const groups = [
    ...stages.map((stage) => ({ stage, tasks: stageTasks.get(stage.id) || [] })),
    ...(unassigned.length ? [{ stage: { id: "", name: "未指定階段", startDate: "", endDate: "" }, tasks: unassigned }] : []),
  ];
  if (!groups.length) return `<p class="drawer-empty">尚未建立階段或任務。</p>`;
  return groups.map(({ stage, tasks: stageTasks }) => `
    <details class="stage-task-group" open>
      <summary>
        <strong>${escapeHtml(stage.name)}</strong>
        <span>${escapeHtml(formatRange(stage.startDate, stage.endDate))}・${stageTasks.length} 筆</span>
      </summary>
      ${stageTasks.length ? renderProjectDetailTaskTable(stageTasks) : `<p class="drawer-empty">此階段尚無任務。</p>`}
    </details>
  `).join("");
}

function getProjectDetailStageTasks(tasks = []) {
  const taskById = new Map(tasks.map((task) => [task.id, task]));
  return tasks.reduce((groups, task) => {
    const parentTask = task.parentTaskId ? taskById.get(task.parentTaskId) : null;
    const stageId = parentTask?.projectId === task.projectId ? parentTask.stageId || "" : task.stageId || "";
    if (!groups.has(stageId)) groups.set(stageId, []);
    groups.get(stageId).push(task);
    return groups;
  }, new Map());
}

function renderProjectDetailTaskTable(tasks = []) {
  const childrenByParent = getProjectDetailChildrenByParent(tasks);
  const topLevelTasks = getTopLevelTasksForHierarchy(tasks)
    .sort((a, b) => compareProjectDetailTopLevelTasks(a, b, childrenByParent));
  const rows = topLevelTasks.map((task) => renderProjectDetailTaskTableRow(task, {
    level: 0,
    children: childrenByParent.get(task.id) || [],
  })).join("");

  return `
    <div class="project-detail-task-table">
      <div class="project-detail-task-header" aria-hidden="true">
        <span>任務</span>
        <span>負責人</span>
        <span>優先級</span>
        <span>狀態</span>
        <span>時程</span>
        <span>協作對象</span>
        <span>檢視</span>
      </div>
      ${rows}
    </div>
  `;
}

function getProjectDetailChildrenByParent(tasks = []) {
  const uniqueTasks = getUniqueTasksForDisplay(tasks);
  const taskIds = new Set(uniqueTasks.map((task) => task.id));
  const byParent = new Map();
  uniqueTasks.forEach((task) => {
    const parentId = task.parentTaskId && taskIds.has(task.parentTaskId) ? task.parentTaskId : "";
    if (!parentId) return;
    if (!byParent.has(parentId)) byParent.set(parentId, []);
    byParent.get(parentId).push(task);
  });
  byParent.forEach((children, parentId) => {
    byParent.set(parentId, children.sort(compareProjectDetailSubtasks));
  });
  return byParent;
}

function getTopLevelTasksForHierarchy(tasks = []) {
  const uniqueTasks = getUniqueTasksForDisplay(tasks);
  const taskIds = new Set(uniqueTasks.map((task) => task.id));
  return uniqueTasks.filter((task) => !task.parentTaskId || !taskIds.has(task.parentTaskId));
}

function isTaskTreeExpanded(scope = "", taskId = "") {
  return Boolean(taskTreeExpanded[scope]?.[taskId]);
}

function toggleTaskTreeExpanded(scope = "", taskId = "") {
  if (!scope || !taskId) return;
  taskTreeExpanded[scope] ||= {};
  if (taskTreeExpanded[scope][taskId]) delete taskTreeExpanded[scope][taskId];
  else taskTreeExpanded[scope][taskId] = true;
}

function renderTaskTreeToggle(scope, taskId, childCount = 0, extraClass = "") {
  if (!childCount) return renderTaskTreeTogglePlaceholder(extraClass);
  const expanded = isTaskTreeExpanded(scope, taskId);
  return `
    <button class="task-tree-toggle ${escapeHtml(extraClass)}" type="button" data-task-tree-toggle="${escapeHtml(taskId)}" data-task-tree-scope="${escapeHtml(scope)}" aria-expanded="${expanded}" aria-label="${expanded ? "收合子任務" : "展開子任務"}">
      <span aria-hidden="true">${expanded ? "▾" : "▸"}</span>
      <small>${childCount}</small>
    </button>
  `;
}

function renderTaskTreeTogglePlaceholder(extraClass = "") {
  return `<span class="task-tree-toggle-placeholder ${escapeHtml(extraClass ? `${extraClass}-placeholder` : "")}" aria-hidden="true"></span>`;
}

function attachTaskTreeToggleHandlers(root, afterToggle) {
  root?.querySelectorAll("[data-task-tree-toggle]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleTaskTreeExpanded(button.dataset.taskTreeScope, button.dataset.taskTreeToggle);
      afterToggle?.();
    });
  });
}

function renderProjectDetailTaskTableRow(task, options = {}) {
  const children = options.children || [];
  const isParent = getTaskType(task) === "parent" || children.length > 0;
  const isChild = options.level > 0 || getTaskType(task) === "child";
  const rowClass = [
    "project-detail-task-row",
    isParent ? "parent-task-row" : "",
    isChild ? "child-task-row" : "",
  ].filter(Boolean).join(" ");
  const expanded = isTaskTreeExpanded("projectDetail", task.id);
  const childRows = isParent && expanded
    ? children.map((child) => renderProjectDetailTaskTableRow(child, { level: 1, children: [] })).join("")
    : "";
  const toggle = renderTaskTreeToggle("projectDetail", task.id, children.length, "project-detail-task-toggle");
  const hierarchy = isChild
    ? `<span class="project-detail-task-branch" aria-hidden="true">↳</span>`
    : `<span class="project-detail-task-branch-placeholder" aria-hidden="true"></span>`;

  return `
    <div class="${rowClass}">
      <div class="project-detail-task-title-cell">
        <div class="project-detail-task-title-line">
          ${toggle}
          ${hierarchy}
          <strong>${escapeHtml(task.title)}</strong>
        </div>
        <small>${escapeHtml(getTaskTypeLabel(getTaskType(task)))}</small>
      </div>
      <span>${escapeHtml(task.owner || task.ownerName || "未指定")}</span>
      <span>${renderPriorityBadge(task.priority)}</span>
      <span>${renderStatusBadge(task.status, "task")}</span>
      <span>${escapeHtml(getProjectDetailTaskScheduleLabel(task))}</span>
      <span>${renderCollaboratorSummary(task.collaborationTags || task.stakeholders || [])}</span>
      <span class="task-row-actions">
        <button class="chip-button" type="button" data-detail-task="${task.id}">檢視</button>
      </span>
    </div>
    ${childRows}
  `;
}

function getProjectDetailTaskScheduleLabel(task = {}) {
  const start = task.startDate || task.rangeStart || "";
  const end = task.endDate || task.rangeEnd || "";
  if (start || end) return formatRange(start, end);
  if (task.executionDate) return `執行 ${formatDate(task.executionDate)}`;
  if (task.deadline) return `期限 ${formatDate(task.deadline)}`;
  return "未設定";
}

function compareProjectDetailTopLevelTasks(a, b, childrenByParent = new Map()) {
  const first = getProjectDetailTopLevelSortDate(a, childrenByParent);
  const second = getProjectDetailTopLevelSortDate(b, childrenByParent);
  const dateOrder = compareProjectDetailDateValues(first, second);
  if (dateOrder) return dateOrder;
  const endOrder = compareProjectDetailDateValues(getProjectDetailEndDate(a), getProjectDetailEndDate(b));
  if (endOrder) return endOrder;
  return compareManualThenName(a, b);
}

function getProjectDetailTopLevelSortDate(task = {}, childrenByParent = new Map()) {
  const ownStart = getProjectDetailStartDate(task);
  if (ownStart) return ownStart;
  const childStarts = (childrenByParent.get(task.id) || []).map(getProjectDetailStartDate).filter(Boolean);
  return getEarliestDate(childStarts);
}

function compareProjectDetailSubtasks(a, b) {
  const startOrder = compareProjectDetailDateValues(getProjectDetailStartDate(a), getProjectDetailStartDate(b));
  if (startOrder) return startOrder;
  const endOrder = compareProjectDetailDateValues(getProjectDetailEndDate(a), getProjectDetailEndDate(b));
  if (endOrder) return endOrder;
  return compareManualThenName(a, b);
}

function compareProjectDetailDateValues(a = "", b = "") {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return a.localeCompare(b);
}

function getProjectDetailStartDate(task = {}) {
  return task.startDate || task.rangeStart || "";
}

function getProjectDetailEndDate(task = {}) {
  return task.endDate || task.rangeEnd || "";
}

function renderHierarchicalTaskRows(tasks = []) {
  const byParent = new Map();
  tasks.forEach((task) => {
    const parentId = task.parentTaskId || "";
    if (!byParent.has(parentId)) byParent.set(parentId, []);
    byParent.get(parentId).push(task);
  });
  const renderRows = (parentId = "", level = 0) => (byParent.get(parentId) || [])
    .sort(parentId ? compareSubtasksByStartTime : compareTaskForDisplay)
    .map((task) => `
      <button class="detail-task-row level-${level}" type="button" data-detail-task="${task.id}">
        <span>${" ".repeat(level * 2)}${escapeHtml(task.title)}</span>
        <strong>${escapeHtml(getStatusLabel(task.status))}・${escapeHtml(getTaskDateLine(task))}</strong>
      </button>
      ${renderRows(task.id, level + 1)}
    `).join("");
  return renderRows() || tasks.sort(compareSubtasksByStartTime).map((task) => renderProjectDetailTodo(task)).join("");
}

function renderProjectDetailTodo(task) {
  return `
    <button class="detail-task-row" type="button" data-detail-task="${task.id}">
      <span>${escapeHtml(task.title)}</span>
      <strong>${escapeHtml(getStatusLabel(task.status))}・${escapeHtml(getTaskDateLine(task))}</strong>
    </button>
  `;
}

function compareTaskForDisplay(a, b) {
  if (ganttSortMode === "startDate") {
    const first = getTaskTimelineStart(a) || "9999-12-31";
    const second = getTaskTimelineStart(b) || "9999-12-31";
    if (first !== second) return first.localeCompare(second);
  }
  return compareManualThenName(a, b);
}

function compareSubtasksByStartTime(a, b) {
  const first = getSubtaskStartSortDate(a);
  const second = getSubtaskStartSortDate(b);
  if (first !== second) return first.localeCompare(second);
  return compareManualThenName(a, b);
}

function getSubtaskStartSortDate(task = {}) {
  return task.startDate || task.rangeStart || task.executionDate || task.deadline || "9999-12-31";
}

function compareGanttEntity(a, b) {
  if (ganttSortMode === "startDate") {
    const first = getEntityTimelineStart(a) || "9999-12-31";
    const second = getEntityTimelineStart(b) || "9999-12-31";
    if (first !== second) return first.localeCompare(second);
  }
  return compareManualThenName(a, b);
}

function getEntityTimelineStart(entity = {}) {
  if ("title" in entity) return getTaskTimelineStart(entity);
  if ("projectId" in entity && "taskIds" in entity) return entity.startDate || "";
  return entity.plannedStart || entity.startDate || "";
}

function renderProjectTabs() {
  if (selectedScopeIsGeneral()) {
    selectedProjectId = "all";
    els.projectTabs.innerHTML = "";
    return;
  }

  const projects = getScopedProjects(true);

  if (selectedProjectId !== "all" && !projects.some((project) => project.id === selectedProjectId)) {
    selectedProjectId = "all";
  }
  const allActive = selectedProjectId === "all";

  els.projectTabs.innerHTML = `
    <label class="project-filter-select">
      <span>任務專案</span>
      <select data-project-tab-select aria-label="篩選任務專案">
        <option value="all" ${allActive ? "selected" : ""}>全部專案（${projects.length}）</option>
        ${projects.map((project) => `<option value="${project.id}" ${selectedProjectId === project.id ? "selected" : ""}>${escapeHtml(project.name)}</option>`).join("")}
      </select>
    </label>
  `;

  els.projectTabs.querySelector("[data-project-tab-select]")?.addEventListener("change", (event) => {
      selectedTagFilter = "";
      selectedProjectId = event.target.value;
      render();
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
  projectFilters.phase = [];
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
  const tasks = getVisibleTasks({ useTaskFilters: true });
  const scopeProject = getProject(selectedProjectId);
  const scopeSystem = getSystem(selectedSystemId);

  renderTaskActiveFilterChips();
  syncTaskViewControls();

  els.taskScopeLabel.textContent = selectedTagFilter
    ? `目前顯示標籤「${selectedTagFilter}」的全部任務。`
    : selectedScopeIsGeneral()
    ? "目前顯示一般工作任務。"
    : scopeProject
      ? `目前顯示「${scopeProject.name}」的任務。`
      : scopeSystem
        ? `目前顯示「${scopeSystem.name}」的系統與專案任務。`
        : "目前顯示全部系統與一般工作的任務。";

  if (!tasks.length) {
    els.board.classList.remove("task-list-mode");
    els.board.innerHTML = `<p class="empty-state">找不到符合條件的任務，請調整搜尋關鍵字或篩選條件。</p>`;
    return;
  }

  if (taskViewMode === "list") {
    els.board.classList.add("task-list-mode");
    els.board.innerHTML = renderTaskListView(tasks);
    attachTaskListHandlers();
    return;
  }

  els.board.classList.remove("task-list-mode");
  const columns = taskGroupMode === "phase" ? getTaskPhaseColumns(tasks) : taskColumns.map((column) => ({ ...column, type: "status" }));
  els.board.innerHTML = columns
    .map((column) => renderTaskColumn(column, tasks, taskGroupMode))
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

  els.board.querySelectorAll("[data-open-parent-task]").forEach((button) => {
    button.addEventListener("click", () => openTodoDrawer(button.dataset.openParentTask, "view"));
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
      const taskId = event.dataTransfer.getData("text/plain");
      const beforeId = getDropBeforeId(list, event.clientY, "[data-task-id]", "taskId");
      const orderedIds = getReorderedIds(list, "[data-task-id]", "taskId", taskId, beforeId);
      updateTaskStatusFromBoard(taskId, list.dataset.taskDropStatus, orderedIds);
    });
  });

  els.board.querySelectorAll("[data-task-drop-stage]").forEach((list) => {
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
      const taskId = event.dataTransfer.getData("text/plain");
      const beforeId = getDropBeforeId(list, event.clientY, "[data-task-id]", "taskId");
      const orderedIds = getReorderedIds(list, "[data-task-id]", "taskId", taskId, beforeId);
      updateTaskStageFromBoard(taskId, list.dataset.taskDropStage, orderedIds);
    });
  });
}

function syncTaskViewControls() {
  els.taskViewToggle?.querySelectorAll("[data-task-view]").forEach((button) => {
    const active = button.dataset.taskView === taskViewMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  els.taskGroupToggle?.querySelectorAll("[data-task-group]").forEach((button) => {
    const active = button.dataset.taskGroup === taskGroupMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  els.taskGroupToggle?.classList.toggle("hidden", taskViewMode !== "board");
}

function handleTaskViewToggle(event) {
  const button = event.target.closest("[data-task-view]");
  if (!button) return;
  taskViewMode = button.dataset.taskView === "list" ? "list" : "board";
  persistViewPreferences();
  render();
}

function handleTaskGroupToggle(event) {
  const button = event.target.closest("[data-task-group]");
  if (!button) return;
  taskGroupMode = button.dataset.taskGroup === "phase" ? "phase" : "status";
  persistViewPreferences();
  render();
}

function renderTaskColumn(column, tasks, groupMode = "status") {
  const columnTasks = groupMode === "phase"
    ? tasks.filter((task) => (column.stageIds?.length ? column.stageIds.includes(task.stageId) : !task.stageId)).sort(compareTaskForDisplay)
    : tasks.filter((task) => task.status === column.id).sort(compareTaskForDisplay);
  const cards = columnTasks.length
    ? columnTasks.map(renderTaskCard).join("")
    : `<p class="empty-state">目前沒有任務</p>`;
  const dropAttr = groupMode === "phase" ? `data-task-drop-stage="${escapeHtml(column.stageId || "")}"` : `data-task-drop-status="${column.id}"`;

  return `
    <section class="column" data-column-status="${column.id}">
      <div class="column-header">
        <h2>${column.title}</h2>
        <span class="count">${columnTasks.length}</span>
      </div>
      <div class="task-list" ${dropAttr}>${cards}</div>
    </section>
  `;
}

function renderTaskCard(task) {
  return renderTaskCompactCard(task);
}

function renderTaskCompactCard(task) {
  const priorityText = getPriorityLabel(task.priority);
  const recurrence = isRecurringTemplateTask(task) ? `<span class="recurrence-badge">${escapeHtml(getRecurrenceLabel(task))}</span>` : "";
  const parentTask = task.parentTaskId ? getProjectTask(task.parentTaskId) : null;
  const system = getSystem(task.systemId);
  const project = getProject(task.projectId);
  const stageLabel = getTaskStageLabel(task);
  const collaborators = renderCollaboratorSummary(task.collaborationTags || task.stakeholders || []);
  const delay = taskIsDelayed(task);
  const overdue = taskDeadlineOverdue(task);
  const parentLink = parentTask
    ? `<button class="task-parent-link" type="button" data-open-parent-task="${parentTask.id}" title="開啟母任務：${escapeHtml(parentTask.title)}">母任務：${escapeHtml(parentTask.title)}</button>`
    : "";

  return `
    <article class="task-card task-card-compact priority-${task.priority} ${task.parentTaskId ? "child-task" : ""}" data-task-id="${task.id}" draggable="true" tabindex="0">
      <div class="task-card-topline">
        <div class="task-path task-context-line">
          <span>${escapeHtml(system?.name || "一般工作")} / ${escapeHtml(project?.name || getTaskScopeLabel(getTaskScope(task)))}</span>
          ${parentLink}
        </div>
        <span class="priority-pill priority-${task.priority}">優先 ${priorityText}</span>
      </div>
      <div class="task-card-badges">
        <span class="phase-badge">${escapeHtml(stageLabel)}</span>
        ${delay ? `<span class="task-alert-badge delay">延遲</span>` : ""}
        ${overdue ? `<span class="task-alert-badge overdue">逾期</span>` : ""}
      </div>
      <h3>${escapeHtml(task.title)}</h3>
      ${recurrence}
      <div class="task-date-line">期限 ${getTaskDeadlineSummary(task)}</div>
      <div class="task-meta">
        <span>負責人 ${escapeHtml(task.owner || task.ownerName || "未指定")}</span>
        <span>協作 ${collaborators}</span>
        <span>${escapeHtml(getStatusLabel(task.status))}</span>
      </div>
    </article>
  `;
}

function getTaskPhaseColumns(tasks = []) {
  const projectIds = [...new Set(tasks.map((task) => task.projectId).filter(Boolean))];
  const stages = state.projectStages
    .filter((stage) => projectIds.includes(stage.projectId))
    .sort((a, b) => {
      const firstProject = getProject(a.projectId)?.name || "";
      const secondProject = getProject(b.projectId)?.name || "";
      if (firstProject !== secondProject) return firstProject.localeCompare(secondProject, "zh-Hant");
      return compareManualThenName(a, b);
    });
  const byPhase = new Map();
  stages.forEach((stage) => {
    const key = stage.phaseId || stage.name || stage.id;
    if (!byPhase.has(key)) {
      byPhase.set(key, {
        id: key,
        stageId: stage.id,
        stageIds: [],
        title: stage.name,
        type: "phase",
      });
    }
    byPhase.get(key).stageIds.push(stage.id);
  });
  const columns = [...byPhase.values()];
  return [...columns, { id: "unset", stageId: "", title: "未設定階段", type: "phase" }];
}

function renderTaskListView(tasks = []) {
  const childrenByParent = getProjectDetailChildrenByParent(tasks);
  const rows = getTopLevelTasksForHierarchy(tasks)
    .sort(compareTasksForList)
    .map((task) => renderTaskListRow(task, {
      children: childrenByParent.get(task.id) || [],
    }))
    .join("");
  return `
    <div class="task-table">
      ${renderTaskListHeader()}
      ${rows}
    </div>
  `;
}

function renderTaskListRow(task, options = {}) {
  const project = getProject(task.projectId);
  const system = getSystem(task.systemId);
  const overdue = taskDeadlineOverdue(task);
  const delay = taskIsDelayed(task);
  const children = options.children || [];
  const isParent = getTaskType(task) === "parent" || children.length > 0;
  const isChild = Boolean(options.isChild) || getTaskType(task) === "child";
  const expanded = isTaskTreeExpanded("taskList", task.id);
  const childRows = isParent && expanded ? children
    .sort(compareTasksForList)
    .map((child) => renderTaskListRow(child, { isChild: true, children: [] }))
    .join("") : "";
  return `
    <article class="task-table-row ${isParent ? "parent-task-row" : ""} ${isChild ? "child-task-row" : ""}" data-task-row="${task.id}">
      <div class="task-title-cell">
        <div class="task-tree-title-line">
          ${renderTaskTreeToggle("taskList", task.id, children.length)}
          ${isChild ? `<span class="hierarchy-branch" aria-hidden="true">↳</span>` : `<span class="hierarchy-branch-placeholder" aria-hidden="true"></span>`}
          <strong>${escapeHtml(task.title)}</strong>
        </div>
        <small>${escapeHtml(getTaskTypeLabel(getTaskType(task)))}・${escapeHtml(system?.name || getTaskScopeLabel(getTaskScope(task)))}</small>
        <span class="task-inline-alerts">
          ${delay ? `<em class="task-alert-badge delay">延遲</em>` : ""}
          ${overdue ? `<em class="task-alert-badge overdue">逾期</em>` : ""}
        </span>
      </div>
      <span>${escapeHtml(project?.name || getTaskScopeLabel(getTaskScope(task)))}</span>
      <span>${escapeHtml(getTaskStageLabel(task))}</span>
      <span>${renderStatusBadge(task.status, "task")}</span>
      <span>${renderPriorityBadge(task.priority)}</span>
      <span>${escapeHtml(getTaskDeadlineSummary(task))}</span>
      <span>${escapeHtml(task.owner || task.ownerName || "未指定")}</span>
      <span>${renderCollaboratorSummary(task.collaborationTags || task.stakeholders || [])}</span>
      <span class="task-row-actions">
        <button class="chip-button" type="button" data-task-view="${task.id}">檢視</button>
        ${renderTaskMoreMenu(task)}
      </span>
    </article>
    ${childRows}
  `;
}

function renderTaskMoreMenu(task) {
  const projectButton = task.projectId ? `<button type="button" data-task-project="${task.projectId}">查看所屬專案</button>` : "";
  return `
    <details class="row-more-menu">
      <summary aria-label="更多操作">...</summary>
      <div class="row-more-menu-panel">
        <button type="button" data-task-edit="${task.id}">編輯任務</button>
        <button type="button" data-task-history="${task.id}">新增歷程</button>
        <button type="button" data-task-status="${task.id}">調整狀態</button>
        ${projectButton}
      </div>
    </details>
  `;
}

function attachTaskListHandlers() {
  attachTaskTreeToggleHandlers(els.board, renderBoard);
  attachTaskListSortHandlers();

  els.board.querySelectorAll("[data-task-row]").forEach((row) => {
    row.addEventListener("click", (event) => {
      if (event.target.closest("button, a, details, summary")) return;
      openTodoDrawer(row.dataset.taskRow, "view");
    });
  });
  els.board.querySelectorAll("[data-task-view]").forEach((button) => {
    button.addEventListener("click", () => openTodoDrawer(button.dataset.taskView, "view"));
  });
  els.board.querySelectorAll("[data-task-edit], [data-task-status]").forEach((button) => {
    button.addEventListener("click", () => openTodoDrawer(button.dataset.taskEdit || button.dataset.taskStatus, "edit"));
  });
  els.board.querySelectorAll("[data-task-history]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTaskDrawerTab = "history";
      openTodoDrawer(button.dataset.taskHistory, "view");
    });
  });
  els.board.querySelectorAll("[data-task-project]").forEach((button) => {
    button.addEventListener("click", () => openProjectDetailPage(button.dataset.taskProject));
  });
}

function updateTaskStatusFromBoard(taskId, status, orderedIds = []) {
  const task = getProjectTask(taskId);
  if (!task) return;
  const nextStatus = normalizeTaskStatus(status);
  const statusChanged = task.status !== nextStatus;
  if (!statusChanged && !orderedIds.length) return;
  if (nextStatus === "done" && !isRecurringTemplateTask(task) && !canCompleteTask(task)) {
    alert("請先完成所有細項步驟，才能將任務狀態改為已完成。");
    return;
  }

  const orderMap = new Map(orderedIds.map((id, index) => [id, index + 1]));
  state.tasks = state.tasks.map((item) => {
    const nextSortOrder = orderMap.has(item.id) ? orderMap.get(item.id) : item.sortOrder;
    if (item.id !== taskId) return orderMap.has(item.id) ? { ...item, sortOrder: nextSortOrder } : item;
    return applyTaskStatusSideEffects({ ...item, status: nextStatus, sortOrder: nextSortOrder }, item, nextStatus === "done" ? todayString() : "");
  });

  saveTaskState(uniqueUids([taskId, ...orderedIds]));
  if (statusChanged && nextStatus === "done") {
    playCompletionSound();
    showToast(`已完成：${task.title}`);
  }
  render();
}

function updateTaskStageFromBoard(taskId, stageId, orderedIds = []) {
  const task = getProjectTask(taskId);
  if (!task || getTaskScope(task) !== "project") return;
  const nextStageId = stageId || "";
  const statusChanged = task.stageId !== nextStageId;
  if (!statusChanged && !orderedIds.length) return;
  const stage = nextStageId ? state.projectStages.find((item) => item.id === nextStageId) : null;
  if (nextStageId && (!stage || stage.projectId !== task.projectId)) return;

  const orderMap = new Map(orderedIds.map((id, index) => [id, index + 1]));
  state.tasks = state.tasks.map((item) => {
    const nextSortOrder = orderMap.has(item.id) ? orderMap.get(item.id) : item.sortOrder;
    if (item.id !== taskId) return orderMap.has(item.id) ? { ...item, sortOrder: nextSortOrder } : item;
    return { ...item, stageId: nextStageId, sortOrder: nextSortOrder };
  });

  saveTaskState(uniqueUids([taskId, ...orderedIds]));
  render();
}

function getScopedProjects(applyPhaseFilter = false, options = {}) {
  const phaseFilters = projectFilters.phase;
  const query = els.searchInput.value.trim().toLowerCase();
  return state.projects.filter((project) => {
    const system = getSystem(project.systemId);
    const matchSystem = selectedScopeIsGeneral() ? false : selectedSystemId ? project.systemId === selectedSystemId : true;
    const matchPhase = !applyPhaseFilter || projectMatchesPhaseFilters(project, phaseFilters);
    const matchQuery = projectMatchesSearch(project, system, query);
    const matchOwner = projectMatchesOwnerContext(project, system);
  const matchCollaboration = entityMatchesCollaborationFilter(project, projectCollaborationFilters)
    || entityMatchesCollaborationFilter(system, projectCollaborationFilters)
    || state.tasks.some((task) => isManagementCountTask(task) && task.projectId === project.id && entityMatchesCollaborationFilter(task, projectCollaborationFilters));
    const matchProjectFilters = options.ignoreProjectFilters || projectMatchesAdvancedFilters(project);
    return matchSystem && matchPhase && matchQuery && matchOwner && matchCollaboration && matchProjectFilters;
  });
}

function projectMatchesPhaseFilters(project, phases = projectFilters.phase) {
  const selectedPhases = normalizeFilterValues(phases);
  if (project?.category === "general" || !selectedPhases.length) return true;
  const currentStage = getProjectCurrentStageInfo(project);
  return selectedPhases.some((phase) => (
    phase === "unset"
      ? !currentStage.stage
      : currentStage.phaseId === phase || project.phase === phase
  ));
}

function systemMatchesOwnerContext(system, ownerIds = projectOwnerFilterIds) {
  if (!ownerIds.length) return true;
  if (entityMatchesOwnerFilter(system, ownerIds)) return true;
  return state.projects.some((project) => project.systemId === system.id && projectMatchesOwnerContext(project, system, ownerIds))
    || state.tasks.some((task) => isManagementCountTask(task) && task.systemId === system.id && taskMatchesOwnerContext(task, ownerIds));
}

function projectMatchesOwnerContext(project, system = getSystem(project?.systemId), ownerIds = projectOwnerFilterIds) {
  if (!ownerIds.length) return true;
  return entityMatchesOwnerFilter(project, ownerIds)
    || entityMatchesOwnerFilter(system, ownerIds)
    || state.tasks.some((task) => isManagementCountTask(task) && task.projectId === project.id && entityMatchesOwnerFilter(task, ownerIds));
}

function taskMatchesOwnerContext(task, ownerIds = projectOwnerFilterIds) {
  if (!ownerIds.length) return true;
  const project = getProject(task.projectId);
  const system = getSystem(task.systemId);
  return entityMatchesOwnerFilter(task, ownerIds)
    || entityMatchesOwnerFilter(project, ownerIds)
    || entityMatchesOwnerFilter(system, ownerIds);
}

function projectMatchesSearch(project, system, query) {
  if (!query) return true;
  const projectTasks = getProjectTasks(project.id);
  const stages = getProjectStages(project.id);

  const haystack = [
    project.name,
    project.description,
    project.ownerName,
    getInternalOwnerIds(project).map((uid) => getOwnerDisplayName(getKnownOwner(uid, project) || { name: uid })).join(" "),
    (project.tags || []).join(" "),
    (project.collaborationTags || []).join(" "),
    getProjectCategoryLabel(project.category),
    project.requirementRequest,
    project.phaseChangedAt,
    (project.relatedEmails || []).join(" "),
    (project.relatedLinks || []).map((link) => `${link.title} ${link.url}`).join(" "),
    system?.name,
    system?.ownerName,
    (system?.tags || []).join(" "),
    (system?.collaborationTags || []).join(" "),
    getPhaseLabel(project.phase),
    stages.map((stage) => `${stage.name} ${stage.description} ${formatDateRangeYmd(stage.startDate, stage.endDate)}`).join(" "),
    projectTasks.map((task) => [
      task.title,
      task.description,
      task.owner,
      task.ownerName,
      getTaskStageLabel(task),
      (task.collaborationTags || task.stakeholders || []).join(" "),
      (task.history || []).map((item) => `${item.description} ${item.note} ${(item.links || []).map((link) => `${link.name} ${link.url}`).join(" ")}`).join(" "),
      task.notes,
      (task.relatedLinks || []).map((link) => `${link.title} ${link.url}`).join(" "),
      (task.relatedEmails || []).join(" "),
    ].join(" ")).join(" "),
  ]
    .join(" ");

  return matchesFuzzyText(haystack, query);
}

function projectMatchesAdvancedFilters(project) {
  const status = getProjectStatus(project);
  const priority = normalizePriority(project.priority);
  const stats = getProjectTaskStats(project.id);
  const dates = [
    project.plannedStart,
    project.plannedEnd,
    ...getProjectStages(project.id).flatMap((stage) => [stage.startDate, stage.endDate]),
  ];

  if (!filterIncludesValue(projectFilters.status, status)) return false;
  if (!filterIncludesValue(projectFilters.priority, priority)) return false;
  if (!filterMatchesAny(projectFilters.schedule, (filter) => scheduleStatusMatchesProject(project, filter))) return false;
  if (!dateFilterMatchesDates(dates, projectFilters.date, projectFilters.dateStart, projectFilters.dateEnd)) return false;
  if (!projectMoreFiltersMatch(project, stats)) return false;
  return true;
}

function projectMoreFiltersMatch(project, stats = getProjectTaskStats(project.id)) {
  if (!projectFilters.more.length) return true;
  return projectFilters.more.every((filter) => {
    if (filter === "has_tasks") return stats.total > 0;
    if (filter === "no_tasks") return stats.total === 0;
    if (filter === "has_delay") return stats.delay > 0 || isProjectDelayed(project);
    if (filter === "has_overdue") return stats.overdue > 0 || getProjectScheduleStatus(project) === "overdue";
    if (filter === "my_owner") return currentProfile?.uid && entityMatchesOwnerFilter(project, [currentProfile.uid]);
    if (filter === "my_collab") return currentUserMatchesCollaboration(project) || getProjectTasks(project.id).some(currentUserMatchesCollaboration);
    return true;
  });
}

function entityMatchesOwnerFilter(entity, ownerIds = []) {
  if (!ownerIds.length) return true;
  return getInternalOwnerIds(entity).some((uid) => ownerIds.includes(uid));
}

function entityMatchesCollaborationFilter(entity, filters = []) {
  if (!filters.length) return true;
  const tags = normalizeTextList(entity?.collaborationTags || entity?.stakeholders || []);
  return tags.some((tag) => filters.includes(tag));
}

function currentUserMatchesCollaboration(entity = {}) {
  const tags = normalizeTextList(entity?.collaborationTags || entity?.stakeholders || []);
  if (!tags.length || !currentProfile) return false;
  const candidates = normalizeTextList([
    currentProfile.name,
    currentProfile.email,
    currentFirebaseUser?.email,
    currentSafeUser?.email,
  ]).map((item) => item.toLowerCase());
  return tags.some((tag) => candidates.includes(String(tag).toLowerCase()));
}

function getVisibleTasks(options = {}) {
  const useTaskFilters = Boolean(options.useTaskFilters);
  const query = useTaskFilters ? taskFilters.query.trim().toLowerCase() : els.searchInput.value.trim().toLowerCase();
  const phase = options.phase ?? (useTaskFilters ? taskFilters.phase : projectFilters.phase);
  const taskProjectFilters = normalizeFilterValues(taskFilters.projectIds);
  const projectId = options.projectId ?? (useTaskFilters ? (taskProjectFilters.length ? taskProjectFilters : selectedProjectId) : selectedProjectId);
  const systemId = options.systemId ?? selectedSystemId;
  const systemIds = normalizeFilterValues(options.systemIds);
  const tagFilter = options.tag ?? selectedTagFilter;
  const normalizedTagFilter = tagFilter.trim().toLowerCase();
  const includeOccurrences = Boolean(options.includeOccurrences);
  const phaseProjectIds = state.projects
    .filter((project) => projectMatchesPhaseFilters(project, phase))
    .map((project) => project.id);
  const strictEntityFilters = Boolean(options.strictEntityFilters);

  return getUniqueTasksForDisplay(state.tasks).filter((task) => {
    if (isTaskDeleted(task)) return false;
    if (!includeOccurrences && isRecurringOccurrenceTask(task)) return false;
    const system = getSystem(task.systemId);
    const project = getProject(task.projectId);
    const matchSystem = systemIds.length
      ? taskMatchesGanttSystemFilters(task, systemIds)
      : taskMatchesSystemScope(task, systemId);
    const matchProject = taskMatchesProjectScope(task, projectId);
    const matchPhase = taskMatchesPhaseScope(task, phaseProjectIds, phase);
    const matchTag = !normalizedTagFilter || (task.tags || []).some((tag) => tag.toLowerCase() === normalizedTagFilter);
    const ownerFilters = options.ownerIds ?? (useTaskFilters ? taskFilters.ownerIds : projectOwnerFilterIds);
    const collaborationFilters = options.collaborationTags ?? (useTaskFilters ? taskFilters.collaborationTags : projectCollaborationFilters);
    const matchOwner = strictEntityFilters
      ? entityMatchesOwnerFilter(task, ownerFilters)
      : entityMatchesOwnerFilter(task, ownerFilters)
        || entityMatchesOwnerFilter(project, ownerFilters)
        || entityMatchesOwnerFilter(system, ownerFilters);
    const matchCollaboration = strictEntityFilters
      ? entityMatchesCollaborationFilter(task, collaborationFilters)
      : entityMatchesCollaborationFilter(task, collaborationFilters)
        || entityMatchesCollaborationFilter(project, collaborationFilters)
        || entityMatchesCollaborationFilter(system, collaborationFilters);
    const haystack = [
      task.title,
      task.description,
      task.owner,
      task.ownerName,
      (task.collaborationTags || []).join(" "),
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
      system?.ownerName,
      (system?.tags || []).join(" "),
      (system?.collaborationTags || []).join(" "),
      project?.name,
      project?.description,
      project?.ownerName,
      (project?.tags || []).join(" "),
      (project?.collaborationTags || []).join(" "),
      getProjectCategoryLabel(project?.category),
      project?.requirementRequest,
      project?.phaseChangedAt,
      (project?.relatedEmails || []).join(" "),
      (project?.relatedLinks || []).map((link) => `${link.title} ${link.url}`).join(" "),
      getPhaseLabel(project?.phase),
      getTaskStageLabel(task),
    ]
      .join(" ");

    const matchText = matchesFuzzyText(haystack, query);
    const matchTaskFilters = !useTaskFilters || taskMatchesAdvancedFilters(task);
    return matchSystem && matchProject && matchPhase && matchTag && matchOwner && matchCollaboration && matchText && matchTaskFilters;
  });
}

function taskMatchesAdvancedFilters(task) {
  const taskDates = [task.rangeStart, task.rangeEnd, task.startDate, task.endDate, task.executionDate, task.deadline];
  if (!filterIncludesValue(taskFilters.status, task.status)) return false;
  if (!filterIncludesValue(taskFilters.priority, normalizePriority(task.priority))) return false;
  if (!filterMatchesAny(taskFilters.due, (filter) => dueStatusMatchesTask(task, filter))) return false;
  if (!dateFilterMatchesDates(taskDates, taskFilters.date, taskFilters.dateStart, taskFilters.dateEnd)) return false;
  if (!taskMoreFiltersMatch(task)) return false;
  return true;
}

function taskMoreFiltersMatch(task) {
  if (!taskFilters.more.length) return true;
  return taskFilters.more.every((filter) => {
    if (filter === "has_project") return getTaskScope(task) === "project" && Boolean(task.projectId);
    if (filter === "no_stage") return !getTaskStage(task);
    if (filter === "has_delay") return taskIsDelayed(task);
    if (filter === "has_overdue") return taskDeadlineOverdue(task);
    if (filter === "my_owner") return currentProfile?.uid && entityMatchesOwnerFilter(task, [currentProfile.uid]);
    if (filter === "my_collab") return currentUserMatchesCollaboration(task);
    return true;
  });
}

function openSystemDialog(system = null) {
  els.systemForm.reset();
  document.querySelector("#systemDialogTitle").textContent = system ? "設定系統" : "新增系統";
  systemFields.id.value = system?.id || "";
  systemFields.name.value = system?.name || "";
  systemFields.description.value = system?.description || "";
  systemFields.tags.value = system?.tags?.join(", ") || "";
  systemFields.collaborationTags.value = system?.collaborationTags?.join(", ") || "";
  renderOwnerDropdown(
    systemFields.owner,
    getSystemOwnerChoices(system),
    system?.internalOwnerIds || system?.ownerUid || currentProfile?.uid || "",
    system || {},
    {
      disabled: Boolean(system?.id && !canAssignSystemOwner(system)),
    },
  );
  els.deleteSystemButton.hidden = !system?.id || !canEditSystem(system);
  els.systemDialog.showModal();
}

function handleSystemSubmit(event) {
  event.preventDefault();
  const previousSystem = getSystem(systemFields.id.value);
  const ownerIds = ownerSelectValue(systemFields.owner, previousSystem);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, previousSystem || {}), previousSystem || {});

  const system = {
    id: systemFields.id.value || createId(),
    internalOwnerIds: ownerIds,
    ...owner,
    ownerName: getOwnerNames(ownerIds, previousSystem || {}),
    name: systemFields.name.value.trim(),
    description: systemFields.description.value.trim(),
    tags: splitCommaList(systemFields.tags.value),
    collaborationTags: splitCommaList(systemFields.collaborationTags.value),
  };

  if (systemFields.id.value) {
    state.systems = state.systems.map((item) => (item.id === system.id ? { ...item, ...system } : item));
  } else {
    state.systems = [system, ...state.systems];
  }
  selectedSystemId = system.id;
  selectedProjectId = "all";
  saveState();
  els.systemDialog.close();
  render();
}

function handleSystemDelete() {
  const id = systemFields.id.value;
  const system = getSystem(id);
  if (!system) return;
  const projectCount = state.projects.filter((project) => project.systemId === id).length;
  const taskCount = state.tasks.filter((task) => task.systemId === id).length;
  if (projectCount || taskCount) {
    alert(`此系統底下仍有 ${projectCount} 個專案、${taskCount} 筆任務，請先清空下層資料後再刪除。`);
    return;
  }
  if (!confirm(`確定要刪除系統「${system.name}」嗎？此操作無法復原。`)) return;
  state.systems = state.systems.filter((item) => item.id !== id);
  selectedSystemId = null;
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
  projectFields.systemId.disabled = Boolean(project?.id && !isAdminProfile());
  syncProjectOwnerOptions(project, defaultSystemId);
  projectFields.category.value = normalizeProjectCategory(project?.category);
  projectFields.status && (projectFields.status.value = getProjectStatus(project || {}));
  projectFields.priority && (projectFields.priority.value = normalizePriority(project?.priority));
  projectFields.name.value = project?.name || "";
  projectFields.description.value = project?.description || "";
  projectFields.tags.value = project?.tags?.join(", ") || "";
  projectFields.collaborationTags.value = project?.collaborationTags?.join(", ") || "";
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
  els.deleteProjectButton.hidden = !project?.id || !canAssignProjectOwner(project, defaultSystemId);
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
  const requestedStatus = normalizeProjectStatus(projectFields.status?.value || previousProject?.status || inferProjectStatusFromDates(previousProject || {}));
  const isClosed = isDevelopmentProject && (projectFields.phase.value === "closed" || requestedStatus === "closed");
  const phase = isDevelopmentProject ? (isClosed ? "closed" : projectFields.phase.value) : "deal";
  const ownerIds = ownerSelectValue(projectFields.owner, previousProject);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, previousProject || {}), previousProject || {});
  const systemId = projectFields.systemId.value;
  const system = getSystem(systemId);
  let projectVisibleUids = uniqueUids([
    ...normalizeVisibleToUids(previousProject?.visibleToUids),
    ...(system ? getVisibleOrOwnerUids(system) : []),
    ...ownerIds,
  ]);

  if (!previousProject) {
    const draftProject = {
      systemId,
      internalOwnerIds: ownerIds,
      ...owner,
      visibleToUids: projectVisibleUids,
    };
    const projectCreateRuleCheck = getProjectCreateRuleCheck(draftProject);
    if (!projectCreateRuleCheck.allowed) {
      if (projectCreateRuleCheck.reason === "system-parent-not-synced") {
        logDeferredCloudWrites([createCloudWriteLogEntry("projects", "create", "", draftProject, {
          reason: projectCreateRuleCheck.reason,
        })]);
      } else {
        logBlockedCloudProjectCreate(draftProject, projectCreateRuleCheck.reason);
      }
      alert("只有系統負責人可以在這個系統下新增專案。請確認此系統的負責人設定。");
      return;
    }
    projectVisibleUids = projectCreateRuleCheck.expectedVisibleToUids;
  }

  if (!previousProject && !canAssignProjectOwner(null, projectFields.systemId.value)) {
    alert("只有系統負責人或管理員可以在這個系統下新增專案。");
    return;
  }

  const project = {
    id: projectFields.id.value || createId(),
    systemId,
    internalOwnerIds: ownerIds,
    ...owner,
    ownerName: getOwnerNames(ownerIds, previousProject || {}),
    visibleToUids: projectVisibleUids,
    category,
    status: isDevelopmentProject ? (isClosed ? "closed" : requestedStatus) : "doing",
    priority: normalizePriority(projectFields.priority?.value || previousProject?.priority),
    name: projectFields.name.value.trim(),
    description: projectFields.description.value.trim(),
    tags: splitCommaList(projectFields.tags.value),
    collaborationTags: splitCommaList(projectFields.collaborationTags.value),
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
    sortOrder: previousProject?.sortOrder || getNextSortOrder(state.projects.filter((item) => item.systemId === systemId)),
  };

  const previousStageIds = previousProject
    ? state.projectStages.filter((stage) => stage.projectId === project.id).map((stage) => stage.id)
    : [];
  const projectTaskIds = previousProject
    ? state.tasks.filter((task) => task.projectId === project.id).map((task) => task.id)
    : [];

  if (previousProject) {
    state.projects = state.projects.map((item) => (item.id === project.id ? project : item));
    state.tasks = state.tasks.map((task) => {
      return task.projectId === project.id ? { ...task, systemId: project.systemId } : task;
    });
  } else {
    state.projects = [project, ...state.projects];
  }

  syncProjectStagesForProject(project, previousProject);
  const stageIds = uniqueUids([
    ...previousStageIds,
    ...state.projectStages.filter((stage) => stage.projectId === project.id).map((stage) => stage.id),
  ]);

  selectedSystemId = project.systemId;
  selectedProjectId = project.id;
  if (previousProject) {
    saveProjectState([project.id], stageIds, projectTaskIds);
  } else {
    deferProjectStageCloudWrites(project.id, stageIds);
    saveProjectOnlyState([project.id]);
  }
  els.projectDialog.close();
  render();
}

function handleProjectDelete() {
  const id = projectFields.id.value;
  const project = getProject(id);
  if (!project) return;
  const taskCount = state.tasks.filter((task) => task.projectId === id).length;
  if (taskCount) {
    alert(`此專案底下仍有 ${taskCount} 筆任務，請先清空下層任務後再刪除。`);
    return;
  }
  if (!confirm(`確定要刪除專案「${project.name}」嗎？此操作無法復原。`)) return;
  const stageIds = state.projectStages.filter((stage) => stage.projectId === id).map((stage) => stage.id);
  state.projects = state.projects.filter((item) => item.id !== id);
  state.projectStages = state.projectStages.filter((stage) => stage.projectId !== id);
  deferredProjectStageIdsByProject.delete(id);
  selectedProjectId = "all";
  saveProjectState([id], stageIds);
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

function syncProjectStagesForProject(project, previousProject = null) {
  if (!project || project.category === "general") {
    state.projectStages = state.projectStages.filter((stage) => stage.projectId !== project?.id);
    return;
  }

  const existingStages = state.projectStages.filter((stage) => stage.projectId === project.id);
  const byPhase = new Map(existingStages.map((stage) => [stage.phaseId || getPhaseIdByLabel(stage.name), stage]));
  const currentPhaseIndex = Math.max(0, phases.findIndex((phase) => phase.id === project.phase));
  const nextStages = phases.map((phase, index) => {
    const existing = byPhase.get(phase.id);
    const schedule = project.phaseSchedules?.[phase.id] || {};
    const nextStatus = project.phase === phase.id
      ? "doing"
      : existing?.status === "doing"
        ? (index < currentPhaseIndex ? "done" : "not_started")
        : existing?.status || (index < currentPhaseIndex ? "done" : "not_started");
    return normalizeProjectStage({
      ...(existing || {}),
      id: existing?.id || `stage-${project.id}-${phase.id}`,
      projectId: project.id,
      phaseId: phase.id,
      name: existing?.name || phase.label,
      startDate: existing?.startDate || schedule.start || "",
      endDate: existing?.endDate || schedule.end || "",
      status: nextStatus,
      sortOrder: existing?.sortOrder || index + 1,
      visibleToUids: project.visibleToUids,
    });
  });

  state.projectStages = [
    ...state.projectStages.filter((stage) => stage.projectId !== project.id),
    ...nextStages,
  ];
}

function syncProjectOwnerOptions(project = getProject(projectFields.id.value), systemId = projectFields.systemId.value) {
  const selectedOwnerUid = project?.internalOwnerIds || project?.ownerUid || currentProfile?.uid || "";
  renderOwnerDropdown(
    projectFields.owner,
    getProjectOwnerChoices(project, systemId),
    selectedOwnerUid,
    project || {},
    {
      disabled: Boolean(project?.id && !canAssignProjectOwner(project, systemId)),
    },
  );
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
  const preferredProjectId = task?.projectId || defaults.projectId || (selectedProjectId === "all" ? "" : selectedProjectId);
  const preferredProject = getProject(preferredProjectId);
  const defaultSystemId = defaultScope === "general"
    ? ""
    : task?.systemId || defaults.systemId || preferredProject?.systemId || (selectedScopeIsGeneral() ? "" : selectedSystemId) || state.systems[0]?.id || "";
  const defaultProjectId = defaultScope === "project" ? preferredProjectId : "";
  taskFields.id.value = task?.id || "";
  taskFields.scope.value = defaultScope;
  if (taskFields.taskType) taskFields.taskType.value = getTaskType(task || defaults || {});
  taskFields.systemId.innerHTML = renderSystemOptions(defaultSystemId);
  populateTaskProjectSelect(defaultSystemId, defaultProjectId);
  syncTaskStageAndParentOptions(taskFields, task || defaults);
  taskFields.title.value = task?.title || "";
  taskFields.description.value = task?.description || "";
  taskFields.status.value = normalizeTaskStatus(task?.status);
  taskFields.priority.value = task?.priority || "medium";
  taskFields.rangeStart.value = task?.rangeStart || task?.startDate || "";
  taskFields.rangeEnd.value = task?.rangeEnd || task?.endDate || "";
  taskFields.executionDate.value = task?.executionDate || "";
  taskFields.deadline.value = task?.deadline || "";
  taskFields.completedDate.value = task?.completedDate || "";
  taskFields.tags.value = (task?.tags || defaults.tags || []).join(", ");
  taskFields.stakeholders.value = (task?.collaborationTags || task?.stakeholders || defaults.collaborationTags || []).join(", ");
  setTaskRecurrenceFields(taskFields, task || {});
  renderEmailRows(taskFields.relatedEmails, task?.relatedEmails || []);
  renderLinkRows(taskFields.relatedLinks, task?.relatedLinks || []);

  syncTaskScopeFields(taskFields, false);
  syncTaskOwnerOptions(taskFields, task);
  syncTaskStageAndParentOptions(taskFields, task || defaults);
  if (!task && defaults.ownerIds?.length) {
    setMultiSelectValues(taskFields.owner, defaults.ownerIds);
  }
  const lockTaskScope = Boolean(task && !canAssignTaskOwner(task, {
    scope: defaultScope,
    systemId: defaultSystemId,
    projectId: defaultProjectId,
  }));
  taskFields.scope.disabled = lockTaskScope;
  taskFields.systemId.disabled = lockTaskScope;
  taskFields.projectId.disabled = lockTaskScope;
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
  const recurrenceRule = collectTaskRecurrenceRule(taskFields);
  const isRecurring = Boolean(taskFields.isRecurring?.checked && recurrenceRule.type);
  const dueRule = collectTaskDueRule(taskFields);
  const rangeStart = isRecurring ? recurrenceRule.startDate || "" : taskFields.rangeStart.value;
  const rangeEnd = isRecurring
    ? recurrenceRule.endMode === "date"
      ? recurrenceRule.endDate || recurrenceRule.startDate || ""
      : recurrenceRule.startDate || ""
    : taskFields.rangeEnd.value;
  const executionDate = isRecurring ? "" : taskFields.executionDate.value;
  const deadline = isRecurring ? "" : taskFields.deadline.value;


  if (!isRecurring && !validateTaskDates(rangeStart, rangeEnd, executionDate, deadline)) {
    return;
  }

  const existingTask = taskFields.id.value ? getProjectTask(taskFields.id.value) : null;
  const taskType = normalizeTaskTypeValue(taskFields.taskType?.value || "normal");
  const parentTaskId = scope === "project" && taskType === "child" ? taskFields.parentTaskId?.value || "" : "";
  if (!validateTaskTypeSelection({ taskType, parentTaskId, scope, projectId, existingTask })) return;
  const status = normalizeTaskStatus(taskFields.status.value);
  if (status === "done" && !isRecurringTemplateTask(existingTask) && !canCompleteTask(existingTask)) {
    alert("請先完成所有細項步驟，才能將任務狀態改為已完成。");
    return;
  }

  const requestedCompletedDate = status === "done" ? taskFields.completedDate.value || todayString() : "";
  const ownerIds = ownerSelectValue(taskFields.owner, existingTask);
  const owner = getOwnerPayload(getPrimaryOwnerUid(ownerIds, existingTask || {}), existingTask || {});
  if (isRecurring && !validateRecurrenceRule(recurrenceRule)) return;

  const task = applyTaskStatusSideEffects({
    id: taskFields.id.value || createId(),
    scope,
    systemId,
    projectId,
    stageId: scope === "project" ? taskFields.stageId?.value || "" : "",
    parentTaskId,
    taskType: parentTaskId ? "child" : taskType,
    internalOwnerIds: ownerIds,
    ...owner,
    ownerName: getOwnerNames(ownerIds, existingTask || {}),
    title: taskFields.title.value.trim(),
    description: taskFields.description.value.trim(),
    status,
    priority: taskFields.priority.value,
    owner: getOwnerNames(ownerIds, existingTask || {}),
    startDate: rangeStart,
    endDate: rangeEnd,
    rangeStart,
    rangeEnd,
    executionDate,
    deadline,
    dueDate: deadline,
    tags: splitCommaList(taskFields.tags.value),
    collaborationTags: splitCommaList(taskFields.stakeholders.value),
    stakeholders: splitCommaList(taskFields.stakeholders.value),
    isRecurring,
    recurrenceEnabled: isRecurring,
    isRecurringTemplate: isRecurring,
    isRecurringOccurrence: isRecurring ? false : existingTask?.isRecurringOccurrence || false,
    templateTaskId: isRecurring ? "" : existingTask?.templateTaskId || "",
    occurrenceDate: isRecurring ? "" : existingTask?.occurrenceDate || "",
    recurrenceType: isRecurring ? recurrenceRule.type : "",
    recurrenceRule: isRecurring ? recurrenceRule : {},
    dueRule: isRecurring ? dueRule : normalizeDueRule(existingTask?.dueRule),
    completedOccurrences: existingTask?.completedOccurrences || [],
    sortOrder: existingTask?.sortOrder || getNextSortOrder(getTaskSortScopeItems({ scope, systemId, projectId })),
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
  saveTaskState([task.id]);
  els.taskDialog.close();
  render();
}

function handleTaskDelete() {
  const id = taskFields.id.value;
  if (!deleteTaskById(id)) return;
  els.taskDialog.close();
  render();
}

function handleDrawerTaskDelete() {
  if (!deleteTaskById(selectedTodoTaskId)) return;
  closeTodoDrawer();
  render();
}

function deleteTaskById(id) {
  if (!id) return false;
  const task = getProjectTask(id);
  if (!task) return false;
  const childCount = state.tasks.filter((task) => task.parentTaskId === id && !isTaskDeleted(task)).length;
  if (childCount) {
    alert(`此任務底下還有 ${childCount} 筆子任務，請先刪除或移出子任務。`);
    return false;
  }

  if (isRecurringTemplateTask(task)) {
    return deleteRecurringTemplateTask(task);
  }

  if (!confirm("確定要刪除這筆任務嗎？此操作無法復原。")) return false;

  state.tasks = state.tasks.filter((task) => task.id !== id);
  if (selectedTodoTaskId === id) selectedTodoTaskId = null;
  saveTaskState([id]);
  return true;
}

function getCurrentUserId() {
  return currentProfile?.uid || currentFirebaseUser?.uid || currentSafeUser?.uid || "";
}

function deleteRecurringTemplateTask(template = {}) {
  if (!confirm("刪除此週期性任務後，系統將不再產生新的待辦。已產生但尚未完成的任務將一併移除；已完成的任務紀錄將保留，供週動態與歷程查詢使用。是否確認刪除？")) {
    return false;
  }

  const deletedAt = new Date().toISOString();
  const deletedBy = getCurrentUserId();
  const changedTaskIds = new Set([template.id]);
  const hiddenTaskIds = new Set([template.id]);

  state.tasks = state.tasks.map((task) => {
    if (task.id === template.id) {
      return {
        ...task,
        isDeleted: true,
        deletedAt,
        deletedBy,
        recurrenceEnabled: false,
      };
    }

    if (!isRecurringOccurrenceTask(task) || task.templateTaskId !== template.id) return task;

    changedTaskIds.add(task.id);
    if (normalizeTaskStatus(task.status) === "done") {
      return {
        ...task,
        isDeleted: false,
        templateDeleted: true,
        templateDeletedAt: deletedAt,
      };
    }

    hiddenTaskIds.add(task.id);
    return {
      ...task,
      isDeleted: true,
      deletedAt,
      deletedBy,
      deletedReason: "recurring_template_deleted",
    };
  });

  if (hiddenTaskIds.has(selectedTodoTaskId)) selectedTodoTaskId = null;
  saveTaskState([...changedTaskIds]);
  return true;
}

function toggleProjectClosed(projectId) {
  const project = getProject(projectId);
  if (!project) return;
  if (project.category === "general") return;

  const isClosed = project.closed || project.phase === "closed";
  project.closed = !isClosed;
  project.phase = isClosed ? "development" : "closed";
  project.status = project.closed ? "closed" : "doing";
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
  syncProjectStagesForProject(project, project);
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
  if (fields.rangeStart.value && fields.rangeEnd.value && autoCorrect && fields.rangeEnd.value < fields.rangeStart.value) {
    fields.rangeEnd.value = fields.rangeStart.value;
  }

  if (fields.rangeStart.value) {
    fields.rangeEnd.min = fields.rangeStart.value;
    fields.executionDate.min = fields.rangeStart.value;
  } else {
    fields.rangeEnd.removeAttribute("min");
    fields.executionDate.removeAttribute("min");
  }
  if (fields.rangeEnd.value) {
    fields.executionDate.max = fields.rangeEnd.value;
    fields.deadline.min = fields.rangeEnd.value;
  } else {
    fields.executionDate.removeAttribute("max");
    fields.deadline.removeAttribute("min");
  }

  if (autoCorrect) {
    if (fields.executionDate.value) fields.executionDate.value = clampDate(fields.executionDate.value, fields.rangeStart.value, fields.rangeEnd.value);
    if (fields.deadline.value && fields.rangeEnd.value && fields.deadline.value < fields.rangeEnd.value) fields.deadline.value = fields.rangeEnd.value;
  }
}

function validateTaskDates(rangeStart, rangeEnd, executionDate, deadline) {
  if (rangeStart && rangeEnd && rangeEnd < rangeStart) {
    alert("執行區間結束不能早於開始。");
    return false;
  }

  if (executionDate && ((rangeStart && executionDate < rangeStart) || (rangeEnd && executionDate > rangeEnd))) {
    alert("執行日期只能選擇執行區間內的日期。");
    return false;
  }

  if (deadline && rangeEnd && deadline < rangeEnd) {
    alert("最後期限只能選擇執行區間結束日或之後的日期。");
    return false;
  }

  return true;
}

function syncTaskRecurrenceFields(fields, options = {}) {
  if (!fields.isRecurring) return;
  const enabled = Boolean(fields.isRecurring.checked);
  const type = normalizeRecurrenceType(fields.recurrenceType?.value);
  const dailyMode = fields.recurrenceDailyMode?.value || "interval";
  const monthlyMode = fields.recurrenceMonthlyMode?.value || "dayOfMonth";
  const yearlyMode = fields.recurrenceYearlyMode?.value || "date";
  const endMode = fields.recurrenceEndMode?.value || "none";
  const dueRuleType = fields.dueRuleType?.value || "sameDay";
  const usesInterval = enabled && type && !(type === "daily" && dailyMode === "weekday");
  const usesMonthlyDay = enabled && type === "monthly" && monthlyMode === "dayOfMonth";
  const usesYearlyDay = enabled && type === "yearly" && yearlyMode === "date";
  const usesNthWeekday = enabled && (
    (type === "monthly" && monthlyMode === "nthWeekday")
    || (type === "yearly" && yearlyMode === "nthWeekday")
  );
  fields.recurrenceRulePanel?.classList.toggle("hidden", !enabled);
  [
    fields.rangeStartField,
    fields.rangeEndField,
    fields.executionDateField,
    fields.deadlineField,
  ].filter(Boolean).forEach((field) => field.classList.toggle("hidden", enabled));
  [fields.rangeStart, fields.rangeEnd, fields.executionDate, fields.deadline].filter(Boolean).forEach((field) => {
    field.disabled = enabled;
    field.required = false;
  });
  fields.recurrenceType.disabled = !enabled;
  fields.recurrenceDailyMode && (fields.recurrenceDailyMode.disabled = !enabled || type !== "daily");
  fields.recurrenceInterval && (fields.recurrenceInterval.disabled = !usesInterval);
  fields.recurrenceIntervalField?.classList.toggle("hidden", !usesInterval);
  if (fields.recurrenceIntervalLabel) fields.recurrenceIntervalLabel.textContent = "每隔";
  if (fields.recurrenceIntervalUnit) {
    fields.recurrenceIntervalUnit.textContent = {
      daily: "天",
      weekly: "週",
      monthly: "個月",
      yearly: "年",
    }[type] || "";
  }
  fields.recurrenceStartDate && (fields.recurrenceStartDate.disabled = !enabled);
  fields.recurrenceEndMode && (fields.recurrenceEndMode.disabled = !enabled);
  fields.recurrenceEndDate && (fields.recurrenceEndDate.disabled = !enabled || endMode !== "date");
  fields.recurrenceCount && (fields.recurrenceCount.disabled = !enabled || endMode !== "count");
  fields.recurrenceMonthlyMode && (fields.recurrenceMonthlyMode.disabled = !enabled || type !== "monthly");
  fields.recurrenceMonthDay && (fields.recurrenceMonthDay.disabled = !usesMonthlyDay);
  fields.recurrenceYearlyMode && (fields.recurrenceYearlyMode.disabled = !enabled || type !== "yearly");
  fields.recurrenceYearlyMonth && (fields.recurrenceYearlyMonth.disabled = !enabled || type !== "yearly");
  fields.recurrenceYearlyDay && (fields.recurrenceYearlyDay.disabled = !usesYearlyDay);
  fields.recurrenceWeekOrder && (fields.recurrenceWeekOrder.disabled = !usesNthWeekday);
  fields.recurrenceWeekday && (fields.recurrenceWeekday.disabled = !usesNthWeekday);
  fields.recurrenceStartTime && (fields.recurrenceStartTime.disabled = !enabled);
  fields.recurrenceEndTime && (fields.recurrenceEndTime.disabled = !enabled);
  if (fields.recurrenceDuration) {
    fields.recurrenceDuration.disabled = !enabled;
    fields.recurrenceDuration.readOnly = true;
  }
  fields.dueRuleType && (fields.dueRuleType.disabled = !enabled);
  fields.dueRuleDays && (fields.dueRuleDays.disabled = !enabled || dueRuleType !== "afterDays");
  fields.recurrenceWeekdays?.forEach((checkbox) => {
    checkbox.disabled = !enabled || type !== "weekly";
  });
  fields.recurrenceType.required = enabled;
  fields.recurrenceInterval && (fields.recurrenceInterval.required = usesInterval);
  fields.recurrenceStartDate && (fields.recurrenceStartDate.required = enabled);
  fields.recurrenceEndDate && (fields.recurrenceEndDate.required = enabled && endMode === "date");
  fields.recurrenceCount && (fields.recurrenceCount.required = enabled && endMode === "count");
  fields.recurrenceMonthDay && (fields.recurrenceMonthDay.required = usesMonthlyDay);
  fields.recurrenceYearlyMonth && (fields.recurrenceYearlyMonth.required = enabled && type === "yearly");
  fields.recurrenceYearlyDay && (fields.recurrenceYearlyDay.required = usesYearlyDay);
  fields.recurrenceWeekOrder && (fields.recurrenceWeekOrder.required = usesNthWeekday);
  fields.recurrenceWeekday && (fields.recurrenceWeekday.required = usesNthWeekday);
  fields.dueRuleDays && (fields.dueRuleDays.required = enabled && dueRuleType === "afterDays");
  fields.recurrenceDailyField?.classList.toggle("hidden", !enabled || type !== "daily");
  fields.recurrenceWeekdayField?.classList.toggle("hidden", !enabled || type !== "weekly");
  fields.recurrenceMonthlyField?.classList.toggle("hidden", !enabled || type !== "monthly");
  fields.recurrenceMonthDayField?.classList.toggle("hidden", !usesMonthlyDay);
  fields.recurrenceYearlyField?.classList.toggle("hidden", !enabled || type !== "yearly");
  fields.recurrenceYearlyDayField?.classList.toggle("hidden", !usesYearlyDay);
  fields.recurrenceNthWeekdayField?.classList.toggle("hidden", !usesNthWeekday);
  fields.recurrenceEndDateField?.classList.toggle("hidden", !enabled || endMode !== "date");
  fields.recurrenceCountField?.classList.toggle("hidden", !enabled || endMode !== "count");
  fields.dueRuleDaysField?.classList.toggle("hidden", !enabled || dueRuleType !== "afterDays");

  if (enabled && type === "weekly") {
    const checkedWeekdays = [...(fields.recurrenceWeekdays || [])].filter((checkbox) => checkbox.checked);
    if (!checkedWeekdays.length) {
      const startDate = fields.recurrenceStartDate?.value || fields.executionDate?.value || fields.rangeStart?.value || todayString();
      const weekday = parseDateString(startDate).getDay();
      fields.recurrenceWeekdays?.forEach((checkbox) => {
        checkbox.checked = Number(checkbox.value) === weekday;
      });
    }
  }

  if (!options.skipTimeSync) {
    syncRecurrenceTimeFields(fields);
  }

  if (!enabled) {
    fields.recurrenceType.value = "";
    fields.recurrenceDailyMode && (fields.recurrenceDailyMode.value = "interval");
    fields.recurrenceInterval.value = "";
    fields.recurrenceStartDate && (fields.recurrenceStartDate.value = "");
    fields.recurrenceEndMode && (fields.recurrenceEndMode.value = "none");
    fields.recurrenceEndDate && (fields.recurrenceEndDate.value = "");
    fields.recurrenceCount && (fields.recurrenceCount.value = "");
    fields.recurrenceMonthlyMode && (fields.recurrenceMonthlyMode.value = "dayOfMonth");
    fields.recurrenceMonthDay && (fields.recurrenceMonthDay.value = "");
    fields.recurrenceYearlyMode && (fields.recurrenceYearlyMode.value = "date");
    fields.recurrenceYearlyMonth && (fields.recurrenceYearlyMonth.value = "");
    fields.recurrenceYearlyDay && (fields.recurrenceYearlyDay.value = "");
    fields.recurrenceWeekOrder && (fields.recurrenceWeekOrder.value = "1");
    fields.recurrenceWeekday && (fields.recurrenceWeekday.value = "1");
    fields.recurrenceStartTime && (fields.recurrenceStartTime.value = "");
    fields.recurrenceEndTime && (fields.recurrenceEndTime.value = "");
    fields.recurrenceDuration && (fields.recurrenceDuration.value = "");
    fields.dueRuleType && (fields.dueRuleType.value = "sameDay");
    fields.dueRuleDays && (fields.dueRuleDays.value = "");
    fields.recurrenceWeekdays?.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
  renderRecurrencePreview(fields);
}

function setTaskRecurrenceFields(fields, task = {}) {
  const rule = normalizeRecurrenceRule(task.recurrenceRule || {}, task);
  const enabled = Boolean(isRecurringTemplateTask(task) && rule.type);
  const dueRule = normalizeDueRule(task.dueRule);
  fields.isRecurring.checked = enabled;
  fields.recurrenceType.value = enabled ? rule.type : "";
  if (fields.recurrenceDailyMode) fields.recurrenceDailyMode.value = enabled ? rule.dailyMode || "interval" : "interval";
  fields.recurrenceInterval.value = enabled ? rule.interval || 1 : "";
  if (fields.recurrenceStartDate) fields.recurrenceStartDate.value = enabled ? rule.startDate || "" : "";
  if (fields.recurrenceEndMode) fields.recurrenceEndMode.value = enabled ? rule.endMode || "none" : "none";
  if (fields.recurrenceEndDate) fields.recurrenceEndDate.value = enabled ? rule.endDate || "" : "";
  if (fields.recurrenceCount) fields.recurrenceCount.value = enabled && rule.occurrenceCount ? rule.occurrenceCount : "";
  if (fields.recurrenceMonthlyMode) fields.recurrenceMonthlyMode.value = enabled ? rule.monthlyMode || "dayOfMonth" : "dayOfMonth";
  if (fields.recurrenceMonthDay) fields.recurrenceMonthDay.value = enabled && rule.monthDay ? rule.monthDay : "";
  if (fields.recurrenceYearlyMode) fields.recurrenceYearlyMode.value = enabled ? rule.yearlyMode || "date" : "date";
  if (fields.recurrenceYearlyMonth) fields.recurrenceYearlyMonth.value = enabled && rule.yearlyMonth ? rule.yearlyMonth : "";
  if (fields.recurrenceYearlyDay) fields.recurrenceYearlyDay.value = enabled && rule.yearlyDay ? rule.yearlyDay : "";
  if (fields.recurrenceWeekOrder) fields.recurrenceWeekOrder.value = enabled ? String(rule.weekOrder || 1) : "1";
  if (fields.recurrenceWeekday) fields.recurrenceWeekday.value = enabled ? String(rule.weekday ?? 1) : "1";
  if (fields.recurrenceStartTime) fields.recurrenceStartTime.value = enabled ? rule.startTime || "" : "";
  if (fields.recurrenceEndTime) fields.recurrenceEndTime.value = enabled ? rule.endTime || "" : "";
  if (fields.recurrenceDuration) fields.recurrenceDuration.value = enabled && rule.durationMinutes ? rule.durationMinutes : "";
  if (fields.dueRuleType) fields.dueRuleType.value = enabled ? dueRule.type : "sameDay";
  if (fields.dueRuleDays) fields.dueRuleDays.value = enabled && dueRule.type === "afterDays" ? dueRule.daysAfterOccurrence : "";
  fields.recurrenceWeekdays?.forEach((checkbox) => {
    checkbox.checked = enabled && (rule.weekDays || []).includes(Number(checkbox.value));
  });
  syncTaskRecurrenceFields(fields);
}

function getUpcomingRecurringPreviewDates(rule = {}, count = 5) {
  if (!rule.type || !rule.startDate) return [];
  const previewTask = {
    isRecurring: true,
    isRecurringTemplate: true,
    recurrenceRule: rule,
  };
  const dates = [];
  const start = rule.startDate > todayString() ? rule.startDate : todayString();
  let cursor = parseDateString(start);
  const maxCursor = addDaysToDate(cursor, 3660);

  while (dates.length < count && cursor <= maxCursor) {
    const date = toDateInputValue(cursor);
    if (taskRecursOnDate(previewTask, date)) dates.push(date);
    cursor = addDaysToDate(cursor, 1);
  }

  return dates;
}

function renderRecurrencePreview(fields) {
  const list = fields.recurrencePreviewList;
  if (!list) return;
  const rule = collectTaskRecurrenceRule(fields);
  if (!fields.isRecurring?.checked || !rule.type || !rule.startDate) {
    list.innerHTML = `<li class="recurrence-preview-empty">啟用週期並設定開始日期後顯示預覽。</li>`;
    return;
  }
  const dates = getUpcomingRecurringPreviewDates(rule, 5);
  if (!dates.length) {
    list.innerHTML = `<li class="recurrence-preview-empty">目前設定沒有可產生的未來任務。</li>`;
    return;
  }
  const timeLabel = rule.startTime && rule.endTime
    ? `${rule.startTime} 到 ${rule.endTime}`
    : rule.startTime || rule.endTime || "未設定時間";
  list.innerHTML = dates
    .map((date) => `<li><span>${escapeHtml(date)} ${escapeHtml(formatGanttWeekday(date))}</span><strong>${escapeHtml(timeLabel)}</strong></li>`)
    .join("");
}

function collectTaskDueRule(fields) {
  if (!fields.isRecurring?.checked) return normalizeDueRule();
  return normalizeDueRule({
    type: fields.dueRuleType?.value || "sameDay",
    daysAfterOccurrence: fields.dueRuleDays?.value || 0,
  });
}

function collectTaskRecurrenceRule(fields) {
  const type = normalizeRecurrenceType(fields.recurrenceType?.value);
  if (!fields.isRecurring?.checked || !type) return {};
  const startDate = fields.recurrenceStartDate?.value || fields.executionDate?.value || fields.rangeStart?.value || todayString();
  const weekDays = fields.recurrenceWeekdays
    ? normalizeWeekDays([...fields.recurrenceWeekdays].filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.value))
    : [];
  return normalizeRecurrenceRule({
    type,
    startDate,
    dailyMode: fields.recurrenceDailyMode?.value || "interval",
    interval: fields.recurrenceInterval?.value || 1,
    weekDays,
    monthlyMode: fields.recurrenceMonthlyMode?.value || "dayOfMonth",
    monthDay: fields.recurrenceMonthDay?.value || (startDate ? parseDateString(startDate).getDate() : todayDate().getDate()),
    yearlyMode: fields.recurrenceYearlyMode?.value || "date",
    yearlyMonth: fields.recurrenceYearlyMonth?.value || (startDate ? parseDateString(startDate).getMonth() + 1 : todayDate().getMonth() + 1),
    yearlyDay: fields.recurrenceYearlyDay?.value || (startDate ? parseDateString(startDate).getDate() : todayDate().getDate()),
    weekOrder: fields.recurrenceWeekOrder?.value || 1,
    weekday: fields.recurrenceWeekday?.value ?? (startDate ? parseDateString(startDate).getDay() : todayDate().getDay()),
    endMode: fields.recurrenceEndMode?.value || "none",
    endDate: fields.recurrenceEndDate?.value || "",
    occurrenceCount: fields.recurrenceCount?.value || 0,
    startTime: fields.recurrenceStartTime?.value || "",
    endTime: fields.recurrenceEndTime?.value || "",
    durationMinutes: fields.recurrenceDuration?.value || getTimeDurationMinutes(fields.recurrenceStartTime?.value, fields.recurrenceEndTime?.value),
  });
}

function validateRecurrenceRule(rule = {}) {
  if (!rule.type) return true;
  if (!rule.startDate) {
    alert("請設定週期開始日期。");
    return false;
  }
  if (rule.type === "weekly" && !rule.weekDays.length) {
    alert("請至少選擇一個執行星期。");
    return false;
  }
  if (rule.type === "monthly" && rule.monthlyMode === "dayOfMonth" && !isValidMonthDay(rule.monthDay)) {
    alert("請設定有效的每月日期。");
    return false;
  }
  if (rule.type === "yearly" && rule.yearlyMode === "date" && !isValidDateParts(2024, rule.yearlyMonth, rule.yearlyDay)) {
    alert("請設定有效的每年固定日期。");
    return false;
  }
  if (rule.type === "yearly" && !isValidMonth(rule.yearlyMonth)) {
    alert("請設定有效的月份。");
    return false;
  }
  if (rule.endMode === "date" && (!rule.endDate || rule.endDate < rule.startDate)) {
    alert("週期結束日期不可早於開始日期。");
    return false;
  }
  if (rule.endMode === "count" && !rule.occurrenceCount) {
    alert("請設定週期執行次數。");
    return false;
  }
  return true;
}

function isValidMonthDay(day) {
  return Number.isInteger(Number(day)) && Number(day) >= 1 && Number(day) <= 31;
}

function isValidMonth(month) {
  return Number.isInteger(Number(month)) && Number(month) >= 1 && Number(month) <= 12;
}

function isValidDateParts(year, month, day) {
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return date.getFullYear() === Number(year) && date.getMonth() + 1 === Number(month) && date.getDate() === Number(day);
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
  const systems = [...state.systems];
  if (selectedId && !systems.some((system) => system.id === selectedId)) {
    systems.push({
      id: selectedId,
      name: "未顯示系統",
    });
  }

  return systems
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
  const stagesByPhase = new Map(getProjectStages(project.id).map((stage) => [stage.phaseId || getPhaseIdByLabel(stage.name), stage]));
  return phases
    .map((phase) => {
      const stage = stagesByPhase.get(phase.id) || {};
      return `
        <div class="phase-step ${project.phase === phase.id ? "active" : ""}">
          <strong>${phase.label}</strong>
          <span>${formatRange(stage.startDate, stage.endDate)}</span>
        </div>
      `;
    })
    .join("");
}

function getProjectActualRange(projectId) {
  const dates = state.tasks
    .filter((task) => task.projectId === projectId && isProjectListTask(task))
    .flatMap((task) => [getTaskTimelineStart(task), getTaskTimelineEnd(task)])
    .filter(Boolean)
    .sort();

  if (!dates.length) return "";
  return formatRange(dates[0], dates[dates.length - 1]);
}

function getTaskDateLine(task) {
  const range = `執行區間：${formatRange(task.startDate || task.rangeStart, task.endDate || task.rangeEnd)}`;
  const execution = `執行日期：${formatDate(task.executionDate)}`;
  const deadline = task.deadline ? `最後期限：${formatDate(task.deadline)}` : "最後期限：未設定";
  const recurring = isRecurringTemplateTask(task)
    ? `・${getRecurrenceLabel(task)}`
    : isRecurringOccurrenceTask(task)
      ? `・週期 ${task.recurringLabel || ""}`
      : "";
  return `${range}・${execution}・${deadline}${recurring}`;
}

function getTaskDeadlineSummary(task) {
  if (task.deadline) return formatDate(task.deadline);
  if (task.executionDate) return `執行 ${formatDate(task.executionDate)}`;
  return "未設定";
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

function getProjectStages(projectId) {
  return state.projectStages
    .filter((stage) => stage.projectId === projectId)
    .sort(compareManualThenName);
}

function getPhaseLabel(id) {
  return phases.find((phase) => phase.id === id)?.label || "";
}

function getPhaseIdByLabel(label = "") {
  return phases.find((phase) => phase.label === label)?.id || "";
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

function getRecurrenceLabel(task = {}) {
  if (!isRecurringTemplateTask(task)) return "";
  const rule = normalizeRecurrenceRule(task.recurrenceRule || {}, task);
  if (rule.type === "daily") {
    if (rule.dailyMode === "weekday") return "每個工作日";
    return rule.interval > 1 ? `每 ${rule.interval} 天` : "每日";
  }
  if (rule.type === "weekly") {
    const days = (rule.weekDays || []).map(getWeekdayShortLabel).join("、");
    return rule.interval > 1 ? `每 ${rule.interval} 週的星期${days}` : `每週${days ? `星期${days}` : ""}`;
  }
  if (rule.type === "monthly") {
    const pattern = rule.monthlyMode === "nthWeekday"
      ? `${getWeekOrderLabel(rule.weekOrder)}星期${getWeekdayShortLabel(rule.weekday)}`
      : `${rule.monthDay} 號`;
    return rule.interval > 1 ? `每 ${rule.interval} 個月的${pattern}` : `每月${pattern}`;
  }
  if (rule.type === "yearly") {
    const pattern = rule.yearlyMode === "nthWeekday"
      ? `${rule.yearlyMonth} 月${getWeekOrderLabel(rule.weekOrder)}星期${getWeekdayShortLabel(rule.weekday)}`
      : `${rule.yearlyMonth} 月 ${rule.yearlyDay} 日`;
    return rule.interval > 1 ? `每 ${rule.interval} 年的${pattern}` : `每年${pattern}`;
  }
  return "週期性任務";
}

function getWeekdayShortLabel(day) {
  return ["日", "一", "二", "三", "四", "五", "六"][Number(day)] || "";
}

function getWeekOrderLabel(order) {
  return {
    1: "第 1 個",
    2: "第 2 個",
    3: "第 3 個",
    4: "第 4 個",
    "-1": "最後一個",
  }[String(order)] || "第 1 個";
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
  const stageRange = getGanttRangeFromDates(getProjectStages(project.id).flatMap((stage) => [stage.startDate, stage.endDate]));
  if (stageRange) return formatRange(stageRange.start, stageRange.end);
  const range = getProjectScheduleRange(project.plannedStart, project.plannedEnd, project.phaseSchedules || {});
  return formatRange(range.start, range.end);
}

function isProjectDelayed(project) {
  if (!project || project.category === "general" || project.closed || project.phase === "closed") return false;
  const stage = getProjectStages(project.id).find((item) => (item.phaseId || getPhaseIdByLabel(item.name)) === project.phase);
  return Boolean(stage?.endDate && stage.endDate < todayString());
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

function compareManualThenName(a, b) {
  const orderDiff = (Number(a.sortOrder) || 0) - (Number(b.sortOrder) || 0);
  if (orderDiff) return orderDiff;
  return String(a.name || a.title || "").localeCompare(String(b.name || b.title || ""), "zh-Hant");
}

function getNextSortOrder(items = []) {
  return Math.max(0, ...items.map((item) => Number(item.sortOrder) || 0)) + 1;
}

function getTaskSortScopeItems(scopeValues = {}) {
  const scope = scopeValues.scope || getTaskScope(scopeValues);
  return getUniqueTasksForDisplay(state.tasks).filter((task) => {
    if (isTaskDeleted(task)) return false;
    if (getTaskScope(task) !== scope) return false;
    if (scope === "project") return task.projectId === scopeValues.projectId;
    if (scope === "system") return task.systemId === scopeValues.systemId;
    return scope === "general";
  });
}

function getTaskSortDate(task) {
  return [task.executionDate, task.deadline]
    .filter(Boolean)
    .sort()[0] || "9999-12-31";
}

function getTaskTimelineStart(task = {}) {
  return getTaskTimelineStartFromTasks(task, state.tasks);
}

function getTaskTimelineStartFromTasks(task = {}, tasks = state.tasks) {
  return getTaskDirectTimelineStart(task) || getTaskChildTimelineStart(task, tasks);
}

function getTaskDirectTimelineStart(task = {}) {
  return [task.executionDate, task.startDate, task.rangeStart, task.deadline]
    .filter(Boolean)
    .sort()[0] || "";
}

function getTaskTimelineEnd(task = {}) {
  return getTaskTimelineEndFromTasks(task, state.tasks);
}

function getTaskTimelineEndFromTasks(task = {}, tasks = state.tasks) {
  return getTaskDirectTimelineEnd(task) || getTaskChildTimelineEnd(task, tasks);
}

function getTaskDirectTimelineEnd(task = {}) {
  const dates = [task.endDate, task.rangeEnd, task.deadline, task.executionDate, task.startDate, task.rangeStart]
    .filter(Boolean)
    .sort();
  return dates[dates.length - 1] || "";
}

function getTaskChildTimelineStart(task = {}, tasks = state.tasks) {
  if (!task.id || !Array.isArray(tasks)) return "";
  return getEarliestDate(tasks
    .filter((child) => child.parentTaskId === task.id)
    .map(getTaskDirectTimelineStart)
    .filter(Boolean));
}

function getTaskChildTimelineEnd(task = {}, tasks = state.tasks) {
  if (!task.id || !Array.isArray(tasks)) return "";
  return getLatestDate(tasks
    .filter((child) => child.parentTaskId === task.id)
    .map(getTaskDirectTimelineEnd)
    .filter(Boolean));
}

function getEarliestDate(dates = []) {
  return dates.filter(Boolean).sort()[0] || "";
}

function getLatestDate(dates = []) {
  const sorted = dates.filter(Boolean).sort();
  return sorted[sorted.length - 1] || "";
}

function getRecurrenceAnchor(task = {}) {
  const rule = normalizeRecurrenceRule(task.recurrenceRule || {}, task);
  return rule.startDate || task.executionDate || task.startDate || task.rangeStart || "";
}

function taskRecursOnDate(task = {}, targetDate = "") {
  const rule = normalizeRecurrenceRule(task.recurrenceRule || {}, task);
  if (!isRecurringTemplateTask(task) || !rule.type || !rule.startDate || !targetDate || targetDate < rule.startDate) return false;
  if (rule.endMode === "date" && rule.endDate && targetDate > rule.endDate) return false;
  const matchesPattern = recurrencePatternMatchesDate(rule, targetDate);
  if (!matchesPattern) return false;
  if (rule.endMode !== "count" || !rule.occurrenceCount) return true;
  return getOccurrenceIndexOnDate(rule, targetDate) > 0 && getOccurrenceIndexOnDate(rule, targetDate) <= rule.occurrenceCount;
}

function getRecurringDatesInRange(task = {}, rangeStart = "", rangeEnd = "") {
  if (!isRecurringTemplateTask(task) || !rangeStart || !rangeEnd) return [];
  const dates = [];
  let cursor = parseDateString(rangeStart);
  const end = parseDateString(rangeEnd);
  while (cursor <= end) {
    const date = toDateInputValue(cursor);
    if (taskRecursOnDate(task, date)) dates.push(date);
    cursor = addDaysToDate(cursor, 1);
  }
  return dates;
}

function isRecurringTemplateTask(task = {}) {
  return Boolean(task?.isRecurringTemplate || (task?.isRecurring && !task?.isRecurringOccurrence));
}

function isRecurringOccurrenceTask(task = {}) {
  return Boolean(task?.isRecurringOccurrence);
}

function isVirtualRecurringOccurrenceTask(task = {}) {
  return Boolean(task?.isVirtualRecurringOccurrence);
}

function isTaskDeleted(task = {}) {
  return Boolean(task?.isDeleted);
}

function recurringTemplateCanGenerateOccurrences(task = {}) {
  const status = normalizeTaskStatus(task.status);
  return Boolean(
    isRecurringTemplateTask(task)
      && task.recurrenceEnabled === true
      && !isTaskDeleted(task)
      && status !== "done"
      && status !== "paused",
  );
}

function isTodoDisplayTask(task = {}) {
  return isActionableTodoTask(task);
}

function isProjectListTask(task = {}) {
  return isManagementCountTask(task);
}

function isManagementCountTask(task = {}) {
  return !isRecurringOccurrenceTask(task) && !isTaskDeleted(task);
}

function isActionableTodoTask(task = {}) {
  return !isRecurringTemplateTask(task) && !isTaskDeleted(task);
}

function getRecurringOccurrenceId(templateTaskId = "", occurrenceDate = "") {
  return `recurring_${templateTaskId}_${occurrenceDate}`;
}

function getRecurringOccurrenceDisplayIdentity(task = {}) {
  const templateTaskId = String(task.templateTaskId || "").trim();
  const occurrenceDate = String(task.occurrenceDate || task.executionDate || task.rangeStart || "").trim();
  return templateTaskId && occurrenceDate ? `recurring:${templateTaskId}:${occurrenceDate}` : "";
}

function getTaskDisplayIdentity(task = {}) {
  const recurringIdentity = isRecurringOccurrenceTask(task) ? getRecurringOccurrenceDisplayIdentity(task) : "";
  return recurringIdentity || (task.id ? `task:${task.id}` : "");
}

function getUniqueTasksForDisplay(tasks = []) {
  const rows = [];
  const indexesByIdentity = new Map();

  tasks.forEach((task) => {
    const identity = getTaskDisplayIdentity(task);
    if (!identity) {
      rows.push(task);
      return;
    }

    const existingIndex = indexesByIdentity.get(identity);
    if (existingIndex === undefined) {
      indexesByIdentity.set(identity, rows.length);
      rows.push(task);
      return;
    }

    const existing = rows[existingIndex];
    const preferred = choosePreferredTaskForDisplay(existing, task);
    if (preferred !== existing) rows[existingIndex] = preferred;
  });

  return rows;
}

function choosePreferredTaskForDisplay(existing = {}, candidate = {}) {
  if (isRecurringOccurrenceTask(existing) && isRecurringOccurrenceTask(candidate)) {
    return choosePreferredRecurringOccurrence(existing, candidate);
  }
  return existing;
}

function repairDuplicateRecurringOccurrences(tasks = []) {
  const rows = [];
  const indexesByIdentity = new Map();
  const removedIds = [];
  const updatedIds = [];

  tasks.forEach((task) => {
    const identity = getRecurringOccurrenceDisplayIdentity(task);
    if (!isRecurringOccurrenceTask(task) || !identity) {
      rows.push(task);
      return;
    }

    const existingIndex = indexesByIdentity.get(identity);
    if (existingIndex === undefined) {
      indexesByIdentity.set(identity, rows.length);
      rows.push(task);
      return;
    }

    const existing = rows[existingIndex];
    const merged = mergeRecurringOccurrenceDuplicates(existing, task);
    const keptSource = merged.id === task.id ? task : existing;
    const removedSource = merged.id === task.id ? existing : task;
    if (removedSource.id) removedIds.push(removedSource.id);
    if (merged.id && stableStringify(stripCloudMetadata(merged)) !== stableStringify(stripCloudMetadata(keptSource))) {
      updatedIds.push(merged.id);
    }
    rows[existingIndex] = merged;
  });

  const removedSet = new Set(removedIds);
  return {
    tasks: rows,
    removedIds: uniqueUids(removedIds),
    updatedIds: uniqueUids(updatedIds).filter((id) => !removedSet.has(id)),
  };
}

function mergeRecurringOccurrenceDuplicates(first = {}, second = {}) {
  const preferred = choosePreferredRecurringOccurrence(first, second);
  const fallback = preferred === first ? second : first;
  const merged = { ...preferred };
  const doneSource = [preferred, fallback].find((task) => normalizeTaskStatus(task.status) === "done");

  if (doneSource) {
    merged.status = "done";
    merged.completedDate = doneSource.completedDate || merged.completedDate || doneSource.occurrenceDate || merged.occurrenceDate || "";
    merged.completedAt = doneSource.completedAt || merged.completedAt || null;
    merged.completedBy = doneSource.completedBy || merged.completedBy || "";
  } else if (!merged.completedDate && fallback.completedDate) {
    merged.completedDate = fallback.completedDate;
  }

  if ((!merged.history || !merged.history.length) && fallback.history?.length) merged.history = fallback.history;
  if ((!merged.notes || !String(merged.notes).trim()) && fallback.notes) merged.notes = fallback.notes;
  if ((!merged.steps || !merged.steps.length) && fallback.steps?.length) merged.steps = fallback.steps;
  return merged;
}

function choosePreferredRecurringOccurrence(first = {}, second = {}) {
  const firstScore = getRecurringOccurrencePreferenceScore(first);
  const secondScore = getRecurringOccurrencePreferenceScore(second);
  return secondScore > firstScore ? second : first;
}

function getRecurringOccurrencePreferenceScore(task = {}) {
  let score = 0;
  if (normalizeTaskStatus(task.status) === "done") score += 1000;
  if (!isTaskDeleted(task)) score += 500;
  if (task.completedDate) score += 100;
  if (task.id && task.id === getRecurringOccurrenceId(task.templateTaskId, task.occurrenceDate)) score += 10;
  if (Array.isArray(task.history)) score += Math.min(task.history.length, 9);
  if (String(task.notes || "").trim()) score += 1;
  return score;
}

function consumePendingRecurringOccurrenceCleanupTaskIds() {
  const taskIds = uniqueUids([
    ...pendingRecurringOccurrenceCleanupTaskIds,
    ...pendingRecurringOccurrenceUpdateTaskIds,
  ]);
  pendingRecurringOccurrenceCleanupTaskIds = [];
  pendingRecurringOccurrenceUpdateTaskIds = [];
  return taskIds;
}

function getSafeOccurrenceRange(rangeStart = "", rangeEnd = "", maxDays = 370) {
  if (!rangeStart || !rangeEnd) return null;
  const start = rangeStart <= rangeEnd ? rangeStart : rangeEnd;
  let end = rangeStart <= rangeEnd ? rangeEnd : rangeStart;
  if (getDateDiffFromStrings(start, end) > maxDays) {
    end = addDaysToDateString(start, maxDays);
  }
  return { start, end };
}

function calculateOccurrenceDueDate(occurrenceDate = "", dueRule = {}) {
  const rule = normalizeDueRule(dueRule);
  if (!occurrenceDate || rule.type === "manual") return "";
  if (rule.type === "afterDays") return addDaysToDateString(occurrenceDate, rule.daysAfterOccurrence);
  return occurrenceDate;
}

function getPersistedRecurringOccurrence(templateTaskId = "", occurrenceDate = "") {
  if (!templateTaskId || !occurrenceDate) return null;
  return state.tasks.find((task) => {
    return isRecurringOccurrenceTask(task)
      && task.templateTaskId === templateTaskId
      && task.occurrenceDate === occurrenceDate
      && !isTaskDeleted(task);
  }) || null;
}

function recurringOccurrenceExists(templateTaskId = "", occurrenceDate = "") {
  if (!templateTaskId || !occurrenceDate) return false;
  return state.tasks.some((task) => {
    return isRecurringOccurrenceTask(task)
      && task.templateTaskId === templateTaskId
      && task.occurrenceDate === occurrenceDate;
  });
}

function cloneOccurrenceSteps(steps = [], occurrenceId = "") {
  return normalizeTaskSteps(steps).map((step) => ({
    ...step,
    id: occurrenceId ? `${occurrenceId}_step_${step.id}` : createId(),
    completed: false,
  }));
}

function buildRecurringOccurrence(template = {}, occurrenceDate = "") {
  const rule = normalizeRecurrenceRule(template.recurrenceRule || {}, template);
  const dueRule = normalizeDueRule(template.dueRule);
  const dueDate = calculateOccurrenceDueDate(occurrenceDate, dueRule);
  const occurrenceId = getRecurringOccurrenceId(template.id, occurrenceDate);
  return {
    ...template,
    id: occurrenceId,
    isRecurring: false,
    recurrenceEnabled: false,
    isRecurringTemplate: false,
    isRecurringOccurrence: true,
    templateTaskId: template.id,
    occurrenceDate,
    recurringLabel: getRecurrenceLabel(template),
    recurrenceType: "",
    recurrenceRule: {},
    completedOccurrences: [],
    status: "not_started",
    completedDate: "",
    completedAt: null,
    completedBy: null,
    isDeleted: false,
    deletedAt: "",
    deletedBy: "",
    deletedReason: "",
    templateDeleted: false,
    templateDeletedAt: "",
    startDate: occurrenceDate,
    endDate: occurrenceDate,
    rangeStart: occurrenceDate,
    rangeEnd: occurrenceDate,
    executionDate: occurrenceDate,
    executionStartDate: occurrenceDate,
    executionEndDate: occurrenceDate,
    dueDate,
    deadline: dueDate,
    startTime: rule.startTime || "",
    endTime: rule.endTime || "",
    durationMinutes: rule.durationMinutes || getTimeDurationMinutes(rule.startTime, rule.endTime),
    dueRule,
    steps: cloneOccurrenceSteps(template.steps || [], occurrenceId),
    history: [],
    notes: "",
    sortOrder: Number(template.sortOrder) || 0,
  };
}

function getVirtualRecurringOccurrencesForRange(template = {}, rangeStart = "", rangeEnd = "") {
  if (!isRecurringTemplateTask(template) || !rangeStart || !rangeEnd) return [];
  const rule = normalizeRecurrenceRule(template.recurrenceRule || {}, template);
  if (!rule.type || !recurringTemplateCanGenerateOccurrences(template)) return [];
  return getRecurringDatesInRange(template, rangeStart, rangeEnd)
    .filter((date) => !recurringOccurrenceExists(template.id, date))
    .map((date) => ({
      ...buildRecurringOccurrence(template, date),
      isVirtualRecurringOccurrence: true,
    }));
}

function materializeRecurringOccurrence(templateTaskId = "", occurrenceDate = "", options = {}) {
  const existingOccurrence = getPersistedRecurringOccurrence(templateTaskId, occurrenceDate);
  if (existingOccurrence) return existingOccurrence;

  const template = getProjectTask(templateTaskId);
  if (!isRecurringTemplateTask(template) || !occurrenceDate) return null;
  const rule = normalizeRecurrenceRule(template.recurrenceRule || {}, template);
  if (!rule.type || !recurringTemplateCanGenerateOccurrences(template) || !taskRecursOnDate(template, occurrenceDate)) return null;

  const saveIds = [];
  let sourceTemplate = template;
  if (template.status === "not_started" && rule.startDate && rule.startDate <= occurrenceDate) {
    sourceTemplate = { ...template, status: "doing" };
    state.tasks = state.tasks.map((task) => (task.id === template.id ? sourceTemplate : task));
    saveIds.push(sourceTemplate.id);
  }

  const occurrence = buildRecurringOccurrence(sourceTemplate, occurrenceDate);
  state.tasks = [occurrence, ...state.tasks];
  saveIds.push(occurrence.id);
  if (options.save !== false) saveTaskState(saveIds);
  return occurrence;
}

function ensureRecurringOccurrencesForRange(rangeStart = "", rangeEnd = "", options = {}) {
  const range = getSafeOccurrenceRange(rangeStart, rangeEnd, options.maxDays || 370);
  if (!range) return [];

  const recurrenceRepair = repairDuplicateRecurringOccurrences(state.tasks);
  const repairedTaskIds = uniqueUids([...recurrenceRepair.removedIds, ...recurrenceRepair.updatedIds]);
  if (repairedTaskIds.length) state.tasks = recurrenceRepair.tasks;

  const newOccurrences = [];
  const updatedTemplateIds = [];
  const existingIds = new Set(state.tasks.map((task) => task.id));
  const existingOccurrenceKeys = new Set(
    state.tasks
      .filter(isRecurringOccurrenceTask)
      .map((task) => `${task.templateTaskId || ""}|${task.occurrenceDate || ""}`),
  );

  state.tasks = state.tasks.map((task) => {
    if (!isRecurringTemplateTask(task)) return task;
    const rule = normalizeRecurrenceRule(task.recurrenceRule || {}, task);
    if (!rule.type || !recurringTemplateCanGenerateOccurrences(task)) return task;
    if (task.status === "not_started" && rule.startDate && rule.startDate > range.end) return task;

    const nextTemplate = task.status === "not_started" && rule.startDate && rule.startDate <= range.end
      ? { ...task, status: "doing" }
      : task;
    if (nextTemplate !== task) updatedTemplateIds.push(nextTemplate.id);

    getRecurringDatesInRange(nextTemplate, range.start, range.end).forEach((occurrenceDate) => {
      const occurrenceId = getRecurringOccurrenceId(nextTemplate.id, occurrenceDate);
      const occurrenceKey = `${nextTemplate.id}|${occurrenceDate}`;
      if (existingIds.has(occurrenceId) || existingOccurrenceKeys.has(occurrenceKey)) return;
      const occurrence = buildRecurringOccurrence(nextTemplate, occurrenceDate);
      newOccurrences.push(occurrence);
      existingIds.add(occurrenceId);
      existingOccurrenceKeys.add(occurrenceKey);
    });

    return nextTemplate;
  });

  if (newOccurrences.length) {
    state.tasks = [...newOccurrences, ...state.tasks];
  }

  const saveIds = uniqueUids([...repairedTaskIds, ...updatedTemplateIds, ...newOccurrences.map((task) => task.id)]);
  if (saveIds.length && options.save !== false) saveTaskState(saveIds);
  return newOccurrences;
}

function migrateLegacyCompletedOccurrences(tasks = []) {
  const existingIds = new Set(tasks.map((task) => task.id));
  const existingOccurrenceKeys = new Set(
    tasks
      .filter(isRecurringOccurrenceTask)
      .map((task) => `${task.templateTaskId || ""}|${task.occurrenceDate || ""}`),
  );
  const migratedOccurrences = [];

  tasks.filter(isRecurringTemplateTask).forEach((template) => {
    (template.completedOccurrences || []).forEach((occurrenceDate) => {
      const occurrenceId = getRecurringOccurrenceId(template.id, occurrenceDate);
      const occurrenceKey = `${template.id}|${occurrenceDate}`;
      if (!occurrenceDate || existingIds.has(occurrenceId) || existingOccurrenceKeys.has(occurrenceKey)) return;
      migratedOccurrences.push({
        ...buildRecurringOccurrence(template, occurrenceDate),
        status: "done",
        completedDate: occurrenceDate,
        completedAt: template.completedAt || null,
        completedBy: template.completedBy || template.ownerUid || template.owner || "",
        templateDeleted: isTaskDeleted(template),
        templateDeletedAt: isTaskDeleted(template) ? template.deletedAt || "" : "",
      });
      existingIds.add(occurrenceId);
      existingOccurrenceKeys.add(occurrenceKey);
    });
  });

  return migratedOccurrences.length ? [...migratedOccurrences, ...tasks] : tasks;
}

function taskMatchesDate(task, targetDate) {
  if (isRecurringTemplateTask(task)) return false;
  return task.executionDate === targetDate;
}

function taskMatchesRange(task, rangeStart, rangeEnd) {
  if (isRecurringTemplateTask(task)) return false;
  return task.executionDate && task.executionDate >= rangeStart && task.executionDate <= rangeEnd;
}

function recurrencePatternMatchesDate(rule = {}, targetDate = "") {
  const interval = rule.interval || 1;
  const anchor = parseDateString(rule.startDate);
  const target = parseDateString(targetDate);
  if (rule.type === "daily") {
    if (rule.dailyMode === "weekday") return isWorkday(target);
    return getDayDiff(anchor, target) % interval === 0;
  }
  if (rule.type === "weekly") {
    const weekDiff = Math.floor(getDayDiff(getStartOfWeek(anchor), getStartOfWeek(target)) / 7);
    return weekDiff >= 0 && weekDiff % interval === 0 && (rule.weekDays || []).includes(target.getDay());
  }
  if (rule.type === "monthly") {
    const monthDiff = getMonthDiff(anchor, target);
    if (monthDiff < 0 || monthDiff % interval !== 0) return false;
    if (rule.monthlyMode === "nthWeekday") return dateMatchesNthWeekday(target, rule.weekOrder, rule.weekday);
    return target.getDate() === Number(rule.monthDay);
  }
  if (rule.type === "yearly") {
    const yearDiff = target.getFullYear() - anchor.getFullYear();
    if (yearDiff < 0 || yearDiff % interval !== 0 || target.getMonth() + 1 !== Number(rule.yearlyMonth)) return false;
    if (rule.yearlyMode === "nthWeekday") return dateMatchesNthWeekday(target, rule.weekOrder, rule.weekday);
    return target.getDate() === Number(rule.yearlyDay);
  }
  return false;
}

function isWorkday(date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

function dateMatchesNthWeekday(date, weekOrder, weekday) {
  if (date.getDay() !== Number(weekday)) return false;
  if (Number(weekOrder) === -1) {
    return addDaysToDate(date, 7).getMonth() !== date.getMonth();
  }
  return Math.floor((date.getDate() - 1) / 7) + 1 === Number(weekOrder);
}

function getOccurrenceIndexOnDate(rule = {}, targetDate = "") {
  let count = 0;
  let cursor = parseDateString(rule.startDate);
  const end = parseDateString(targetDate);
  while (cursor <= end) {
    const date = toDateInputValue(cursor);
    if (recurrencePatternMatchesDate(rule, date)) count += 1;
    if (date === targetDate) return count;
    cursor = addDaysToDate(cursor, 1);
  }
  return 0;
}

function getMonthDiff(start, end) {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
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
