import http from "node:http";
import { readdir } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";

const root = "/Users/benny/Documents/New project";
const pages = [
  "/index.html",
  "/models.html",
  "/console.html",
  "/learn.html",
  "/ar.html",
  "/en.html",
  "/ar-beginner.html",
  "/ar-advanced.html",
  "/ar-expert.html",
  "/ar-credits.html",
  "/ar-community.html",
  "/ar-tutorials.html",
  "/ar-developer-api.html",
  "/beginner.html",
  "/advanced.html",
  "/expert.html",
  "/credits.html",
  "/community.html",
  "/tutorials.html",
  "/article.html",
  "/ar-article.html",
  "/app/index.html",
  "/ar/articles/what-is-ai.html",
  "/ar/articles/ai-basic-words.html",
  "/ar/articles/what-is-a-prompt.html",
  "/ar/articles/write-with-ai.html",
  "/ar/articles/create-images.html",
  "/ar/articles/make-slides.html",
  "/ar/articles/make-videos.html",
  "/en/articles/what-is-ai.html",
  "/en/articles/what-is-a-prompt.html",
  "/en/articles/create-images.html",
  "/en/articles/make-slides.html",
  "/en/articles/make-videos.html"
];

for (const directory of ["models", "compare"]) {
  const files = await readdir(path.join(root, directory));
  pages.push(...files.filter((file) => file.endsWith(".html")).map((file) => `/${directory}/${file}`));
}

const mimeByExt = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".vtt": "text/vtt; charset=utf-8",
  ".srt": "text/plain; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

function resolvePath(urlPath) {
  const pathname = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  const normalized = pathname === "/" ? "/index.html" : pathname;
  return path.join(root, normalized);
}

const server = http.createServer(async (req, res) => {
  const filePath = resolvePath(req.url || "/");
  if (!existsSync(filePath)) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.setHeader("content-type", mimeByExt[ext] || "application/octet-stream");
  createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(4177, "127.0.0.1", resolve));

const failures = [];

for (const page of pages) {
  const response = await fetch(`http://127.0.0.1:4177${page}`);
  const text = await response.text();
  if (!response.ok) {
    failures.push(`${page} returned ${response.status}`);
    continue;
  }
  if (!/<!doctype html>/i.test(text) || !/<title>/i.test(text)) {
    failures.push(`${page} did not look like a complete HTML page`);
  }
}

server.close();

if (failures.length) {
  console.error("ARABAI page smoke check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`ARABAI page smoke check passed for ${pages.length} pages.`);
