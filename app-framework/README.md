# ARABAI App Framework

This folder is the future product framework for accounts, credits, payments, API calls, Arabic content, and task marketplace integration.

It does not contain real secrets and does not process real payments.

## What This Framework Covers

- user accounts
- ARABAI Credits wallet
- payment provider integration
- AI provider integration
- usage history
- Arabic translation structure
- affiliate/referral link tracking
- future task marketplace handoff

## Suggested Implementation Order

1. Create real hosting project.
2. Add database tables from `database/schema.sql`.
3. Add environment variables from `.env.example`.
4. Implement auth and verified signup reward.
5. Implement wallet read-only page and transaction history.
6. Implement pricing rules from `../credits-pricing-plan.md`.
7. Implement reward rules: signup, daily login, referral, approved contribution.
8. Implement payment top-up in test mode only.
9. Implement one paid-level text AI task through the backend.
10. Add prompt improvement, long summary, and PPT outline tasks.
11. Add low-tier image generation after cost logging works.
12. Add video/music only after cost controls are proven.
13. Add Arabic app UI once the backend flow is stable.

## Vercel MVP Entry

This repository now includes a small Vercel-compatible MVP:

```text
/app
/api/me
/api/auth/verified-signin
/api/tasks/estimate
/api/tasks/confirm
```

It is still a demo gateway until Supabase persistence is connected. Use it to test the online flow first, then replace the in-memory state with Supabase tables.

## Optional Supabase Store

The Vercel API now has a guarded Supabase persistence mode. It stays off by default so the live demo does not break while the database is being prepared.

To enable it later:

1. Run `app-framework/database/schema.sql` in Supabase SQL Editor.
2. Add these Vercel environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ENABLE_SUPABASE_STORE=true`
3. Keep `ENABLE_REAL_RECHARGE=false` until payment is approved.
4. Keep `USE_REAL_AI_GATEWAY=false` until the provider key and cost limits are tested.

When enabled, `/api/auth/verified-signin`, `/api/me`, `/api/wallet`, `/api/wallet/transactions`, and `/api/tasks/confirm` can save and read users, wallets, transactions, and task records from Supabase.

## Important Rule

Published ARABAI guide content remains free. Paid features are only:

- ARABAI Credits usage
- future custom task marketplace services

Credits are for trying paid AI capabilities, not for reselling provider tokens or hiding basic free features behind a paywall.

## Current Commercial Rule

- 10 SAR starter package should grant about 100 credits.
- $5 starter package should grant about 185 credits.
- Provider/API cost should stay around 50% or less of package value.
- Free signup and referral rewards should stay around 2-4 SAR equivalent.
- Free credits should not unlock high-cost video, batch image generation, or high-tier image editing.

## First AI Features

Open first:

- premium short chat
- prompt improvement
- premium long answer
- long document summary
- image prompt and review
- low-tier image generation
- PPT outline
- video script

Keep coming soon first:

- real video generation
- 9-grid generated image batch
- music generation
- high-tier image editing
