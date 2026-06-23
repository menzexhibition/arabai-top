# ARABAI Master Handoff

Last updated: 2026-06-15
Primary owner communication language: Chinese
Public site primary audience: Arabic-speaking beginners, especially Saudi / Middle East users
Public domain: `https://arabai.top`

## 1. What This Project Is

ARABAI is an Arabic-first AI guide website for ordinary users.

It is **not** meant to feel like:

- a corporate AI portal
- a tool-ranking news site
- a developer documentation hub
- a hard-sell credit landing page

It **is** meant to feel like:

- a simple AI handbook
- a practical beginner guide
- a clear manual for everyday people
- a site that makes AI feel understandable, usable, and worth trying

The owner's core idea is:

> Let ordinary people know AI, learn to use AI, and let AI help them work.

## 2. Original Intent And Business Direction

### Core purpose

The owner wants ARABAI to:

1. make Arabic-speaking ordinary users interested in AI
2. help total beginners understand what AI is in plain language
3. help users complete real tasks step by step
4. build trust so that some users later want to use ARABAI as a simple AI access point

### Long-term commercial direction

The site's long-term monetization direction is:

- free public content stays free
- later ARABAI may offer a small-credit wallet / simple paid AI access layer
- future income may come from:
  - official affiliate/referral links
  - ARABAI credits
  - multi-model access through API
  - future separate AI task marketplace
  - possibly advertising later

### Important commercial constraints

- Do **not** make the site feel too salesy.
- Do **not** put strong recharge pressure everywhere.
- The owner wants only a small percentage of users to feel pushed toward future payment.
- Published guide articles must remain free.
- Payment / credits / recharge can be shown as planned or coming soon, but should not be misrepresented as fully live unless actually implemented.

## 3. Current Positioning

The site has recently been repositioned away from being too tool-led.

### Current strategic rule

- method first
- task first
- beginner first
- tool names second

Tool names are still allowed when needed:

- official references
- official login pages
- tutorial video titles
- keyword routing
- specific examples

But the site should not read like:

- "Use ChatGPT / Use Gemini / Use Claude" as the main identity of every page

It should increasingly read like:

- use a daily chat tool
- use a long writing tool
- use a search-and-explanation tool
- use an image tool
- use a slide-making tool

## 4. Current Section Structure

### English

- `AI Beginner`
- `AI in Daily Tasks`
- `Beyond the Basics`

### Arabic

- `مبتدئ AI`
- `AI في المهام اليومية`
- `ما بعد الأساسيات`

### Meaning of each section

#### AI Beginner

For people who still do not understand AI.

Must explain:

- what AI is
- what large models are
- prompt
- token
- computing power
- why AI costs money
- common tool categories
- safety
- free vs paid
- how to start

#### AI in Daily Tasks

For users who already know AI exists and want to use it directly.

Organized by task:

- writing
- making a plan
- making slides
- spreadsheets
- creating images
- editing images
- making videos
- making music
- translation
- summarizing documents
- learning something
- growing a business
- social content

#### Beyond the Basics

For the deeper but still plain-language layer:

- API
- API pricing
- credits
- AI gateway
- gateway platforms
- gateway risks
- automation
- team/business use
- multi-model management

This section matters a lot for the owner's future business model.

## 5. Tone And Writing Rules

### Must-do

- plain language
- beginner-friendly
- minimal technical jargon
- analogy-driven explanation
- story-like progression when useful
- ordinary user should understand it

### Avoid

- programmer-first tone
- architecture-heavy explanation
- tool hype
- overexplaining trends that will age badly
- sounding like machine translation

### Important analogy patterns approved by owner

- AI = capable assistant
- prompt = ordering from a waiter
- large model = chef who tasted millions of dishes
- token = small bite of language
- computing power = kitchen/stove size
- API = service window behind a restaurant
- AI gateway = train station
- credits = simple wallet name for hidden model costs

## 6. Current Live Site Status

### Public site

- Domain: `https://arabai.top`
- Default audience language: Arabic
- English exists as support layer

### What is already live

- Arabic homepage
- English homepage
- three main sections
- static article structure
- article rendering system
- bilingual article shells
- privacy / terms / disclosure / refund / credits pages
- sitemap / manifest / robots

### Important content-level repositioning already done

Recent content cleanup has already removed a lot of old tool-led wording.

Committed and pushed:

- `dfe3719` Refocus site copy on beginner-first AI guidance
- `d7d45b9` Unify Arabic article shells with new section labels
- `22d2b66` Align expert article metadata with task-first wording
- `73f0b0c` Generalize more English article metadata
- `aca3d09` Soften tool-specific language in article copy
- `de24d3e` Remove more tool-name examples from tutorial copy
- `9cf53a2` Generalize dynamic intros and output labels
- `76f8ac3` Generalize more Arabic metadata and labels

### Current git state at time of handoff

Current local branch:

- `main`

Current local HEAD:

- `b8ada51` `Neutralize Arabic resource labels`

Current remote state:

- at the moment this document was first drafted, `origin/main` was still behind this local commit
- the next AI should verify immediately whether `origin/main` now matches `b8ada51`

This matters because:

- there was repeated GitHub network instability during handoff
- several pushes succeeded only after retries
- the first takeover step should always be a git state verification

## 7. Biggest Current Problems Still Existing

This section is the most important one for takeover.

### P0 / High importance

#### 1. Arabic still needs native humanization

Status:

- not fully solved

Reality:

- Arabic content is readable
- structure is usable
- but native-level Saudi/Middle East tone review has not happened

Why it matters:

- the site is intended for Arabic promotion
- weak Arabic tone will hurt trust and conversion

What to do:

- run a focused Arabic review pass
- ideally use a native Arabic reviewer after machine cleanup

#### 2. Not all core tutorials meet the "real case" standard

Status:

- partially solved

Reality:

- some articles are much stronger now
- but not every task article is a full real-world tutorial with:
  - exact prompt
  - real first result
  - real refinement
  - real final output
  - safe process screenshots/video

Why it matters:

- this is central to the owner's value proposition
- a beginner should actually be able to do the work

#### 3. Some site copy is still more tool-specific than ideal

Status:

- substantially improved
- not fully finished

Reality:

- homepage and many article metadata layers are already generalized
- but some remaining places still expose tool names heavily:
  - tutorial video titles
  - keyword maps
  - reference labels
  - some Arabic tool-specific article metadata
  - some dynamic text and system labels

Important nuance:

- not all of this should be removed
- some tool names are legitimately useful

What remains is mostly a judgment pass, not a mechanical rewrite.

#### 4. Git push state must be verified first

Status:

- unresolved at document draft time; must be rechecked live

Commit:

- `b8ada51 Neutralize Arabic resource labels`

Files affected:

- `script.js`

Action:

- first task after takeover should be: verify `origin/main`
- if needed, push `b8ada51`

### P1 / Important but not blocking

#### 5. Real multimodal asset coverage is uneven

Some stronger areas:

- slides
- writing
- planning
- image poster
- some video/music support

Still weaker or uneven:

- image editing workflow screenshots
- full video-tool process screenshots
- music-tool process screenshots
- broader real-case asset coverage for every important article

#### 6. App/business layer is scaffolded, not finished

There is work toward:

- accounts
- credits
- wallet
- app framework
- API access
- payment

But production-grade live business flow is **not fully done**.

Important:

- static site can still be public
- but live wallet/payment/API claims must remain truthful

#### 7. Analytics / SEO / promotion workflow needs continued attention

Google Analytics and SEO work have been started, but long-term growth work is not "done."

There are checklist docs for that.

## 8. What Has Already Been Decided By The Owner

These decisions are stable and should not be casually reversed.

### Brand

- use `ARABAI`
- do not bring back `MyAI / MY AI / MYAI`

### Audience

- Arabic-first users
- especially Saudi / Middle East
- beginners first

### Site feel

- simple
- useful
- not overcrowded
- not too corporate
- not too black-and-white flat
- should have some refined color transitions, not dead monochrome

### Business behavior

- do not turn guide content into a paywall
- do not be overly aggressive about selling
- keep credits/payment soft until truly ready

### Learning philosophy

- teach task completion, not AI theory
- method > hype
- use examples
- use prompts
- use real outputs

## 9. Key Files The Next AI Must Understand

### Core site files

- `index.html`
- `en.html`
- `ar.html`
- `beginner.html`
- `advanced.html`
- `expert.html`
- `ar-beginner.html`
- `ar-advanced.html`
- `ar-expert.html`
- `article.html`
- `ar-article.html`
- `styles.css`
- `articles.js`
- `script.js`
- `seo.js`
- `sitemap.xml`

### Static article directories

- `en/articles/`
- `ar/articles/`

These contain static shells plus metadata for article pages.

### Important documentation already in repo

Read these first:

1. `team-requirements-record.md`
2. `issue-completion-checklist.md`
3. `content-audit.md`
4. `launch-report.md`
5. `README_FOR_ENGINEER.md`

Then consult as needed:

- `launch-checklist.md`
- `business-model.md`
- `credits-pricing-plan.md`
- `backend-spec.md`
- `static-update-workflow.md`
- `ANALYTICS_SEARCH_CONSOLE_CHECKLIST.md`
- `REAL_CASE_GAP_CHECKLIST.md`
- `REAL_CASE_TUTORIAL_REQUIREMENTS.md`

### App/business scaffold

The project also contains backend/app planning and prototype work:

- `app-framework/README.md`
- `app-framework/implementation-roadmap.md`
- `app-framework/api-routes.md`
- `app-framework/api-contracts.md`
- `app-framework/providers/ai-providers.md`
- `app-framework/providers/payments.md`
- `app-framework/providers/real-ai-gateway-setup.md`
- `app-framework/prototype/README.md`

This is important if the next AI continues the credits / wallet / AI access side.

## 10. Files That Should Be Treated Carefully

- `research/` if present in local backups or history
- any screenshots/videos that may contain:
  - desktop UI
  - personal data
  - private chats
  - login sessions
  - email
  - API keys
  - payment data

Do not publish any asset without privacy review.

## 11. Current Known Technical / Repo Situation

### Working tree note

The repo currently contains many unrelated local modifications not made in this final cleanup pass.

Examples include:

- many `en/articles/*.html`
- `app-framework/prototype/*`
- `styles.css`
- `sitemap.xml`
- `tutorials.html`

Important instruction for next AI:

- do **not** blindly revert them
- inspect before using
- assume they may be legitimate in-progress owner work or previous scaffolding

### Current local/remote mismatch

Because GitHub push behavior was unstable during the final handoff session, do not trust any older note blindly.

Always verify:

- `git rev-parse HEAD`
- `git rev-parse origin/main`
- `git branch -vv`

before assuming the repo is fully synced.

## 12. Recommended Next-AI Takeover Order

This is the safest sequence.

### Step 1

Verify git state and push local pending commit if needed:

- check `git rev-parse HEAD`
- check `git rev-parse origin/main`
- push if still ahead

### Step 2

Read these files:

1. `AI_HANDOFF_MASTER.md`
2. `team-requirements-record.md`
3. `issue-completion-checklist.md`
4. `content-audit.md`
5. `README_FOR_ENGINEER.md`

### Step 3

Run a sitewide copy audit with this lens:

- does this sound like a beginner guide?
- is it too tool-led?
- is the Arabic natural?
- does this page help a real beginner do a task?

### Step 4

Pick one of two branches of work:

#### Branch A: content refinement

- Arabic naturalization
- remaining tool-name cleanup
- stronger real-case tutorials
- safer tutorial assets

#### Branch B: product/business build

- accounts
- credits
- wallet
- API-backed task execution
- soft payment rollout

### Step 5

Before publishing new screenshots/video:

- do privacy review
- confirm no system UI leakage
- confirm no private chat leakage

## 13. Summary For Another AI In One Paragraph

ARABAI is an Arabic-first AI beginner handbook for ordinary users, aimed especially at Saudi/Middle East audiences. The owner's goal is to make AI understandable, usable, and practically helpful without programmer language, while slowly preparing a future credits/API business model without making the site feel too salesy. The site has already been significantly repositioned from tool-led wording toward task-first and method-first wording, but Arabic humanization and full real-case tutorial completeness are still unfinished. The most immediate technical task is to verify git sync status, confirm whether commit `b8ada51` has reached `origin/main`, and then continue content refinement with extreme care around privacy, Arabic tone, and beginner usability.
