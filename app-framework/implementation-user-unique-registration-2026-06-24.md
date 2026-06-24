# ARABAI Unique Registration Hardening Log

Date: 2026-06-24
Owner: Benny / Hermes Agent
Repository: `arabai-top`

## Goal

Prevent accidental user overwrites during registration by making the signup flow stricter:

1. `email` must be unique when provided.
2. `phone` must be unique when provided.
3. A new registration must not silently reuse and overwrite an existing account just because one field matches.
4. If either identifier is already taken by a different user, return a clear conflict error instead of updating the old record.

## Why This Change Is Needed

The current behavior treats `email OR phone` as a match and then updates the existing row. That can cause:

- accidental reuse of old users,
- overwriting profile fields,
- misleading reward issuance,
- confusing support/debugging later.

## Expected Behavior

- If both email and phone are unused, create a new user.
- If either email or phone already belongs to another user, reject the signup with a clear error.
- If the request belongs to the same authenticated user/session, keep normal profile updates limited to non-unique fields.

## Files Likely Touched

- `server/app.js`
- `server/supabase-store.js` if helper support is needed
- `tests/api-handler.test.mjs`
- `tests/new-api-gateway.test.mjs` only if behavior overlaps unexpectedly

## Verification Plan

1. Add/adjust tests for duplicate email and duplicate phone registration rejection.
2. Add/adjust tests for successful fresh registration.
3. Run `npm run check`.
4. Redeploy after passing tests.
5. Re-test with a new signup to confirm no overwrite behavior.
