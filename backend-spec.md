# ARABAI Backend Specification

This document describes the backend needed for ARABAI Credits, login, community rewards, and later AI usage.

The public articles should remain readable without login. Login is required only for wallet, Credits records, community submissions, rewards, referrals, recharge, and AI usage.

## Core Objects

### User

```text
id
email
phone_optional
display_name
country
language
role: user | moderator | admin
referral_code
referred_by_user_id
created_at
last_login_at
```

### Wallet

```text
user_id
credit_balance
pending_credit_balance
redeemable_credit_balance
currency
updated_at
```

### Transaction

```text
id
user_id
type: signup_reward | contribution_reward | referral_reward | top_up | spend | refund | adjustment | expire
status: pending | approved | rejected | available | spent | reversed
credits
money_amount
currency
provider
provider_reference
source_id
reviewed_by
reviewed_at
created_at
```

### Community Submission

```text
id
user_id
type: question | ai_example | tool_suggestion | correction | tutorial_feedback | beginner_tip
title
content
url_optional
status: submitted | under_review | approved | rejected | spam
quality_score
reward_credits
reviewed_by
review_note
created_at
reviewed_at
```

### Referral

```text
id
referrer_user_id
referred_user_id
status: pending | verified | rewarded | rejected
reward_credits
created_at
verified_at
rewarded_at
```

### AI Task

```text
id
user_id
task_type: chat | image | video | music | slides | document
status: draft | confirmed | running | completed | failed | refunded
estimated_credits
actual_credits
model_provider
model_name
input_summary
output_url
created_at
completed_at
```

## Required User Flow

### Read Articles

1. User opens ARABAI.
2. User reads Beginner, Advanced, Expert, Credits, and Community pages without login.
3. No registration wall should block content or SEO.

### Sign In

1. User chooses to sign in only when they want to submit, earn Credits, refer friends, recharge, or use AI.
2. Use email OTP, magic link, Google login, or phone login depending on launch region.
3. After login, create User and Wallet records.
4. Show current Credit balance and contribution history.

### Submit Contribution And Earn Credits

1. Signed-in user submits a useful question, real AI example, tool suggestion, correction, or tutorial feedback.
2. Submission status is `submitted`.
3. Moderator reviews the submission.
4. If approved, backend creates a `contribution_reward` Transaction.
5. Credits are recorded in the wallet.
6. Before AI usage launches, recorded Credits are visible but not redeemable.
7. After AI usage launches, approved Credits can move into redeemable balance according to launch rules.

### Signup Reward

1. User signs in and verifies email or phone.
2. Backend may grant a one-time `signup_reward`.
3. Suggested launch reward: 20 credits, about 2 SAR equivalent.
4. Reward should have anti-abuse limits.

### Founding User Campaign

For the cold-start period, ARABAI may grant starter credits to the first 100 verified registered users.

1. Campaign must be disabled by default until owner enables it.
2. User must register and verify email or phone.
3. Backend checks current approved campaign count.
4. If count is under 100 and abuse checks pass, backend grants 100 credits.
5. This equals about 10 SAR starter value, or a $5 reference starter promotion.
6. Credits cannot be withdrawn, refunded, transferred, or exchanged for cash.
7. Campaign credits cannot run high-cost video, batch images, high-tier image editing, or manual-price tasks.
8. Admin can pause the campaign early if abuse or provider costs are too high.

### Daily Login Reward

1. User signs in on a new day.
2. Backend may grant 1-2 credits.
3. Cap daily login rewards at 10 credits per week.
4. Login rewards should not unlock high-cost video, batch images, or high-tier image editing.

### Referral Reward

1. Signed-in user shares a referral link or code.
2. New user registers and verifies.
3. Backend records a pending referral.
4. Suggested verified-registration reward: 20 credits, about 2 SAR equivalent.
5. Suggested first-paid-package bonus: additional 20 credits after successful payment and refund-risk checks.
6. Reward is granted only after verification and abuse checks.
7. If referral recharge rewards are added later, reward only after successful payment and refund window rules.

### Top Up

1. User signs in.
2. User chooses a top-up amount.
3. Payment provider confirms payment.
4. Backend adds credits to wallet.
5. Transaction is recorded.

Starter package rules:

- 10 SAR package should grant about 100 credits.
- $5 package should grant about 185 credits, adjusted by exchange rate and payment fees.
- Provider/API cost should target no more than 50% of paid package value.
- Public copy must describe Credits as paid AI capability access, not unlimited model use.

### Run AI Task

1. User chooses a task.
2. Backend estimates credits.
3. User confirms.
4. Backend reserves credits.
5. Backend calls AI provider.
6. Backend stores result or output URL.
7. Backend deducts actual credits.
8. If task fails, backend refunds reserved credits according to rules.

## Credit Rules

Never run high-cost tasks without confirmation.

Credits are for trying paid-level AI capabilities such as stronger chat models, file analysis, image generation, slide drafts, and selected media tasks. They should not be positioned as free-tool access or provider-token resale.

Reward Credits can be recorded before AI usage opens, but they cannot be redeemed until the system has:

- user accounts
- wallet history
- abuse protection
- AI provider integration
- spending limits
- terms and refund rules

Credits should have separate states:

- `pending`: waiting for review or fraud checks
- `available`: approved and recorded
- `redeemable`: usable for AI tasks after launch rules allow it
- `spent`: already used
- `reversed`: removed due to abuse, error, refund, or moderation decision

Articles stay free and never require Credits.

High-cost examples:

- video
- 9-grid storyboard
- batch image generation
- long document analysis
- slide generation with images

Show users:

```text
Estimated credits
What they will get
Whether failed attempts may still cost credits
```

First launch task charges should be stored in an editable backend pricing table. Suggested initial charges:

- premium short chat: 2 credits
- prompt improvement: 2 credits
- premium long answer: 5 credits
- long document summary: 10-20 credits
- table/file analysis: 10-20 credits
- image prompt and review: 3 credits
- low-tier image generation: 20-40 credits
- high-tier image generation: 50-80 credits
- image edit: 40-80 credits
- PPT outline: 8-15 credits
- PPT first draft: 30-60 credits
- video script: 8-15 credits
- 9-grid storyboard text: 15-25 credits
- 9-grid storyboard images: 120-250 credits
- real video generation: manual pricing or coming soon
- music generation: 30-80 credits

## Provider Strategy

Start small.

Phase 1:

- one text model through OpenRouter, SiliconFlow, or official API
- one image provider

Phase 2:

- document summary
- slides
- audio/music

Phase 3:

- video
- batch workflows
- marketplace handoff

## Security Rules

- API keys never go to the browser.
- Wallet deduction must happen server-side.
- Contribution rewards must happen server-side.
- Users cannot grant Credits to themselves.
- All reward transactions need a source submission, referral, or admin note.
- Do not rely on localStorage for real Credits.
- 5% recharge exposure control must happen server-side in production.
- Payment webhook must verify provider signature.
- Users must see transaction history.
- Admins need manual refund/adjustment tools.

## Anti-Abuse Rules

- Verify email or phone before any reward becomes available.
- Limit signup rewards to one verified user per reasonable identity signal.
- Rate-limit submissions per account, IP, and device.
- Detect duplicate content and copied spam.
- Put contribution rewards into pending review first.
- Cap daily and weekly reward Credits.
- Require manual approval for high rewards.
- Keep audit logs for admin changes.
- Allow admins to reverse abusive Credits.

## Admin Tools

Admin should be able to see:

- users
- wallet balances
- pending reward balances
- top-ups
- contribution submissions
- referral records
- reward transactions
- AI tasks
- failed tasks
- provider cost
- revenue margin
- refund requests

Admin should be able to:

- approve or reject submissions
- assign reward Credits
- reverse abusive rewards
- mark content as spam
- view per-user reward history
- export users and wallet records

## Metrics

Track:

- article views
- outbound official link clicks
- Try this tool clicks
- Credits page views
- signups
- verified users
- community submissions
- approved submissions
- rejected/spam submissions
- reward Credits issued
- referral signups
- top-up conversion
- cost per task
- failed generation rate
- refund rate
- repeat usage
