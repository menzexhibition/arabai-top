# ARABAI Credits Prototype

This folder is a dependency-free prototype for the future ARABAI app backend.

It does not call real payment providers or real AI APIs. Its purpose is to make the business rules executable and easy for an engineer to port into Next.js, Hono, Fastify, Cloudflare Workers, Supabase Edge Functions, or another backend.

## What It Covers

- credit packages
- reward rules
- task pricing rules
- cost estimate logic
- reserve / complete / fail task flow
- safe provider adapter shape
- route handler skeletons

## Important Rules

- API keys never go to the browser.
- Users never receive ARABAI provider API keys.
- Credits are for paid AI capabilities, not provider-token resale.
- Free credits cannot run expensive video, batch image, or high-tier image editing.
- Every expensive task must show an estimate and require confirmation.

## Suggested Porting Order

1. Copy `src/config/credits.js` into backend configuration.
2. Convert `src/services/pricing.js` into a real server module.
3. Connect `src/services/wallet.js` to Postgres.
4. Replace in-memory route examples with real API routes.
5. Add provider adapters one by one.
6. Add task queue for image, slides, music, and video.

## Local Logic Check

Run:

```bash
node app-framework/prototype/tests/pricing.test.mjs
```

