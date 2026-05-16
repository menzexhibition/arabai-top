# ARABAI Backend Implementation Roadmap

Last updated: 2026-05-16

This roadmap turns the static ARABAI site into a real credit-based AI product while keeping all public guide content free.

## Recommended Stack

Good first stack:

- Frontend static guide: keep GitHub Pages for `arabai.top`.
- App frontend: `app.arabai.top`, built with Next.js or similar.
- Backend API: `api.arabai.top`, built with Next.js API routes, Cloudflare Workers, Hono, Fastify, or Supabase Edge Functions.
- Database: Supabase Postgres or managed Postgres.
- Auth: Supabase Auth, Clerk, Auth.js, or similar.
- Queue: Cloudflare Queues, Upstash Redis, BullMQ, or Supabase queue pattern.
- Storage: Cloudflare R2, Supabase Storage, S3-compatible storage.
- Payment: Airwallex test mode first.
- AI routing: New API / owned gateway / SiliconFlow-style API / official APIs through backend adapters.

## Phase 0: Product Switches

Create environment flags:

```text
ENABLE_REAL_RECHARGE=false
ENABLE_AI_REDEMPTION=false
ENABLE_FREE_REWARDS=true
ENABLE_REFERRALS=true
ENABLE_MEDIA_TASKS=false
```

The website may talk about coming soon, but the backend must block live paid usage until the flags are enabled.

## Phase 1: Accounts And Wallet Records

Build:

- sign in
- sign out
- user profile
- wallet read-only page
- wallet transaction history
- signup reward after verification
- daily login reward
- referral code creation

Do not connect real AI generation yet.

Acceptance checks:

- Articles remain readable without login.
- Signup reward is granted only once.
- Daily login reward respects weekly cap.
- Referral reward stays pending until verification.
- Wallet balances never update from the browser directly.

## Phase 2: Pricing Table And Estimates

Build:

- `credit_packages`
- `credit_pricing_rules`
- `/api/tasks/pricing`
- `/api/tasks/estimate`
- admin edit for pricing rules

The estimate API should return:

```json
{
  "pricingRuleId": "premium_short_chat",
  "estimatedCredits": 2,
  "costLevel": "low",
  "freeCreditsAllowed": true,
  "requiresConfirmation": false,
  "message": "This paid AI task may use about 2 credits."
}
```

Acceptance checks:

- Users see credits by task, not provider tokens.
- High-cost tasks always require confirmation.
- Video generation returns coming soon or manual pricing.

## Phase 3: First Text AI Task

Open only:

- premium short chat
- prompt improvement
- premium long answer

Flow:

```text
estimate -> confirm -> reserve credits -> call provider -> store output -> deduct actual credits
```

Start with one paid-level text model through the backend gateway.

Acceptance checks:

- API key never appears in browser traffic.
- Task log records provider, model, estimated credits, actual credits, and status.
- Provider failure releases reserved credits.
- User dissatisfaction does not trigger unlimited free retries.

## Phase 4: Document And PPT-Lite

Open:

- long document summary
- table/file analysis
- PPT outline
- video script

Keep file uploads small at first.

Acceptance checks:

- File size limits exist.
- Sensitive data warning appears before upload.
- Large summaries require confirmation.
- Output can be copied or saved.

## Phase 5: Low-Tier Image

Open:

- image prompt and review
- low-tier image generation

Keep closed:

- high-tier image generation
- image editing
- batch images
- 9-grid generated images
- real video generation

Acceptance checks:

- Image task has queue.
- User sees estimated credits before generation.
- Free credits have daily cap.
- Output URL is stored in safe storage.
- Failed provider job refunds or releases credits.

## Phase 6: Test Payments

Use Airwallex test mode first.

Build:

- `/api/wallet/packages`
- `/api/wallet/top-up/create-checkout`
- payment webhook verification
- top-up transaction creation
- wallet credit addition after verified webhook

Acceptance checks:

- Browser cannot add credits directly.
- Webhook signature is verified.
- Duplicate webhook events are idempotent.
- Refund policy and terms are reviewed before live mode.

## Phase 7: Closed Beta

Invite a small group.

Measure:

- signup conversion
- first task completion
- cost per task
- failed generation rate
- reward abuse signals
- package purchase conversion
- gross margin

Do not open video generation until real cost data supports it.

## Admin Panel

Minimum admin screens:

- users
- wallets
- transactions
- AI tasks
- failed tasks
- provider cost logs
- pricing rules
- reward approvals
- referrals
- payment events
- refunds and reversals

Admin actions:

- edit pricing rules
- reverse abusive credits
- refund credits on failed tasks
- disable a provider/model
- pause high-cost task categories
- export usage/cost report

## Go-Live Checklist

Before enabling real recharge:

- privacy policy covers accounts, prompts, files, and generated outputs
- terms cover credits, refunds, abuse, and non-cash rewards
- payment provider account approved
- webhook signature verification tested
- provider API keys stored server-side only
- admin reversal tools ready
- cost dashboard ready
- high-cost task caps ready
- customer support contact visible

