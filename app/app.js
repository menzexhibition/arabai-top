const packages = [
  { id: "sa_starter_10", label: "Saudi Starter", priceAmount: 10, currency: "SAR", credits: 100, maxProviderCostAmount: 5, enabled: false },
  { id: "usd_starter_5", label: "USD Starter", priceAmount: 5, currency: "USD", credits: 185, maxProviderCostAmount: 2.5, enabled: false },
  { id: "sa_regular_25", label: "Saudi Regular", priceAmount: 25, currency: "SAR", credits: 250, maxProviderCostAmount: 12.5, enabled: false },
  { id: "usd_regular_10", label: "USD Regular", priceAmount: 10, currency: "USD", credits: 370, maxProviderCostAmount: 5, enabled: false },
  { id: "sa_creative_50", label: "Saudi Creative", priceAmount: 50, currency: "SAR", credits: 500, maxProviderCostAmount: 25, enabled: false },
  { id: "usd_creative_20", label: "USD Creative", priceAmount: 20, currency: "USD", credits: 740, maxProviderCostAmount: 10, enabled: false }
];

const pricingRules = [
  { id: "premium_short_chat", taskType: "chat", label: "Premium short chat", minCredits: 2, maxCredits: 2, costLevel: "low", freeCreditsAllowed: true, requiresConfirmation: false },
  { id: "prompt_improvement", taskType: "prompt", label: "Prompt improvement", minCredits: 2, maxCredits: 2, costLevel: "low", freeCreditsAllowed: true, requiresConfirmation: false },
  { id: "premium_long_answer", taskType: "chat", label: "Premium long answer", minCredits: 5, maxCredits: 5, costLevel: "medium", freeCreditsAllowed: true, requiresConfirmation: true },
  { id: "long_document_summary", taskType: "document", label: "Long document summary", minCredits: 10, maxCredits: 20, costLevel: "medium", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "table_file_analysis", taskType: "document", label: "Table/file analysis", minCredits: 10, maxCredits: 20, costLevel: "medium", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "image_prompt_review", taskType: "image", label: "Image prompt and review", minCredits: 3, maxCredits: 3, costLevel: "low", freeCreditsAllowed: true, requiresConfirmation: false },
  { id: "image_generation_low", taskType: "image", label: "Low-tier image generation", minCredits: 20, maxCredits: 40, costLevel: "medium", freeCreditsAllowed: true, requiresConfirmation: true, freeCreditDailyCap: 1 },
  { id: "image_generation_high", taskType: "image", label: "High-tier image generation", minCredits: 50, maxCredits: 80, costLevel: "high", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "image_edit", taskType: "image", label: "Image edit", minCredits: 40, maxCredits: 80, costLevel: "high", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "ppt_outline", taskType: "slides", label: "PPT outline", minCredits: 8, maxCredits: 15, costLevel: "medium", freeCreditsAllowed: true, requiresConfirmation: true },
  { id: "ppt_first_draft", taskType: "slides", label: "PPT first draft", minCredits: 30, maxCredits: 60, costLevel: "medium", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "video_script", taskType: "video", label: "Video script", minCredits: 8, maxCredits: 15, costLevel: "medium", freeCreditsAllowed: true, requiresConfirmation: true },
  { id: "storyboard_text", taskType: "video", label: "9-grid storyboard text", minCredits: 15, maxCredits: 25, costLevel: "medium", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "storyboard_images", taskType: "video", label: "9-grid storyboard images", minCredits: 120, maxCredits: 250, costLevel: "high", freeCreditsAllowed: false, requiresConfirmation: true },
  { id: "video_generation_short", taskType: "video", label: "Short video generation", minCredits: 0, maxCredits: 0, costLevel: "manual", freeCreditsAllowed: false, requiresConfirmation: true, enabled: false, comingSoon: true },
  { id: "music_generation", taskType: "music", label: "Music generation", minCredits: 30, maxCredits: 80, costLevel: "high", freeCreditsAllowed: false, requiresConfirmation: true }
];

const launchTaskRuleIds = ["premium_short_chat", "prompt_improvement", "premium_long_answer", "image_prompt_review"];

function createWallet(initialCredits = 0) {
  return {
    creditBalance: initialCredits,
    pendingCreditBalance: 0,
    redeemableCreditBalance: initialCredits,
    reservedCreditBalance: 0,
    transactions: []
  };
}

function reserveCredits(wallet, taskId, credits) {
  requirePositiveCredits(credits);
  if (wallet.redeemableCreditBalance < credits) {
    throw new Error("Not enough redeemable credits.");
  }

  wallet.redeemableCreditBalance -= credits;
  wallet.reservedCreditBalance += credits;
  wallet.transactions.push({
    type: "reserve",
    taskId,
    credits,
    status: "reserved",
    createdAt: new Date().toISOString()
  });
  return wallet;
}

function estimateTaskCredits(input) {
  const rule = getPricingRule(input.pricingRuleId);

  if (rule.enabled === false || rule.comingSoon) {
    return {
      pricingRuleId: rule.id,
      taskType: rule.taskType,
      estimatedCredits: null,
      costLevel: rule.costLevel,
      requiresConfirmation: true,
      freeCreditsAllowed: false,
      available: false,
      message: `${rule.label} is coming soon.`
    };
  }

  const complexity = estimateComplexity(input);
  const estimatedCredits = clamp(
    Math.ceil(rule.minCredits + (rule.maxCredits - rule.minCredits) * complexity),
    rule.minCredits,
    rule.maxCredits
  );

  return {
    pricingRuleId: rule.id,
    taskType: rule.taskType,
    estimatedCredits,
    costLevel: rule.costLevel,
    requiresConfirmation: rule.requiresConfirmation,
    freeCreditsAllowed: rule.freeCreditsAllowed,
    available: true,
    message: buildEstimateMessage(rule, estimatedCredits)
  };
}

function getPricingRule(pricingRuleId) {
  const rule = pricingRules.find((item) => item.id === pricingRuleId);
  if (!rule) {
    throw new Error(`Unknown pricing rule: ${pricingRuleId}`);
  }
  return rule;
}

function estimateComplexity(input) {
  const promptLength = typeof input.prompt === "string" ? input.prompt.length : 0;
  const fileCount = Number(input.options?.fileCount || 0);
  const count = Number(input.options?.count || 1);
  const quality = input.options?.quality;

  let score = 0;
  if (promptLength > 800) score += 0.25;
  if (promptLength > 2000) score += 0.25;
  if (fileCount > 0) score += 0.25;
  if (count > 1) score += 0.2;
  if (quality === "high") score += 0.3;

  return clamp(score, 0, 1);
}

function buildEstimateMessage(rule, estimatedCredits) {
  if (rule.costLevel === "low") {
    return `This paid AI task may use about ${estimatedCredits} credits.`;
  }
  if (rule.costLevel === "medium") {
    return `This task may use about ${estimatedCredits} credits. Please confirm before running.`;
  }
  if (rule.costLevel === "high") {
    return `This is a high-cost paid AI task and may use about ${estimatedCredits} credits.`;
  }
  return "This task needs manual pricing or is coming soon.";
}

function requirePositiveCredits(credits) {
  if (typeof credits !== "number" || credits <= 0) {
    throw new Error("Credits must be a positive number.");
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

const wallet = createWallet(5);
let apiMode = false;
let signedIn = false;
let currentUser = null;
let selectedTask = null;
let selectedEstimate = null;
let appFlags = {
  realRecharge: false,
  aiRedemption: false,
  requiresSignin: true,
  persisted: false
};
let healthState = {
  ok: false,
  mode: "offline",
  features: {
    recharge: false,
    aiRedemption: false,
    realGateway: false
  }
};
let localTaskHistory = [];

const signupForm = document.querySelector("#signupForm");
const signupMessage = document.querySelector("#signupMessage");
const packageGrid = document.querySelector("#packageGrid");
const modelMarketplaceGrid = document.querySelector("#modelMarketplaceGrid");
const taskGrid = document.querySelector("#taskGrid");
const operationSelect = document.querySelector("#operationSelect");
const operationHelp = document.querySelector("#operationHelp");
const estimateTitle = document.querySelector("#estimateTitle");
const estimateMessage = document.querySelector("#estimateMessage");
const confirmButton = document.querySelector("#confirmButton");
const guideContent = document.querySelector("#guideContent");
const serviceMode = document.querySelector("#serviceMode");
const serviceNote = document.querySelector("#serviceNote");
const serviceFeatures = document.querySelector("#serviceFeatures");
const transactionList = document.querySelector("#transactionList");
const transactionSummary = document.querySelector("#transactionSummary");
const packageMessage = document.querySelector("#packageMessage");
const taskHistoryList = document.querySelector("#taskHistoryList");
const taskHistorySummary = document.querySelector("#taskHistorySummary");
const dailyRewardButton = document.querySelector("#dailyRewardButton");
const dailyRewardMessage = document.querySelector("#dailyRewardMessage");
const signOutButton = document.querySelector("#signOutButton");
const accountStatus = document.querySelector("#accountStatus");
const accountName = document.querySelector("#accountName");
const accountMeta = document.querySelector("#accountMeta");
const accountReferralCode = document.querySelector("#accountReferralCode");
const accountSignedState = document.querySelector("#accountSignedState");
const allowedTaskIds = [...launchTaskRuleIds];
let signupInFlight = false;
const signupSubmitButton = signupForm?.querySelector('button[type="submit"]');

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await handleSignupSubmit();
});

signupSubmitButton?.addEventListener("click", async (event) => {
  event.preventDefault();
  await handleSignupSubmit();
});

async function handleSignupSubmit() {
  if (signupInFlight) return;
  const formData = new FormData(signupForm);
  signupMessage.textContent = "تم التقاط الطلب من الواجهة. جارٍ إرسال التسجيل...";
  signupInFlight = true;
  if (signupSubmitButton) signupSubmitButton.disabled = true;
  signupMessage.textContent = "جارٍ إنشاء الحساب وحفظ رصيد البداية...";

  try {
    await signinWithApi({
      displayName: formData.get("displayName") || "مستخدم ARABAI",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      country: formData.get("country") || "SA",
      preferredLanguage: formData.get("preferredLanguage") || "ar",
      referralCode: formData.get("referralCode") || ""
    });
  } catch (error) {
    signupMessage.textContent = error instanceof Error ? error.message : "تعذر إكمال التسجيل الآن. حاول مرة أخرى بعد قليل.";
  } finally {
    signupInFlight = false;
    if (signupSubmitButton) signupSubmitButton.disabled = false;
  }
}

dailyRewardButton?.addEventListener("click", async () => {
  if (!signedIn) return;
  if (!apiMode) {
    dailyRewardMessage.textContent = "المكافأة اليومية تحتاج تشغيل الخادم، وليست جزءا من المعاينة المحلية فقط.";
    return;
  }

  try {
    const response = await fetch("/api/wallet/claim-daily-login", { method: "POST" });
    const data = await response.json();
    if (!response.ok || data.error) throw new Error(data.error?.message || "Reward blocked.");
    wallet.creditBalance = data.wallet.creditBalance;
    wallet.redeemableCreditBalance = data.wallet.redeemableCreditBalance;
    wallet.reservedCreditBalance = data.wallet.reservedCreditBalance;
    wallet.transactions = Array.isArray(data.wallet.transactions) ? data.wallet.transactions : wallet.transactions;
    dailyRewardMessage.textContent = `تمت إضافة ${data.credits} credits كمكافأة دخول اليوم.`;
    renderWallet();
    await refreshAccountViews();
  } catch (error) {
    dailyRewardMessage.textContent = error instanceof Error ? error.message : "تعذر إضافة المكافأة اليومية.";
  }
});

signOutButton?.addEventListener("click", async () => {
  if (apiMode) {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
    } catch {}
  }

  signedIn = false;
  currentUser = null;
  selectedTask = null;
  selectedEstimate = null;
  wallet.creditBalance = 0;
  wallet.redeemableCreditBalance = 0;
  wallet.reservedCreditBalance = 0;
  wallet.pendingCreditBalance = 0;
  wallet.transactions = [];
  localTaskHistory = [];
  signupMessage.textContent = "تم تسجيل الخروج. يمكنك التسجيل من جديد أو متابعة قراءة الدليل مجانا.";
  renderWallet();
  renderTransactionHistory(wallet.transactions);
  renderTaskHistory(localTaskHistory);
  renderAccountPanel();
  clearSelection();
});

confirmButton.addEventListener("click", async () => {
  if (!selectedTask || !selectedEstimate?.estimatedCredits) return;

  if (apiMode) {
    await confirmWithApi();
    return;
  }

  try {
    const demoTaskId = `demo-${Date.now()}`;
    reserveCredits(wallet, demoTaskId, selectedEstimate.estimatedCredits);
    localTaskHistory.unshift({
      id: demoTaskId,
      status: "reserved",
      taskType: pricingRules.find((rule) => rule.id === selectedTask)?.taskType || "chat",
      pricingRuleId: selectedTask,
      estimatedCredits: selectedEstimate.estimatedCredits,
      actualCredits: null,
      outputText: "هذه معاينة محلية. عند ربط الخادم الحقيقي ستظهر النتيجة الفعلية هنا.",
      createdAt: new Date().toISOString()
    });
    renderWallet();
    renderTransactionHistory(wallet.transactions);
    renderTaskHistory(localTaskHistory);
    estimateTitle.textContent = "تم حجز الرصيد لهذه المهمة";
    estimateMessage.textContent = "في التطبيق الحقيقي ستدخل المهمة الآن إلى التشغيل أو قائمة الانتظار.";
    confirmButton.disabled = true;
  } catch (error) {
    estimateTitle.textContent = "لا يوجد رصيد كاف";
    estimateMessage.textContent = error instanceof Error ? error.message : "حدث خطأ.";
  }
});

async function boot() {
  await detectBackend();

  renderServiceStatus();
  renderWallet();
  await renderPackages();
  renderModelMarketplace();
  renderOperationSelect();
  renderTasks();
  renderGuide(null);
  renderAccountPanel();
  await refreshAccountViews();
}

async function detectBackend() {
  if (isStaticPreviewHost()) return;

  const requests = await Promise.allSettled([fetchWithTimeout("/api/health"), fetchWithTimeout("/api/me")]);
  const [healthResponse, meResponse] = requests;

  if (healthResponse.status === "fulfilled" && healthResponse.value.ok) {
    apiMode = true;
    healthState = await healthResponse.value.json();
  }

  if (meResponse.status === "fulfilled" && meResponse.value.ok) {
    apiMode = true;
    const data = await meResponse.value.json();
    hydrateSession(data);
  }
}

async function signinWithApi(profile) {
  if (!profile.email && !profile.phone) {
    signupMessage.textContent = "أدخل بريدا إلكترونيا أو رقم جوال حتى نحفظ رصيدك.";
    return;
  }

  if (!apiMode) {
    signedIn = true;
    currentUser = { ...profile, registrationNumber: 58, referralCode: "arabai-demo" };
    wallet.creditBalance = 5;
    wallet.redeemableCreditBalance = 5;
    wallet.transactions = [
      {
        type: "signup_reward",
        status: "available",
        credits: 5,
        note: "رصيد تجربة أول تسجيل.",
        createdAt: new Date().toISOString()
      }
    ];
    signupMessage.textContent = "أنت المستخدم رقم 58 في ARABAI. تمت إضافة رصيد التجربة المجانية.";
    renderWallet();
    renderTransactionHistory(wallet.transactions);
    renderTaskHistory(localTaskHistory);
    renderAccountPanel();
    return;
  }

  const response = await fetchWithTimeout("/api/auth/verified-signin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(profile)
  });
  const data = await parseApiResponse(response, "تعذر إكمال التسجيل الآن.");
  if (data.error) {
    throw new Error(data.error.message || "تعذر إكمال التسجيل الآن.");
  }
  hydrateSession(data);
  signupMessage.textContent = arabicSigninMessage(data);
  renderWallet();
  renderTransactionHistory(wallet.transactions);
  renderAccountPanel();
  await syncCurrentSession();
  await refreshAccountViews();
}

function hydrateSession(data) {
  currentUser = data.user;
  signedIn = Boolean(data.user);
  appFlags = {
    ...appFlags,
    ...(data.flags || {})
  };
  wallet.creditBalance = data.wallet.creditBalance;
  wallet.redeemableCreditBalance = data.wallet.redeemableCreditBalance;
  wallet.reservedCreditBalance = data.wallet.reservedCreditBalance;
  wallet.pendingCreditBalance = data.wallet.pendingCreditBalance;
  wallet.transactions = Array.isArray(data.wallet.transactions) ? data.wallet.transactions : wallet.transactions;
  renderAccountPanel();
}

function renderAccountPanel() {
  if (!signedIn || !currentUser) {
    accountStatus.textContent = "عند التسجيل سيظهر هنا اسم المستخدم، كود الدعوة، وأزرار المكافآت والخروج.";
    accountName.textContent = "زائر";
    accountMeta.textContent = "المقالات مفتوحة للجميع، لكن تشغيل AI يحتاج حسابا.";
    accountReferralCode.textContent = "-";
    accountSignedState.textContent = "غير مسجل";
    if (dailyRewardButton) dailyRewardButton.disabled = true;
    if (signOutButton) signOutButton.disabled = true;
    if (dailyRewardMessage) dailyRewardMessage.textContent = "بعد التسجيل يمكنك المطالبة بمكافأة الدخول اليومية مرة واحدة كل يوم.";
    return;
  }

  accountStatus.textContent = "حسابك جاهز الآن للتجربة المجانية والمهام منخفضة التكلفة.";
  accountName.textContent = currentUser.displayName || currentUser.email || "مستخدم ARABAI";
  accountMeta.textContent = `المستخدم رقم #${currentUser.registrationNumber || "-"}. البلد: ${currentUser.country || "SA"}.`;
  accountReferralCode.textContent = currentUser.referralCode || "-";
  accountSignedState.textContent = "مسجل";
  if (dailyRewardButton) dailyRewardButton.disabled = false;
  if (signOutButton) signOutButton.disabled = false;
}

function renderWallet() {
  document.querySelector("#registrationNumber").textContent = currentUser?.registrationNumber
    ? `#${currentUser.registrationNumber}`
    : "-";
  document.querySelector("#creditBalance").textContent = wallet.creditBalance.toFixed(0);
  document.querySelector("#redeemableBalance").textContent = wallet.redeemableCreditBalance.toFixed(0);
  document.querySelector("#reservedBalance").textContent = wallet.reservedCreditBalance.toFixed(0);
}

async function renderPackages() {
  let visiblePackages = packages;
  if (apiMode) {
    try {
      const response = await fetch("/api/wallet/packages");
      const data = await response.json();
      visiblePackages = data.packages || packages;
    } catch {
      visiblePackages = packages;
    }
  }

  packageGrid.innerHTML = visiblePackages
    .slice(0, 4)
    .map(
      (item) => {
        const available = item.status === "available";
        const sandbox = item.provider === "virtual" || item.mode === "sandbox";
        const description = sandbox
          ? "دفع تجريبي فقط. لن يتم خصم أي مبلغ حقيقي، وسيضاف الرصيد لاختبار مسار المحفظة."
          : available
            ? "يتم الدفع عبر Lemon Squeezy، ثم يضاف الرصيد تلقائيا بعد تأكيد الدفع."
            : "Coming Soon - التكلفة الحقيقية للـ API لا تتجاوز تقريبا 50% من قيمة الباقة.";
        return `
        <article>
          <span>${item.currency}</span>
          <h3>${formatPrice(item)}</h3>
          <p>${item.credits} credits</p>
          <p>${description}</p>
          <button type="button" data-package-id="${item.id}">${sandbox ? "اختبر الشحن" : available ? "اشحن الآن" : "اطلب هذه الباقة"}</button>
        </article>
      `;
      }
    )
    .join("");

  packageGrid.querySelectorAll("button[data-package-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      await handleTopUpClick(button.dataset.packageId);
    });
  });

}

function renderModelMarketplace() {
  if (!modelMarketplaceGrid) return;
  modelMarketplaceGrid.innerHTML = operationGroups
    .map((group) => {
      const rules = pricingRules.filter((rule) => group.tasks.includes(rule.id));
      const availableRules = rules.filter((rule) => allowedTaskIds.includes(rule.id) && rule.enabled !== false && !rule.comingSoon);
      const creditValues = availableRules.flatMap((rule) => [rule.minCredits, rule.maxCredits]).filter((value) => Number.isFinite(value));
      const minCredit = creditValues.length ? Math.min(...creditValues) : null;
      const maxCredit = creditValues.length ? Math.max(...creditValues) : null;
      const creditLabel = minCredit === null ? "قريبا" : minCredit === maxCredit ? `${minCredit} credits` : `${minCredit}-${maxCredit} credits`;
      return `
        <article data-operation-id="${group.id}">
          <span>${group.modelRoute}</span>
          <h3>${group.label}</h3>
          <p>${group.description}</p>
          <div class="model-meta">
            <strong>${availableRules.length} مهام متاحة</strong>
            <span>${creditLabel}</span>
          </div>
        </article>
      `;
    })
    .join("");

  modelMarketplaceGrid.querySelectorAll("article[data-operation-id]").forEach((card) => {
    card.addEventListener("click", () => {
      if (!operationSelect) return;
      operationSelect.value = card.dataset.operationId || "";
      operationSelect.dispatchEvent(new Event("change"));
      document.querySelector("#use-ai")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderTasks() {
  const visibleRules = operationGroups.flatMap((group) => group.tasks);

  taskGrid.innerHTML = getVisibleRules(visibleRules)
    .map(
      (rule) => `
        <article data-rule-id="${rule.id}">
          <span>${translateCost(rule.costLevel)}</span>
          <h3>${translateTask(rule.id)}</h3>
          <p>${rule.minCredits === rule.maxCredits ? rule.minCredits : `${rule.minCredits}-${rule.maxCredits}`} credits</p>
          <p>${rule.freeCreditsAllowed ? "يمكن استخدام الرصيد المجاني ضمن الحدود." : "يتطلب رصيدا مدفوعا غالبا."}</p>
        </article>
      `
    )
    .join("");

  taskGrid.querySelectorAll("article").forEach((card) => {
    card.addEventListener("click", async () => {
      taskGrid.querySelectorAll("article").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      selectedTask = card.dataset.ruleId;
      const requestBody = selectedTaskRequest();
      selectedEstimate = apiMode ? await estimateWithApi(requestBody) : estimateTaskCredits(requestBody);
      renderEstimate();
      renderGuide(selectedTask);
    });
  });
}

function renderOperationSelect() {
  operationSelect.innerHTML = [
    `<option value="">اختر العملية</option>`,
    ...operationGroups.map((group) => `<option value="${group.id}">${group.label}</option>`)
  ].join("");

  operationSelect.addEventListener("change", () => {
    clearSelection();
    renderTasks();
    const group = operationGroups.find((item) => item.id === operationSelect.value);
    operationHelp.textContent = group
      ? `${group.description} يستخدم ARABAI نموذجا واحدا مناسبا لهذه العملية في الخلفية.`
      : "كل عملية تستخدم نموذجا واحدا مناسبا في الخلفية حتى لا يحتار المستخدم.";
  });
}

function getVisibleRules(allTaskIds) {
  const selectedGroup = operationGroups.find((group) => group.id === operationSelect.value);
  const taskIds = selectedGroup ? selectedGroup.tasks : allTaskIds;
  return pricingRules.filter((rule) => taskIds.includes(rule.id) && allowedTaskIds.includes(rule.id));
}

function clearSelection() {
  selectedTask = null;
  selectedEstimate = null;
  estimateTitle.textContent = "اختر مهمة أولا";
  estimateMessage.textContent = "سيظهر هنا عدد credits المتوقع قبل تشغيل المهمة.";
  confirmButton.disabled = true;
  renderGuide(null);
}

async function estimateWithApi(requestBody) {
  const response = await fetchWithTimeout("/api/tasks/estimate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  return parseApiResponse(response, "تعذر حساب التكلفة المتوقعة الآن.");
}

async function confirmWithApi() {
  if (!signedIn) {
    estimateTitle.textContent = "سجل أولا";
    estimateMessage.textContent = "تشغيل AI يحتاج حسابا حتى نحفظ الرصيد والنتيجة وسجل الاستخدام.";
    return;
  }

  try {
    const response = await fetchWithTimeout("/api/tasks/confirm", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(selectedTaskRequest())
    });
    const data = await response.json();
    if (!response.ok || data.error) {
      throw new Error(data.error?.message || "Task failed.");
    }
    wallet.creditBalance = data.wallet.creditBalance;
    wallet.redeemableCreditBalance = data.wallet.redeemableCreditBalance;
    wallet.reservedCreditBalance = data.wallet.reservedCreditBalance;
    wallet.pendingCreditBalance = data.wallet.pendingCreditBalance;
    wallet.transactions = Array.isArray(data.wallet.transactions) ? data.wallet.transactions : wallet.transactions;
    renderWallet();
    estimateTitle.textContent = "تم تشغيل المهمة التجريبية";
    estimateMessage.textContent = data.outputText || "اكتملت المهمة التجريبية.";
    confirmButton.disabled = true;
    await refreshAccountViews();
  } catch (error) {
    estimateTitle.textContent = "تعذر تشغيل المهمة";
    estimateMessage.textContent = error instanceof Error ? error.message : "حدث خطأ.";
  }
}

function arabicSigninMessage(data) {
  if (!data.user?.registrationNumber) return "تم تسجيل الدخول.";
  return `أنت المستخدم رقم ${data.user.registrationNumber} في ARABAI. تمت إضافة 5 credits لتجربة المهام الصغيرة.`;
}

function selectedTaskRequest() {
  const guide = taskGuides[selectedTask];
  const operation = operationGroups.find((group) => group.tasks.includes(selectedTask));
  return {
    pricingRuleId: selectedTask,
    taskType: pricingRules.find((rule) => rule.id === selectedTask).taskType,
    prompt: guide?.copyPrompt || "Demo prompt for ARABAI app prototype.",
    options: {
      quality: selectedTask.includes("image") ? "standard" : "normal",
      modelRoute: operation?.modelRoute
    }
  };
}

function renderEstimate() {
  if (!selectedEstimate.available) {
    estimateTitle.textContent = "هذه المهمة قادمة لاحقا";
    estimateMessage.textContent = selectedEstimate.message;
    confirmButton.disabled = true;
    return;
  }

  estimateTitle.textContent = `${selectedEstimate.estimatedCredits} credits`;
  estimateMessage.textContent = `${selectedEstimate.message} ${
    selectedEstimate.freeCreditsAllowed ? "يمكن استخدام الرصيد المجاني ضمن الحدود." : "هذه المهمة لا تستخدم الرصيد المجاني."
  }`;
  confirmButton.disabled = false;
}

function formatPrice(item) {
  if (item.currency === "USD") return `$${item.priceAmount}`;
  return `${item.priceAmount} SAR`;
}

async function handleTopUpClick(packageId) {
  if (!signedIn) {
    packageMessage.textContent = "سجل أولا حتى نربط أي شحن مستقبلي بحسابك ورصيدك.";
    return;
  }

  if (!apiMode) {
    packageMessage.textContent = "هذه نسخة عرض محلية. في النشر الحقيقي سيظهر هنا مسار الشحن عند فتح الدفع.";
    return;
  }

  try {
    packageMessage.textContent = "يتم تجهيز صفحة الدفع الآمنة...";
    const response = await fetchWithTimeout("/api/wallet/top-up/create-checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ packageId, currencyHint: currentUser?.country === "SA" ? "SAR" : "USD" })
    });
    const data = await response.json();
    if (!response.ok || data.error) {
      packageMessage.textContent = data.error?.message || "الشحن غير متاح حاليا.";
      return;
    }
    if (data.provider === "virtual" && data.checkoutId) {
      packageMessage.textContent = data.sandboxNoticeArabic || "دفع تجريبي فقط. لن يتم خصم أي مبلغ حقيقي.";
      const webhookResponse = await fetchWithTimeout("/api/wallet/top-up/webhook", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          provider: "virtual",
          event: "payment_succeeded",
          checkoutId: data.checkoutId
        })
      });
      const webhookData = await parseApiResponse(webhookResponse, "تعذر تأكيد الدفع التجريبي.");
      if (webhookData.wallet) {
        wallet.creditBalance = webhookData.wallet.creditBalance;
        wallet.redeemableCreditBalance = webhookData.wallet.redeemableCreditBalance;
        wallet.reservedCreditBalance = webhookData.wallet.reservedCreditBalance;
        wallet.transactions = Array.isArray(webhookData.wallet.transactions) ? webhookData.wallet.transactions : wallet.transactions;
        renderWallet();
        await refreshAccountViews();
      }
      packageMessage.textContent = `تمت إضافة ${webhookData.credited || 0} credits عبر دفع تجريبي آمن. لم يتم خصم أي مبلغ حقيقي.`;
      return;
    }
    if (data.checkoutUrl) {
      packageMessage.textContent = "سيتم فتح صفحة الدفع الآن.";
      window.location.assign(data.checkoutUrl);
      return;
    }
    packageMessage.textContent = "لم تصل صفحة الدفع من المزود. حاول مرة أخرى بعد قليل.";
  } catch {
    packageMessage.textContent = "تعذر الوصول إلى خدمة الشحن حاليا.";
  }
}

function isStaticPreviewHost() {
  const host = window.location.hostname;
  return host === "arabai.top" || host === "www.arabai.top" || host.endsWith(".github.io");
}

function renderServiceStatus() {
  const modeLabel = {
    demo: "وضع العرض التجريبي",
    supabase: "وضع الاتصال الفعلي",
    offline: "معاينة دون اتصال"
  }[healthState.mode] || "وضع العرض التجريبي";

  serviceMode.textContent = modeLabel;
  serviceNote.textContent = healthState.ok
    ? "يمكننا حفظ التسجيلات والسجل حسب حالة الخادم، لكن الدفع الحقيقي ما زال مغلقا."
    : "أنت تشاهد نسخة واجهة فقط. بعض الأزرار لن تتصل بخادم حي من هذا الملف المحلي.";

  const featureLines = [
    `حفظ الحساب: ${appFlags.persisted ? "مفعل" : healthState.mode === "demo" ? "تجريبي" : "غير متصل"}`,
    `الشحن: ${healthState.features.virtualSandbox ? "دفع تجريبي آمن" : healthState.features.recharge ? "مفتوح" : "مغلق حاليا"}`,
    `تشغيل AI المدفوع: ${healthState.features.aiRedemption ? "جاهز عند التفعيل" : "في وضع الإعداد"}`,
    `بوابة المزود: ${healthState.features.realGateway ? "مرتبطة فعليا" : "نسخة محاكاة آمنة"}`
  ];

  serviceFeatures.innerHTML = featureLines.map((line) => `<li>${line}</li>`).join("");
}

async function refreshAccountViews() {
  if (!signedIn) {
    renderTransactionHistory(wallet.transactions);
    renderTaskHistory(localTaskHistory);
    return;
  }

  if (!apiMode) {
    renderTransactionHistory(wallet.transactions);
    renderTaskHistory(localTaskHistory);
    return;
  }

  const [transactionsResult, tasksResult] = await Promise.allSettled([
    fetchWithTimeout("/api/wallet/transactions"),
    fetchWithTimeout("/api/tasks")
  ]);

  if (transactionsResult.status === "fulfilled" && transactionsResult.value.ok) {
    const data = await transactionsResult.value.json();
    wallet.transactions = Array.isArray(data.transactions) ? data.transactions : [];
  }

  if (tasksResult.status === "fulfilled" && tasksResult.value.ok) {
    const data = await tasksResult.value.json();
    localTaskHistory = Array.isArray(data.tasks) ? data.tasks : [];
  }

  renderTransactionHistory(wallet.transactions);
  renderTaskHistory(localTaskHistory);
  renderAccountPanel();
}

async function syncCurrentSession() {
  if (!apiMode) return;

  try {
    const response = await fetchWithTimeout("/api/me", {
      method: "GET",
      cache: "no-store"
    });
    const data = await parseApiResponse(response, "تعذر تحديث بيانات الحساب.");
    if (data?.user || data?.wallet) {
      hydrateSession(data);
      renderWallet();
      renderAccountPanel();
    }
  } catch (error) {
    console.warn("Failed to refresh ARABAI session after auth.", error);
  }
}

async function parseApiResponse(response, fallbackMessage) {
  let data = {};

  try {
    data = await response.json();
  } catch {
    throw new Error(fallbackMessage);
  }

  if (!response.ok) {
    throw new Error(data?.error?.message || fallbackMessage);
  }

  return data;
}

async function fetchWithTimeout(input, init = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("الخادم يتأخر الآن. يمكنك المتابعة في وضع العرض، أو المحاولة مرة أخرى بعد قليل.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

function renderTransactionHistory(transactions) {
  if (!transactions?.length) {
    transactionSummary.textContent = signedIn
      ? "لم يحدث أي صرف أو إضافة بعد. أول تجربة ستظهر هنا مباشرة."
      : "بعد التسجيل أو أول تجربة، ستظهر حركة الرصيد هنا.";
    transactionList.innerHTML = `<div class="history-empty">لا توجد حركة رصيد بعد.</div>`;
    return;
  }

  transactionSummary.textContent = `آخر ${Math.min(transactions.length, 6)} حركات مرتبطة بحسابك.`;
  transactionList.innerHTML = transactions
    .slice()
    .reverse()
    .slice(0, 6)
    .map(
      (item) => `
        <article class="history-item">
          <div class="history-item-meta">
            <span class="history-pill">${translateTransactionType(item.type)}</span>
            <span>${formatTransactionCredits(item)}</span>
            <span>${formatDate(item.createdAt)}</span>
          </div>
          <strong>${translateTransactionStatus(item.status)}</strong>
          <p>${item.note || transactionFallbackNote(item)}</p>
        </article>
      `
    )
    .join("");
}

function renderTaskHistory(tasks) {
  if (!tasks?.length) {
    taskHistorySummary.textContent = signedIn
      ? "اختر مهمة من الأعلى، وبعد التنفيذ سنعرض النتيجة هنا مع التكلفة."
      : "هذا السجل مفيد بعد التسجيل، لأنه يريك ما الذي جرّبته وما الذي نجح معك.";
    taskHistoryList.innerHTML = `<div class="history-empty">لا توجد مهام محفوظة بعد.</div>`;
    return;
  }

  taskHistorySummary.textContent = `آخر ${Math.min(tasks.length, 6)} مهام تم حفظها في حسابك.`;
  taskHistoryList.innerHTML = tasks
    .slice(0, 6)
    .map(
      (task) => `
        <article class="history-item">
          <div class="history-item-meta">
            <span class="history-pill">${translateTask(task.pricingRuleId)}</span>
            <span>${formatTaskCredits(task)}</span>
            <span>${formatDate(task.completedAt || task.createdAt)}</span>
          </div>
          <strong>${translateTaskStatus(task.status)}</strong>
          <p>${task.outputText || taskHistoryFallback(task)}</p>
        </article>
      `
    )
    .join("");
}

function translateTransactionType(type) {
  return {
    signup_reward: "هدية التسجيل",
    founding_user_reward: "هدية الإطلاق",
    reserve: "حجز مؤقت",
    spend: "استهلاك",
    release: "فرق راجع",
    refund: "استرجاع",
    referral_reward: "مكافأة دعوة"
  }[type] || "حركة رصيد";
}

function translateTransactionStatus(status) {
  return {
    available: "متاح للاستخدام",
    reserved: "محجوز لمهمة",
    spent: "تم استخدامه"
  }[status] || "تم التحديث";
}

function translateTaskStatus(status) {
  return {
    pending: "في الانتظار",
    reserved: "تم الحجز",
    completed: "اكتملت المهمة",
    failed: "لم تكتمل"
  }[status] || "تم التحديث";
}

function formatTransactionCredits(item) {
  const direction = item.type === "spend" || item.type === "reserve" ? "-" : "+";
  return `${direction}${Number(item.credits || 0)} credits`;
}

function formatTaskCredits(task) {
  const actual = Number(task.actualCredits ?? task.estimatedCredits ?? 0);
  return `${actual} credits`;
}

function formatDate(value) {
  if (!value) return "الآن";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "الآن";
  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function transactionFallbackNote(item) {
  if (item.type === "reserve") return "تم حجز هذا الجزء من الرصيد بانتظار تشغيل المهمة.";
  if (item.type === "spend") return "تم خصم هذا الرصيد بعد اكتمال المهمة.";
  if (item.type === "release") return "هذا الجزء عاد إلى رصيدك لأن الاستهلاك الفعلي كان أقل.";
  if (item.type === "refund") return "تمت إعادة الرصيد بسبب فشل المهمة أو إلغائها.";
  return "تم تحديث رصيد الحساب.";
}

function taskHistoryFallback(task) {
  const names = {
    chat: "تم تشغيل مهمة نصية.",
    prompt: "تم تحسين برومبت لهذه المهمة.",
    image: "تم إرسال مهمة مرتبطة بالصور.",
    slides: "تم تجهيز مهمة عرض أو خطة.",
    video: "تم تجهيز مهمة فيديو."
  };
  return names[task.taskType] || "تم حفظ هذه المهمة في السجل.";
}

function translateCost(level) {
  return {
    low: "تكلفة منخفضة",
    medium: "تكلفة متوسطة",
    high: "تكلفة مرتفعة",
    manual: "تسعير يدوي"
  }[level] || level;
}

function translateTask(id) {
  return {
    premium_short_chat: "اسأل نموذجا أقوى",
    prompt_improvement: "حسّن البرومبت",
    premium_long_answer: "إجابة أطول وأقوى",
    long_document_summary: "تلخيص نص طويل",
    image_prompt_review: "برومبت صورة ومراجعة",
    image_generation_low: "توليد صورة بسيطة",
    ppt_outline: "مخطط عرض تقديمي",
    video_script: "سكربت فيديو قصير"
  }[id] || id;
}

const operationGroups = [
  {
    id: "text",
    label: "نص وكتابة",
    description: "للأسئلة، الكتابة، إعادة الصياغة، والخطط القصيرة.",
    modelRoute: "DeepSeek · ChatGPT · Gemini",
    tasks: ["premium_short_chat", "prompt_improvement", "premium_long_answer", "long_document_summary"]
  },
  {
    id: "image",
    label: "صورة",
    description: "لتحضير برومبت صورة أو توليد صورة بسيطة.",
    modelRoute: "DALL·E · Gemini · Seedream",
    tasks: ["image_prompt_review", "image_generation_low"]
  },
  {
    id: "slides",
    label: "عرض أو خطة",
    description: "لبناء مخطط عرض تقديمي أو ترتيب فكرة مشروع.",
    modelRoute: "ChatGPT · Gemini · Claude",
    tasks: ["ppt_outline"]
  },
  {
    id: "video",
    label: "فيديو",
    description: "لكتابة سكربت فيديو وتقسيمه إلى مشاهد قبل استخدام أداة الفيديو.",
    modelRoute: "ChatGPT · Gemini · Seedance",
    tasks: ["video_script"]
  }
];

function renderGuide(ruleId) {
  const guide = taskGuides[ruleId] || defaultGuide;
  guideContent.innerHTML = `
    <article class="guide-card guide-primary">
      <span>${guide.label}</span>
      <h3>${guide.title}</h3>
      <p>${guide.summary}</p>
      <ol>
        ${guide.steps.map((step) => `<li>${step}</li>`).join("")}
      </ol>
    </article>
    <article class="guide-card prompt-card">
      <span>Prompt جاهز للنسخ</span>
      <h3>انسخ هذا النص وعدّل الكلمات بين الأقواس.</h3>
      <pre dir="rtl">${guide.copyPrompt}</pre>
    </article>
    <article class="guide-card">
      <span>بعد النتيجة</span>
      <h3>جمل تعديل سريعة</h3>
      <ul>
        ${guide.refinements.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
    <article class="guide-card">
      <span>من مقالات ARABAI</span>
      <h3>اقرأ الدرس الكامل عند الحاجة</h3>
      <p>${guide.articleNote}</p>
      <a class="guide-link" href="${guide.articleHref}">افتح المقال المرتبط</a>
    </article>
  `;
}

const defaultGuide = {
  label: "ابدأ هنا",
  title: "اختر مهمة حتى تظهر التعليمات المناسبة.",
  summary: "كل مهمة في ARABAI يجب أن تأتي مع شرح عملي قصير، حتى يستطيع المستخدم النسخ والتجربة مباشرة.",
  steps: ["اختر المهمة من البطاقات.", "اقرأ تقدير الرصيد.", "انسخ البرومبت الجاهز وعدله.", "شغّل المهمة ثم اطلب تعديلا واضحا."],
  copyPrompt: "أريد استخدام الذكاء الاصطناعي في: (اكتب المهمة هنا). النتيجة المطلوبة: (رسالة / صورة / عرض / سكربت). الجمهور: (من سيقرأ أو يشاهد). الأسلوب: (بسيط / رسمي / تجاري).",
  refinements: ["اجعل النتيجة أبسط.", "غيّر الأسلوب ليكون أكثر ودية.", "اعطني نسخة أقصر.", "اعطني 3 بدائل."],
  articleNote: "هذه المنطقة تربط استخدام API بالمقالات، حتى لا تبقى المقالات منفصلة عن التجربة.",
  articleHref: "../../ar-beginner.html"
};

const taskGuides = {
  premium_short_chat: {
    label: "سؤال سريع",
    title: "اسأل نموذجا أقوى بدون أن تضيع السؤال.",
    summary: "السؤال القصير لا يعني سؤالا غامضا. أعط AI الجملة، الهدف، ونوع المساعدة المطلوبة حتى يرجع لك جوابا يمكن استخدامه مباشرة.",
    steps: [
      "اكتب السؤال أو النص الذي تريد العمل عليه.",
      "قل له ماذا تريد بالضبط: شرح، ترجمة، إعادة صياغة، أو رد جاهز.",
      "حدد الأسلوب: رسمي، ودي، مختصر، أو بسيط جدا.",
      "اطلب نتيجة قصيرة أولا حتى لا تصرف credits بلا حاجة.",
      "إذا أعجبك الاتجاه، اطلب نسخة أطول أو أكثر تفصيلا."
    ],
    copyPrompt:
      "ساعدني في هذه المهمة القصيرة:\nالنص أو السؤال: (اكتب هنا).\nأريد منك: (شرح / ترجمة / إعادة صياغة / رد جاهز).\nالجمهور: (عميل / مدير / طالب / صديق).\nالأسلوب: بسيط وواضح.\nاكتب النتيجة بشكل مباشر، ثم أعطني نسخة أقصر إذا كان ذلك ممكنا.",
    refinements: [
      "اجعل الرد أقصر وأكثر مباشرة.",
      "اجعل الأسلوب أكثر رسمية.",
      "اشرحها كأنني مبتدئ تماما.",
      "أعطني 3 صيغ مختلفة.",
      "حوّل الجواب إلى نقاط."
    ],
    articleNote: "هذه هي أبسط طريقة لاستخدام نموذج أقوى بدون الدخول في تفاصيل تقنية.",
    articleHref: "../../ar/articles/write-with-ai.html"
  },
  premium_long_answer: {
    label: "إجابة طويلة",
    title: "حوّل الفكرة إلى خطة أو شرح كامل.",
    summary: "عندما تطلب خطة أو مقارنة أو شرحا طويلا، لا تبدأ بكلمة عامة. أعط AI الدور، الهدف، الخلفية، والشكل النهائي المطلوب.",
    steps: [
      "اكتب الموضوع والهدف من الإجابة.",
      "قل لمن ستستخدم النتيجة: لنفسك، لفريق، لعميل، أو لإدارة.",
      "حدد الشكل: خطة، مقارنة، تقرير مختصر، أو خطوات تنفيذ.",
      "اطلب من AI أن يبدأ بملخص ثم تفاصيل.",
      "راجع النتيجة واطلب منه إضافة أمثلة عملية."
    ],
    copyPrompt:
      "أريد إجابة مفصلة عن: (الموضوع).\nالهدف: (فهم الموضوع / اتخاذ قرار / إعداد خطة / شرح للعميل).\nالجمهور: (مبتدئ / صاحب عمل / فريق عمل / طالب).\nاكتب النتيجة بهذا الشكل:\n1. ملخص بسيط\n2. أهم النقاط\n3. خطوات عملية\n4. مثال واقعي\n5. أخطاء يجب تجنبها\nاستخدم لغة سهلة بدون مصطلحات تقنية كثيرة.",
    refinements: [
      "أضف مثالا من السوق السعودي.",
      "اجعل الخطة قابلة للتنفيذ خلال أسبوع.",
      "حوّل النتيجة إلى جدول.",
      "احذف الكلام العام وركز على الخطوات.",
      "أضف قائمة تحقق في النهاية."
    ],
    articleNote: "هذه الصيغة تناسب كتابة الخطط، المقارنات، الشروحات، ورسائل العمل الطويلة.",
    articleHref: "../../ar/articles/make-a-plan.html"
  },
  long_document_summary: {
    label: "تلخيص مستند",
    title: "لا تطلب ملخصا فقط، اطلب ما تحتاجه من المستند.",
    summary: "AI يستطيع قراءة نص طويل، لكن الملخص المفيد يحتاج هدفا. هل تريد قرارات؟ مهام؟ مخاطر؟ أرقاما؟ قل له ذلك قبل أن يلخص.",
    steps: [
      "الصق النص أو ارفع الملف عندما تكون خاصية الملفات جاهزة.",
      "حدد لماذا تقرأ المستند: فهم سريع، اجتماع، قرار، أو متابعة مهام.",
      "اطلب ملخصا قصيرا ثم قائمة إجراءات.",
      "اطلب استخراج التواريخ، الأرقام، أو المخاطر المهمة.",
      "راجع النقاط المهمة بنفسك قبل الاعتماد عليها."
    ],
    copyPrompt:
      "لخص هذا المستند لي بطريقة عملية.\nهدفي من القراءة: (اجتماع / قرار / متابعة مشروع / فهم سريع).\nأريد النتيجة بهذا الشكل:\n1. ملخص في 5 نقاط\n2. أهم القرارات أو الأفكار\n3. المهام المطلوبة ومن المسؤول عنها إن وجدت\n4. التواريخ أو الأرقام المهمة\n5. أسئلة يجب أن أراجعها قبل الاعتماد على المستند\nالنص:\n(الصق النص هنا)",
    refinements: [
      "استخرج المهام فقط.",
      "استخرج المخاطر والتحذيرات.",
      "حوّل الملخص إلى بريد إلكتروني.",
      "اجعل الملخص في 3 نقاط فقط.",
      "أضف أسئلة أطرحها في الاجتماع."
    ],
    articleNote: "هذه الطريقة تجعل تلخيص المستند عملا مفيدا، وليس مجرد اختصار طويل.",
    articleHref: "../../ar/articles/summarize-documents.html"
  },
  image_generation_low: {
    label: "توليد صورة",
    title: "حوّل الفكرة إلى صورة خطوة بخطوة.",
    summary: "لا تكتب كلمة واحدة فقط مثل مطعم أو عطر. عامل AI كرسام يحتاج وصفا واضحا: الشيء الرئيسي، المكان، الإضاءة، الأسلوب، وما لا تريده.",
    steps: [
      "اكتب الشيء الرئيسي في الصورة: منتج، شخص، مكان، أو مشهد.",
      "أضف الاستخدام: إعلان، منشور إنستغرام، صورة منتج، أو خلفية عرض.",
      "حدد الأسلوب: واقعي، فاخر، بسيط، كرتوني، أو سينمائي.",
      "أضف تفاصيل مهمة مثل اللون، الإضاءة، الزاوية، والخلفية.",
      "بعد أول نتيجة، لا تبدأ من الصفر؛ اطلب تعديلا واحدا واضحا."
    ],
    copyPrompt:
      "أنشئ صورة مربعة لاستخدامها في (إعلان / منشور / عرض تقديمي).\nالموضوع الرئيسي: (اكتب المنتج أو الفكرة).\nالجمهور: (عملاء مطعم / طلاب / أصحاب شركات / عائلة).\nالأسلوب: واقعي، نظيف، احترافي، مناسب للسوق السعودي.\nالخلفية: (بسيطة / فاخرة / مكتبية / خارجية).\nالإضاءة: ناعمة وواضحة.\nتجنب: النصوص الكثيرة، الشعارات العشوائية، الوجوه غير الطبيعية.",
    refinements: [
      "اجعل الصورة أكثر فخامة وأقل ازدحاما.",
      "غيّر الخلفية إلى لون أفتح ومناسب للإعلانات.",
      "قرّب المنتج واجعله واضحا في منتصف الصورة.",
      "احذف أي نص غير مفهوم داخل الصورة.",
      "اعطني نسخة مناسبة لمنشور إنستغرام."
    ],
    articleNote: "هذا هو نفس منطق مقال توليد الصور: وصف واضح أولا، ثم تعديل صغير بعد النتيجة.",
    articleHref: "../../ar/articles/create-images.html"
  },
  image_prompt_review: {
    label: "برومبت صورة",
    title: "اكتب وصف الصورة قبل توليدها.",
    summary: "هذه المهمة أرخص من توليد الصورة نفسها، ومفيدة عندما تريد تجهيز وصف قوي قبل أن تصرف credits على الصورة.",
    steps: [
      "اكتب فكرتك بالكلام العادي.",
      "اطلب من AI تحويلها إلى برومبت صورة مرتب.",
      "راجع هل فيه منتج، خلفية، أسلوب، إضاءة، ومقاس.",
      "استخدم البرومبت النهائي في أداة الصور.",
      "إذا ظهرت نتيجة ضعيفة، عدّل جزءا واحدا فقط."
    ],
    copyPrompt:
      "حوّل هذه الفكرة إلى برومبت صورة واضح:\nالفكرة: (اكتب الفكرة ببساطة).\nالاستخدام: (إعلان / منشور / عرض / صورة منتج).\nأريد البرومبت أن يحتوي على: الموضوع الرئيسي، الخلفية، الإضاءة، الأسلوب، الألوان، وما يجب تجنبه.\nاكتب النتيجة بالعربية ثم أعطني نسخة إنجليزية مناسبة لأدوات الصور.",
    refinements: [
      "اجعل البرومبت أقصر وأسهل للنسخ.",
      "أضف تفاصيل عن الإضاءة والزاوية.",
      "اجعل الأسلوب مناسب للسوق الخليجي.",
      "أعطني نسخة إنجليزية فقط.",
      "أضف قائمة بالأشياء التي يجب تجنبها."
    ],
    articleNote: "هذه خطوة تحضيرية تساعد المستخدم على تقليل التجارب الضائعة في أدوات الصور.",
    articleHref: "../../ar/articles/create-images.html"
  },
  prompt_improvement: {
    label: "تحسين البرومبت",
    title: "حوّل الكلام المبعثر إلى طلب يفهمه AI.",
    summary: "البرومبت الجيد يشبه طلبا واضحا لموظف ذكي: قل له المهمة، الجمهور، الأسلوب، والشكل النهائي.",
    steps: [
      "اكتب فكرتك كما هي حتى لو كانت غير مرتبة.",
      "اطلب من AI أن يسألك عن الناقص.",
      "اختر الشكل النهائي: جدول، نقاط، رسالة، خطة، أو نص إعلان.",
      "انسخ النسخة المحسنة واستخدمها في المهمة الأصلية.",
      "احتفظ بالقالب إذا كانت المهمة تتكرر."
    ],
    copyPrompt:
      "سأعطيك فكرة غير مرتبة. حوّلها إلى برومبت واضح يمكن نسخه واستخدامه مع AI.\nالفكرة: (اكتب فكرتك هنا).\nاسألني أولا عن أي معلومة ناقصة، ثم اكتب البرومبت النهائي بشكل بسيط ومنظم.",
    refinements: [
      "اجعل البرومبت أقصر.",
      "حوّله إلى قالب أستطيع استخدامه كل مرة.",
      "أضف خانة للجمهور وخانة للأسلوب.",
      "اكتب نسخة عربية ونسخة إنجليزية.",
      "اجعل النتيجة مناسبة للمبتدئين."
    ],
    articleNote: "هذا يربط مباشرة بين استخدام الأداة ومقال ARABAI عن البرومبت.",
    articleHref: "../../ar/articles/what-is-a-prompt.html"
  },
  ppt_outline: {
    label: "عرض تقديمي",
    title: "ابدأ بمخطط واضح قبل فتح أداة PPT.",
    summary: "قبل أن تطلب من Gamma أو أي أداة بناء عرض، اجعل AI يرتب القصة: العنوان، الجمهور، عدد الشرائح، والرسالة الأساسية.",
    steps: [
      "اكتب موضوع العرض والجمهور.",
      "حدد عدد الشرائح والهدف من العرض.",
      "اطلب عناوين الشرائح قبل التفاصيل.",
      "راجع الترتيب: هل يحكي قصة مفهومة؟",
      "بعدها استخدم المخطط في Gamma أو أداة عروض أخرى."
    ],
    copyPrompt:
      "أريد إعداد عرض تقديمي عن: (الموضوع).\nالجمهور: (طلاب / عملاء / إدارة / مستثمرون).\nعدد الشرائح: (مثلا 8).\nالهدف: (شرح / بيع / تدريب / إقناع).\nاكتب لي مخطط الشرائح: عنوان كل شريحة، النقاط الرئيسية، واقتراح بسيط للصورة أو الرسم المناسب.",
    refinements: [
      "اجعل العرض أكثر إقناعا.",
      "قلل عدد الشرائح إلى 6.",
      "أضف شريحة مقارنة.",
      "اجعل اللغة أبسط للمبتدئين.",
      "حوّل المخطط إلى نص مناسب لـ Gamma."
    ],
    articleNote: "الهدف أن يرى المستخدم كيف ينتقل من فكرة إلى مخطط ثم إلى أداة PPT.",
    articleHref: "../../ar/articles/make-slides.html"
  },
  video_script: {
    label: "سكربت فيديو",
    title: "ابدأ بالفكرة والكلمات قبل أن تصنع الفيديو.",
    summary: "الفيديو الجيد لا يبدأ من أداة الفيديو، بل من سكربت بسيط: من يشاهد؟ ما الرسالة؟ ما أول لقطة؟ وما الجملة التي تجعل الناس يكملون المشاهدة؟",
    steps: [
      "اكتب موضوع الفيديو والمنتج أو الفكرة.",
      "حدد مدة الفيديو والجمهور.",
      "اطلب Hook في أول 3 ثوان.",
      "اطلب مشاهد قصيرة قابلة للتحويل إلى صور.",
      "بعد السكربت، اطلب 9 لقطات أو prompts للصور ثم استخدم أداة فيديو مثل Seedance."
    ],
    copyPrompt:
      "اكتب لي سكربت فيديو قصير عن: (الموضوع أو المنتج).\nمدة الفيديو: (15 / 30 / 45 ثانية).\nالجمهور: (عملاء / طلاب / أصحاب مشاريع / مستخدمون عاديون).\nالهدف: (شرح / إعلان / تشويق / تعليم).\nأريد النتيجة بهذا الشكل:\n1. جملة افتتاحية قوية في أول 3 ثوان\n2. السكربت الصوتي الكامل\n3. تقسيم الفيديو إلى 6-9 مشاهد\n4. وصف صورة لكل مشهد\n5. نص قصير يظهر على الشاشة إن احتجنا",
    refinements: [
      "اجعل الافتتاحية أقوى.",
      "اختصر الفيديو إلى 15 ثانية.",
      "حوّل المشاهد إلى 9 prompts للصور.",
      "اجعل اللغة مناسبة للجمهور السعودي.",
      "أضف دعوة بسيطة في النهاية."
    ],
    articleNote: "هذا يربط طريقة GPT لكتابة السكربت مع طريقة الصور ثم تحويلها إلى فيديو لاحقا.",
    articleHref: "../../ar/articles/make-videos.html"
  }
};

await boot();
