# ARABAI Backup Notes

Current backup zip:

```text
/Users/benny/Documents/New Project/arabai-top-code-public-20260514.zip
```

## Purpose

This zip is a clean code handoff and backup package for another engineer.

## Included

- Public website HTML.
- Arabic and English static article pages.
- CSS, JavaScript, sitemap, robots, manifest.
- Public assets under `assets/`.
- Project documentation and handoff notes.
- Future backend/app framework drafts.

## Excluded

- `.git/` history.
- `.venv-markitdown/`.
- `research/` working materials and screenshots.
- `dist/`.
- Old zip archives.
- macOS `.DS_Store` files.
- Removed draft folder `add1/`.

## Why `research/` is excluded

The `research/` folder may contain old screenshots or work-in-progress captures. It should not be sent to engineers, uploaded to the website, or published without privacy review.

## Restore

Unzip into a new folder and open `index.html`, or serve the folder with:

```bash
python3 -m http.server 8787
```

Then visit:

```text
http://localhost:8787/
```
