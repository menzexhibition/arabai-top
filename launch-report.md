# ARABAI Launch Report

Date: 2026-05-10

## Result

ARABAI is ready as a static MVP launch candidate.

It is not yet a full paid AI platform because payments, login, wallet balance, and live AI API calls require real providers, keys, legal/payment setup, and server deployment.

## Completed

- Homepage
- AI Beginner directory
- AI Advanced directory
- AI Expert directory
- Article rendering system
- Prompt explanation table
- Try this tool link grouping
- Useful external references
- ARABAI Credits explanation page
- 5% recharge exposure-control prototype
- Privacy page
- Terms page
- External link disclosure page
- Robots file
- Sitemap file
- Web manifest
- Business model document
- Backend specification
- Future app framework scaffold

## Future App Framework

Created:

- `app-framework/README.md`
- `app-framework/.env.example`
- `app-framework/database/schema.sql`
- `app-framework/api-routes.md`
- `app-framework/providers/ai-providers.md`
- `app-framework/providers/payments.md`
- `app-framework/i18n/en.json`
- `app-framework/i18n/ar.json`

This prepares the structure for:

- accounts
- credits wallet
- payments
- AI API providers
- Arabic content
- outbound link tracking
- task marketplace leads

## Validation

Passed:

```text
node --check articles.js
node --check script.js
JSON parse checks for site.webmanifest and app-framework i18n files
HTML basics check
Article asset existence check
Local HTTP checks on localhost:8787
```

## Must Replace Before Public Domain Launch

- `sitemap.xml` now uses `https://arabai.top`.
- `robots.txt` now points to `https://arabai.top/sitemap.xml`.
- Add real contact details to `privacy.html`.
- Add legal entity/payment details before accepting money.
- Replace any future affiliate/referral URLs only after agreements are active.

## Not Included Yet

These are intentionally scaffolded, not live:

- real user login
- real payment checkout
- real ARABAI Credits balance
- real API calls to OpenRouter, SiliconFlow, or official APIs
- production Arabic translation
- production task marketplace
- server-side 5% recharge exposure control

## Recommendation

Publish the static MVP first to test:

- article interest
- tool link clicks
- Credits page visits
- which task categories attract users

Then build the backend in this order:

1. user accounts
2. wallet
3. test-mode payment
4. one text AI task
5. usage history
6. image generation
7. video/music only after cost controls are proven
