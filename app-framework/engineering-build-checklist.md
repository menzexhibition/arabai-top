# ARABAI Engineering Build Checklist

This checklist is for the first engineer implementing `app.arabai.top`.

## Week 1 Target

Build a private prototype with:

- auth
- wallet read page
- signup reward
- daily login reward
- pricing estimate endpoint
- one premium text task using a mock provider
- admin-readable task logs

Do not build:

- real payment
- real video generation
- real music generation
- public API access for users
- user-facing provider API keys

## Setup

- [ ] Create app project.
- [ ] Add environment variables from `.env.example`.
- [ ] Create database from `database/supabase-migration.sql` or port schema to chosen DB.
- [ ] Configure auth provider.
- [ ] Configure server-only service role key.
- [ ] Keep `ENABLE_REAL_RECHARGE=false`.
- [ ] Keep `ENABLE_AI_REDEMPTION=false` until internal testing passes.

## Auth And Wallet

- [ ] Create profile after verified sign-in.
- [ ] Create wallet after profile creation.
- [ ] Grant signup reward only once.
- [ ] Keep founding user campaign disabled by default.
- [ ] Grant founding user campaign credits only to the first 100 verified users when enabled.
- [ ] Confirm founding user reward cannot be claimed twice by the same user.
- [ ] Grant daily login reward only within weekly cap.
- [ ] Show wallet balance.
- [ ] Show transaction history.
- [ ] Confirm users cannot edit wallet from browser.

## Pricing

- [ ] Load pricing rules from DB.
- [ ] Implement `/api/tasks/pricing`.
- [ ] Implement `/api/tasks/estimate`.
- [ ] Confirm high-cost rules require confirmation.
- [ ] Confirm video generation returns coming soon.
- [ ] Confirm free credits cannot run high-cost tasks.

## First AI Task

- [ ] Implement `premium_short_chat` with mock provider.
- [ ] Reserve credits before provider call.
- [ ] Complete task and deduct credits.
- [ ] Fail task and refund/release reserved credits.
- [ ] Store task output.
- [ ] Store provider cost log placeholder.

## Provider Integration

- [ ] Add New API / gateway base URL only on server.
- [ ] Add provider API key only on server.
- [ ] Never expose API key in browser.
- [ ] Log provider, model, approximate cost, and status.
- [ ] Add timeout and retry policy.

## Payment Test Mode

- [ ] Implement package list.
- [ ] Implement create checkout endpoint in test mode.
- [ ] Implement webhook signature verification.
- [ ] Ensure duplicate webhook events do not add credits twice.
- [ ] Keep package status as coming soon until owner approves.

## Admin

- [ ] View users.
- [ ] View wallets.
- [ ] View transactions.
- [ ] View tasks.
- [ ] View failed tasks.
- [ ] View provider cost logs.
- [ ] Edit pricing rules.
- [ ] Reverse abusive credits.

## Release Gates

Do not enable real recharge until:

- [ ] Terms include credits and refund rules.
- [ ] Privacy policy covers prompts, files, generated outputs, and provider processing.
- [ ] Payment provider is approved.
- [ ] Webhook verification is tested.
- [ ] Admin reversal tools work.
- [ ] Cost dashboard works.
- [ ] Daily spend caps are active.
- [ ] Founding user campaign cap and anti-abuse checks are active before promotion starts.
- [ ] Customer support channel is visible.
