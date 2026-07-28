import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptsDir, "..");
const articlesDir = path.join(root, "ar", "articles");
const siteUrl = "https://arabai.top";
const companyName = "Saudi ARABAI Company";

const classList = {
  add() {},
  contains(value) {
    return value === "no-bridge" || value === "rtl";
  }
};

globalThis.window = {
  location: {
    origin: siteUrl,
    pathname: "/ar/articles/"
  }
};
globalThis.document = {
  body: {
    appendChild() {},
    classList,
    dataset: { staticArticle: "true" }
  },
  createElement() {
    return {
      className: "",
      innerHTML: "",
      setAttribute() {}
    };
  },
  documentElement: { lang: "ar" },
  head: {
    appendChild() {},
    querySelector() {
      return null;
    }
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  }
};

await import("../articles.js");
await import("../script.js");

const articles = globalThis.window.ARTICLES;
const renderer = globalThis.window.ARABAI_ARTICLE_RENDERER;

if (!articles || !renderer?.buildArabicArticleMarkup) {
  throw new Error("Arabic article renderer did not initialize.");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceMeta(html, selector, value) {
  const pattern = new RegExp(`(<meta ${selector} content=")[^"]*(" \\/>)`);
  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
}

function articleSchema(id, title, description) {
  const url = `${siteUrl}/ar/articles/${encodeURIComponent(id)}.html`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "ar",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${siteUrl}/assets/brand/arabai-logo-dark-640.png`,
    author: { "@type": "Organization", name: companyName, url: `${siteUrl}/` },
    publisher: {
      "@type": "Organization",
      name: companyName,
      url: `${siteUrl}/`,
      logo: { "@type": "ImageObject", url: `${siteUrl}/assets/brand/arabai-logo-dark-640.png` }
    }
  };
}

const files = (await fs.readdir(articlesDir)).filter((file) => file.endsWith(".html")).sort();
let changed = 0;

for (const file of files) {
  const id = file.slice(0, -5);
  const article = articles[id];
  if (!article) throw new Error(`Missing article data for ${id}.`);

  globalThis.window.location.pathname = `/ar/articles/${file}`;
  const rendered = renderer.buildArabicArticleMarkup(id, article);
  const filePath = path.join(articlesDir, file);
  const original = await fs.readFile(filePath, "utf8");
  let html = original;

  html = html.replace(/\s*<link rel="alternate" hreflang="en"[^>]*\/>/, "");
  html = html.replace(/\s*<div class="language-switch"[\s\S]*?<\/div>/, "");
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(rendered.title)} | ARABAI</title>`);
  html = replaceMeta(html, 'name="description"', rendered.description);
  html = replaceMeta(html, 'property="og:title"', `${rendered.title} | ARABAI`);
  html = replaceMeta(html, 'property="og:description"', rendered.description);
  html = replaceMeta(html, 'name="twitter:title"', `${rendered.title} | ARABAI`);
  html = replaceMeta(html, 'name="twitter:description"', rendered.description);
  html = html
    .replace(/\.\.\/\.\.\/styles\.css\?v=[^"]+/, "../../styles.css?v=20260728-seo2")
    .replace(/\.\.\/\.\.\/seo\.js\?v=[^"]+/, "../../seo.js?v=20260728-seo2")
    .replace(/\.\.\/\.\.\/script\.js\?v=[^"]+/, "../../script.js?v=20260728-seo2");

  html = html.replace(/\s*<script type="application\/ld\+json" data-arabai-article-schema>[\s\S]*?<\/script>/, "");
  const schema = JSON.stringify(articleSchema(id, rendered.title, rendered.description)).replaceAll("<", "\\u003c");
  html = html.replace("  </head>", `    <script type="application/ld+json" data-arabai-article-schema>${schema}</script>\n  </head>`);
  html = html.replace(
    /<main>[\s\S]*?<\/main>/,
    `<main>\n      <article class="article-page" id="ar-article-root">${rendered.html}\n      </article>\n    </main>`
  );
  html = html.replace(/[ \t]+$/gm, "");

  if (html !== original) {
    await fs.writeFile(filePath, html, "utf8");
    changed += 1;
  }
}

const sitemap = await fs.readFile(path.join(root, "sitemap.xml"), "utf8");
const sitemapPaths = [...sitemap.matchAll(/<loc>https:\/\/arabai\.top\/([^<]*)<\/loc>/g)].map((match) => match[1] || "index.html");
const legacyArabicPages = new Set([
  "ar-beginner.html",
  "ar-advanced.html",
  "ar-expert.html",
  "ar-developer-api.html",
  "ar-tutorials.html",
  "ar-credits.html",
  "ar-community.html"
]);
let cleanedArabicPages = 0;

for (const relativePath of sitemapPaths) {
  const filePath = path.join(root, relativePath);
  let original;
  try {
    original = await fs.readFile(filePath, "utf8");
  } catch {
    continue;
  }
  if (!original.includes('<html lang="ar"')) continue;

  let html = original
    .replace(/\s*<link rel="alternate" hreflang="en"[^>]*\/>/, "")
    .replace(/\s*<div class="language-switch"[\s\S]*?<\/div>/, "");
  if (legacyArabicPages.has(relativePath)) {
    html = html
      .replace(/styles\.css\?v=[^"]+/, "styles.css?v=20260728-seo2")
      .replace(/seo\.js\?v=[^"]+/, "seo.js?v=20260728-seo2")
      .replace(/script\.js\?v=[^"]+/, "script.js?v=20260728-seo2");
  }
  if (html !== original) {
    await fs.writeFile(filePath, html, "utf8");
    cleanedArabicPages += 1;
  }
}

console.log(
  `Generated ${files.length} static Arabic article pages (${changed} changed) and cleaned ${cleanedArabicPages} Arabic index pages.`
);
