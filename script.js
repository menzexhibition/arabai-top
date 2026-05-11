const revealTargets = document.querySelectorAll(
  ".path-card, .directory-item, .updates-grid article, .tool-table, .cms-list li"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("visible"));
}

const articleRoot = document.querySelector("#article-root");
const arArticleRoot = document.querySelector("#ar-article-root");

if (articleRoot && window.ARTICLES) {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id") || "what-is-ai";
  const article = window.ARTICLES[articleId];

  if (!article) {
    articleRoot.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="en.html">ARABAI</a>
        <span>Article not found</span>
      </nav>
      <header class="article-header">
        <p class="eyebrow">Missing article</p>
        <h1>Article not found</h1>
        <p>This article is not available yet.</p>
      </header>
    `;
  } else {
    document.title = `${article.title} - ARABAI`;

    const currentEnLink = document.querySelector("#article-current-en-link");
    const arLink = document.querySelector("#article-ar-link");
    if (currentEnLink) currentEnLink.href = `article.html?id=${encodeURIComponent(articleId)}`;
    if (arLink) arLink.href = `ar-article.html?id=${encodeURIComponent(articleId)}`;

    document
      .querySelector(`[data-nav="${article.section}"]`)
      ?.setAttribute("aria-current", "page");

    const footerLink = document.querySelector("#article-footer-link");
    if (footerLink) {
      footerLink.href = article.backUrl;
      footerLink.textContent = `Back to ${article.sectionLabel}`;
    }

    const sections = article.sections
      .map(([heading, text]) => `<h2>${heading}</h2><p>${linkKeywords(text, article.section)}</p>`)
      .join("");

    const prompt = article.prompt
      ? `<blockquote>${linkKeywords(article.prompt, article.section)}</blockquote>${renderPromptGuide(article.promptGuide, article.section)}`
      : "";

    const workflow = article.workflow
      ? `<h2>Do it step by step</h2><ol class="workflow-list">${article.workflow
          .map((step) => `<li>${linkKeywords(step, article.section)}</li>`)
          .join("")}</ol>`
      : "";

    const caseStudy = article.caseStudy ? renderCaseStudy(article.caseStudy, article.section) : "";

    const externalRefs = renderExternalRefs(article.externalRefs);
    const toolLinks = renderToolLinks(article.externalRefs);

    updateRechargeIntent(articleId, article);
    const rechargeNudge = renderRechargeNudge(articleId, article);

    const next = article.next
      ? `<div class="next-step"><span>Next article</span><a href="article.html?id=${article.next[0]}">${article.next[1]}</a></div>`
      : "";

    articleRoot.innerHTML = `
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${article.backUrl}">${article.sectionLabel}</a>
        <span>${article.title}</span>
      </nav>
      <header class="article-header">
        <p class="eyebrow">${article.sectionLabel}</p>
        <h1>${article.title}</h1>
        <p>${linkKeywords(article.intro, article.section)}</p>
        <p class="article-meta">${estimateTime(articleId, article)}</p>
      </header>
      <section class="article-body">
        ${sections}
        ${caseStudy}
        ${workflow}
        <h2>Try this</h2>
        ${prompt}
        ${toolLinks}
        ${externalRefs}
        ${rechargeNudge}
        ${next}
      </section>
    `;
  }
}

if (arArticleRoot && window.ARTICLES) {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id") || "what-is-ai";
  const article = window.ARTICLES[articleId];
  const arArticle = getArabicArticle(articleId, article);

  const enLink = document.querySelector("#article-en-link");
  if (enLink) enLink.href = `article.html?id=${encodeURIComponent(articleId)}`;

  if (!article) {
    arArticleRoot.innerHTML = `
      <nav class="breadcrumb" aria-label="مسار الصفحة">
        <a href="index.html">ARABAI</a>
        <span>المقال غير موجود</span>
      </nav>
      <header class="article-header">
        <p class="eyebrow">مقال غير موجود</p>
        <h1>لم نجد هذا المقال</h1>
        <p>هذا المقال غير متاح حاليا.</p>
      </header>
    `;
  } else {
    document.title = `${arArticle.title} - ARABAI`;

    document
      .querySelector(`[data-nav="${article.section}"]`)
      ?.setAttribute("aria-current", "page");

    const footerLink = document.querySelector("#ar-article-footer-link");
    if (footerLink) {
      footerLink.href = arBackUrl(article.section);
      footerLink.textContent = `العودة إلى ${arSectionLabel(article.section)}`;
    }

    const sections = arArticle.sections
      .map(([heading, text]) => `<h2>${heading}</h2><p>${escapeHtml(text)}</p>`)
      .join("");

    const arCaseStudy = mergeArabicCaseStudy(arArticle.caseStudy, article.caseStudy);
    const arWorkflow = arArticle.workflow?.length ? arArticle.workflow : arCaseStudy?.steps;
    const workflow = arWorkflow?.length
      ? `<h2>اتبعه خطوة بخطوة</h2><ol class="workflow-list">${arWorkflow
          .map((step) => `<li>${escapeHtml(step)}</li>`)
          .join("")}</ol>`
      : "";

    const prompt = arArticle.prompt
      ? `<h2>جرّب هذا الطلب</h2><blockquote>${escapeHtml(arArticle.prompt)}</blockquote>`
      : "";

    const toolLinks = renderToolLinks(article.externalRefs, "ar");
    const externalRefs = renderExternalRefs(article.externalRefs, "ar");
    const next = article.next
      ? `<div class="next-step"><span>المقال التالي</span><a href="ar-article.html?id=${article.next[0]}">${getArabicTitle(article.next[0], article.next[1])}</a></div>`
      : "";

    arArticleRoot.innerHTML = `
      <nav class="breadcrumb" aria-label="مسار الصفحة">
        <a href="${arBackUrl(article.section)}">${arSectionLabel(article.section)}</a>
        <span>${escapeHtml(arArticle.title)}</span>
      </nav>
      <header class="article-header">
        <p class="eyebrow">${arSectionLabel(article.section)}</p>
        <h1>${escapeHtml(arArticle.title)}</h1>
        <p>${escapeHtml(arArticle.intro)}</p>
        <p class="article-meta">${estimateTime(articleId, article, "ar")}</p>
      </header>
      <section class="article-body">
        ${sections}
        ${renderArabicCaseStudy(arCaseStudy)}
        ${workflow}
        ${prompt}
        ${toolLinks}
        ${externalRefs}
        ${next}
      </section>
    `;
  }
}

function renderToolLinks(refs, locale = "en") {
  const groups = groupToolLinks(refs);
  if (!groups.official.length && !groups.pricing.length && !groups.tutorial.length) return "";

  const labels =
    locale === "ar"
      ? {
          official: "الموقع الرسمي",
          pricing: "صفحة الأسعار",
          tutorial: "برنامج المبتدئين",
          eyebrow: "جرّب هذه الأداة",
          heading: "افتح المكان الصحيح"
        }
      : {
          official: "Official website",
          pricing: "Pricing page",
          tutorial: "Beginner tutorial",
          eyebrow: "Try this tool",
          heading: "Open the right place"
        };

  const columns = [
    [labels.official, groups.official],
    [labels.pricing, groups.pricing],
    [labels.tutorial, groups.tutorial]
  ]
    .filter(([, items]) => items.length)
    .map(
      ([heading, items]) => `
        <div class="tool-link-column">
          <h3>${heading}</h3>
          ${items
            .slice(0, 3)
            .map(
              ([title, url, note]) => `
                <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>
                <p>${escapeHtml(note)}</p>
              `
            )
            .join("")}
        </div>
      `
    )
    .join("");

  return `
    <section class="tool-links">
      <p class="eyebrow">${labels.eyebrow}</p>
      <h2>${labels.heading}</h2>
      <div class="tool-link-grid">${columns}</div>
    </section>
  `;
}

function groupToolLinks(refs) {
  const groups = {
    official: [],
    pricing: [],
    tutorial: []
  };

  for (const ref of refs || []) {
    const [title, url] = ref;
    const badge = referenceBadge(title, url);
    const lowerTitle = title.toLowerCase();
    const lowerUrl = url.toLowerCase();

    if (badge === "Pricing" || lowerTitle.includes("pricing") || lowerUrl.includes("pricing") || lowerUrl.includes("subscriptions")) {
      groups.pricing.push(ref);
    } else if (
      lowerTitle.includes("tutorial") ||
      lowerTitle.includes("guide") ||
      lowerTitle.includes("academy") ||
      lowerTitle.includes("help") ||
      lowerUrl.includes("help.") ||
      lowerUrl.includes("support.") ||
      lowerUrl.includes("academy") ||
      badge === "Video"
    ) {
      groups.tutorial.push(ref);
    } else if (badge === "Official") {
      groups.official.push(ref);
    } else {
      groups.tutorial.push(ref);
    }
  }

  return groups;
}

function updateRechargeIntent(articleId, article) {
  const state = readRechargeState();
  state.views = Array.isArray(state.views) ? state.views : [];

  if (!state.views.includes(articleId)) {
    state.views.push(articleId);
  }

  state.score = calculateRechargeIntentScore(state.views, article);
  state.lastSeen = new Date().toISOString();
  state.returning = Boolean(state.firstSeen && state.firstSeen.slice(0, 10) !== state.lastSeen.slice(0, 10));
  state.firstSeen = state.firstSeen || state.lastSeen;

  writeRechargeState(state);
}

function renderRechargeNudge(articleId, article) {
  if (!shouldShowRechargeNudge(articleId, article)) return "";

  const state = readRechargeState();
  state.nudgeShown = true;
  writeRechargeState(state);

  return `
    <aside class="recharge-nudge" aria-label="ARABAI Credits note">
      <p class="eyebrow">Credit wallet</p>
      <h2>Small recharge, many AI tools</h2>
      <p>ARABAI Credits will let frequent users try newer AI tools from one place. Contribution rewards can be recorded first; AI redemption opens later.</p>
      <a href="credits.html">Learn about Credits</a>
    </aside>
  `;
}

function shouldShowRechargeNudge(articleId, article) {
  const state = readRechargeState();

  if (!article || article.section === "beginner") return false;
  if (state.nudgeShown) return false;
  if (state.views.length < 3) return false;
  if (state.score < 5) return false;
  if (getRechargeBucket() >= 5) return false;

  const eligibleArticles = new Set([
    "make-slides",
    "create-images",
    "make-videos",
    "make-music",
    "subscription-pages",
    "price-comparison",
    "what-is-api",
    "official-api-platforms",
    "api-price-comparison",
    "ai-gateway",
    "gateway-platforms"
  ]);

  return eligibleArticles.has(articleId) || article.section === "expert";
}

function calculateRechargeIntentScore(views, article) {
  const highIntentIds = new Set([
    "make-slides",
    "create-images",
    "make-videos",
    "make-music",
    "subscription-pages",
    "price-comparison",
    "what-is-api",
    "official-api-platforms",
    "api-price-comparison",
    "ai-gateway",
    "gateway-platforms"
  ]);

  let score = 0;
  for (const id of views) {
    const viewed = window.ARTICLES?.[id];
    if (viewed?.section === "advanced") score += 1;
    if (viewed?.section === "expert") score += 2;
    if (highIntentIds.has(id)) score += 2;
  }

  if (views.length >= 3) score += 2;

  const state = readRechargeState();
  if (state.returning) score += 2;
  if (article?.section === "expert") score += 1;

  return score;
}

function getRechargeBucket() {
  const key = "arabai_recharge_bucket";
  const existing = localStorage.getItem(key);
  if (existing !== null && !Number.isNaN(Number(existing))) return Number(existing);

  const bucket = Math.floor(Math.random() * 100);
  localStorage.setItem(key, String(bucket));
  return bucket;
}

function readRechargeState() {
  try {
    return JSON.parse(localStorage.getItem("arabai_recharge_state") || "{}");
  } catch {
    return {};
  }
}

function writeRechargeState(state) {
  localStorage.setItem("arabai_recharge_state", JSON.stringify(state));
}

function renderExternalRefs(refs, locale = "en") {
  if (!refs || !refs.length) return "";

  const items = refs
    .map(
      ([title, url, note]) => {
        const badge = referenceBadge(title, url, locale);
        return `
        <li>
          <span class="ref-badge">${badge}</span>
          <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)}</a>
          <p>${escapeHtml(note)}</p>
        </li>
      `;
      }
    )
    .join("");

  return `
    <section class="external-refs">
      <h2>${locale === "ar" ? "مراجع خارجية مفيدة" : "Useful external references"}</h2>
      <ul>${items}</ul>
    </section>
  `;
}

function referenceBadge(title, url, locale = "en") {
  const lowerTitle = title.toLowerCase();
  const lowerUrl = url.toLowerCase();
  const labels =
    locale === "ar"
      ? { video: "فيديو", official: "رسمي", pricing: "أسعار", reference: "مرجع" }
      : { video: "Video", official: "Official", pricing: "Pricing", reference: "Reference" };

  if (lowerUrl.includes("youtube.com")) return labels.video;
  if (
    lowerUrl.includes("openai.com") ||
    lowerUrl.includes("help.openai.com") ||
    lowerUrl.includes("support.google.com") ||
    lowerUrl.includes("support.claude.com") ||
    lowerUrl.includes("help.gamma.app") ||
    lowerUrl.includes("help.runwayml.com") ||
    lowerUrl.includes("canva.com") ||
    lowerUrl.includes("capcut.com") ||
    lowerUrl.includes("adobe.com")
  ) {
    return labels.official;
  }

  if (lowerTitle.includes("pricing")) return labels.pricing;
  return labels.reference;
}

function renderCaseStudy(caseStudy, section) {
  const steps = caseStudy.steps
    .map(
      (step, index) => `
        <div class="case-step">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <p>${linkKeywords(step, section)}</p>
        </div>
      `
    )
    .join("");

  const screens = (caseStudy.screens || [])
    .map(
      (screen) =>
        screen.image
          ? `
            <figure class="real-screen">
              <img src="${screen.image}" alt="${escapeHtml(screen.title)}" />
              <figcaption>${screen.title}</figcaption>
            </figure>
          `
          : `
            <figure class="fake-screen">
              <figcaption>${screen.title}</figcaption>
              <pre>${escapeHtml(screen.text)}</pre>
            </figure>
          `
    )
    .join("");

  return `
    <section class="case-study">
      <p class="eyebrow">Real example</p>
      <h2>${caseStudy.title}</h2>
      <p>${linkKeywords(caseStudy.scenario, section)}</p>
      <div class="case-steps">${steps}</div>
      ${screens}
      ${renderOutput(caseStudy.output)}
      <h3>Final result</h3>
      <div class="final-result">${caseStudy.result}</div>
    </section>
  `;
}

function renderArabicCaseStudy(caseStudy) {
  if (!caseStudy) return "";

  const steps = (caseStudy.steps || [])
    .map(
      (step, index) => `
        <div class="case-step">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <p>${escapeHtml(step)}</p>
        </div>
      `
    )
    .join("");

  const screens = (caseStudy.screens || [])
    .map((screen) =>
      screen.image
        ? `
          <figure class="real-screen">
            <img src="${screen.image}" alt="${escapeHtml(screen.title)}" />
            <figcaption>${escapeHtml(screen.title)}</figcaption>
          </figure>
        `
        : `
          <figure class="fake-screen">
            <figcaption>${escapeHtml(screen.title)}</figcaption>
            <pre>${escapeHtml(screen.text || "")}</pre>
          </figure>
        `
    )
    .join("");

  return `
    <section class="case-study">
      <p class="eyebrow">مثال عملي</p>
      <h2>${escapeHtml(caseStudy.title)}</h2>
      <p>${escapeHtml(caseStudy.scenario)}</p>
      <div class="case-steps">${steps}</div>
      ${screens}
      ${renderOutput(caseStudy.output, "ar")}
      ${caseStudy.result ? `<h3>النتيجة النهائية</h3><div class="final-result">${localizeArabicResult(caseStudy.result)}</div>` : ""}
      ${caseStudy.note ? `<p class="output-note">${escapeHtml(caseStudy.note)}</p>` : ""}
    </section>
  `;
}

function estimateTime(articleId, article, locale = "en") {
  const advancedHeavy = new Set(["make-slides", "create-images", "edit-images", "make-videos", "make-music"]);
  const advancedMedium = new Set(["spreadsheets", "translate", "summarize-documents", "grow-business", "social-content"]);
  const expert = article?.section === "expert";

  let text = "Estimated time: 8-12 minutes";
  if (article?.section === "beginner") text = "Estimated time: 5-8 minutes";
  if (advancedMedium.has(articleId)) text = "Estimated time: 12-18 minutes";
  if (advancedHeavy.has(articleId)) text = "Estimated time: 20-35 minutes";
  if (expert) text = "Estimated time: 10-20 minutes";

  if (locale !== "ar") return text;
  if (article?.section === "beginner") return "الوقت المتوقع: 5-8 دقائق";
  if (advancedMedium.has(articleId)) return "الوقت المتوقع: 12-18 دقيقة";
  if (advancedHeavy.has(articleId)) return "الوقت المتوقع: 20-35 دقيقة";
  if (expert) return "الوقت المتوقع: 10-20 دقيقة";
  return "الوقت المتوقع: 8-12 دقيقة";
}

function localizeArabicResult(html) {
  return String(html)
    .replaceAll("Final result from ChatGPT:", "النتيجة النهائية من ChatGPT:")
    .replaceAll("Final result from image-2:", "النتيجة النهائية من image-2:")
    .replaceAll("Final result:", "النتيجة النهائية:")
    .replaceAll("Final deck you are aiming for:", "العرض النهائي الذي تستهدفه:")
    .replaceAll("Copy this into Doubao, ChatGPT, or another table-friendly AI:", "انسخ هذا في Doubao أو ChatGPT أو أي أداة مناسبة للجداول:")
    .replaceAll("Copy this into your image editing AI tool:", "انسخ هذا في أداة تعديل الصور:")
    .replaceAll("Copy this into your music AI tool:", "انسخ هذا في أداة الموسيقى:")
    .replaceAll("What you should get:", "ما النتيجة المتوقعة:")
    .replaceAll("Important:", "مهم:")
    .replaceAll("Product description:", "وصف المنتج:")
    .replaceAll("Customer reply:", "رد العميل:")
    .replaceAll("What you should finish:", "ما الذي يجب أن تنهيه:");
}

function mergeArabicCaseStudy(arCaseStudy, sourceCaseStudy) {
  if (!arCaseStudy && !sourceCaseStudy) return null;
  if (!sourceCaseStudy) return arCaseStudy;

  return {
    ...sourceCaseStudy,
    ...arCaseStudy,
    steps: arCaseStudy?.steps?.length ? arCaseStudy.steps : sourceCaseStudy.steps,
    screens: arCaseStudy?.screens?.length ? arCaseStudy.screens : sourceCaseStudy.screens,
    output: arCaseStudy?.output || sourceCaseStudy.output,
    result: arCaseStudy?.result || sourceCaseStudy.result
  };
}

function getArabicArticle(id, article) {
  const overrides = {
    "what-is-ai": {
      title: "ما هو الذكاء الاصطناعي؟",
      intro: "تخيل أنك عيّنت مساعدا سريع الفهم، يعرف الكتابة والتلخيص والترجمة والتصميم، لكنه يحتاج منك طلبا واضحا.",
      sections: [
        ["لديك مساعد جديد", "AI مثل مساعد يجلس بجانبك: يكتب، يخطط، يترجم، يرسم، ويلخص، لكنه ينتظر منك أن تقول له ماذا تريد."],
        ["لا يعرف ما في رأسك", "إذا كان طلبك غامضا ستكون الإجابة غامضة، وإذا شرحت له الهدف والنتيجة المطلوبة أصبحت الإجابة أقرب لما تريد."],
        ["ابدأ بمهمة صغيرة", "لا تبدأ بسؤال كبير عن كل شيء؛ اطلب منه تحسين رسالة، تلخيص نص، أو ترتيب فكرة واحدة."]
      ],
      workflow: [
        "افتح أداة محادثة AI واحدة.",
        "اكتب مهمة حقيقية من عملك أو يومك.",
        "أضف لمن ستُستخدم النتيجة وما النبرة المطلوبة.",
        "اقرأ الإجابة كمسودة أولى.",
        "اطلب منه تعديلها: أقصر، أو أوضح، أو ألطف."
      ],
      prompt: "اكتب رسالة قصيرة ولطيفة لعميل. أخبره أن الطلب سيتأخر يومين، واعتذر بلطف، واجعل الأسلوب واضحا ومهذبا."
    },
    "ai-basic-words": {
      title: "مصطلحات AI الأساسية",
      intro: "كلمات AI تبدو صعبة، لكنها تصبح سهلة عندما نتخيل AI كمطبخ كبير يعمل خلف الشاشة.",
      sections: [
        ["النموذج الكبير", "النموذج الكبير مثل طباخ تذوق ملايين الأطباق، لذلك يستطيع أن يخمن وصفة جيدة عندما تطلب منه شيئا جديدا."],
        ["التوكن", "التوكن مثل لقمة صغيرة من الكلام؛ AI يعد هذه اللقم عندما يقرأ سؤالك ويكتب الإجابة."],
        ["القدرة الحاسوبية", "القدرة الحاسوبية مثل حجم المطبخ وقوة النار: كلما كانت أكبر استطاع AI طبخ عمل أصعب وأسرع."],
        ["البرومبت", "البرومبت هو طلبك للنادل؛ كلما كان الطلب أوضح اقترب الطبق من الصورة التي في بالك."],
        ["السياق", "السياق هو الذاكرة الموضوعة على الطاولة، يستخدمها AI حتى لا يبدأ من الصفر كل مرة."],
        ["التدريب", "التدريب مثل إرسال AI إلى مدرسة طبخ طويلة قبل أن يخدم أي مستخدم."],
        ["الاستنتاج", "الاستنتاج هو لحظة طبخ الإجابة فعليا بعد أن تضع طلبك أمام AI."],
        ["الهلوسة", "الهلوسة مثل نادل واثق يخترع طبقا غير موجود، لذلك يجب مراجعة الإجابات المهمة."],
        ["النموذج", "النموذج هو مساعد AI واحد له عاداته وقوته وسرعته وسعره."],
        ["API", "API مثل نافذة خدمة تسمح للتطبيق أن يطلب من AI في الخلفية بدون فتح صفحة المحادثة العادية."]
      ],
      prompt: "اشرح لي هذه الكلمات كأني مبتدئ: النموذج الكبير، التوكن، القدرة الحاسوبية، البرومبت، السياق، التدريب، الاستنتاج، الهلوسة، النموذج، API."
    },
    "what-is-a-prompt": {
      title: "ما هو البرومبت؟",
      intro: "البرومبت ليس كلمة سحرية؛ هو ببساطة الطلب الذي تعطيه للمساعد قبل أن يبدأ العمل.",
      sections: [
        ["تخيل AI كنادل", "إذا قلت فقط: أريد أكلا، سيضطر النادل للتخمين؛ أما إذا قلت نوع الأكل والحجم والملاحظات فستصل النتيجة أفضل."],
        ["الطلب الجيد له أجزاء", "قل له الخلفية، المهمة، الجمهور، الأسلوب، وشكل النتيجة التي تريدها."],
        ["لا ترضَ بأول نتيجة", "أول إجابة غالبا مسودة؛ قل له ماذا يبقي، ماذا يغير، وماذا يحذف."]
      ],
      prompt: "أدير متجر عطور في الرياض. ساعدني في كتابة برومبت لبوستر إنستغرام عن تخفيض عود في نهاية الأسبوع. الأسلوب فخم، أسود وذهبي، والكلمات واضحة على الجوال."
    },
    "why-ai-costs-money": {
      title: "لماذا يكلف AI مالا؟",
      intro: "تخيل كل إجابة من AI كطلب صغير في مطبخ مزدحم؛ كلما كان الطلب أكبر احتاج وقتا وطاقة أكثر.",
      sections: [
        ["النص مثل وجبة خفيفة", "رسالة قصيرة أو تلخيص بسيط يشبه وجبة صغيرة، لذلك يكون أرخص وأسرع."],
        ["الصورة والفيديو مثل عمل استوديو", "عندما تطلب صورة أو فيديو، لا يكتب AI كلمات فقط؛ هو يبني منظرا وإضاءة وحركة وتفاصيل."],
        ["الرصيد اسم بسيط", "بدلا من شرح كل حساب صغير، يمكن أن نسمي التكلفة رصيدا حتى يفهم المستخدم ماذا يستهلك."]
      ],
      workflow: [
        "ابدأ بالمهام المجانية أو الصغيرة.",
        "لاحظ هل المهمة توفر عليك وقتا فعليا.",
        "استخدم الأدوات المدفوعة فقط عندما تصبح جزءا من عملك.",
        "لا تشحن أو تشترك قبل أن تعرف ما المهمة التي ستكررها.",
        "للصور والفيديو، ابدأ بتجارب قليلة لأن التكلفة تزيد أسرع."
      ],
      prompt: "اشرح لي لماذا يكلف AI مالا كأني مستخدم عادي. استخدم مثال المطبخ، واشرح التوكن، النموذج، القدرة الحاسوبية، API، الصور، الفيديو، والرصيد."
    },
    "what-can-ai-do": {
      title: "ماذا يستطيع AI أن يفعل؟",
      intro: "تخيل AI كمساعد تمشي به بين غرف العمل؛ في كل غرفة يساعدك بطريقة مختلفة.",
      sections: [
        ["في المكتب", "يساعدك في الرسائل، التقارير، تلخيص الملاحظات، ترتيب الجداول، وشرح الكلام الصعب."],
        ["في التصميم", "يساعدك في أفكار بوسترات، صور منتجات، إعلانات، وأشكال أولية قبل أن تدفع لمصمم أو تبدأ من الصفر."],
        ["في التعلم", "يشرح لك موضوعا، يعطيك أمثلة، يسألك أسئلة تدريب، ويترجم المعنى بلغة أسهل."]
      ],
      workflow: [
        "اختر مهمة واحدة من يومك.",
        "اكتب ما تريد بوضوح.",
        "اطلب نتيجة قصيرة أولا.",
        "قل له ما الذي تريد تغييره.",
        "استخدم النتيجة كمسودة، لا كحقيقة نهائية."
      ],
      prompt: "تصرف كمساعد عمل. لدي متجر صغير وأريد ثلاث أفكار بسيطة لمنشور إنستغرام عن منتج جديد. اجعل اللغة سهلة ومناسبة للعملاء."
    },
    "how-to-start": {
      title: "كيف أبدأ استخدام AI؟",
      intro: "البداية مع AI مثل دخول مقهى جديد: لا تحتاج معرفة كل القائمة قبل أول طلب.",
      sections: [
        ["اختر بابا واحدا", "ابدأ بأداة محادثة واحدة فقط، لأن فتح خمس أدوات في اليوم الأول يجعل التجربة مربكة."],
        ["اسأل سؤالا حقيقيا", "لا تختبر AI بسؤال عام؛ أعطه رسالة تريد تحسينها أو فكرة تريد ترتيبها اليوم."],
        ["الإجابة الأولى مسودة", "تعامل مع أول جواب كبداية، ثم اطلب منه أن يجعله أقصر أو أوضح أو ألطف."]
      ],
      workflow: [
        "افتح أداة AI واحدة موثوقة.",
        "اختر مهمة صغيرة من عملك أو يومك.",
        "اكتب الخلفية والنتيجة المطلوبة.",
        "اقرأ الإجابة وعدلها.",
        "احفظ البرومبت الجيد لاستخدامه مرة أخرى."
      ],
      prompt: "أنا جديد في AI. ساعدني في كتابة أول برومبت مفيد لتحسين رسالة عميل. اجعل الخطوات سهلة جدا."
    },
    "free-vs-paid": {
      title: "المجاني والمدفوع",
      intro: "AI المجاني مثل ملعقة تذوق، والمدفوع مثل حجز نفس المساعد للمهام التي تتكرر معك كل أسبوع.",
      sections: [
        ["متى يكفي المجاني", "المجاني يكفي لأول أسئلة، والكتابة القصيرة، والتلخيص، والترجمة، وتجربة AI بدون التزام."],
        ["ماذا يضيف المدفوع", "المدفوع يعطي غالبا نماذج أحدث، وسرعة أعلى، وحدودا أكبر، ورفع ملفات، وأحيانا خصوصية أفضل."],
        ["متى يستحق الدفع", "ادفع عندما يصبح AI جزءا من عملك الحقيقي كل أسبوع، أو عندما تبدأ حدود المجاني بتعطيلك."],
        ["متى تنتظر", "إذا كنت ما زلت تتعرف على الأدوات، أو تستخدمها نادرا، فابق على المجاني قليلا أكثر."]
      ],
      workflow: [
        "افتح النسخة المجانية من أداة تستخدمها فعلا.",
        "جرّب عليها مهمة تتكرر معك كل أسبوع.",
        "لاحظ السرعة، والحدود، وهل تحتاج رفع ملفات أو لا.",
        "اكتب ما الذي أعجبك وما الذي أزعجك.",
        "بعدها فقط قرر هل شهر مدفوع واحد يستحق التجربة."
      ],
      prompt: "أستخدم AI للرسائل والترجمة والتلخيص مرتين في الأسبوع. هل أبقى على الخطة المجانية أم أدفع؟ أعطني قرارا بسيطا."
    },
    "ai-tool-differences": {
      title: "كيف تختلف أدوات AI؟",
      intro: "أدوات AI مثل فريق في محل كبير: واحد يتكلم ويشرح، واحد يقرأ ملفات طويلة، واحد يصمم، وواحد يحوّل الفكرة إلى عرض.",
      sections: [
        ["أدوات المحادثة العامة", "مثل ChatGPT وClaude وGemini وDoubao، وهي جيدة للكتابة والأسئلة والترجمة والتخطيط."],
        ["أدوات الصور والفيديو", "هذه أقرب إلى استوديو صغير؛ تحتاج منك وصف المشهد، والألوان، والأسلوب، والمقاس أو الحركة."],
        ["أدوات العروض والملفات", "مثل Gamma، وهي مناسبة عندما تريد تحويل فكرة أو نص طويل إلى شرائح أو صفحة مرتبة."],
        ["ابدأ من المهمة", "لا تبدأ من الاسم الأشهر؛ ابدأ من سؤالك: هل أريد كتابة، صورة، فيديو، أم عرضا؟"]
      ],
      workflow: [
        "اكتب أربع مهام: كتابة، صورة، فيديو، وعرض أو ملف.",
        "اختر نوع الأداة المناسب لكل مهمة.",
        "جرّب مهمة صغيرة في أداة واحدة فقط.",
        "قارن النتيجة بما تحتاجه فعلا، لا بما يقوله الناس عنها.",
        "احتفظ بالأدوات السهلة والمفيدة فقط."
      ],
      prompt: "أحتاج AI للكتابة، الصور، الفيديو، الترجمة، والعروض. ساعدني في اختيار نوع الأداة المناسبة لكل مهمة بلغة بسيطة."
    },
    "ai-safety": {
      title: "ماذا أنتبه له؟",
      intro: "AI مساعد مفيد، لكن أنت من يقرر ماذا يرى، وماذا لا يرى، وما الذي يجب أن يراجعه إنسان قبل الاعتماد عليه.",
      sections: [
        ["احم معلوماتك", "لا تضع كلمات مرور، أو هويات، أو تفاصيل بنكية، أو ملفات عمل خاصة إلا إذا كنت تعرف كيف تتعامل الأداة مع البيانات."],
        ["راجع الإجابات الواثقة", "AI قد يبدو هادئا وواثقا حتى عندما يخطئ، لذلك اعتبر الإجابة المهمة مسودة أولى لا حقيقة نهائية."],
        ["استخدم المواقع الرسمية", "بعض المواقع تقلد الأدوات المعروفة، لذلك سجّل وادفع وارفع الملفات فقط عبر الروابط الرسمية."],
        ["لا تترك القرار كله لـ AI", "AI يساعد في الصياغة والأفكار والشرح، لكن القرارات الطبية والمالية والقانونية والتجارية تحتاج مراجعة بشرية."]
      ],
      workflow: [
        "انظر إلى المهمة قبل أن تنسخها إلى AI.",
        "احذف الأسماء الحقيقية وكلمات المرور وأرقام الهوية والبيانات الحساسة.",
        "استبدل الأسماء بعبارات مثل عميل A أو شركة B.",
        "اطلب من AI أن يعمل على النسخة المنظفة.",
        "راجع النتيجة بنفسك قبل الإرسال أو النشر."
      ],
      prompt: "راجع هذه الرسالة قبل أن أرسلها للعميل. أخبرني هل فيها معلومة خاصة أو وعد قوي أو كلام يحتاج مراجعة."
    },
    "beginner-path": {
      title: "طريق المبتدئ",
      intro: "تعلم AI يشبه دخول طريق جديد: ابدأ بمسار هادئ، وامش بخطوات قصيرة، ثم وسّع استخدامك عندما ترتاح.",
      sections: [
        ["الخطوة 1: افتح حسابا واحدا", "اختر أداة معروفة وافتح حسابا مجانيا واحدا فقط في البداية."],
        ["الخطوة 2: تعلم ماذا تكتب", "النتيجة الجيدة تأتي غالبا من طلب واضح يقول المهمة، والطول، ولمن النتيجة."],
        ["الخطوة 3: جرّب خمس مهام صغيرة", "اسأل سؤالا، واكتب رسالة، ولخّص نصا، واطلب أفكارا، واشرح موضوعا ببساطة."],
        ["الخطوة 4: تعلّم الحدود", "جزء من تعلم AI هو أن تعرف متى يفيدك، ومتى يجب أن تتوقف وتتحقق."]
      ],
      workflow: [
        "اليوم 1: افتح حسابا مجانيا واسأل سؤالا بسيطا.",
        "اليوم 2: اكتب برومبت أوضح فيه المهمة والجمهور والأسلوب.",
        "اليوم 3: استخدم AI لرسالة ولتلخيص ولفهم موضوع.",
        "اليوم 4: جرّب مهمة إبداعية مثل صورة أو مخطط عرض.",
        "اليوم 5: اكتب قاعدة لنفسك: متى أثق بالنتيجة، ومتى أراجعها."
      ],
      prompt: "اصنع لي خطة 5 أيام لتعلم AI عن طريق مهام صغيرة في العمل. اجعلها سهلة جدا لشخص لا يعرف إلا الكتابة."
    },
    "common-ai-tools": {
      title: "أشهر أدوات AI",
      intro: "تخيل أنك دخلت سوق أدوات AI؛ كل أداة لها شخصية ووظيفة وسعر مختلف.",
      sections: [
        ["ChatGPT", "افتح chatgpt.com وابدأ بمهمة يومية مثل كتابة رسالة أو تلخيص نص. الخطة المجانية تكفي للتعلم، لكن الحدود والنماذج المتاحة قد تتغير."],
        ["Claude", "افتح claude.ai عندما يكون لديك نص طويل أو تريد كتابة هادئة وواضحة. توجد حدود استخدام مجانية وقد تتغير حسب البلد والحساب."],
        ["Gamma", "افتح gamma.app/signup عندما تريد عرضا تقديميا. اكتب الموضوع وعدد الشرائح والجمهور، ثم راجع المخطط قبل توليد العرض."],
        ["Midjourney", "Midjourney مناسب للصور الفنية القوية، لكنه غالبا يعتمد على الاشتراك المدفوع، لذلك تحقق من السعر قبل البدء."],
        ["برومبت بداية بسيط", "اكتب: أنا جديد في AI. ساعدني في اختيار أداة واحدة للكتابة، وأداة للعروض، وأداة للصور، وأداة للفيديو. اشرح من أين أبدأ مجانا."]
      ],
      workflow: [
        "ابدأ بأداة محادثة واحدة مثل ChatGPT أو Gemini أو Claude أو Doubao.",
        "جرّب مهمة كتابة قصيرة: رسالة عميل أو ملخص نص.",
        "إذا احتجت عرضا تقديميا، افتح Gamma واكتب الموضوع وعدد الشرائح.",
        "إذا احتجت صورة، افتح أداة صور واكتب المنتج والكلمات والألوان والمقاس.",
        "إذا احتجت فيديو، حضّر 9 صور قصة أولا ثم اجمعها في محرر فيديو."
      ],
      prompt: "أحتاج AI للكتابة، الصور، الفيديو، العروض، الترجمة، والموسيقى. رشح لي أداة أو أداتين لكل مهمة وقل لي من أين أبدأ مجانا."
    },
    "write-with-ai": {
      title: "أريد أن أكتب باستخدام AI",
      intro: "الكتابة مع AI مثل الجلوس مع محرر يساعدك أن تقول نفس الفكرة بوضوح أكثر.",
      sections: [
        ["ابدأ بنص حقيقي", "لا تقل: اكتب شيئا جميلا؛ أعطه الرسالة أو الفكرة أو المشكلة الحقيقية."],
        ["قل له النبرة", "هل تريد النص ودودا، رسميا، قصيرا، أو مناسبا للواتساب؟ هذه التفاصيل تغير النتيجة."],
        ["عدّل ولا تبدأ من جديد", "إذا كانت النتيجة طويلة، قل: اجعلها أقصر وأدفأ وأسهل للعميل."]
      ],
      caseStudy: {
        title: "رسالة تأخير طلب لعميل",
        scenario: "صاحب متجر يريد إخبار العميل أن الطلب سيتأخر يومين بدون أن يبدو باردا أو مهملا.",
        steps: [
          "افتح ChatGPT أو أداة كتابة مشابهة.",
          "الصق الرسالة الأصلية والطلب الواضح.",
          "اطلب نسخة أقصر وألطف إذا كانت النتيجة طويلة.",
          "راجع الاسم والوقت والسبب قبل الإرسال."
        ]
      },
      prompt: "أعد كتابة رسالة واتساب للعميل. اجعلها واضحة، مهذبة، دافئة، وليست طويلة. الرسالة الأصلية: مرحبا، طلبك تأخر وسيصل بعد يومين. نعتذر."
    },
    "make-slides": {
      title: "أريد عمل عرض تقديمي",
      intro: "عمل الشرائح مع AI مثل إعطاء ملاحظات مبعثرة لشخص يحولها إلى بداية ووسط ونهاية.",
      sections: [
        ["استخدم أداة مناسبة", "Gamma مناسب للمستخدم العادي لأنه يحول الفكرة إلى عرض قابل للتعديل بدون البدء من صفحة بيضاء."],
        ["حدد عدد الشرائح", "قل له كم شريحة تريد، ومن الجمهور، وما النتيجة المطلوبة."],
        ["راجع قبل التصدير", "افتح الشرائح واقرأ النصوص، ثم عدل العناوين والصور قبل مشاركة العرض."]
      ],
      workflow: [
        "افتح Gamma من الموقع الرسمي.",
        "اختر إنشاء عرض تقديمي جديد.",
        "اكتب أن العرض من 6 شرائح وباللغة الإنجليزية.",
        "الصق البرومبت الكامل ثم راجع المخطط قبل التوليد.",
        "بعد توليد الشرائح، افتح كل شريحة وعدل النص والصور.",
        "صدّر العرض PDF أو PowerPoint عندما يصبح جاهزا."
      ],
      prompt: "أنشئ عرضا من 6 شرائح باللغة الإنجليزية لصاحب مقهى صغير في الرياض. الموضوع: خطة ترويج نهاية الأسبوع باستخدام AI. اجعل اللغة سهلة وعملية."
    },
    "create-images": {
      title: "أريد إنشاء صورة",
      intro: "إنشاء الصور بالذكاء الاصطناعي مثل وصف مشهد لمصمم يبدأ بالرسم بسرعة.",
      sections: [
        ["اكتب الكلمات أولا", "قبل فتح أداة الصور، حدد الكلمات التي يجب أن تظهر في الصورة."],
        ["صف المشهد والأسلوب", "قل نوع المنتج، الألوان، الإضاءة، الخلفية، والمزاج العام."],
        ["افحص النتيجة على الجوال", "إذا كانت الكلمات غير واضحة أو المنتج تغيّر، اطلب إعادة توليد بتعليمات أدق."]
      ],
      workflow: [
        "اكتب الكلمات التي يجب أن تظهر في الصورة قبل فتح الأداة.",
        "افتح image-2 أو أداة الصور التي تستخدمها.",
        "الصق وصف المنتج، النص، الألوان، المقاس، والأسلوب.",
        "ولّد النسخة الأولى.",
        "افحص الأخطاء: هل النص صحيح؟ هل المنتج واضح؟ هل الصورة مناسبة للجوال؟",
        "إذا كان النص خاطئا، اطلب تعديل النص والتخطيط فقط."
      ],
      prompt: "أنشئ بوستر مربع لإنستغرام عن تخفيض عطر عود. الكلمات: Weekend Oud Sale، Up to 30% OFF، Friday & Saturday Only، Shop Now. الأسلوب فخم سعودي، أسود وبني دافئ وذهبي."
    },
    "make-videos": {
      title: "أريد عمل فيديو",
      intro: "أسهل طريقة للمبتدئ: لا تبدأ بالفيديو مباشرة، ابدأ بصور القصة ثم اجمعها.",
      sections: [
        ["ابدأ بصورة", "استخدم أداة صور لإنشاء لقطات القصة أولا، لأن التحكم في الصورة أسهل من التحكم في الفيديو."],
        ["اصنع 9 لقطات", "اكتب 9 مشاهد مرتبة: بداية، تفاصيل المنتج، الاستخدام، النص، ثم لقطة النهاية."],
        ["اجمعها في محرر فيديو", "ضع الصور في CapCut أو Canva أو أي محرر، أضف حركة خفيفة وموسيقى، ثم صدّر الفيديو."]
      ],
      workflow: [
        "اكتب قصة الفيديو في 9 لقطات قبل فتح أداة الفيديو.",
        "استخدم image-2 أو أداة صور لإنشاء كل لقطة عمودية 9:16.",
        "تأكد أن المنتج نفسه يظهر في كل الصور بنفس اللون والإضاءة.",
        "احذف أي لقطة غريبة وأعد توليدها وحدها.",
        "افتح CapCut أو Canva أو محرر مشابه.",
        "ضع الصور التسع بالترتيب، وأضف حركة زوم خفيفة ونصوصا وموسيقى.",
        "صدّر MP4 وشاهده على الهاتف قبل النشر."
      ],
      prompt: "أنشئ 9 صور عمودية لقصة فيديو مدته 15 ثانية عن صندوق هدايا تمر رمضاني. حافظ على نفس الصندوق، نفس الإضاءة الذهبية، ونفس الأسلوب الفخم في كل صورة."
    },
    "make-a-plan": {
      title: "أريد خطة",
      intro: "عمل الخطة مع AI مثل إفراغ حقيبة مليئة بالأفكار على الطاولة وطلب ترتيبها في صناديق واضحة.",
      sections: [
        ["ابدأ بالهدف", "قل له ماذا تريد أن تطلق أو تنظم، ومتى الموعد، ومن المسؤول."],
        ["اطلب جدولا", "اطلب منه تقسيم الخطة إلى أيام أو خطوات حتى لا تبقى كلاما عاما."],
        ["حوّلها إلى قائمة تنفيذ", "بعد الخطة الأولى، اطلب قائمة مهام قصيرة تستطيع نسخها إلى واتساب أو Excel."]
      ],
      workflow: [
        "افتح أداة محادثة AI.",
        "اكتب الهدف والموعد والجمهور والموارد المتاحة.",
        "اطلب خطة 7 أيام مع المهام والمخاطر وقائمة مراجعة.",
        "احذف الخطوات غير المناسبة لواقعك.",
        "اطلب نسخة مختصرة كقائمة تنفيذ يومية."
      ],
      prompt: "أنشئ خطة إطلاق لمدة 7 أيام لمشروب قهوة مثلجة بالزعفران في مقهى صغير بالرياض. يوم الإطلاق الجمعة القادمة. أضف المهام اليومية، التجهيزات، دور الموظفين، محتوى إنستغرام، المخاطر، وقائمة مراجعة. استخدم لغة سهلة."
    },
    "translate": {
      title: "أريد ترجمة",
      intro: "الترجمة مع AI مثل عبور جسر بالمعنى، لا نقل الكلمات واحدة واحدة.",
      sections: [
        ["قل له الجمهور", "ترجمة رسالة لعميل سعودي تختلف عن ترجمة مستند رسمي أو إعلان."],
        ["اطلب ترجمة طبيعية", "قل له لا تترجم حرفيا، بل اجعل النص طبيعيا ومفهوما."],
        ["اطلب ترجمة عكسية", "إذا كنت لا تعرف اللغة الناتجة، اطلب ترجمة عكسية إلى اللغة التي تفهمها لمراجعة المعنى."]
      ],
      workflow: [
        "الصق الرسالة الأصلية.",
        "اكتب لمن ستُرسل الرسالة وفي أي بلد.",
        "اطلب ترجمة طبيعية وليست حرفية.",
        "اطلب ترجمة عكسية قصيرة لتفهم المعنى.",
        "راجع الاسم والوقت والسعر والعنوان قبل الإرسال."
      ],
      prompt: "ترجم هذه الرسالة إلى عربية طبيعية لعملاء في السعودية. اجعلها ودودة وبسيطة: Hello, your order has been confirmed. Delivery will arrive tomorrow between 4 PM and 8 PM. Thank you for shopping with us. ثم أعطني ترجمة عكسية إنجليزية بسيطة حتى أراجع المعنى."
    },
    "grow-business": {
      title: "أريد تطوير عملي",
      intro: "استخدام AI في العمل مثل إضافة مساعد صغير خلف الكاونتر يكتب ويرتب ويرد بسرعة.",
      sections: [
        ["أعطه تفاصيل المنتج", "لا تطلب أفكارا عامة؛ اكتب اسم المنتج، العميل، المدينة، والسعر إن وجد."],
        ["اطلب نصوصا جاهزة", "اطلب وصف منتج، رد واتساب، عناوين إعلان، وفكرة عرض واحدة."],
        ["بدّل الأمثلة بتفاصيلك", "قبل النشر، أضف اسم متجرك، السعر الحقيقي، ومنطقة التوصيل."]
      ],
      workflow: [
        "اكتب اسم المنتج والمدينة ونوع العملاء.",
        "اطلب وصفا قصيرا ورد واتساب وثلاثة عناوين إعلان.",
        "اختر النص الأقرب لأسلوب متجرك.",
        "اطلب نسخة أقصر للواتساب أو إنستغرام.",
        "راجع السعر والتوصيل واسم المتجر قبل النشر."
      ],
      prompt: "أبيع صندوق كيك تمر فاخر في الرياض. العملاء هم العائلات، مشترو الهدايا للمكاتب، ومشترو هدايا رمضان. اكتب لي: وصفا قصيرا للمنتج، رد واتساب عند سؤال العميل هل متوفر، ثلاثة عناوين إعلان لإنستغرام، وفكرة عرض بسيطة. استخدم لغة سهلة."
    },
    "choose-right-tool": {
      title: "أي أداة أستخدم؟",
      intro: "اختيار أداة AI مثل اختيار وسيلة سفر: الدراجة والسيارة والطائرة كلها تنقلك، لكن ليست لنفس الرحلة.",
      sections: [
        ["ابدأ بالمهمة", "لا تبدأ باسم الأداة؛ ابدأ بسؤال: هل أريد كتابة، صورة، فيديو، عرضا، أم تلخيصا؟"],
        ["اختر أداة واحدة لكل نوع", "المبتدئ لا يحتاج عشر أدوات، بل أداة محادثة وأداة صور وأداة عروض وربما أداة فيديو."],
        ["جرّب مجانا أولا", "ادفع فقط عندما تصبح الأداة جزءا من عملك وتوفر وقتا حقيقيا."]
      ],
      workflow: [
        "اكتب قائمة مهامك: كتابة، صور، عروض، تلخيص، فيديو، موسيقى.",
        "اطلب من AI ترشيح أداة أو أداتين لكل مهمة.",
        "افتح الموقع الرسمي لكل أداة مرشحة.",
        "جرّب الخطة المجانية إن وجدت.",
        "احتفظ فقط بالأدوات التي استخدمتها فعلا خلال أسبوع."
      ],
      prompt: "لدي فريق تسويق صغير يحتاج إلى كتابة منشورات، عمل صور، عمل عروض، تلخيص مستندات، إنشاء فيديوهات قصيرة، وموسيقى خلفية بسيطة. رشح لي أداة أو أداتين لكل مهمة، وقل لي من أين أبدأ مجانا."
    },
    "what-is-api": {
      title: "ما هو API؟",
      intro: "API مثل نافذة الخدمة خلف المطعم: المستخدم يطلب من ARABAI، وARABAI يرسل الطلب إلى AI في الخلفية ثم يعيد النتيجة.",
      sections: [
        ["الفكرة ببساطة", "صفحة المحادثة العادية تعني أنك تذهب إلى الكاونتر بنفسك، أما API فيجعل الموقع يرسل الطلب بدلا منك."],
        ["لماذا يهم ARABAI", "إذا أردنا لاحقا زر كتابة أو صورة أو فيديو داخل ARABAI، فـ API هو الطريق الذي يحمل طلب المستخدم إلى أداة AI المناسبة."],
        ["لماذا يوجد رصيد", "كل إجابة أو صورة أو فيديو يحتاج عملا حقيقيا من AI، والرصيد هو الاسم البسيط لهذه التكلفة بدل شرح التوكنات والحسابات الصعبة."]
      ],
      workflow: [
        "اختر وظيفة صغيرة داخل ARABAI مثل اسأل AI أو أنشئ صورة.",
        "اكتب ماذا سيدخل المستخدم وماذا يجب أن يحصل في النهاية.",
        "اختر مزود AI الذي سينفذ المهمة في الخلفية.",
        "احتفظ بمفتاح API في الخادم وليس في الصفحة العامة.",
        "حوّل التكلفة الخلفية إلى رصيد بسيط يفهمه المستخدم."
      ],
      prompt: "اشرح API لموقع ARABAI بلغة بسيطة. استخدم مثال نافذة الخدمة في المطعم، واشرح كيف يضغط المستخدم زرا، ثم يرسل ARABAI الطلب إلى AI، ثم تعود النتيجة، وكيف يدفع الرصيد تكلفة العمل."
    },
    "official-api-platforms": {
      title: "منصات API الرسمية",
      intro: "منصات API الرسمية هي المطابخ الأصلية التي تنتج قدرة AI، ويمكن لـ ARABAI أن يشتري منها ثم يقدمها للمستخدم بشكل أبسط.",
      sections: [
        ["ما معناها", "هي منصات الشركات الأصلية مثل OpenAI و Anthropic و Google وغيرها، حيث تحصل على مفتاح API وحساب دفع وحدود استخدام."],
        ["لماذا نستخدمها", "المنصة الرسمية غالبا أوضح في القواعد والفواتير والاعتمادية، وهذا مهم عندما يدفع المستخدمون مقابل رصيد."],
        ["كيف نشرحها للمستخدم", "المستخدم لا يحتاج أن يرى المفاتيح أو الإعدادات؛ هو يرى زر المهمة والنتيجة، وARABAI يدير الطريق في الخلفية."]
      ],
      workflow: [
        "اكتب أنواع المهام التي تريدها: محادثة، صورة، فيديو، موسيقى، عروض، مستندات.",
        "اختر منصة رسمية مناسبة لكل نوع.",
        "أنشئ حساب اختبار فقط عندما تكون جاهزا.",
        "أنشئ مفتاح API واحفظه بشكل خاص.",
        "ضع حد إنفاق صغير قبل أي إطلاق للمستخدمين."
      ],
      prompt: "ساعدني في مقارنة منصات API الرسمية لموقع ARABAI. اذكر الكتابة والصور والفيديو والصوت، والحساب، ومفتاح API، وحدود الدفع، والخصوصية، وأفضل استخدام لكل منصة بلغة بسيطة."
    },
    "api-price-comparison": {
      title: "مقارنة أسعار API",
      intro: "سعر API مثل عداد يعمل خلف الستار: النص القصير رحلة قصيرة، أما الصور والفيديو والموسيقى فهي رحلات أطول وأثقل.",
      sections: [
        ["ما الذي يرفع السعر", "النص القصير أرخص غالبا، أما الصور والفيديو والموسيقى فتحتاج عملا أكبر وبالتالي تستهلك رصيدا أسرع."],
        ["لماذا يهم ARABAI", "قبل بيع أي رصيد يجب معرفة تكلفة المهام الشائعة حتى لا يكون السعر سهلا للمستخدم وخاسرا للمنصة."],
        ["كيف نشرحه ببساطة", "الرصيد ليس رقما غامضا؛ هو طريقة سهلة لتجميع تكاليف صغيرة كثيرة في رقم يفهمه المستخدم."]
      ],
      workflow: [
        "اكتب المهام التي سيستخدمها الناس بالرصيد.",
        "قدّر شهرا صغيرا ومتوسطا وثقيلا لكل مهمة.",
        "افصل تكلفة المحادثة عن الصور والفيديو والموسيقى.",
        "أضف هامش أمان لأن الاستخدام يزيد بسرعة.",
        "حوّل النتيجة إلى باقات رصيد سهلة الفهم."
      ],
      prompt: "اصنع ميزانية رصيد بسيطة لـ ARABAI. استخدم أمثلة: 1000 إجابة قصيرة، 100 صورة، 20 تجربة فيديو قصيرة، و50 مسودة موسيقى شهريا. اعرض جدول تكلفة ومخاطر وحماية هامش الربح."
    },
    "ai-gateway": {
      title: "ما هو AI Gateway؟",
      intro: "AI Gateway مثل محطة قطار أو مكتب تحكم واحد: أنت تدخل من باب واحد، لكن في الخلفية توجد طرق كثيرة ونماذج كثيرة.",
      sections: [
        ["ما معناها", "Gateway ليس نموذجا واحدا، بل محطة تسمح لحساب واحد بالوصول إلى نماذج كثيرة بدون بناء طريق جديد كل مرة."],
        ["لماذا يهم ARABAI", "يفيد ARABAI لأنه يسمح بتجربة نماذج كثيرة بسرعة، وتقديم محفظة واحدة للمستخدم بدلا من إرساله إلى مواقع كثيرة."],
        ["ما الذي نفحصه", "الراحة وحدها لا تكفي؛ يجب فحص السعر، والخصوصية، والسجلات، والاستقرار، وخطة الطوارئ."]
      ],
      workflow: [
        "اختر Gateway واحدا للتجربة، لا للاعتماد الكامل من أول يوم.",
        "ضع رصيدا صغيرا أو حد إنفاق واضحا.",
        "اختبر نفس المهمة على نموذجين أو ثلاثة.",
        "قارن السرعة والجودة والسعر وجودة العربية.",
        "احتفظ بطريق API رسمي احتياطي للمهام المهمة."
      ],
      prompt: "اشرح AI Gateway مثل محطة قطار لموقع ARABAI. مدخل واحد، محفظة واحدة، نماذج كثيرة، أسعار وسرعات مختلفة. أعطني قائمة إعداد آمنة للمبتدئ ومتى أستخدم Gateway ومتى أستخدم API رسمي."
    },
    "gateway-platforms": {
      title: "منصات AI Gateway الشائعة",
      intro: "منصات Gateway مثل محطات مختلفة: واحدة فيها قطارات أكثر، وأخرى أوضح في الفواتير، وثالثة أقوى في السجلات والتحكم.",
      sections: [
        ["كيف نقارن", "لا يكفي عدد النماذج؛ المهم أيضا نوع النماذج، وطريقة الدفع، والسجلات، والخصوصية، وسهولة المتابعة."],
        ["لماذا يهم ARABAI", "ARABAI قد يستخدم Gateway للتنوع والسرعة، لكنه يحتاج أيضا طريقا رسميا احتياطيا للمهام الحساسة أو المهمة."],
        ["ما الذي يراه المستخدم", "المستخدم يرى زر مهمة ورصيدا بسيطا، لكن المنصة في الخلفية تختار الطريق الأنسب."]
      ],
      workflow: [
        "اكتب النماذج أو أنواع المهام التي تحتاجها فعلا.",
        "افحص هل المنصة تدعمها.",
        "راجع طريقة الدفع ومفاتيح API والسجلات.",
        "اختبر مهمة صغيرة قبل نقل أي عمل حقيقي.",
        "اختر منصة احتياطية أو API رسمي كخطة بديلة."
      ],
      prompt: "اصنع جدول مقارنة لمنصات AI Gateway لموقع ARABAI. الأعمدة: أنواع النماذج، الدفع، حفظ مفاتيح API، سجلات الاستخدام، الخصوصية، قيمة النسخة الاحتياطية، والمخاطر."
    },
    "gateway-risks": {
      title: "مخاطر AI Gateway",
      intro: "Gateway جسر مفيد، لكن أي جسر يستخدمه عمل مدفوع يحتاج فحصا قبل مرور المستخدمين عليه.",
      sections: [
        ["الخطر الأول", "إذا تغير السعر أو توقف نموذج مهم، قد ترتفع تكلفة ARABAI أو تتوقف بعض المهام فجأة."],
        ["الخطر الثاني", "إذا كانت الخصوصية غير واضحة، فقد لا يكون مناسبا لإرسال بيانات عملاء أو ملفات حساسة."],
        ["كيف نحمي المستخدم", "نجعل التجربة بسيطة في الواجهة، لكن في الخلفية نضع حدود إنفاق وسجلات واختبارات وطرق احتياطية."]
      ],
      workflow: [
        "اقرأ سياسة الخصوصية ومعالجة البيانات.",
        "افحص هل تحفظ المنصة الطلبات أو الملفات.",
        "ضع حد إنفاق وتنبيهات.",
        "لا ترسل بيانات عملاء حقيقية في الاختبار الأول.",
        "جهز طريقا بديلا إذا توقفت المنصة."
      ],
      prompt: "راجع مخاطر استخدام AI Gateway لموقع AI بنظام رصيد مثل ARABAI. افحص الخصوصية، الثبات، مفاجآت الفواتير، توفر النماذج، الاسترجاع، الاعتماد على مزود واحد، وخطة بديلة."
    },
    "ai-automation": {
      title: "أتمتة AI",
      intro: "أتمتة AI مثل عامل مكتب هادئ يكرر المهمة نفسها بالخطوات نفسها كل مرة، بدلا من أن تنسخ وتلصق بيدك طوال اليوم.",
      sections: [
        ["ما معناها", "الأتمتة هنا لا تعني أن AI يفعل كل شيء وحده، بل تعني أنك تختار مهمة متكررة وتضع لها مدخلا وخطوة AI ونتيجة ومراجعة بشرية."],
        ["أين تبدأ", "أفضل بداية ليست أصعب مشروع، بل مهمة صغيرة مثل تحويل نموذج عميل إلى مسودة رد، أو تحويل ملاحظات إلى ملخص مرتب."],
        ["ما الذي لا ننساه", "الأتمتة الجيدة تحتاج بيانات آمنة، وتجربة صغيرة، ومراجعة بشرية قبل أن تمس عملا حقيقيا أو عميلا حقيقيا."]
      ],
      workflow: [
        "اختر مهمة متكررة تحدث كل أسبوع.",
        "حدد المدخل، وما الذي سيفعله AI، وما النتيجة، ومن يراجعها.",
        "ابدأ ببيانات وهمية أو آمنة.",
        "أضف خطوة موافقة بشرية قبل الإرسال أو النشر.",
        "اربطها بالعمل الحقيقي فقط بعد نجاح الاختبار عدة مرات."
      ],
      prompt: "صمم لي أتمتة AI بسيطة لعملي. المدخل نموذج عميل، خطوة AI صياغة رد أولي، والنتيجة رسالة يراجعها إنسان قبل الإرسال. اشرحها بلغة سهلة جدا."
    }
  };

  const fallbackWorkflow = arabicWorkflowFor(id, article);
  const fallback = {
    title: getArabicTitle(id, article?.title || "مقال AI"),
    intro: "هذه نسخة عربية مختصرة من المقال. نعرض الفكرة الأساسية والخطوات العملية أولا، ثم يمكن الرجوع للنسخة الإنجليزية للتفاصيل الكاملة إلى أن نكمل الترجمة النهائية.",
    sections: [
      ["الفكرة ببساطة", article?.intro || "استخدم AI في مهمة صغيرة وواضحة بدلا من سؤال عام."],
      ["كيف تستخدمها", "اختر أداة مناسبة، اكتب طلبا واضحا، راجع النتيجة، ثم اطلب تعديلا واحدا في كل مرة."],
      ["ماذا تنتبه له", "لا ترسل معلومات خاصة، ولا تعتمد على النتيجة النهائية قبل مراجعتها بنفسك."]
    ],
    workflow: fallbackWorkflow,
    prompt: article?.prompt || ""
  };

  return { ...fallback, ...(overrides[id] || {}) };
}

function arabicWorkflowFor(id, article) {
  const workflows = {
    "write-with-ai": [
      "افتح ChatGPT أو أداة كتابة موثوقة.",
      "اكتب الرسالة الأصلية التي تريد تحسينها.",
      "حدد الأسلوب: رسمي، ودي، قصير، أو مناسب للواتساب.",
      "اطلب تعديلا واحدا بناء على النتيجة: أقصر، أو أدفأ، أو أوضح.",
      "انسخ النص النهائي بعد مراجعة الاسم والوقت."
    ],
    "spreadsheets": [
      "اجمع الأرقام في سطور قصيرة وواضحة.",
      "الصق السطور في AI واطلب جدولا منظما.",
      "اطلب منه حساب المجموع والمتوسط وأفضل منتج.",
      "انسخ الجدول إلى Excel أو Google Sheets.",
      "راجع الأرقام بآلة حاسبة قبل استخدامها في قرار مالي."
    ],
    "edit-images": [
      "افتح أداة تعديل صور وارفع صورة المنتج.",
      "اكتب ما يجب أن يبقى كما هو: الشكل، اللون، الملصق، والظل.",
      "اطلب تنظيف الخلفية فقط دون تغيير المنتج.",
      "قارن الصورة قبل وبعد.",
      "نزّل الصورة فقط إذا بقي المنتج مطابقا للأصل."
    ],
    "make-music": [
      "حدد أين ستستخدم الموسيقى: إعلان، مقدمة، فيديو، أو خلفية متجر.",
      "اكتب المدة والمزاج والآلات وهل تريد غناء أم لا.",
      "الصق الطلب في أداة موسيقى AI.",
      "استمع للمقطع مع الفيديو أو الإعلان.",
      "نزّل النسخة التي تدعم المنتج ولا تسرق الانتباه."
    ],
    "summarize-documents": [
      "الصق النص أو ارفع المستند إذا كانت الأداة تسمح بذلك.",
      "اطلب النقاط المهمة: السعر، الموعد، المخاطر، والمهام المطلوبة.",
      "اطلب فصل الحقائق عن الاقتراحات.",
      "انسخ قائمة المهام إلى ملاحظات العمل.",
      "افتح المستند الأصلي وتحقق من الأرقام المهمة."
    ],
    "learn-something": [
      "قل لـ AI مستواك الحقيقي ولماذا تريد تعلم الموضوع.",
      "اطلب شرحا بسيطا بمثال واحد قريب من عملك.",
      "اطلب خمسة أسئلة تدريب سهلة.",
      "أجب عنها ودع AI يصحح لك.",
      "لا تنتقل للدرس التالي حتى تفهم الأول."
    ],
    "social-content": [
      "اكتب نوع العمل والجمهور والمنصة.",
      "اطلب تقويم محتوى لأسبوعين.",
      "احذف الأفكار التي لا يستطيع فريقك تصويرها.",
      "اطلب تعليقات قصيرة وأفكار صور للمنشورات المختارة.",
      "ضع أول ثلاثة منشورات في جدول نشر."
    ],
    "ai-apps-and-coding-tools": [
      "اكتب المهمة التي تريد إنجازها قبل اختيار الأداة.",
      "إذا كانت المهمة كتابة أو صورا أو عروضا أو فيديو، ابدأ بأدوات المستخدم العادي.",
      "إذا كانت المهمة بناء موقع أو تطبيق أو أتمتة، انظر إلى أدوات مثل Cursor وClaude Code وCodex.",
      "افتح الموقع الرسمي وصفحة السعر قبل التثبيت أو الدفع.",
      "لا تضع كلمات مرور أو مفاتيح API أو بيانات عملاء في أداة لا تعرفها."
    ],
    "login-pages": [
      "ابحث عن الموقع الرسمي أو استخدم رابطا موثوقا.",
      "تحقق من تهجئة النطاق قبل تسجيل الدخول.",
      "أنشئ الحساب ببريدك الشخصي.",
      "ابدأ بالخطة المجانية إذا كانت موجودة.",
      "احفظ صفحة الدخول الصحيحة لتجنب المواقع المزيفة لاحقا."
    ],
    "subscription-pages": [
      "اكتب ماذا فعلت بـ AI هذا الأسبوع.",
      "تحقق هل الخطة المجانية منعتك من إكمال العمل.",
      "قارن السعر الشهري بالوقت الذي وفرته.",
      "اختر الدفع الشهري أولا إذا كنت ما زلت تختبر.",
      "ألغ الأدوات التي لا تستخدمها كل أسبوع."
    ],
    "price-comparison": [
      "اختر ثلاث أدوات تفكر فيها بجدية.",
      "اكتب السعر الشهري، حدود المجاني، أفضل استخدام، وجودة التصدير.",
      "اطلب من AI تحويل المعلومات إلى جدول بسيط.",
      "اختر حسب مهمتك الحقيقية، لا حسب أطول قائمة مميزات.",
      "راجع الاختيار بعد شهر."
    ],
    "chatgpt-advanced": [
      "افتح ChatGPT من الصفحة الرسمية.",
      "اكتب مهمة واحدة حقيقية مثل رسالة عميل أو خطة قصيرة.",
      "اطلب نسخة أولى.",
      "اكتب له تعديلا واحدا: أقصر، أو أوضح، أو ألطف.",
      "راجع النتيجة قبل إرسالها."
    ],
    "doubao-advanced": [
      "افتح Doubao من الموقع الرسمي.",
      "اكتب سؤالا يوميا أو مهمة كتابة بسيطة.",
      "اطلب إجابة قصيرة أولا.",
      "اطلب صيغة تصلح للواتساب أو العمل.",
      "راجع الأسماء والأرقام قبل النسخ."
    ],
    "gemini-advanced": [
      "افتح Gemini من الموقع الرسمي.",
      "اكتب السؤال أو الصق النص الذي تريد فهمه.",
      "اطلب شرحا بسيطا أو ملخصا قصيرا.",
      "اطلب أمثلة عملية إذا كانت الإجابة عامة.",
      "تحقق من الروابط والمعلومات الحديثة قبل الاعتماد عليها."
    ],
    "claude-advanced": [
      "افتح Claude من الموقع الرسمي.",
      "الصق النص الطويل أو المسودة.",
      "اطلب تحسين الوضوح والأسلوب.",
      "اطلب قائمة بما هو ناقص أو غير واضح.",
      "اقرأ النسخة النهائية قبل إرسالها."
    ],
    "deepseek-advanced": [
      "افتح DeepSeek من الموقع الرسمي.",
      "اكتب القرار أو المشكلة التي تريد التفكير فيها.",
      "اطلب مزايا وعيوب ومخاطر.",
      "اطلب توصية بسيطة بلغة عادية.",
      "تحقق من الحقائق والأسعار من مصدر آخر."
    ],
    "kimi-advanced": [
      "افتح Kimi من الموقع الرسمي.",
      "الصق النص الطويل أو ارفع الملف إذا كان متاحا.",
      "اطلب النقاط الرئيسية والمهام والمخاطر.",
      "اطلب ملخصا قصيرا للمدير أو العميل.",
      "ارجع للمستند الأصلي عند وجود أرقام أو مواعيد."
    ],
    "image-tools-advanced": [
      "اكتب وصف الصورة قبل فتح الأداة.",
      "حدد المنتج والكلمات والألوان والمقاس.",
      "الصق البرومبت في أداة الصور.",
      "افحص النص داخل الصورة والتفاصيل الغريبة.",
      "نزّل الصورة بعد تجربتها بحجم الهاتف."
    ],
    "video-tools-advanced": [
      "اكتب المشاهد قبل فتح أداة الفيديو.",
      "ابدأ بصورة أو لقطة واحدة بدلا من فيديو طويل.",
      "حدد الحركة والكاميرا والنص الظاهر.",
      "ولّد نسخة قصيرة واختبرها.",
      "أضف التعليقات والموسيقى في محرر فيديو."
    ],
    "music-tools-advanced": [
      "حدد مدة الموسيقى ومكان استخدامها.",
      "اكتب المزاج والآلات وهل تريد غناء أم لا.",
      "الصق الطلب في أداة موسيقى.",
      "استمع للمقطع مع الفيديو أو الإعلان.",
      "احفظ النسخة التي لا تشتت الانتباه."
    ],
    "official-api-platforms": [
      "اكتب أنواع المهام التي تريد تشغيلها: محادثة، صورة، فيديو، صوت.",
      "طابق كل مهمة مع مزود رسمي مناسب.",
      "افتح حساب اختبار فقط عند الحاجة.",
      "أنشئ مفتاح API واحفظه في الخادم.",
      "ضع حد إنفاق صغير قبل أي تجربة عامة."
    ],
    "api-price-comparison": [
      "اكتب المهام التي قد يشتريها المستخدم بالرصيد.",
      "قدّر استخداما قليلا ومتوسطا وثقيلا لكل مهمة.",
      "افصل تكلفة النص عن الصور والفيديو.",
      "أضف هامش أمان للمهام الإبداعية.",
      "حوّل النتيجة إلى باقات رصيد مفهومة."
    ],
    "multi-model-management": [
      "اكتب أنواع العمل الموجودة عندك.",
      "اختر نموذجا مناسبا لكل نوع.",
      "حدد متى تستخدم النموذج الأرخص ومتى تستخدم الأقوى.",
      "اختبر نفس المهمة على نموذجين.",
      "اكتب خريطة بسيطة يستطيع الفريق فهمها."
    ],
    "ai-automation": [
      "اختر مهمة متكررة تحدث كل أسبوع.",
      "حدد المدخل، وما الذي سيفعله AI، وما النتيجة، ومن يراجعها.",
      "ابدأ ببيانات وهمية أو آمنة.",
      "أضف خطوة موافقة بشرية قبل الإرسال أو النشر.",
      "اربطها بالعمل الحقيقي فقط بعد نجاح الاختبار عدة مرات."
    ],
    "ai-for-teams": [
      "اختر أدوات AI المسموح بها للفريق.",
      "اكتب ما لا يجب نسخه إلى AI.",
      "اصنع قوالب برومبت مشتركة.",
      "حدد من يراجع النتائج المهمة.",
      "راجع الاستخدام والتكلفة كل شهر."
    ],
    "ai-for-business": [
      "اختر ثلاث مهام يمكن أن توفر وقتا.",
      "حدد أدوات وميزانية اختبار لشهر واحد.",
      "اكتب قواعد الخصوصية والمراجعة.",
      "درّب الفريق على أمثلة حقيقية.",
      "قس الوقت والجودة والأخطاء والتكلفة."
    ]
  };

  if (workflows[id]) return workflows[id];
  if (article?.caseStudy?.steps?.length) return article.caseStudy.steps;
  if (article?.workflow?.length) return article.workflow;
  return [
    "افتح الأداة المناسبة لهذه المهمة.",
    "اكتب المهمة بخلفية وهدف واضحين.",
    "اطلب نتيجة أولى.",
    "اطلب تعديلا واحدا مفيدا.",
    "راجع النتيجة النهائية قبل استخدامها."
  ];
}

function getArabicTitle(id, fallback) {
  const titles = {
    "what-is-ai": "ما هو AI؟",
    "ai-basic-words": "مصطلحات AI الأساسية",
    "why-ai-costs-money": "لماذا يكلف AI مالا؟",
    "what-is-a-prompt": "ما هو البرومبت؟",
    "common-ai-tools": "أشهر أدوات AI",
    "write-with-ai": "أريد أن أكتب",
    "make-a-plan": "أريد خطة",
    "make-slides": "أريد عرضا تقديميا",
    "create-images": "أريد إنشاء صورة",
    "make-videos": "أريد عمل فيديو",
    "translate": "أريد ترجمة",
    "what-is-api": "ما هو API؟",
    "official-api-platforms": "منصات API الرسمية",
    "api-price-comparison": "مقارنة أسعار API",
    "ai-gateway": "ما هو AI Gateway؟",
    "gateway-platforms": "منصات AI Gateway الشائعة",
    "gateway-risks": "مخاطر AI Gateway"
  };

  return titles[id] || fallback || "مقال AI";
}

function arSectionLabel(section) {
  if (section === "beginner") return "مبتدئ AI";
  if (section === "advanced") return "استخدام AI";
  return "خطوة أعمق";
}

function arBackUrl(section) {
  if (section === "beginner") return "ar-beginner.html";
  if (section === "advanced") return "ar-advanced.html";
  return "ar-expert.html";
}

function renderPromptGuide(promptGuide, section) {
  if (!promptGuide || !promptGuide.length) return "";

  const rows = promptGuide
    .map(
      ([part, meaning]) => `
        <tr>
          <th>${escapeHtml(part)}</th>
          <td>${linkKeywords(meaning, section)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div class="prompt-guide">
      <h3>How this prompt works</h3>
      <p>A prompt is just a clear order. These parts tell AI what job to do and what kind of result to give back.</p>
      <table>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderOutput(output, locale = "en") {
  if (!output) return "";
  const title = locale === "ar" ? translateOutputTitle(output.title) : output.title;
  const summaryItems =
    locale === "ar" && output.arSummary?.length
      ? output.arSummary
      : output.summary || [];
  const captionsList =
    locale === "ar" && output.arCaptions?.length
      ? output.arCaptions
      : output.captions || [];
  const note = locale === "ar" && output.arNote ? output.arNote : output.note;

  if (output.type === "image") {
    return `
      <div class="finished-output">
        <h3>${escapeHtml(title)}</h3>
        <figure class="output-image">
          <img src="${output.src}" alt="${escapeHtml(output.alt || output.title)}" />
        </figure>
      </div>
    `;
  }

  if (output.type === "deck") {
    return `
      <div class="finished-output">
        <h3>${escapeHtml(title)}</h3>
        <figure class="output-deck">
          <img src="${output.src}" alt="${escapeHtml(output.alt || output.title)}" />
        </figure>
      </div>
    `;
  }

  if (output.type === "table") {
    const headers = (output.columns || [])
      .map((column) => `<th>${escapeHtml(column)}</th>`)
      .join("");
    const rows = (output.rows || [])
      .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`)
      .join("");
    const summary = summaryItems
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
    return `
      <div class="finished-output">
        <h3>${escapeHtml(title)}</h3>
        <div class="output-table-wrap">
          <table class="output-table">
            <thead><tr>${headers}</tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
        ${summary ? `<ul class="output-captions">${summary}</ul>` : ""}
      </div>
    `;
  }

  if (output.type === "beforeAfter") {
    return `
      <div class="finished-output">
        <h3>${escapeHtml(title)}</h3>
        <div class="before-after">
          <figure>
            <img src="${output.before}" alt="${escapeHtml(output.beforeLabel)}" />
            <figcaption>${escapeHtml(output.beforeLabel)}</figcaption>
          </figure>
          <figure>
            <img src="${output.after}" alt="${escapeHtml(output.afterLabel)}" />
            <figcaption>${escapeHtml(output.afterLabel)}</figcaption>
          </figure>
        </div>
      </div>
    `;
  }

  if (output.type === "video") {
    const captions = captionsList
      .map((caption) => `<li>${escapeHtml(caption)}</li>`)
      .join("");
    return `
      <div class="finished-output">
        <h3>${escapeHtml(title)}</h3>
        <video class="output-video" src="${output.src}" controls playsinline preload="metadata"></video>
        ${captions ? `<ul class="output-captions">${captions}</ul>` : ""}
      </div>
    `;
  }

  if (output.type === "storyboardVideo") {
    const captions = captionsList
      .map((caption) => `<li>${escapeHtml(caption)}</li>`)
      .join("");
    return `
      <div class="finished-output">
        <h3>${escapeHtml(title)}</h3>
        <figure class="output-image storyboard-output">
          <img src="${output.storyboard}" alt="${escapeHtml(output.title)}" />
        </figure>
        <video class="output-video" src="${output.video}" controls playsinline preload="metadata"></video>
        ${captions ? `<ul class="output-captions">${captions}</ul>` : ""}
      </div>
    `;
  }

  if (output.type === "audio") {
    return `
      <div class="finished-output">
        <h3>${escapeHtml(title)}</h3>
        <audio class="output-audio" src="${output.src}" controls preload="metadata"></audio>
        ${note ? `<p class="output-note">${escapeHtml(note)}</p>` : ""}
      </div>
    `;
  }

  return "";
}

function translateOutputTitle(title) {
  const map = {
    "Finished writing result": "نتيجة الكتابة النهائية",
    "Finished 7-day launch checklist": "قائمة إطلاق نهائية لمدة 7 أيام",
    "Finished 6-slide Gamma deck plan": "عرض Gamma نهائي من 6 شرائح",
    "Finished spreadsheet example": "مثال جدول نهائي",
    "Finished image-2 poster example": "مثال بوستر نهائي من image-2",
    "Before and after product image": "صورة المنتج قبل وبعد",
    "Finished 9-grid storyboard and stitched video example": "مثال 9 لقطات وفيديو نهائي",
    "Playable 20-second background music example": "مثال موسيقى خلفية قابل للتشغيل",
    "Finished translation check": "نتيجة الترجمة والمراجعة",
    "Finished supplier summary": "ملخص مورد نهائي",
    "Finished beginner lesson": "درس مبسط نهائي",
    "Finished business copy pack": "حزمة نصوص عمل جاهزة",
    "Finished 2-week salon content plan sample": "مثال خطة محتوى لأسبوعين",
    "Finished tool choice map": "خريطة اختيار الأدوات",
    "Finished AI app map": "خريطة تطبيقات AI",
    "Finished safe login checklist": "قائمة دخول آمن",
    "Finished payment decision table": "جدول قرار الدفع",
    "Finished price comparison template": "قالب مقارنة الأسعار",
    "Finished ChatGPT first-use checklist": "قائمة استخدام ChatGPT الأولى",
    "Finished Gemini use map": "خريطة استخدام Gemini",
    "Finished Claude use map": "خريطة استخدام Claude",
    "Finished DeepSeek use map": "خريطة استخدام DeepSeek",
    "Finished Kimi use map": "خريطة استخدام Kimi",
    "Example output from a clear image prompt": "مثال نتيجة من برومبت صورة واضح",
    "Example output from a shot list": "مثال نتيجة من قائمة لقطات",
    "Example output from a music prompt": "مثال نتيجة من برومبت موسيقى"
  };

  return map[title] || title;
}

function linkKeywords(text, section) {
  const escaped = escapeHtml(text);
  const targets = getKeywordTargets(section);
  const terms = Object.keys(targets).sort((a, b) => b.length - a.length);

  if (!terms.length) return escaped;

  const pattern = new RegExp(`\\b(${terms.map(escapeRegExp).join("|")})\\b`, "gi");
  const linked = new Set();

  return escaped.replace(pattern, (match) => {
    const key = terms.find((term) => term.toLowerCase() === match.toLowerCase());
    const target = targets[key];
    if (!target || linked.has(key.toLowerCase())) return match;
    linked.add(key.toLowerCase());
    return `<a class="keyword-link" href="article.html?id=${target}">${match}</a>`;
  });
}

function getKeywordTargets(section) {
  const beginnerTargets = {
    ChatGPT: "chatgpt-advanced",
    Gemini: "gemini-advanced",
    Claude: "claude-advanced",
    DeepSeek: "deepseek-advanced",
    Kimi: "kimi-advanced",
    Doubao: "doubao-advanced",
    Gamma: "make-slides",
    "image-2": "image-tools-advanced",
    Seedance: "video-tools-advanced",
    SeeDance: "video-tools-advanced",
    "Nano Banana": "image-tools-advanced",
    "OpenAI Image": "image-tools-advanced",
    "Alibaba Wan": "video-tools-advanced",
    Lyria: "music-tools-advanced",
    "GPT Audio Mini": "music-tools-advanced",
    Cursor: "ai-apps-and-coding-tools",
    "Claude Code": "ai-apps-and-coding-tools",
    Codex: "ai-apps-and-coding-tools",
    Antigravity: "ai-apps-and-coding-tools",
    "Cherry Studio": "ai-apps-and-coding-tools",
    "CC Switch": "ai-apps-and-coding-tools",
    Hermes: "ai-apps-and-coding-tools",
    OpenClaw: "ai-apps-and-coding-tools",
    "local AI": "private-jet-local-ai",
    "local model": "private-jet-local-ai"
  };

  const advancedTargets = {
    ChatGPT: "chatgpt-expert",
    Gemini: "gemini-expert",
    Claude: "claude-expert",
    DeepSeek: "deepseek-expert",
    Kimi: "kimi-expert",
    Doubao: "doubao-expert",
    Gamma: "ai-automation",
    "image-2": "image-tools-expert",
    Seedance: "video-tools-expert",
    SeeDance: "video-tools-expert",
    "Nano Banana": "image-tools-expert",
    "OpenAI Image": "image-tools-expert",
    "Alibaba Wan": "video-tools-expert",
    Lyria: "music-tools-expert",
    "GPT Audio Mini": "music-tools-expert",
    Cursor: "ai-automation",
    "Claude Code": "ai-automation",
    Codex: "ai-automation",
    Antigravity: "ai-automation",
    "Cherry Studio": "ai-gateway",
    "CC Switch": "ai-automation",
    Hermes: "multi-model-management",
    OpenClaw: "ai-automation",
    API: "what-is-api",
    "AI gateway": "ai-gateway",
    gateway: "ai-gateway",
    "local AI": "private-jet-local-ai",
    "local model": "private-jet-local-ai"
  };

  const expertTargets = {
    "API key": "official-api-platforms",
    "AI gateway": "ai-gateway",
    gateway: "ai-gateway",
    "local AI": "private-jet-local-ai",
    "local model": "private-jet-local-ai"
  };

  if (section === "beginner") return beginnerTargets;
  if (section === "advanced") return advancedTargets;
  return expertTargets;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
