# ARABAI Vercel + Supabase Enable Checklist

This checklist is for turning on the first persisted app flow for:

- verified signup
- registration number
- wallet balance
- wallet transactions
- AI task records

It does **not** turn on real payment or real public AI redemption yet.

## 1. Run the database migration

In Supabase SQL Editor, run:

`app-framework/database/supabase-migration.sql`

This creates:

- `public.users`
- `public.wallets`
- `public.wallet_transactions`
- `public.credit_packages`
- `public.credit_pricing_rules`
- `public.ai_tasks`
- supporting reward and tracking tables

## 2. Add Vercel environment variables

Project: `arabai-top.vercel.app`

Required now:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ENABLE_SUPABASE_STORE=true`

Recommended to keep as-is for now:

- `ENABLE_REAL_RECHARGE=false`
- `ENABLE_AI_REDEMPTION=false`
- `USE_REAL_AI_GATEWAY=false`

Already planned for later:

- `AI_GATEWAY_BASE_URL`
- `AI_GATEWAY_API_KEY`
- `AI_GATEWAY_TEXT_MODEL`
- `AI_GATEWAY_IMAGE_MODEL`

## 3. Redeploy Vercel

After env vars are saved:

1. Trigger a redeploy in Vercel.
2. Open `/app`.
3. Register with email or phone.
4. Confirm that:
   - user number appears
   - wallet balance is kept on refresh
   - `/api/me` returns the saved user

## 4. Quick smoke test

Check these routes after deploy:

- `GET /api/health`
- `GET /api/me`
- `POST /api/auth/verified-signin`
- `GET /api/wallet`
- `GET /api/wallet/transactions`
- `GET /api/tasks`
- `POST /api/tasks/estimate`
- `POST /api/tasks/confirm`

Expected early behavior:

- recharge returns `coming_soon`
- task history is empty before first run
- text task creates wallet transactions and task records

## 5. Keep these features off for now

Do not enable yet:

- real payment checkout
- public recharge
- real AI gateway for all users
- expensive image/video/music tasks

These should stay gated until cost logging is verified.

## 6. First safe launch mode

Best first live mode:

- public articles remain free
- `/app` allows signup
- founding user credits can be granted
- wallet records persist
- task pricing is visible
- real recharge stays off
- real AI redemption stays off or limited to internal test users

## 7. Next step after this checklist

After persistence is confirmed working, the next safest step is:

1. turn on one low-cost real text task only
2. log every task cost
3. verify wallet deduction and refund behavior
4. only then open image generation to a small test group
