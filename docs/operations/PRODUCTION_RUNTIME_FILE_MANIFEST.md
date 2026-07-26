# ARABAI Production Runtime File Manifest

Updated: 2026-06-29

This file records which files and directories are actually needed to keep the public ARABAI website running, and which areas are support material only.

## 1. Public site core

These files are the main static site entry points and shared frontend assets.

- `index.html`
- `ar.html`
- `en.html`
- `ar-beginner.html`
- `ar-advanced.html`
- `ar-expert.html`
- `ar-article.html`
- `ar-tutorials.html`
- `ar-credits.html`
- `ar-community.html`
- `ar-developer-api.html`
- `article.html`
- `beginner.html`
- `advanced.html`
- `expert.html`
- `tutorials.html`
- `community.html`
- `credits.html`
- `what-is-ai.html`
- `what-can-ai-do.html`
- `styles.css`
- `script.js`
- `seo.js`
- `articles.js`

## 2. Arabic article content

These files are part of the actual Arabic content product and should be treated as production content.

- `ar/articles/*.html`

Current high-value beginner/task pages include:

- `ar/articles/what-is-ai.html`
- `ar/articles/ai-basic-words.html`
- `ar/articles/what-is-a-prompt.html`
- `ar/articles/write-with-ai.html`
- `ar/articles/create-images.html`
- `ar/articles/make-slides.html`
- `ar/articles/make-videos.html`
- `ar/articles/why-ai-costs-money.html`
- `ar/articles/what-is-api.html`
- `ar/articles/organize-prompt-first.html`

## 3. English article content

English is secondary but still part of the current public site.

- `en/articles/*.html`

## 4. Legal and indexing

These files are needed for publishing, search engines, branding, and policy visibility.

- `privacy.html`
- `terms.html`
- `refund.html`
- `disclosure.html`
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- `CNAME`
- `.nojekyll`
- `vercel.json`

## 5. Brand and public media assets

These files are referenced by public pages and should be kept available.

- `assets/brand/*`
- `assets/videos/*`
- `assets/subtitles/*`
- `assets/outputs/*`

## 6. In-site AI app surface

These files power the ARABAI in-site usage entry and are required if `/app` remains part of the live product.

- `app/index.html`
- `app/app.js`
- `app/styles.css`

## 7. Server and API runtime

These files are needed for account signup, wallet, credits, task estimation, task execution flow, and future recharge integration.

- `server/app.js`
- `server/supabase-store.js`
- `api/health.js`
- `api/me.js`
- `api/auth/verified-signin.js`
- `api/auth/sign-out.js`
- `api/tasks/index.js`
- `api/tasks/estimate.js`
- `api/tasks/confirm.js`
- `api/wallet/packages.js`
- `api/wallet/transactions.js`
- `api/wallet/claim-daily-login.js`
- `api/wallet/top-up/webhook.js`

The checkout route implementation remains in `server/app.js`, but its standalone Vercel function is not deployed while payments are disabled.

## 8. Runtime support and deployment config

These are not public pages, but they are operationally important for keeping the app/API side working.

- `package.json`
- `VERCEL_SUPABASE_ENABLE_CHECKLIST.md`
- `app-framework/.env.example`
- `app-framework/database/schema.sql`
- `app-framework/database/supabase-migration.sql`
- `app-framework/providers/real-ai-gateway-setup.md`

## 9. Support material, not required for the public site to render

These areas are useful for development, handoff, planning, testing, or research, but they are not production runtime requirements for the public website itself.

- `docs/`
- `tests/`
- `scripts/`
- `app-framework/prototype/`
- `app-framework/mock-app/`
- `agents/`
- `research/`
- `Upload/`
- `tmp/`
- `dist/`
- `*.zip`
- `handoff-summary.md`
- `backend-spec.md`
- `business-model.md`
- `content-audit.md`
- `conversion-control.md`
- `credits-pricing-plan.md`
- `launch-checklist.md`
- `launch-report.md`
- `static-update-workflow.md`
- `team-requirements-record.md`

## 10. Recommended interpretation

If the goal is "keep the current ARABAI website online and usable", the minimum meaningful production scope is:

1. public homepage and content pages
2. Arabic article library
3. legal/SEO files
4. brand/media assets
5. `/app` surface
6. `server/` + `api/` runtime if signup/credits/tasks must actually work

If the goal is only "public content site", then `/app`, `server/`, and `api/` can be considered stage-two runtime rather than stage-one runtime.

## 11. Remotion note

There is currently no `remotion` or `@remotion/*` dependency in `package.json`.

That means ARABAI does not yet have a ready Remotion video pipeline inside this repo. A Remotion-based tutorial-video workflow can be added later, but it is not part of the current runnable production stack.
