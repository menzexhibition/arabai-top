import { packages, pricingRules } from "../src/config/credits.js";
import { estimateTaskCredits } from "../src/services/pricing.js";
import { createWallet, reserveCredits } from "../src/services/wallet.js";

const wallet = createWallet(100);
let apiMode = false;
let selectedTask = null;
let selectedEstimate = null;

const packageGrid = document.querySelector("#packageGrid");
const taskGrid = document.querySelector("#taskGrid");
const operationSelect = document.querySelector("#operationSelect");
const operationHelp = document.querySelector("#operationHelp");
const estimateTitle = document.querySelector("#estimateTitle");
const estimateMessage = document.querySelector("#estimateMessage");
const confirmButton = document.querySelector("#confirmButton");
const guideContent = document.querySelector("#guideContent");

await boot();

confirmButton.addEventListener("click", async () => {
  if (!selectedTask || !selectedEstimate?.estimatedCredits) return;

  if (apiMode) {
    await confirmWithApi();
    return;
  }

  try {
    reserveCredits(wallet, `demo-${Date.now()}`, selectedEstimate.estimatedCredits);
    renderWallet();
    estimateTitle.textContent = "تم حجز الرصيد لهذه المهمة";
    estimateMessage.textContent = "في التطبيق الحقيقي ستدخل المهمة الآن إلى التشغيل أو قائمة الانتظار.";
    confirmButton.disabled = true;
  } catch (error) {
    estimateTitle.textContent = "لا يوجد رصيد كاف";
    estimateMessage.textContent = error instanceof Error ? error.message : "حدث خطأ.";
  }
});

async function boot() {
  try {
    const response = await fetch("/api/me");
    if (response.ok) {
      const data = await response.json();
      apiMode = true;
      wallet.creditBalance = data.wallet.creditBalance;
      wallet.redeemableCreditBalance = data.wallet.redeemableCreditBalance;
      wallet.reservedCreditBalance = data.wallet.reservedCreditBalance;
      wallet.pendingCreditBalance = data.wallet.pendingCreditBalance;
    }
  } catch {
    apiMode = false;
  }

  renderWallet();
  await renderPackages();
  renderOperationSelect();
  renderTasks();
  renderGuide(null);
}

function renderWallet() {
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
      (item) => `
        <article>
          <span>${item.currency}</span>
          <h3>${formatPrice(item)}</h3>
          <p>${item.credits} credits</p>
          <p>Coming Soon - التكلفة الحقيقية للـ API لا تتجاوز تقريبا 50% من قيمة الباقة.</p>
        </article>
      `
    )
    .join("");
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
  return pricingRules.filter((rule) => taskIds.includes(rule.id));
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
  const response = await fetch("/api/tasks/estimate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(requestBody)
  });
  return response.json();
}

async function confirmWithApi() {
  try {
    const response = await fetch("/api/tasks/confirm", {
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
    renderWallet();
    estimateTitle.textContent = "تم تشغيل المهمة التجريبية";
    estimateMessage.textContent = data.outputText || "اكتملت المهمة التجريبية.";
    confirmButton.disabled = true;
  } catch (error) {
    estimateTitle.textContent = "تعذر تشغيل المهمة";
    estimateMessage.textContent = error instanceof Error ? error.message : "حدث خطأ.";
  }
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
    modelRoute: "AI_MODEL_DEFAULT_CHAT",
    tasks: ["premium_short_chat", "prompt_improvement", "premium_long_answer", "long_document_summary"]
  },
  {
    id: "image",
    label: "صورة",
    description: "لتحضير برومبت صورة أو توليد صورة بسيطة.",
    modelRoute: "AI_MODEL_IMAGE",
    tasks: ["image_prompt_review", "image_generation_low"]
  },
  {
    id: "slides",
    label: "عرض أو خطة",
    description: "لبناء مخطط عرض تقديمي أو ترتيب فكرة مشروع.",
    modelRoute: "AI_MODEL_DEFAULT_CHAT",
    tasks: ["ppt_outline"]
  },
  {
    id: "video",
    label: "فيديو",
    description: "لكتابة سكربت فيديو وتقسيمه إلى مشاهد قبل استخدام أداة الفيديو.",
    modelRoute: "AI_MODEL_DEFAULT_CHAT",
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
  copyPrompt: "أريد استخدام AI في: (اكتب المهمة هنا). النتيجة المطلوبة: (رسالة / صورة / عرض / سكربت). الجمهور: (من سيقرأ أو يشاهد). الأسلوب: (بسيط / رسمي / تجاري).",
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
    articleHref: "../../ar/articles/write-plans.html"
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
    articleHref: "../../ar/articles/make-images.html"
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
    articleHref: "../../ar/articles/make-images.html"
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
    articleHref: "../../ar/articles/prompt-guide.html"
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
