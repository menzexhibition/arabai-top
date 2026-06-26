# ARABAI-Owned Users + New API Gateway Implementation Plan

Date: 2026-06-24
Owner: Benny / Hermes Agent
Repository: `arabai-top`

## Confirmed Product Direction

ARABAI should own the user relationship, membership, credits, payment records, referral relationship, and Arabic user experience. New API should remain as the backend model gateway and metering engine, not as the public user registration surface.

## User-Facing Principles

- Public articles remain readable without registration.
- The homepage must expose a clear entry to the model marketplace and API trial.
- Articles should link naturally to the model marketplace when they mention API/model usage.
- Users register only in ARABAI-owned pages under `arabai.top` or test subdomains.
- Users should not be asked to register in the New API console.
- Users should receive ARABAI credits and, later, ARABAI API keys.
- Arabic is the default user-facing language; only model names, API paths, providers, token units, and necessary technical terms stay in English.

## Domain Plan

- `arabai.top`: public official website and articles.
- `testapi.arabai.top`: test ARABAI-owned model marketplace, signup, credits, API trial, and payment flow.
- `api.arabai.top`: keep the existing New API original page for now as a technical/admin fallback.
- `arabai-top.vercel.app`: internal preview/testing only; never present as a public user-facing domain.

## Target Architecture

```text
User
  -> ARABAI website/app/API key
  -> ARABAI backend validates account, email verification, credits, limits
  -> ARABAI backend calls New API gateway using server-side credentials
  -> New API routes to model providers and reports usage/cost
  -> ARABAI records usage and deducts credits from the ARABAI wallet
```

## Phase 1: Fast Safe Implementation

- Keep New API original page reachable for Benny/admin testing.
- Build ARABAI-owned Arabic model marketplace on `testapi.arabai.top`.
- Let users browse models and prices without registration.
- Require ARABAI registration and verified email before receiving signup credits.
- Use ARABAI backend as the proxy to New API.
- Use server-side New API token(s), never expose New API credentials to users.
- Deduct ARABAI credits after successful task/API completion.

## Phase 2: Better Metering

- Map each ARABAI user to an internal New API token if New API management API/database access supports it safely.
- Keep user-facing API keys as ARABAI keys, not raw New API tokens.
- Synchronize New API usage/cost into ARABAI wallet transactions.
- Add per-user limits, API key revocation, and detailed usage history.

## Payment Direction

- Paid credit purchase should be implemented in test mode first.
- Real payment remains disabled until the payment provider is approved and legal/payment pages are ready.
- Webhook-confirmed payment is the only source of credit top-up.
- Browser responses must never directly add credits.

## Open Implementation Items

1. Add `testapi.arabai.top` to Vercel and DNS.
2. Build Arabic model marketplace and API trial entry.
3. Add homepage and article links to model marketplace/API trial.
4. Add real email verification before signup reward.
5. Make signup credits dynamically configurable.
6. Add or stage referral reward logic.
7. Complete payment test mode UX and webhook verification.
8. Decide whether Phase 2 uses New API admin API, direct database mapping, or an internal token pool.

## Risks

- If ARABAI and New API ledgers are not synchronized, wallet balance and gateway usage may diverge.
- If New API original pages are public-facing too early, users may register outside ARABAI and become hard to manage.
- If email verification is skipped, free-credit abuse risk remains high.
- If real payment is enabled before webhook/idempotency/legal checks, user balance or compliance problems may occur.
