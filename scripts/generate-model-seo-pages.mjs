import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const payload = JSON.parse(await fs.readFile(path.join(root, "assets/data/mytokenland-pricing-derived.json"), "utf8"));

const escapeHtml = (value) => String(value ?? "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#39;");
const slug = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const usd = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: Number(value) < 1 ? 3 : 2, maximumFractionDigits: Number(value) < 1 ? 4 : 2 }).format(Number(value || 0));

function category(model) {
  const name = model.model.toLowerCase();
  if (name.includes("image")) return "image";
  if (name.includes("codex")) return "code";
  if (name.includes("deepseek") || name.includes("opus") || name.includes("pro")) return "reasoning";
  return "text";
}

function categoryCopy(model) {
  const copy = {
    image: ["إنشاء الصور وتطوير الأفكار البصرية", "مناسب للتطبيقات التي تحتاج إنشاء صورة من وصف نصي عبر API."],
    code: ["البرمجة ومراجعة الشيفرة وبناء الأدوات", "مناسب للمساعدات البرمجية، شرح الشيفرة، واقتراح حلول تقنية."],
    reasoning: ["التحليل والمهام التي تحتاج تفكيرا أعمق", "مناسب للمقارنات، التخطيط، تحليل النصوص الطويلة، والمسائل متعددة الخطوات."],
    text: ["المحادثة والكتابة والمهام اليومية", "مناسب للكتابة، التلخيص، الترجمة، خدمة العملاء، والمساعدات العامة."]
  };
  return copy[category(model)];
}

function priceRows(model) {
  if (model.unit === "request") {
    return `
      <tr><th>طريقة الحساب</th><td>لكل طلب</td></tr>
      <tr><th>السعر المرجعي</th><td dir="ltr">${usd(model.sourcePriceUsd)}</td></tr>
      <tr><th>سعر ARABAI المرجعي</th><td dir="ltr">${usd(model.arabaiPriceUsd)}</td></tr>`;
  }
  return `
    <tr><th>إدخال 1M token</th><td dir="ltr">${usd(model.sourceInputUsd)}</td><td dir="ltr">${usd(model.arabaiInputUsd)}</td></tr>
    <tr><th>إخراج 1M token</th><td dir="ltr">${usd(model.sourceOutputUsd)}</td><td dir="ltr">${usd(model.arabaiOutputUsd)}</td></tr>`;
}

function waitlistForm(modelName = "") {
  return `<form class="waitlist-form" data-waitlist-form data-model-interest="${escapeHtml(modelName)}">
    <div class="waitlist-contact-grid"><label><span>البريد الإلكتروني</span><input type="email" name="email" autocomplete="email" placeholder="name@example.com" /></label><label><span>رقم WhatsApp</span><input type="tel" name="whatsapp" autocomplete="tel" dir="ltr" placeholder="+966 5X XXX XXXX" /></label></div>
    <p class="waitlist-field-note">يكفي إدخال البريد الإلكتروني أو رقم WhatsApp.</p>
    <input type="hidden" name="interestedModels" value="${escapeHtml(modelName)}" />
    <label><span>الاستخدام المتوقع</span><textarea name="intendedUse" rows="3" placeholder="اكتب باختصار ما الذي تريد بناءه"></textarea></label>
    <label class="waitlist-consent"><input type="checkbox" name="consent" required /><span>أوافق على استلام إشعار الإطلاق والعروض المبكرة.</span></label>
    <label class="waitlist-honeypot" aria-hidden="true"><span>الموقع</span><input type="text" name="website" tabindex="-1" autocomplete="off" /></label>
    <button class="platform-primary" type="submit">انضم إلى القائمة المبكرة</button><p class="waitlist-status" data-waitlist-status aria-live="polite"></p><p class="waitlist-privacy"><a href="../privacy.html">سياسة الخصوصية</a></p>
  </form>`;
}

function header(active = "models") {
  return `<header class="platform-header"><a class="platform-brand" href="../index.html" aria-label="الصفحة الرئيسية ARABAI"><img src="../assets/brand/arabai-logo-320.png" alt="" width="44" height="50" /><span>ARABAI</span></a><nav class="platform-nav" aria-label="التنقل الرئيسي"><a href="../index.html">الرئيسية</a><a href="../models.html"${active === "models" ? ' aria-current="page"' : ""}>سوق النماذج</a><a href="../console.html">لوحة التحكم</a><a href="../learn.html">دليل AI</a></nav><div class="platform-account-actions"><a class="header-login" href="../app/#accountPanel">تسجيل الدخول</a><a class="header-register" href="#early-access">القائمة المبكرة</a></div></header>`;
}

function footer() {
  return `<footer class="platform-footer"><div><strong>ARABAI</strong><span>منصة API للذكاء الاصطناعي باللغة العربية.</span></div><nav aria-label="روابط التذييل"><a href="../models.html">سوق النماذج</a><a href="../learn.html">دليل AI</a><a href="../privacy.html">الخصوصية</a><a href="../terms.html">الشروط</a><a href="mailto:support@arabai.top">support@arabai.top</a></nav></footer>`;
}

function modelPage(model) {
  const [useTitle, useCopy] = categoryCopy(model);
  const modelName = escapeHtml(model.model);
  const modelSlug = slug(model.model);
  const sourceDate = payload.generatedAt.slice(0, 10);
  const structured = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: `${model.model} API عبر ARABAI`, serviceType: "AI API", provider: { "@type": "Organization", name: "ARABAI", url: "https://arabai.top/" }, areaServed: "Middle East", url: `https://arabai.top/models/${modelSlug}.html`, description: useCopy },
      { "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: `ما استخدام ${model.model}؟`, acceptedAnswer: { "@type": "Answer", text: useCopy } },
        { "@type": "Question", name: `كيف يُحسب سعر ${model.model} عبر ARABAI؟`, acceptedAnswer: { "@type": "Answer", text: "سعر ARABAI المرجعي يساوي السعر المنشور من المصدر مضروبا في 1.2، وقد يتغير إذا تغير سعر المصدر." } }
      ]},
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://arabai.top/" },
        { "@type": "ListItem", position: 2, name: "سوق النماذج", item: "https://arabai.top/models.html" },
        { "@type": "ListItem", position: 3, name: model.model, item: `https://arabai.top/models/${modelSlug}.html` }
      ]}
    ]
  };
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="تعرف على سعر ${modelName} API واستخداماته وقارنه عبر منصة ARABAI العربية." /><title>${modelName} API والسعر | ARABAI</title><link rel="canonical" href="https://arabai.top/models/${modelSlug}.html" /><link rel="alternate" hreflang="ar" href="https://arabai.top/models/${modelSlug}.html" /><link rel="alternate" hreflang="x-default" href="https://arabai.top/models/${modelSlug}.html" /><meta property="og:type" content="website" /><meta property="og:title" content="${modelName} API والسعر | ARABAI" /><meta property="og:description" content="سعر واستخدامات ${modelName} عبر API عربي موحد." /><meta property="og:url" content="https://arabai.top/models/${modelSlug}.html" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet" /><link rel="icon" type="image/png" sizes="32x32" href="../assets/brand/favicon-32.png" /><link rel="stylesheet" href="../styles.css?v=20260726-seo1" /><script type="application/ld+json">${JSON.stringify(structured)}</script></head><body class="rtl product-site no-bridge">${header()}<main><nav class="platform-breadcrumb" aria-label="مسار الصفحة"><a href="../index.html">الرئيسية</a><span>/</span><a href="../models.html">سوق النماذج</a><span>/</span><strong dir="ltr">${modelName}</strong></nav><section class="model-detail-hero"><div><p class="platform-kicker">${escapeHtml(model.vendor || "AI")}</p><h1 dir="ltr">${modelName}</h1><p>${useCopy}</p><a class="platform-primary" href="#early-access">احصل على إشعار الإطلاق</a></div><aside><span>أفضل استخدام</span><strong>${useTitle}</strong><small>البيانات المرجعية محدثة بتاريخ ${sourceDate}</small></aside></section><section class="platform-section model-detail-section"><div class="platform-section-heading"><p>السعر المرجعي</p><h2>سعر واضح قبل بدء الاستخدام</h2><p>سعر ARABAI المرجعي يساوي سعر المصدر × 1.2. لا يوجد دفع حاليا وقد يتغير السعر إذا تغير سعر المصدر.</p></div><div class="output-table-wrap"><table class="output-table model-price-table"><thead><tr><th>البند</th>${model.unit === "request" ? '<th>السعر</th>' : '<th>سعر المصدر</th><th>سعر ARABAI</th>'}</tr></thead><tbody>${priceRows(model)}</tbody></table></div></section><section class="platform-section model-use-grid"><article><span>01</span><h2>متى تختاره؟</h2><p>${useCopy}</p></article><article><span>02</span><h2>كيف تبدأ؟</h2><p>اربط تطبيقك لاحقا مع API واحد، وحدد اسم النموذج في الطلب، ثم راقب الاستخدام والتكلفة من ARABAI.</p></article><article><span>03</span><h2>كيف تقارنه؟</h2><p>قارن جودة النتيجة وسرعتها وتكلفة الإخراج، ولا تختار اعتمادا على السعر وحده.</p></article></section><section class="platform-section api-example-section"><div><p class="platform-kicker">مثال API</p><h2>طلب متوافق مع OpenAI</h2><p>سيصبح هذا المسار متاحا بعد إطلاق الخدمة.</p></div><pre dir="ltr"><code>POST /v1/chat/completions
{
  "model": "${modelName}",
  "messages": [{"role":"user","content":"مرحبا"}]
}</code></pre></section><section class="platform-section waitlist-section compact-waitlist" id="early-access"><div class="waitlist-copy"><p class="platform-kicker">القائمة المبكرة</p><h2>هل تريد استخدام ${modelName}؟</h2><p>اترك البريد الإلكتروني أو رقم WhatsApp وسنخبرك عندما تصبح الخدمة متاحة.</p></div>${waitlistForm(model.model)}</section></main>${footer()}<script src="../waitlist.js?v=20260726-waitlist1"></script><script src="../script.js?v=20260723-platform1"></script></body></html>`;
}

const comparisons = [
  { slug: "gpt-5-4-vs-claude-sonnet-4-6", title: "GPT-5.4 مقابل Claude Sonnet 4.6", names: ["gpt-5.4", "claude-sonnet-4-6"], intent: "مهام الكتابة والتحليل والاستخدام العام" },
  { slug: "deepseek-v4-pro-vs-gpt-5-4-mini", title: "DeepSeek V4 Pro مقابل GPT-5.4 Mini", names: ["deepseek-v4-pro", "gpt-5.4-mini"], intent: "مهام التحليل التي تراعي السرعة والتكلفة" },
  { slug: "gpt-codex-vs-qwen", title: "GPT Codex مقابل Qwen", names: ["gpt-5.3-codex", "qwen3.6-plus"], intent: "مهام البرمجة وبناء الأدوات" },
  { slug: "best-ai-api-for-arabic", title: "أفضل API للغة العربية", names: ["gpt-5.5", "claude-sonnet-4-6", "qwen3.6-plus"], intent: "مشروعات المحتوى العربي وخدمة العملاء والتطبيقات" }
];

function comparisonPage(item) {
  const models = item.names.map((name) => payload.models.find((model) => model.model === name)).filter(Boolean);
  const tableRows = models.map((model) => `<tr><td><a class="model-name-link" href="../models/${slug(model.model)}.html"><strong dir="ltr">${escapeHtml(model.model)}</strong></a></td><td>${escapeHtml(model.vendor || "-")}</td><td>${categoryCopy(model)[0]}</td><td dir="ltr">${model.unit === "request" ? usd(model.arabaiPriceUsd) : `${usd(model.arabaiInputUsd)} / ${usd(model.arabaiOutputUsd)}`}</td></tr>`).join("");
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: `كيف أختار في مقارنة ${item.title}؟`, acceptedAnswer: { "@type": "Answer", text: "ابدأ بنوع المهمة، ثم اختبر جودة العربية والسرعة والتكلفة على طلب حقيقي صغير قبل اعتماد النموذج." } }] };
  return `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta name="description" content="مقارنة عربية بين ${escapeHtml(item.title)} من حيث الاستخدام والسعر عبر API." /><title>${escapeHtml(item.title)} | ARABAI</title><link rel="canonical" href="https://arabai.top/compare/${item.slug}.html" /><link rel="alternate" hreflang="ar" href="https://arabai.top/compare/${item.slug}.html" /><link rel="alternate" hreflang="x-default" href="https://arabai.top/compare/${item.slug}.html" /><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap" rel="stylesheet" /><link rel="stylesheet" href="../styles.css?v=20260726-seo1" /><script type="application/ld+json">${JSON.stringify(faq)}</script></head><body class="rtl product-site no-bridge">${header()}<main><nav class="platform-breadcrumb" aria-label="مسار الصفحة"><a href="../index.html">الرئيسية</a><span>/</span><a href="../models.html">سوق النماذج</a><span>/</span><strong>المقارنات</strong></nav><section class="platform-page-hero comparison-hero"><p class="platform-kicker">مقارنة النماذج</p><h1>${escapeHtml(item.title)}</h1><p>مقارنة أولية تساعدك على اختيار النموذج المناسب لـ${escapeHtml(item.intent)}.</p></section><section class="platform-section"><div class="output-table-wrap"><table class="output-table"><thead><tr><th>النموذج</th><th>المزود</th><th>أفضل استخدام</th><th>سعر ARABAI: إدخال / إخراج</th></tr></thead><tbody>${tableRows}</tbody></table></div></section><section class="platform-section comparison-advice"><div><span>01</span><h2>اختبر العربية أولا</h2><p>استخدم نفس الطلب العربي مع كل نموذج وقارن الدقة والأسلوب والقدرة على فهم السياق المحلي.</p></div><div><span>02</span><h2>راقب الإخراج</h2><p>تكلفة الإخراج قد تكون أهم من الإدخال في المحادثات الطويلة وإنشاء المحتوى.</p></div><div><span>03</span><h2>لا تعتمد نموذجا واحدا</h2><p>استخدم نموذجا اقتصاديا للمهام اليومية ونموذجا أقوى للمهام المهمة أو المعقدة.</p></div></section><section class="platform-section waitlist-section compact-waitlist" id="early-access"><div class="waitlist-copy"><p class="platform-kicker">القائمة المبكرة</p><h2>احصل على إشعار إطلاق API</h2><p>اترك البريد الإلكتروني أو رقم WhatsApp لمتابعة الأسعار والإطلاق.</p></div>${waitlistForm(item.title)}</section></main>${footer()}<script src="../waitlist.js?v=20260726-waitlist1"></script><script src="../script.js?v=20260723-platform1"></script></body></html>`;
}

await fs.mkdir(path.join(root, "models"), { recursive: true });
await fs.mkdir(path.join(root, "compare"), { recursive: true });
await Promise.all(payload.models.map((model) => fs.writeFile(path.join(root, "models", `${slug(model.model)}.html`), modelPage(model), "utf8")));
await Promise.all(comparisons.map((item) => fs.writeFile(path.join(root, "compare", `${item.slug}.html`), comparisonPage(item), "utf8")));
console.log(`Generated ${payload.models.length} model pages and ${comparisons.length} comparison pages.`);
