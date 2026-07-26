# ARABAI Remotion Video Pipeline

This project now includes a Remotion-based motion-video layer for clean Arabic tutorial videos.

## Main entry

- `remotion/index.ts`
- `remotion/Root.tsx`
- `remotion/compositions/TutorialVideo.tsx`
- `remotion/components/TutorialCard.tsx`
- `remotion/data/tutorials.ts`

## Current compositions

- `arabai-cover-ar`
- `arabai-intro-ar`
- `arabai-prompt-ar`
- `arabai-api-flow-ar`

## Intended use

Use these videos for:

1. clean Arabic explainers
2. article summaries
3. prompt tutorials
4. account / credits / API usage walkthrough intros
5. filler tutorial videos before full real-browser recordings are replaced

## Recommended workflow

1. Edit `remotion/data/tutorials.ts`
2. Run Remotion Studio
3. Preview timing and Arabic text flow
4. Render MP4 into `remotion-renders/`
5. Review and publish selected outputs into `assets/videos/`

## Useful commands

- `npm run video:studio`
- `npm run video:render:all`
- `npm run video:render:cover`
- `npm run video:render:intro`
- `npm run video:render:prompt`
- `npm run video:render:api`

## Published outputs currently available

- `assets/videos/arabai-cover-ar.mp4`
- `assets/videos/arabai-intro-ar.mp4`
- `assets/videos/arabai-prompt-ar.mp4`
- `assets/videos/arabai-api-flow-ar.mp4`

## Note

This Remotion layer is best for:
- clean explainer visuals
- motion cards
- step-by-step overlays
- Arabic text-first tutorials

It does not replace true real-browser task recordings when those are required.
