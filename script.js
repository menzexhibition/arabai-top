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

    const workflow = arArticle.workflow?.length
      ? `<h2>اتبعها خطوة بخطوة</h2><ol class="workflow-list">${arArticle.workflow
          .map((step) => `<li>${escapeHtml(step)}</li>`)
          .join("")}</ol>`
      : "";

    const prompt = arArticle.prompt
      ? `<h2>جرّب هذا الطلب</h2><blockquote>${escapeHtml(arArticle.prompt)}</blockquote>`
      : "";

    const toolLinks = renderToolLinks(article.externalRefs);
    const externalRefs = renderExternalRefs(article.externalRefs);
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
      </header>
      <section class="article-body">
        ${sections}
        ${renderArabicCaseStudy(mergeArabicCaseStudy(arArticle.caseStudy, article.caseStudy))}
        ${workflow}
        ${prompt}
        ${toolLinks}
        ${externalRefs}
        ${next}
      </section>
    `;
  }
}

function renderToolLinks(refs) {
  const groups = groupToolLinks(refs);
  if (!groups.official.length && !groups.pricing.length && !groups.tutorial.length) return "";

  const columns = [
    ["Official website", groups.official],
    ["Pricing page", groups.pricing],
    ["Beginner tutorial", groups.tutorial]
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
      <p class="eyebrow">Try this tool</p>
      <h2>Open the right place</h2>
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

function renderExternalRefs(refs) {
  if (!refs || !refs.length) return "";

  const items = refs
    .map(
      ([title, url, note]) => {
        const badge = referenceBadge(title, url);
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
      <h2>Useful external references</h2>
      <ul>${items}</ul>
    </section>
  `;
}

function referenceBadge(title, url) {
  const lowerTitle = title.toLowerCase();
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("youtube.com")) return "Video";
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
    return "Official";
  }

  if (lowerTitle.includes("pricing")) return "Pricing";
  return "Reference";
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
      ${renderOutput(caseStudy.output)}
      ${caseStudy.result ? `<h3>النتيجة النهائية</h3><div class="final-result">${caseStudy.result}</div>` : ""}
      ${caseStudy.note ? `<p class="output-note">${escapeHtml(caseStudy.note)}</p>` : ""}
    </section>
  `;
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
        ["السياق", "السياق هو الذاكرة الموضوعة على الطاولة، يستخدمها AI حتى لا يبدأ من الصفر كل مرة."]
      ],
      prompt: "اشرح لي هذه الكلمات كأني مبتدئ: النموذج الكبير، التوكن، القدرة الحاسوبية، البرومبت، السياق، API."
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
      intro: "AI المجاني مثل تذوق الطعام في السوق، والمدفوع مثل شراء وجبة من مكان أصبحت تثق به.",
      sections: [
        ["المجاني يكفي للتعلم", "استخدم المجاني لتجربة الأسئلة، التلخيص، الكتابة الخفيفة، ومعرفة ما يناسبك."],
        ["المدفوع للعمل المتكرر", "ادفع عندما تجد مهمة تتكرر وتوفر عليك وقتا أو تساعدك في عملك كل أسبوع."],
        ["لا تدفع مبكرا", "لا تشترك لأن الجميع يتكلم عن الأداة؛ اشترك لأن لديك استخداما واضحا."]
      ],
      workflow: [
        "استخدم الخطة المجانية أولا.",
        "اكتب ثلاث مهام تستخدمها فعلا.",
        "جرّبها أسبوعا كاملا.",
        "إذا وفرت وقتا واضحا، جرّب شهرا مدفوعا واحدا.",
        "ألغ الاشتراك إذا لم تعد تستخدمه."
      ],
      prompt: "أستخدم AI للرسائل والترجمة والتلخيص مرتين في الأسبوع. هل أبقى على الخطة المجانية أم أدفع؟ أعطني قرارا بسيطا."
    },
    "ai-tool-differences": {
      title: "كيف تختلف أدوات AI؟",
      intro: "أدوات AI مثل فريق عمل: شخص يكتب أفضل، شخص يرسم أفضل، وشخص يقرأ الملفات الطويلة أفضل.",
      sections: [
        ["أدوات المحادثة", "مناسبة للأسئلة والكتابة والتلخيص والشرح اليومي."],
        ["أدوات الصور والفيديو", "مناسبة عندما تريد بوستر أو صورة منتج أو لقطة فيديو قصيرة، لكنها تحتاج وصفا أدق."],
        ["أدوات العروض والملفات", "مناسبة عندما تريد تحويل فكرة أو مستند طويل إلى عرض أو ملخص أو خطة."]
      ],
      workflow: [
        "ابدأ من المهمة، لا من اسم الأداة.",
        "اسأل: هل أريد كتابة، صورة، فيديو، عرضا، أم ترجمة؟",
        "اختر أداة واحدة أو اثنتين فقط لكل مهمة.",
        "جرّب النسخة المجانية إن وجدت.",
        "ادفع فقط للأداة التي أصبحت جزءا من عملك."
      ],
      prompt: "أحتاج AI للكتابة، الصور، الفيديو، الترجمة، والعروض. ساعدني في اختيار نوع الأداة المناسبة لكل مهمة بلغة بسيطة."
    },
    "ai-safety": {
      title: "ماذا أنتبه له؟",
      intro: "AI مساعد مفيد، لكن لا تعطيه كل مفاتيحك في أول لقاء.",
      sections: [
        ["احم معلوماتك", "لا تضع كلمات مرور، أرقام بطاقات، هويات، أو ملفات خاصة في أداة لا تعرف قواعدها."],
        ["راجع المهم", "AI قد يجيب بثقة حتى عندما يخطئ، لذلك راجع الأسعار والقوانين والمعلومات المهمة بنفسك."],
        ["افتح المواقع الرسمية", "بعض المواقع تقلد الأدوات المشهورة، لذلك استخدم الروابط الرسمية قبل التسجيل أو الدفع."]
      ],
      workflow: [
        "استخدم الموقع الرسمي للأداة.",
        "لا ترسل بيانات خاصة في البداية.",
        "اقرأ النتيجة كمسودة.",
        "تحقق من المعلومات المهمة من مصدر موثوق.",
        "لا تدفع قبل قراءة صفحة السعر والإلغاء."
      ],
      prompt: "راجع هذه الرسالة قبل أن أرسلها للعميل. أخبرني هل فيها معلومة خاصة أو وعد قوي أو كلام يحتاج مراجعة."
    },
    "beginner-path": {
      title: "طريق المبتدئ",
      intro: "تعلم AI يشبه تعلم القيادة: ابدأ في شارع هادئ قبل الطريق السريع.",
      sections: [
        ["اليوم الأول", "استخدم أداة محادثة واحدة لتحسين رسالة أو شرح موضوع أو تلخيص نص قصير."],
        ["الأسبوع الأول", "جرّب مهمة حقيقية كل يوم: كتابة، ترجمة، خطة صغيرة، أو فكرة لصورة."],
        ["بعد ذلك", "اختر أداة يومية واحدة وأداة إبداعية واحدة، ثم تعلم فقط عندما تحتاج مهمة جديدة."]
      ],
      workflow: [
        "اليوم 1: حسّن رسالة قصيرة.",
        "اليوم 2: لخّص نصا أو ملاحظة.",
        "اليوم 3: اطلب خطة بسيطة.",
        "اليوم 4: اكتب برومبت لصورة.",
        "اليوم 5: قارن المجاني والمدفوع قبل الاشتراك."
      ],
      prompt: "اصنع لي خطة 5 أيام لتعلم AI عن طريق مهام صغيرة في العمل. اجعلها سهلة جدا لشخص لا يعرف إلا الكتابة."
    },
    "common-ai-tools": {
      title: "أشهر أدوات AI",
      intro: "تخيل أنك دخلت سوق أدوات AI؛ كل أداة لها شخصية ووظيفة وسعر مختلف.",
      sections: [
        ["لأسئلة الحياة والعمل", "أدوات مثل ChatGPT و Gemini و Claude و Doubao تصلح للكتابة، الشرح، التلخيص، والردود اليومية."],
        ["للعروض والمستندات", "Gamma مثل مصمم عروض يحول الموضوع إلى شرائح مرتبة، ويمكنك تعديلها قبل المشاركة."],
        ["للصور والفيديو والموسيقى", "أدوات الصور والفيديو والموسيقى تشبه استوديو صغيرا؛ تحتاج وصفا واضحا للمشهد والأسلوب والنتيجة."]
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
      prompt: "أنشئ 9 صور عمودية لقصة فيديو مدته 15 ثانية عن صندوق هدايا تمر رمضاني. حافظ على نفس الصندوق، نفس الإضاءة الذهبية، ونفس الأسلوب الفخم في كل صورة."
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
      intro: "سعر API مثل عداد السيارة: الرحلة القصيرة قليلة التكلفة، والرحلة الطويلة أو الفاخرة تكلف أكثر.",
      sections: [
        ["ما الذي يرفع السعر", "النص القصير أرخص عادة، أما الصور والفيديو والموسيقى فتحتاج عملا أكبر من AI وقد تستهلك رصيدا أكثر."],
        ["لماذا يهم ARABAI", "قبل بيع أي رصيد يجب أن نعرف تكلفة المهام الشائعة حتى لا يكون السعر بسيطا للمستخدم وخاسرا للمنصة."],
        ["كيف يفهمه المستخدم", "الرصيد ليس رسما غامضا؛ هو طريقة سهلة لتجميع تكاليف كثيرة خلف الشاشة في رقم بسيط."]
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
      intro: "AI Gateway مثل محطة قطار فيها قطارات AI كثيرة: مدخل واحد، رصيد واحد، وطرق مختلفة للوصول إلى النتيجة.",
      sections: [
        ["ما معناها", "Gateway ليس نموذجا واحدا، بل محطة تسمح لحساب واحد أن يستخدم نماذج كثيرة بدون بناء الطريق من جديد كل مرة."],
        ["لماذا يهم ARABAI", "يمكن لـ ARABAI أن يختبر نماذج كثيرة بسرعة ويقدم للمستخدم محفظة واحدة بدلا من حسابات كثيرة في مواقع مختلفة."],
        ["متى ننتبه", "المحطة مريحة، لكن يجب فحص السعر والخصوصية والثبات قبل استخدامها في أعمال حقيقية ومدفوعة."]
      ],
      workflow: [
        "اختر Gateway واحدا للتجربة فقط في البداية.",
        "ضع رصيدا صغيرا أو حد إنفاق واضحا.",
        "اختبر نفس المهمة على نموذجين أو ثلاثة.",
        "قارن السرعة والجودة والسعر وجودة اللغة العربية.",
        "احتفظ بطريق رسمي احتياطي للمهام المهمة."
      ],
      prompt: "اشرح AI Gateway مثل محطة قطار لموقع ARABAI. مدخل واحد، محفظة واحدة، نماذج كثيرة، أسعار وسرعات مختلفة. أعطني قائمة إعداد آمنة للمبتدئ ومتى أستخدم Gateway ومتى أستخدم API رسمي."
    },
    "gateway-platforms": {
      title: "منصات AI Gateway الشائعة",
      intro: "منصات Gateway مثل محطات مختلفة: محطة لديها قطارات أكثر، وأخرى أرخص، وثالثة أوضح في الفواتير والسجلات.",
      sections: [
        ["كيف نقارن", "لا تقارن بعدد النماذج فقط؛ قارن نوع النماذج، طريقة الدفع، السجلات، الخصوصية، والدعم."],
        ["لماذا يهم ARABAI", "ARABAI قد يستخدم Gateway للتنوع والسرعة، لكنه يحتاج خيارات رسمية احتياطية للمهام الحساسة أو المهمة."],
        ["ما الذي يراه المستخدم", "المستخدم يرى زر واحد ورصيد واحد، لكن المنصة تختار له الطريق الأنسب خلف الشاشة."]
      ],
      workflow: [
        "اكتب النماذج أو أنواع المهام التي تحتاجها فعلا.",
        "افحص هل المنصة تدعمها.",
        "راجع طريقة الدفع ومفاتيح API وسجلات الاستخدام.",
        "اختبر مهمة صغيرة قبل نقل عمل حقيقي.",
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
    }
  };

  const fallback = {
    title: getArabicTitle(id, article?.title || "مقال AI"),
    intro: "هذه نسخة عربية مختصرة من المقال. نعرض الفكرة الأساسية والخطوات العملية أولا، ثم يمكن الرجوع للنسخة الإنجليزية للتفاصيل الكاملة إلى أن نكمل الترجمة النهائية.",
    sections: [
      ["الفكرة ببساطة", article?.intro || "استخدم AI في مهمة صغيرة وواضحة بدلا من سؤال عام."],
      ["كيف تستخدمها", "اختر أداة مناسبة، اكتب طلبا واضحا، راجع النتيجة، ثم اطلب تعديلا واحدا في كل مرة."],
      ["ماذا تنتبه له", "لا ترسل معلومات خاصة، ولا تعتمد على النتيجة النهائية قبل مراجعتها بنفسك."]
    ],
    workflow: [
      "افتح الأداة الرسمية.",
      "اكتب المهمة الحقيقية.",
      "أضف الجمهور والأسلوب والنتيجة المطلوبة.",
      "راجع الإجابة.",
      "اطلب تعديلا واضحا."
    ],
    prompt: article?.prompt || ""
  };

  return { ...fallback, ...(overrides[id] || {}) };
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

function renderOutput(output) {
  if (!output) return "";

  if (output.type === "image") {
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
        <figure class="output-image">
          <img src="${output.src}" alt="${escapeHtml(output.alt || output.title)}" />
        </figure>
      </div>
    `;
  }

  if (output.type === "deck") {
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
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
    const summary = (output.summary || [])
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
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
        <h3>${escapeHtml(output.title)}</h3>
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
    const captions = (output.captions || [])
      .map((caption) => `<li>${escapeHtml(caption)}</li>`)
      .join("");
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
        <video class="output-video" src="${output.src}" controls playsinline preload="metadata"></video>
        ${captions ? `<ul class="output-captions">${captions}</ul>` : ""}
      </div>
    `;
  }

  if (output.type === "storyboardVideo") {
    const captions = (output.captions || [])
      .map((caption) => `<li>${escapeHtml(caption)}</li>`)
      .join("");
    return `
      <div class="finished-output">
        <h3>${escapeHtml(output.title)}</h3>
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
        <h3>${escapeHtml(output.title)}</h3>
        <audio class="output-audio" src="${output.src}" controls preload="metadata"></audio>
        ${output.note ? `<p class="output-note">${escapeHtml(output.note)}</p>` : ""}
      </div>
    `;
  }

  return "";
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
