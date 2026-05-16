# ARABAI Credits Pricing Plan

Last updated: 2026-05-16

## Positioning

ARABAI Credits are not a resale of provider tokens. Users buy ARABAI task credits to try paid AI capabilities through ARABAI's own interface.

The public promise should stay simple:

- Articles, videos, prompts, and guides remain free.
- Credits are for paid-level AI tasks, not basic free functions.
- Credits are not unlimited use and do not replace official subscriptions.
- Every paid task should show an estimated credit cost before it runs.
- Recharge and AI redemption remain "coming soon" until accounts, payment, wallet history, refund rules, and provider limits are ready.

## Pricing Reference

The first ARABAI credit table should be benchmarked against SiliconFlow-style model pricing:

- Text models are priced by input and output tokens, usually per 1M tokens.
- Stronger text models cost more, especially for output tokens.
- Image, video, audio, and multimodal jobs are heavier and need separate controls.
- Model prices can change, so ARABAI task pricing must be editable from the backend.

Internal rule:

```text
Estimated provider cost x safety multiplier = ARABAI credit charge
```

Use a safety multiplier of 2.0 or higher at launch so provider cost stays around 50% of the user's paid package value.

## Credit Unit

Recommended internal unit:

```text
1 ARABAI credit = about 0.10 SAR of user-facing value
```

This gives:

- 10 SAR starter package = 100 ARABAI credits
- $5 starter package = about 185 ARABAI credits, depending on exchange rate and payment fees

Do not expose provider token math to normal users. Show task credits instead.

## Paid Packages

| Package | User pays | User receives | Max provider cost target | Notes |
|---|---:|---:|---:|---|
| Saudi starter | 10 SAR | 100 credits | up to 5 SAR | Starter paid capability test |
| USD starter | $5 | 185 credits | up to $2.50 | English/international starter test |
| Saudi regular | 25 SAR | 250 credits | up to 12.5 SAR | For repeated weekly use |
| USD regular | $10 | 370 credits | up to $5.00 | For repeated weekly use |
| Saudi creative | 50 SAR | 500 credits | up to 25 SAR | More image/media room |
| USD creative | $20 | 740 credits | up to $10.00 | More image/media room |

Payment fees, failed retries, storage, support, and promotion must come from the non-provider-cost side of the package.

## Free Credit Rules

Free credits are marketing and retention credits, not cash. They cannot be withdrawn, refunded, or transferred.

| Action | Suggested reward | SAR value | Controls |
|---|---:|---:|---|
| New verified user registration | 20 credits | about 2 SAR | Email or phone verification required |
| Daily login | 1-2 credits | about 0.1-0.2 SAR | Maximum 10 credits per week |
| Useful beginner question | 5-10 credits | about 0.5-1 SAR | Manual or moderation approval |
| Useful tool/tutorial feedback | 5-15 credits | about 0.5-1.5 SAR | Only if actionable |
| Referral registration verified | 20 credits | about 2 SAR | Device/IP/fingerprint checks |
| Referral first paid package | additional 20 credits | about 2 SAR | Grant after payment and refund-risk window |

User requirement:

- New user and referral rewards should land around 2-4 SAR equivalent.
- Free credits should not unlock expensive video generation.
- Free credits may be limited to chat, prompt improvement, short summaries, and low-cost image tests.

## First Task Credit Table

This table is intentionally conservative. Adjust after seeing real provider bills.

| Task | User-facing examples | Suggested charge | Allowed with free credits? | Risk |
|---|---|---:|---|---|
| Premium short chat | Stronger model answer, rewrite, translate, explain | 2 credits | Yes | Low |
| Prompt improvement | Turn messy idea into clear prompt | 2 credits | Yes | Low |
| Premium long answer | Plan, proposal, detailed comparison | 5 credits | Yes, capped | Low-medium |
| Long document summary | PDF/report summary, action items | 10-20 credits | Limited | Medium |
| Table/file analysis | Spreadsheet explanation, small data analysis | 10-20 credits | Limited | Medium |
| Image prompt + review | Create image prompt and improvement notes | 3 credits | Yes | Low |
| Image generation low tier | One basic generated image | 20-40 credits | Limited test only | Medium |
| Image generation high tier | Higher-quality poster/product image | 50-80 credits | No | Medium-high |
| Image edit | Background change/product improvement | 40-80 credits | No | Medium-high |
| PPT outline | Slide story, titles, content skeleton | 8-15 credits | Limited | Low-medium |
| PPT first draft | More complete deck text and layout plan | 30-60 credits | No | Medium |
| Video script | Short video idea, hook, shot list | 8-15 credits | Yes, capped | Low |
| 9-grid storyboard text | Nine scene prompts for image generation | 15-25 credits | Limited | Medium |
| 9-grid storyboard images | Generate nine related images | 120-250 credits | No | High |
| Short video generation | Low-spec video test | Manual pricing / coming soon | No | Very high |
| Music prompt | Music direction and prompt | 3 credits | Yes | Low |
| Music generation | Short background music sample | 30-80 credits | No | Medium-high |

Launch recommendation:

- Open text, prompt, summary, file-lite, and low-tier image first.
- Keep high-quality images behind clear confirmation.
- Keep real video generation as coming soon or manual approval until provider costs are stable.

## Cost Protection

Before a task runs:

1. Estimate provider cost from model, input size, expected output, and media type.
2. Convert provider cost into credits using the current backend pricing table.
3. Reserve credits before calling the provider.
4. Show user the estimated credit cost and output type.
5. Block tasks that exceed user balance or per-user risk limits.

After task completion:

1. Record provider, model, request size, output size, actual provider cost if available, estimated credits, actual credits, and status.
2. Deduct actual credits within the reserved amount.
3. Refund reserved credits if provider fails before producing usable output.
4. Do not offer unlimited free retries for user dissatisfaction.

## Anti-Abuse Rules

Minimum launch rules:

- Require login for all credit earning and all AI tasks.
- Verify email or phone before granting signup credits.
- Limit one signup reward per person/device/payment profile.
- Cap daily login rewards at 10 credits per week.
- Cap referral rewards per user per day and per month.
- Delay full referral reward until the referred account is verified.
- Give extra referral reward only after the referred user pays and refund risk has passed.
- Prevent free credits from running high-cost video, batch images, or high-tier image edits.
- Add per-user daily spend caps for free credits and paid credits.
- Allow admin reversal for abusive credits.

## Backend Requirements

The backend must support:

- user accounts
- credit balance states: pending, available, redeemable, reserved, spent, reversed
- package purchase records
- reward records
- referral records
- AI task records
- provider cost logs
- pricing table by task/model
- daily and monthly limits
- task queue for slow media jobs
- payment webhook handling
- refund and reversal workflow

Suggested first architecture:

```text
ARABAI frontend
-> backend API
-> auth and wallet database
-> task queue
-> provider gateway / New API / SiliconFlow-style API / official API
-> result storage
```

## Launch Phases

Phase 1: Rules and UI only

- Keep recharge marked as coming soon.
- Publish credit positioning and examples.
- Finalize backend schema and pricing table.

Phase 2: Closed beta

- Enable login.
- Record free rewards.
- Run internal AI tasks using admin-only access.
- Compare estimated cost vs actual provider bill.

Phase 3: Paid starter

- Enable $5 and 10 SAR starter packages.
- Open premium chat, prompt improvement, short summaries, file-lite tasks, and limited image generation.
- Keep video generation closed or manual.

Phase 4: Media expansion

- Add high-tier images, PPT draft generation, music sample, and selected video tests after cost data is reliable.

