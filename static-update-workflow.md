# ARABAI Static Site Update Workflow

ARABAI can stay a static website and still be updated often.

A static site means the public website is made of HTML, CSS, JavaScript, images, videos, and audio files. It does not mean the content is frozen. The best setup is:

```text
Research or new idea
Draft new article/update
Owner review
Commit to GitHub
Cloudflare Pages or Netlify auto-publishes
```

## Recommended Publishing Setup

Use this order:

1. Put the ARABAI project in a GitHub repository.
2. Connect the repository to Cloudflare Pages or Netlify.
3. Set the production domain, currently `arabai.top`.
4. Every time the approved files are pushed to the main branch, the host automatically rebuilds and publishes the site.

This gives ARABAI the same daily update ability as a normal website, while keeping the hosting simple and cheap.

## Two Update Modes

### Manual Command Mode

The owner sends an instruction such as:

```text
Add a new article about Claude Code for normal users.
Check the latest official page and update the tool card.
Add a beginner tutorial link for Gamma.
```

Then Codex can research, draft, update the files, run checks, and prepare the site for publishing.

This is the safest first mode because the owner approves each change.

### Scheduled Scan Mode

Later, ARABAI can add a small scheduled workflow.

Every few days it can:

- scan selected ranking/source pages
- collect tool names, official links, pricing pages, and release notes
- create a draft update report
- flag tools worth adding to ARABAI
- avoid publishing automatically until the owner approves

Important: the scheduled job should create drafts, not publish directly. AI tool information changes quickly, and prices or claims should be reviewed before going live.

## Suggested Scan Sources

Use different sources for different jobs:

| Source type | Use it for |
|---|---|
| Futurepedia / Toolify / There's An AI For That | Consumer AI app discovery |
| Product Hunt AI category | New popular launches |
| Similarweb AI categories | Traffic and mainstream awareness |
| OpenRouter Rankings | Model/API popularity |
| LMArena / Artificial Analysis | Model quality signals |
| Official blogs/docs/pricing pages | Final verification before publishing |

Ranking sites are clues, not final truth. ARABAI should always link to official websites for login, pricing, and payment.

## Content Pipeline For A New Tool

Every new AI app should become a simple tool card first:

```text
Tool name:
Official website:
Country/company:
Best for:
Who should try it:
Free plan:
Paid plan:
Beginner difficulty:
What to be careful about:
Last checked:
```

Only after testing or finding a clear beginner tutorial should the tool become a full article.

## AI Coding And App Tools To Track

These tools should be added to ARABAI as a practical app category:

| Tool | Plain meaning | First ARABAI placement |
|---|---|---|
| Cursor | An AI code editor that helps write and edit software projects | Advanced app guide |
| Claude Code | A command-line coding helper from Anthropic | Expert workflow guide |
| OpenAI Codex | OpenAI coding agent for reading, editing, and building projects | Expert workflow guide |
| Google Antigravity | Agent-style AI development environment from Google | Advanced/Expert app guide |
| Cherry Studio | Desktop app for using many AI models in one interface | Advanced app guide |
| CC Switch | Utility-style tool around Claude Code workflows; verify official source before recommending | Expert notes only |
| OpenClaw / OpenClaw-like tools | Open-source or community coding agent tools; verify source and safety before recommending | Expert notes only |
| Hermes | Name is used by multiple AI projects; verify exact product before adding | Research list |

For ordinary users, these should not be explained as programming theory. The story should be:

```text
Chat tools help you write a message.
Creative tools help you make images, video, music, and slides.
Coding tools help someone build or change a website, app, or workflow faster.
```

## Publishing Checklist For Updates

Before each update goes live:

- Run `node --check articles.js`.
- Check that every image/video/audio path exists.
- Check new official links.
- Update `sitemap.xml` if a new standalone page is added.
- Add `Last checked` dates for tool/pricing articles.
- Do not publish payment, API, or legal claims without confirmation.

## Future Automation Shape

A later backend or GitHub Actions workflow can do this:

```text
Every 3 days:
  fetch selected sources
  compare tool list with ARABAI tool database
  create draft report
  suggest article updates
  wait for owner approval
```

The public site can remain static. The research assistant and publishing pipeline can be automated around it.
