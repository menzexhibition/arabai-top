const SITE_URL = "https://arabai.top";
const SITE_IMAGE = `${SITE_URL}/assets/brand/arabai-logo-dark-640.png`;

const PAGE_SEO = {
  "index.html": {
    ar: {
      url: "/",
      title: "ARABAI - دليل AI الأساسي للمستخدم العربي",
      description:
        "ARABAI دليل AI عربي للمبتدئين يشرح نماذج الذكاء الاصطناعي مثل ChatGPT وGemini وClaude بلغة بسيطة مع خطوات عملية للكتابة والصور والفيديو والعروض."
    },
    en: { url: "/en.html" }
  },
  "en.html": {
    en: {
      url: "/en.html",
      title: "ARABAI - Basic AI Guide For Arabic Users",
      description:
        "ARABAI is a simple AI guide for Arabic-speaking users, covering ChatGPT, Gemini, Claude, images, video, slides, prompts, credits, and practical daily work."
    },
    ar: { url: "/" }
  },
  "ar-beginner.html": {
    ar: {
      url: "/ar-beginner.html",
      title: "مبتدئ AI - شرح الذكاء الاصطناعي للمبتدئين | ARABAI",
      description:
        "ابدأ تعلم AI بالعربي: ما هو الذكاء الاصطناعي، ما هي نماذج AI الكبيرة، ما هو البرومبت، ولماذا توجد خطط مجانية ومدفوعة."
    },
    en: { url: "/beginner.html" }
  },
  "beginner.html": {
    en: {
      url: "/beginner.html",
      title: "AI Beginner - ARABAI",
      description:
        "A beginner-friendly AI guide explaining AI models, prompts, common tools, free vs paid plans, safety, and the first steps for ordinary users."
    },
    ar: { url: "/ar-beginner.html" }
  },
  "ar-advanced.html": {
    ar: {
      url: "/ar-advanced.html",
      title: "استخدام AI في الكتابة والصور والفيديو والعروض | ARABAI",
      description:
        "دروس عملية للمستخدم العربي: استخدم AI للكتابة، الخطط، العروض التقديمية، الصور، الفيديو، الموسيقى، الترجمة، وتطوير العمل خطوة بخطوة."
    },
    en: { url: "/advanced.html" }
  },
  "advanced.html": {
    en: {
      url: "/advanced.html",
      title: "Use AI - Practical AI Tutorials | ARABAI",
      description:
        "Step-by-step AI tutorials for writing, planning, presentations, images, video, music, translation, business, and choosing the right AI tool."
    },
    ar: { url: "/ar-advanced.html" }
  },
  "ar-expert.html": {
    ar: {
      url: "/ar-expert.html",
      title: "شرح API و AI Gateway والرصيد للمستخدم العربي | ARABAI",
      description:
        "شرح مبسط لما هو API، كيف تعمل منصات AI الرسمية، ما معنى AI Gateway، وكيف يمكن استخدام الرصيد للوصول إلى أدوات AI كثيرة من مكان واحد."
    },
    en: { url: "/expert.html" }
  },
  "expert.html": {
    en: {
      url: "/expert.html",
      title: "Deeper AI Guide - APIs, Credits, Gateways | ARABAI",
      description:
        "A plain-language guide to AI APIs, official API platforms, AI gateways, credits, pricing, automation, and safer business workflows."
    },
    ar: { url: "/ar-expert.html" }
  },
  "ar-credits.html": {
    ar: {
      url: "/ar-credits.html",
      title: "رصيد ARABAI - تجربة أدوات AI كثيرة برصيد واحد",
      description:
        "تعرف على فكرة رصيد ARABAI: شحن صغير لاحقا لتجربة المحادثة والصور والفيديو والموسيقى والعروض، مع بقاء المقالات والدروس مجانية."
    },
    en: { url: "/credits.html" }
  },
  "credits.html": {
    en: {
      url: "/credits.html",
      title: "ARABAI Credits - One Wallet For AI Tools",
      description:
        "ARABAI Credits will help users try chat, image, video, music, slides, and document AI tools from one simple wallet while all guides stay free."
    },
    ar: { url: "/ar-credits.html" }
  },
  "ar-community.html": {
    ar: {
      url: "/ar-community.html",
      title: "مجتمع ARABAI وتحديثات AI للمستخدم العربي",
      description:
        "تابع تحديثات ARABAI، اقترح أدوات ودروس AI، وتعرف على نظام مكافآت المجتمع والرصيد المجاني للمساهمات المفيدة."
    },
    en: { url: "/community.html" }
  },
  "community.html": {
    en: {
      url: "/community.html",
      title: "ARABAI Updates And Community",
      description:
        "Follow ARABAI updates, suggest AI tools and tutorials, and learn how useful community contributions can later earn recorded credits."
    },
    ar: { url: "/ar-community.html" }
  },
  "ar-tutorials.html": {
    ar: {
      url: "/ar-tutorials.html",
      title: "فيديوهات شرح AI بالعربي - عروض وصور وفيديو وAPI | ARABAI",
      description:
        "دروس فيديو عملية للمستخدم العربي حول إنشاء عرض تقديمي، صورة، فيديو قصير، وفهم API ومسار الرصيد في ARABAI."
    },
    en: { url: "/tutorials.html" }
  },
  "tutorials.html": {
    en: {
      url: "/tutorials.html",
      title: "AI Video Tutorials - ARABAI",
      description:
        "Practical ARABAI tutorial videos for slides, images, short videos, API flows, credits, prompts, and beginner-friendly AI workflows."
    },
    ar: { url: "/ar-tutorials.html" }
  }
};

const ARABIC_ARTICLE_SEO = {
  "what-is-ai": ["ما هو AI؟", "شرح بسيط للمستخدم العربي: ما هو الذكاء الاصطناعي، وما علاقة AI بنماذج كبيرة مثل ChatGPT وGemini وClaude."],
  "ai-basic-words": ["مصطلحات AI الأساسية", "شرح مصطلحات AI مثل النموذج الكبير، التوكن، البرومبت، التدريب، الاستنتاج، الهلوسة، API والرصيد بتشبيهات سهلة."],
  "why-ai-costs-money": ["لماذا يكلف AI مالا؟", "افهم لماذا تختلف تكلفة AI بين النصوص والصور والفيديو، وما معنى التوكن والنموذج والرصيد للمستخدم العادي."],
  "what-is-a-prompt": ["ما هو البرومبت؟", "تعلم كتابة البرومبت بالعربي بطريقة بسيطة حتى تحصل على نتائج أفضل من ChatGPT وGemini وClaude وأدوات AI الأخرى."],
  "organize-prompt-first": ["دع GPT يرتب فكرتك أولا", "طريقة عملية للمبتدئ: اكتب فكرتك كما هي، ثم اطلب من GPT أن يعيد فهمها ويسأل عن الناقص ويحوّلها إلى برومبت واضح."],
  "what-can-ai-do": ["ماذا يستطيع AI أن يفعل؟", "أمثلة عملية لما يستطيع AI فعله في الكتابة، التخطيط، الترجمة، الصور، العروض، الفيديو، التعلم، والعمل اليومي."],
  "common-ai-tools": ["أشهر أدوات AI", "دليل مبسط لأشهر أدوات AI مثل ChatGPT وGemini وClaude وDeepSeek وKimi وQwen وأدوات الصور والفيديو والعروض."],
  "how-to-start": ["كيف أبدأ استخدام AI؟", "خطوات أول تجربة AI للمبتدئ: افتح أداة موثوقة، اكتب مهمة حقيقية، عدل النتيجة، وتعلم متى تستخدم المجاني أو المدفوع."],
  "free-vs-paid": ["الفرق بين AI المجاني والمدفوع", "شرح واضح متى تكفي أدوات AI المجانية، ومتى يستحق الاشتراك المدفوع إذا كان يوفر وقتا في العمل اليومي."],
  "ai-tool-differences": ["كيف تختلف أدوات AI؟", "اعرف الفرق بين أدوات المحادثة، الصور، الفيديو، العروض، الملفات، الترجمة، ولماذا لا توجد أداة واحدة تناسب كل شيء."],
  "ai-safety": ["أمان استخدام AI", "قواعد بسيطة لحماية بياناتك عند استخدام AI: لا تضع كلمات مرور أو بيانات حساسة، وراجع الإجابات المهمة قبل الاعتماد عليها."],
  "beginner-path": ["طريق المبتدئ في AI", "خطة قصيرة لتعلم AI خطوة بخطوة خلال أيام، من أول حساب مجاني إلى أول برومبت وأول مهمة عملية."],
  "private-jet-local-ai": ["هل تريد تشغيل AI محلي؟", "شرح خفيف لفكرة AI المحلي على جهازك، ومتى يحتاجه المستخدم، ومتى يكون AI عبر الإنترنت أسهل وأفضل."],
  "write-with-ai": ["استخدام AI في الكتابة", "تعلم استخدام AI لكتابة الرسائل والتقارير ومنشورات السوشيال والردود بأسلوب واضح ومناسب للمستخدم العربي."],
  "make-a-plan": ["استخدام AI لعمل خطة", "طريقة عملية لاستخدام AI لتحويل فكرة مبعثرة إلى خطة عمل أو تسويق أو إطلاق منتج مع خطوات واضحة."],
  "make-slides": ["عمل عرض تقديمي بالذكاء الاصطناعي", "شرح استخدام AI وأدوات مثل Gamma لإنشاء عرض تقديمي من فكرة بسيطة، مع برومبت وخطوات مراجعة وتصدير."],
  "spreadsheets": ["استخدام AI في الجداول", "استخدم AI لتنظيم بيانات المبيعات والجداول والمعادلات البسيطة وتحويل الملاحظات إلى جدول واضح."],
  "create-images": ["إنشاء صور بالذكاء الاصطناعي", "تعلم كتابة برومبت صورة واضح لإنشاء بوستر أو صورة منتج أو إعلان باستخدام أدوات توليد الصور بالذكاء الاصطناعي."],
  "edit-images": ["تعديل الصور باستخدام AI", "شرح مبسط لكيفية تحسين صورة منتج أو تنظيف الخلفية أو تعديل الإضاءة مع الحفاظ على شكل المنتج الحقيقي."],
  "make-videos": ["إنشاء فيديو بالذكاء الاصطناعي", "طريقة سهلة لإنشاء فيديو AI: ابدأ بنص إلى صورة، اصنع 9 لقطات، ثم اجمعها في فيديو قصير قابل للنشر."],
  "make-music": ["إنشاء موسيقى بالذكاء الاصطناعي", "استخدم AI لصناعة موسيقى خلفية قصيرة لإعلان أو فيديو منتج، مع برومبت يحدد المزاج والآلات والصوت."],
  "translate": ["الترجمة باستخدام AI", "تعلم ترجمة الرسائل والنصوص بين العربية والإنجليزية بطريقة طبيعية، مع طلب ترجمة عكسية لمراجعة المعنى."],
  "summarize-documents": ["تلخيص المستندات باستخدام AI", "استخدم AI لتلخيص PDF أو ملفات طويلة واستخراج النقاط المهمة والمهام التالية بلغة بسيطة."],
  "learn-something": ["تعلم أي موضوع باستخدام AI", "اجعل AI مثل معلم خاص يشرح لك الموضوع خطوة بخطوة، يعطي أمثلة، ويسألك أسئلة تدريبية."],
  "grow-business": ["استخدام AI لتطوير العمل", "أفكار عملية لاستخدام AI في التسويق، وصف المنتجات، الرد على العملاء، الإعلانات، وتحسين العمل اليومي."],
  "social-content": ["صناعة محتوى سوشيال باستخدام AI", "استخدم AI لعمل خطة محتوى ومنشورات قصيرة وأفكار فيديو وإعلانات بسيطة مناسبة للعملاء العرب."],
  "choose-right-tool": ["اختيار أداة AI المناسبة", "طريقة سهلة لاختيار أداة AI حسب المهمة: كتابة، صورة، فيديو، عرض، ترجمة، ملفات، أو استخدام متكرر."],
  "ai-applications-map": ["خريطة تطبيقات AI", "خريطة مبسطة لأهم أنواع تطبيقات AI: محادثة، كتابة، صور، فيديو، موسيقى، عروض، برمجة، وأتمتة."],
  "login-safely": ["الدخول إلى أدوات AI بأمان", "تعلم فتح حسابات AI من المواقع الرسمية وتجنب الروابط المزيفة وحماية البريد وكلمات المرور وبيانات الدفع."],
  "payment-basics": ["أساسيات الدفع في أدوات AI", "شرح بسيط للخطط المجانية والمدفوعة والاشتراكات والرصيد حتى لا يدفع المستخدم قبل أن يعرف حاجته."],
  "price-comparison": ["مقارنة أسعار أدوات AI", "قارن أسعار أدوات AI بطريقة عملية: المهمة، الجودة، الحدود، سهولة الاستخدام، والتكلفة الشهرية."],
  "chatgpt-advanced": ["دليل ChatGPT للمستخدم العربي", "شرح عملي لاستخدام ChatGPT في الكتابة والتلخيص والترجمة والملفات والصور واختيار الخطة المناسبة."],
  "gemini-advanced": ["دليل Gemini للمستخدم العربي", "كيف يستخدم المستخدم العربي Gemini مع خدمات Google والبحث والكتابة والتعلم والملفات."],
  "claude-advanced": ["دليل Claude للمستخدم العربي", "تعرف على Claude واستخدامه في الكتابة الهادئة، الملفات الطويلة، التخطيط، والمراجعة بأسلوب واضح."],
  "deepseek-advanced": ["دليل DeepSeek للمستخدم العربي", "شرح استخدام DeepSeek في الأسئلة، التفكير، البرمجة، والمهام اليومية مع ملاحظات حول القوة والحدود."],
  "kimi-advanced": ["دليل Kimi للمستخدم العربي", "استخدم Kimi للقراءة الطويلة والملفات والبحث وتلخيص المستندات بطريقة تناسب المستخدم العادي."],
  "qwen-advanced": ["دليل Qwen للمستخدم العربي", "تعرف على Qwen وكيف يمكن استخدامه في المحادثة، التلخيص، البرمجة، والمهام اليومية."],
  "doubao-advanced": ["دليل Doubao للمستخدم العربي", "شرح مبسط لأداة Doubao واستخداماتها في المحادثة، الكتابة، الصور، والفيديو حسب توفر الخدمة."],
  "image-tools-advanced": ["أدوات إنشاء الصور بالذكاء الاصطناعي", "قارن أدوات صور AI وتعلم متى تستخدم image-2 أو Midjourney أو أدوات التصميم حسب نوع الصورة المطلوبة."],
  "video-tools-advanced": ["أدوات إنشاء الفيديو بالذكاء الاصطناعي", "تعرف على أدوات فيديو AI وطريقة تحويل الصور واللقطات إلى فيديو قصير مناسب للمنتجات والسوشيال."],
  "music-tools-advanced": ["أدوات إنشاء الموسيقى بالذكاء الاصطناعي", "دليل بسيط لأدوات الموسيقى بالذكاء الاصطناعي وكيفية كتابة برومبت لموسيقى خلفية أو إعلان قصير."],
  "what-is-api": ["ما هو API؟", "شرح API بلغة عادية: كيف يجعل موقع مثل ARABAI يرسل طلب المستخدم إلى AI في الخلفية ويعيد النتيجة."],
  "official-api-platforms": ["منصات API الرسمية", "تعرف على منصات API الرسمية مثل OpenAI وAnthropic وGoogle وكيف يمكن استخدامها لتشغيل خدمات AI داخل موقع."],
  "api-price-comparison": ["مقارنة أسعار API", "افهم تكلفة API حسب نوع المهمة: نص، صورة، فيديو، موسيقى، ملفات، وكيف تتحول هذه التكلفة إلى رصيد للمستخدم."],
  "ai-gateway": ["ما هو AI Gateway؟", "شرح AI Gateway كأنه محطة قطار تصل إلى نماذج كثيرة، ولماذا يفيد منصة مثل ARABAI في توفير رصيد واحد وأدوات متعددة."],
  "gateway-platforms": ["منصات AI Gateway الشائعة", "قارن منصات AI Gateway من حيث النماذج، الدفع، السجلات، الخصوصية، السرعة، وخطة الاحتياط."],
  "gateway-risks": ["مخاطر AI Gateway", "تعرف على مخاطر استخدام AI Gateway مثل الخصوصية، تغير الأسعار، توقف الخدمة، وضرورة وجود مسار رسمي احتياطي."],
  "ai-automation": ["أتمتة AI", "شرح أتمتة AI للمستخدم العادي: كيف تحول مهمة متكررة إلى سير عمل آمن مع مراجعة بشرية."],
  "ai-for-teams": ["استخدام AI للفرق", "قواعد عملية لاستخدام AI داخل الفريق: الأدوات المسموحة، الخصوصية، القوالب، المراجعة، ومتابعة التكلفة."],
  "ai-for-business": ["استخدام AI للأعمال", "خطة إدخال AI إلى العمل بطريقة عملية: اختيار المهام، الميزانية، القواعد، التدريب، وقياس الفائدة."],
  "chatgpt-expert": ["ChatGPT للاستخدام المتقدم", "كيف يدخل ChatGPT في سير عمل متكرر، ومتى تحتاج API أو حسابات فريق أو قواعد خصوصية أو قوالب جاهزة."],
  "gemini-expert": ["Gemini للاستخدام المتقدم", "استخدام Gemini في العمل المتكرر وملفات Google والبحث وسير العمل مع مراعاة الحسابات والخصوصية."],
  "claude-expert": ["Claude للاستخدام المتقدم", "استخدام Claude في مراجعة النصوص الطويلة والملفات وسير العمل المتكرر مع قواعد واضحة للبيانات."],
  "deepseek-expert": ["DeepSeek للاستخدام المتقدم", "استخدام DeepSeek في التفكير والبرمجة والمهام المتكررة مع مقارنة السعر والجودة والخصوصية."],
  "kimi-expert": ["Kimi للاستخدام المتقدم", "استخدام Kimi في قراءة الملفات الطويلة والبحث والتلخيص داخل سير عمل أكثر تنظيما."],
  "qwen-expert": ["Qwen للاستخدام المتقدم", "دليل Qwen للاستخدام الأعمق عبر API أو النماذج المفتوحة أو المقارنة مع أدوات AI الأخرى."],
  "doubao-expert": ["Doubao للاستخدام المتقدم", "كيف يمكن استخدام Doubao في مهام الكتابة والصور والفيديو والعمل المتكرر حسب توفر الخدمة."],
  "image-tools-expert": ["أدوات الصور للاستخدام المتقدم", "اختيار أدوات الصور بالذكاء الاصطناعي للاستخدام المتكرر، مع مقارنة الجودة، السعر، الحقوق، والتعديل."],
  "video-tools-expert": ["أدوات الفيديو للاستخدام المتقدم", "اختيار أدوات فيديو AI للاستخدام المتكرر، ومقارنة التكلفة، الجودة، مدة الفيديو، والحقوق."],
  "music-tools-expert": ["أدوات الموسيقى للاستخدام المتقدم", "استخدام أدوات الموسيقى بالذكاء الاصطناعي في الإعلانات والفيديوهات مع الانتباه للحقوق والتكلفة."]
};

function absoluteUrl(path) {
  if (path === "/") return SITE_URL + "/";
  return SITE_URL + path;
}

function addOrUpdateMeta(selector, createTag, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(createTag);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  return el;
}

function setSeoMeta({ title, description, canonical, alternateAr, alternateEn, locale = "ar", type = "website" }) {
  document.title = title;
  addOrUpdateMeta('meta[name="description"]', "meta", { name: "description", content: description });
  addOrUpdateMeta('link[rel="canonical"]', "link", { rel: "canonical", href: canonical });
  addOrUpdateMeta('link[rel="alternate"][hreflang="ar"]', "link", { rel: "alternate", hreflang: "ar", href: alternateAr });
  addOrUpdateMeta('link[rel="alternate"][hreflang="en"]', "link", { rel: "alternate", hreflang: "en", href: alternateEn });
  addOrUpdateMeta('link[rel="alternate"][hreflang="x-default"]', "link", { rel: "alternate", hreflang: "x-default", href: alternateAr });
  addOrUpdateMeta('meta[property="og:type"]', "meta", { property: "og:type", content: type });
  addOrUpdateMeta('meta[property="og:site_name"]', "meta", { property: "og:site_name", content: "ARABAI" });
  addOrUpdateMeta('meta[property="og:title"]', "meta", { property: "og:title", content: title });
  addOrUpdateMeta('meta[property="og:description"]', "meta", { property: "og:description", content: description });
  addOrUpdateMeta('meta[property="og:url"]', "meta", { property: "og:url", content: canonical });
  addOrUpdateMeta('meta[property="og:image"]', "meta", { property: "og:image", content: SITE_IMAGE });
  addOrUpdateMeta('meta[property="og:locale"]', "meta", { property: "og:locale", content: locale === "ar" ? "ar_SA" : "en_US" });
  addOrUpdateMeta('meta[name="twitter:card"]', "meta", { name: "twitter:card", content: "summary_large_image" });
  addOrUpdateMeta('meta[name="twitter:title"]', "meta", { name: "twitter:title", content: title });
  addOrUpdateMeta('meta[name="twitter:description"]', "meta", { name: "twitter:description", content: description });
  addOrUpdateMeta('meta[name="twitter:image"]', "meta", { name: "twitter:image", content: SITE_IMAGE });
}

function getPageSeo(page, locale) {
  const seo = PAGE_SEO[page];
  if (!seo || !seo[locale]) return null;
  const current = seo[locale];
  const arUrl = seo.ar?.url || "/";
  const enUrl = seo.en?.url || "/en.html";
  return {
    title: current.title,
    description: current.description,
    canonical: absoluteUrl(current.url),
    alternateAr: absoluteUrl(arUrl),
    alternateEn: absoluteUrl(enUrl),
    locale
  };
}

function applyStaticPageSeo(page, locale) {
  const seo = getPageSeo(page, locale);
  if (seo) setSeoMeta(seo);
}

function getArticleSeo(articleId, article, locale = "en") {
  if (locale === "ar") {
    const ar = ARABIC_ARTICLE_SEO[articleId] || [article.title, article.intro];
    return {
      title: `${ar[0]} | ARABAI`,
      description: ar[1],
      canonical: absoluteUrl(`/ar-article.html?id=${encodeURIComponent(articleId)}`),
      alternateAr: absoluteUrl(`/ar-article.html?id=${encodeURIComponent(articleId)}`),
      alternateEn: absoluteUrl(`/article.html?id=${encodeURIComponent(articleId)}`),
      locale: "ar",
      type: "article"
    };
  }

  return {
    title: `${article.title} | ARABAI`,
    description: article.intro,
    canonical: absoluteUrl(`/article.html?id=${encodeURIComponent(articleId)}`),
    alternateAr: absoluteUrl(`/ar-article.html?id=${encodeURIComponent(articleId)}`),
    alternateEn: absoluteUrl(`/article.html?id=${encodeURIComponent(articleId)}`),
    locale: "en",
    type: "article"
  };
}

window.ARABAI_SEO = {
  SITE_URL,
  PAGE_SEO,
  ARABIC_ARTICLE_SEO,
  applyStaticPageSeo,
  getArticleSeo,
  setSeoMeta,
  absoluteUrl
};
