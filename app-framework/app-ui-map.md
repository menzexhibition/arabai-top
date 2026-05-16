# ARABAI App UI Map

Last updated: 2026-05-16

The public guide site stays on `arabai.top`. The logged-in product should live on `app.arabai.top`.

## Navigation

Arabic-first:

```text
الرصيد
استخدم AI
المهام
المكافآت
الدعوات
الإعدادات
```

English:

```text
Wallet
Use AI
Tasks
Rewards
Referrals
Settings
```

## Page 1: Wallet

Purpose:

- show current credits
- show redeemable, reserved, pending credits
- show packages as coming soon or available
- show transaction history

Main sections:

- balance summary
- signup success card with "You are ARABAI user #N" when the user has just registered
- founding user campaign banner, only when enabled and still available
- starter packages
- reward summary
- transaction history

Important copy:

Arabic:

```text
الرصيد مخصص لتجربة قدرات AI المدفوعة. ليس استخداما غير محدودا، ولا بديلا عن الاشتراكات الرسمية.
```

English:

```text
Credits are for trying paid AI capabilities. They are not unlimited use and do not replace official memberships.
```

Signup success copy:

Arabic:

```text
أنت المستخدم رقم 124 في ARABAI.
```

English:

```text
You are ARABAI user #124.
```

## Page 2: Use AI

Purpose:

Normal users choose tasks, not APIs.

First task cards:

- Ask a stronger AI model
- Improve my prompt
- Summarize a long text
- Analyze a small file
- Create an image prompt
- Generate a simple image
- Make a PPT outline
- Write a video script

Each card should show:

- what the user gets
- estimated credit range
- whether free credits can be used
- button: estimate first

Do not show:

- token formulas
- provider API keys
- raw model pricing

## Page 3: Task Estimate

Before running:

- show estimated credits
- show output type
- show warning for high-cost tasks
- ask user to confirm

Arabic button:

```text
تأكيد وتشغيل المهمة
```

English button:

```text
Confirm and run task
```

## Page 4: Task Result

Show:

- status: queued / running / completed / failed
- output text or generated file
- credits reserved
- credits spent
- refund note if failed
- button to copy result
- button to start a similar task

For media tasks, use polling instead of keeping the request open.

## Page 5: Rewards

Purpose:

Show users how to earn free credits without making content paid.

Reward list:

- first 100 verified users: 100 credits while campaign is active
- verified registration: 20 credits
- daily login: 1-2 credits, up to 10 per week
- useful beginner question: 5-10 credits after approval
- useful correction or tutorial feedback: 5-15 credits after approval
- referral verified registration: 20 credits
- referral first paid package: additional 20 credits after checks

Important restriction:

```text
Free credits cannot be withdrawn, refunded, transferred, or used for high-cost media tasks.
```

## Page 6: Referrals

Show:

- referral link
- invited users
- pending rewards
- approved rewards
- anti-abuse note

Do not grant full referral reward until verification checks pass.

## Page 7: Settings

Show:

- profile
- preferred language
- country
- privacy links
- delete/export account request link

## Admin Pages

Minimum admin:

- users
- wallets
- transactions
- AI tasks
- failed tasks
- provider costs
- pricing rules
- reward approvals
- referrals
- payment events

Admin must be able to:

- edit pricing rules
- disable a high-cost task
- reverse abusive credits
- refund failed task credits
- pause provider/model
- export usage and cost reports

## Mobile Layout

Most Saudi/Middle East users may arrive on mobile.

Mobile rules:

- task cards should be one column
- credit estimate must be visible before confirm
- balance should stay easy to read
- Arabic text must be RTL
- do not use tiny tables for wallet history; use stacked transaction rows
