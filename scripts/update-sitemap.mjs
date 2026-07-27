import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sitemapPath = path.join(root, "sitemap.xml");
const date = new Date().toISOString().slice(0, 10);
let xml = await fs.readFile(sitemapPath, "utf8");
xml = xml.replace(/\n  <!-- GENERATED SEO PAGES -->[\s\S]*?<!-- \/GENERATED SEO PAGES -->/g, "");

const urls = [];
for (const directory of ["models", "compare"]) {
  const files = (await fs.readdir(path.join(root, directory))).filter((file) => file.endsWith(".html")).sort();
  for (const file of files) {
    urls.push(`  <url><loc>https://arabai.top/${directory}/${file}</loc><lastmod>${date}</lastmod><priority>${directory === "models" ? "0.80" : "0.75"}</priority></url>`);
  }
}
const block = `\n  <!-- GENERATED SEO PAGES -->\n${urls.join("\n")}\n  <!-- /GENERATED SEO PAGES -->\n`;
xml = xml.replace("</urlset>", `${block}</urlset>`);
await fs.writeFile(sitemapPath, xml, "utf8");
console.log(`Added ${urls.length} generated SEO pages to sitemap.xml.`);
