# ARABAI Issue Completion Checklist

Last updated: 2026-05-14

This checklist tracks unresolved issues from the owner's整改意见. Each item should include the status, blocker, and proposed resolution path.

## 1. Arabic Humanization / Native Tone Review

- **Status:** Not completed.
- **Priority:** High before large-scale Arabic promotion.
- **Owner requirement:** Arabic pages should feel natural to Arabic-speaking users, especially Saudi/Middle East beginners. The language should not feel like machine translation or generic AI writing.
- **Current situation:** The Arabic content is usable and structured, but it has not been reviewed by a native Arabic editor. It may still contain wording that is too formal, too translated, too technical, or not local enough.
- **Main blocker:** Codex can improve consistency and reduce AI-like wording, but cannot fully replace native Arabic judgment.
- **Resolution path:** Create a dedicated skill named `arabai-arabic-humanizer` to standardize the first-pass review process. Use it later to produce review tables and rewrite suggestions. Do not run this skill against the website content until the owner explicitly asks.
- **Skill status:** Created, not executed.
- **Completion definition:** Key Arabic pages are reviewed with the skill, then ideally checked by a native Arabic reviewer before major promotion.

## 2. Upgrade Core Articles Into Real Case Tutorials

- **Status:** Partially completed.
- **Priority:** P0 / critical.
- **Owner requirement:** ARABAI should not be a site that only talks about AI. A normal beginner should be able to follow the articles step by step and complete real AI work, including writing, planning, PPT, image, video, music, translation, document summary, API, and Credits/Gateway workflows.
- **Current situation:** Many articles have scenarios, prompts, steps, links, and some final outputs. However, not every core article has a complete real-tool workflow with process evidence and final usable output.
- **Why this matters:** This is central to ARABAI's value. If users still cannot actually operate after reading, the site will not build trust, interest, return visits, or future Credits conversion.
- **Tutorial completion standard:** Each core tutorial should include:
  - A real beginner task.
  - The exact tool used.
  - A copyable prompt.
  - The first generated result.
  - At least one prompt refinement or adjustment step.
  - The final result.
  - A checklist for judging whether the result is usable.
  - Safe screenshots or video showing the relevant browser/tool process.
  - For image, video, PPT, and music tasks, a real final asset rather than text-only description.
- **Main blockers:**
  - Requires real operation across multiple AI tools.
  - Some tools require login, region access, quota, waiting time, or paid features.
  - Screenshots and videos have privacy risk and must not contain Codex, private chats, desktop UI, account email, API keys, payment details, or personal information.
  - Workload is large because each article needs process capture, asset review, writing, and verification.
- **Resolution path:**
  - Create a per-article audit table.
  - Mark each article as: pass, missing real screenshots, missing final output, missing prompt refinement, missing tool-specific process, or temporarily text-only.
  - Prioritize the first 10 core tutorials: writing, planning, PPT/Gamma, image/image-2, video/9-grid, music, translation, document summary, API, Credits/Gateway.
  - Store new screenshots/videos in a review folder first.
  - Publish only after the owner or reviewer confirms the assets are safe.
- **Completion definition:** All priority core tutorials meet the completion standard above, and every public screenshot/video has passed privacy review.
