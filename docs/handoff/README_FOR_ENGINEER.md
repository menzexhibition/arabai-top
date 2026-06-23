# README_FOR_ENGINEER

Project: **ARABAI**
Domain: `https://arabai.top`
Default language: **Arabic**

## What this site is

ARABAI is a simple Arabic-first AI guide for ordinary users.  
It should help a beginner understand AI, use AI, and later use AI credits or API-based tools.

## Current structure

- `index.html` - Arabic homepage
- `en.html` - English homepage
- `ar.html` - Arabic homepage alias
- `beginner.html` / `ar-beginner.html`
- `advanced.html` / `ar-advanced.html`
- `expert.html` / `ar-expert.html`
- `article.html` / `ar-article.html`
- `articles.js` - article content
- `script.js` - article rendering, UI logic
- `seo.js` - SEO/meta helper
- `styles.css` - site styling
- `sitemap.xml` - indexed URLs
- `site.webmanifest` - PWA manifest
- `what-is-ai.html` / `what-can-ai-do.html` - small compatibility redirect pages

## Important docs

- [AI_HANDOFF_MASTER.md](./AI_HANDOFF_MASTER.md)
- [team-requirements-record.md](./team-requirements-record.md)
- [issue-completion-checklist.md](./issue-completion-checklist.md)
- [content-audit.md](./content-audit.md)
- [launch-checklist.md](./launch-checklist.md)
- [handoff-summary.md](./handoff-summary.md)

## Current priorities

1. Arabic humanization / native tone review
2. Core articles as real case tutorials
3. Multimodal tutorial assets (images, video, PPT, music)
4. External beginner-friendly videos
5. Continue SEO and analytics validation

## Rules

- Do not bring back `MyAI / MY AI / MYAI`.
- Keep Arabic content simple, beginner-friendly, and natural.
- Do not publish screenshots or videos that include desktop UI, private chats, API keys, payment data, or personal information.
- Keep published guide content free.
- Paid credits / payment remain "coming soon" unless the owner approves launch.

## Notes

- The repo already includes static Arabic and English article pages under:
  - `ar/articles/`
  - `en/articles/`
- Preferred article URLs are static paths like `ar/articles/what-is-ai.html`.
- `article.html?id=...` and `ar-article.html?id=...` remain compatibility routes.
- `add1/` has been removed and is not part of the project.
- `research/` contains working materials and must be treated carefully because it may include sensitive screenshots.
- The public backup zip intentionally excludes `.git`, `.venv-markitdown`, `research/`, `dist/`, and old zip files.

## Quick checks

- Syntax: `node --check seo.js && node --check script.js && node --check articles.js`
- Sitemap XML parse: `python3 -c "import xml.etree.ElementTree as ET; print(len(ET.parse('sitemap.xml').getroot()))"`
- GitHub Pages status: `gh api repos/menzexhibition/arabai-top/pages`

## If you continue the site

Start by reading:

1. `AI_HANDOFF_MASTER.md`
2. `team-requirements-record.md`
3. `issue-completion-checklist.md`
4. `content-audit.md`

Then verify the current page set before making content changes.
