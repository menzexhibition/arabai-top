# ARABAI AI Credit + New API Execution Log

Date: 2026-06-23
Owner: Benny / Hermes Agent
Repository: `arabai-top`

## Decision

Implement the low-risk launch path for the ARABAI app:

1. Email/phone signup creates a lightweight ARABAI account.
2. Verified signup grants **5 free credits** only.
3. Free credits can run only selected low-cost AI tasks.
4. Real payment/recharge remains disabled until payment provider and legal review are ready.
5. AI execution uses the New API/OpenAI-compatible gateway when explicitly enabled by environment variables.
6. Supabase remains the persistence layer for users, wallets, transactions, and task history.

## Scope

### In Scope

- Adjust signup reward from the old larger launch reward to 5 credits.
- Keep founding-user campaign disabled by default for safer public launch.
- Keep recharge packages visible as coming soon unless real payment variables are configured.
- Ensure `/api/tasks/confirm` can call an OpenAI-compatible gateway via New API.
- Add tests for signup credit balance and real gateway request behavior.
- Update app copy so the frontend no longer promises 20 or 100 free credits.

### Out of Scope

- Real payment activation.
- Lemon Squeezy production webhook testing.
- Supabase dashboard/manual env-var editing.
- High-cost image/video generation launch.
- Full login verification by email OTP.

## Environment Variables Required for Production

```bash
ENABLE_SUPABASE_STORE=true
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
ENABLE_FOUNDING_USER_CAMPAIGN=false
ENABLE_AI_REDEMPTION=true
USE_REAL_AI_GATEWAY=true
AI_GATEWAY_BASE_URL=http://39.108.210.55:3000/v1
AI_GATEWAY_API_KEY=<new-api-token>
AI_GATEWAY_TEXT_MODEL=<enabled-text-model>
ARABAI_ENABLED_TASKS=premium_short_chat,prompt_improvement,premium_long_answer,image_prompt_review
FREE_CREDIT_DAILY_SPEND_CAP=5
ENABLE_REAL_RECHARGE=false
```

## Safety Rules

- Never expose `SUPABASE_SERVICE_ROLE_KEY` or New API token in logs or frontend.
- Health endpoint may expose only boolean/config presence and safe host diagnostics.
- Payment stays closed until recharge/webhook/legal flow is reviewed.
- If New API config is absent, app must remain in safe mock mode rather than crash.

## Verification Plan

1. Run existing `npm run check` after changes.
2. Confirm API handler tests cover new 5-credit signup flow.
3. Confirm a mocked OpenAI-compatible gateway receives a chat completions request.
4. Confirm frontend reward copy matches 5-credit launch rule.
5. Confirm `git diff` includes only intended files.

## Execution Notes

- The repository was initially in sparse checkout mode with only static pages and app files visible.
- Backend/API/test files already existed on `origin/main`; they were added to sparse checkout instead of creating duplicate backend files.
- Existing backend already has Supabase persistence, wallet transactions, task confirmation, and an OpenAI-compatible adapter hook.
