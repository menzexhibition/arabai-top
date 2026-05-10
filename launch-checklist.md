# ARABAI Launch Checklist

This project is ready to publish as a static MVP after domain-specific values are updated.

## Static MVP Ready

- Free guide homepage
- Beginner, Advanced, Expert directories
- Article rendering system
- Prompt explanations
- Try this tool links
- External reference links
- ARABAI Credits explanation page
- Privacy policy page
- Terms page
- External link disclosure page
- Robots and sitemap files
- Business model documentation
- Static update workflow documentation
- 5% recharge exposure-control prototype
- Future app framework scaffold in `app-framework/`

## Replace Before Public Launch

Domain values now use `https://arabai.top/`. Replace the remaining business placeholder values:

- contact details in `privacy.html`
- production legal entity details in `terms.html`
- final brand naming in analytics and disclosure copy must use ARABAI consistently

## Not Yet Production Ready

These require real accounts, keys, backend infrastructure, and compliance review:

- user login
- ARABAI Credits wallet balance
- payment checkout
- refund logic
- API calls to OpenRouter, SiliconFlow, or official APIs
- Arabic translated website
- task marketplace
- server-side 5% exposure control
- affiliate/referral tracking links

Framework files for these items are already drafted in:

```text
app-framework/
backend-spec.md
business-model.md
conversion-control.md
static-update-workflow.md
```

## Recommended Backend Stack

For a practical first production version:

- Frontend: static site or Next.js
- Database: Supabase Postgres
- Auth: Supabase Auth or Clerk
- Payments: Stripe, plus regional payment provider if targeting Saudi/Middle East
- AI gateway: OpenRouter or SiliconFlow first, official APIs for important models
- Storage: Supabase Storage or S3-compatible storage
- Analytics: privacy-friendly outbound link and article analytics

## First Backend Milestone

Build one small paid feature before adding everything:

```text
User signs in.
User tops up credits.
User runs one chat task.
ARABAI deducts credits.
User sees usage history.
```

Only after this works should image, video, music, and slides be added.

## Launch Risk Notes

- Do not sell official subscriptions unless ARABAI has reseller permission.
- Do not hide high video/image costs from users.
- Do not show a recharge prompt to most users.
- Do not charge for published guide content.
- Do not accept payment until refund, privacy, and terms pages are production-ready.
