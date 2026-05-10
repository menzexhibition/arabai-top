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
4. Implement auth.
5. Implement wallet read-only page.
6. Implement payment top-up in test mode.
7. Implement one text AI task.
8. Add image tasks.
9. Add video/music only after cost controls are proven.
10. Add Arabic content after English flow is stable.

## Important Rule

Published ARABAI guide content remains free. Paid features are only:

- ARABAI Credits usage
- future custom task marketplace services

