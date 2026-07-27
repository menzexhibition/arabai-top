import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const rootMappings = {
  "en.html": "/",
  "beginner.html": "/ar-beginner.html",
  "advanced.html": "/ar-advanced.html",
  "expert.html": "/ar-expert.html",
  "credits.html": "/ar-credits.html",
  "community.html": "/ar-community.html",
  "tutorials.html": "/ar-tutorials.html",
  "developer-api.html": "/ar-developer-api.html",
  "what-is-ai.html": "/ar/articles/what-is-ai.html",
  "what-can-ai-do.html": "/ar/articles/what-can-ai-do.html",
  "article.html": "/ar-article.html",
  "app/en.html": "/#early-access",
  "agents/en/index.html": "/learn.html"
};

function redirectPage(target) {
  const encodedTarget = JSON.stringify(target);
  const canonicalTarget = target.split("#")[0] || "/";
  return `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex,follow" />
    <meta http-equiv="refresh" content="0; url=${target}" />
    <link rel="canonical" href="https://arabai.top${canonicalTarget}" />
    <title>انتقلت الصفحة | ARABAI</title>
    <script>const u=new URL(${encodedTarget},location.origin);u.search=location.search;if(location.hash)u.hash=location.hash;location.replace(u);</script>
  </head>
  <body><p>انتقلت هذه الصفحة. <a href="${target}">افتح الصفحة العربية</a>.</p></body>
</html>
`;
}

const mappings = new Map(Object.entries(rootMappings));
const englishArticlesDir = path.join(root, "en", "articles");
for (const file of await fs.readdir(englishArticlesDir)) {
  if (!file.endsWith(".html")) continue;
  const arabicArticle = path.join(root, "ar", "articles", file);
  const target = await fs.access(arabicArticle).then(() => `/ar/articles/${file}`).catch(() => "/learn.html");
  mappings.set(`en/articles/${file}`, target);
}

await Promise.all(
  [...mappings].map(async ([file, target]) => {
    await fs.writeFile(path.join(root, file), redirectPage(target), "utf8");
  })
);

console.log(`Generated ${mappings.size} Arabic legacy redirect pages.`);
