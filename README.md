# Reviewer Evidence Console

Reviewer Evidence Console turns scattered engineering evidence into a reviewer-ready proof packet. It is built as a public portfolio product because the first slice uses only synthetic project evidence.

## Portfolio Signal

Most portfolios ask reviewers to trust claims. This product shows a stronger habit: collect the actual PR, test, deploy, screenshot, and decision evidence behind a shipped project, then turn it into a compact packet that a hiring manager or founder can inspect quickly.

## Stack Rationale

- Next.js App Router keeps the product deployable on Vercel and leaves room for future server routes or AI-assisted packet drafting.
- TypeScript keeps evidence records and packet generation explicit.
- Fixture-first data keeps the public demo safe and reproducible.
- Plain CSS keeps the first slice lightweight while still allowing a polished product interface.
- Vitest covers packet generation so the visible proof packet is not just static copy.

## Local Setup

```powershell
npm install
npm run test
npm run build
npm run dev
```

## Verification

Current verification target:

```powershell
npm run test
npm run build
```

Live verification:

- Production URL: https://reviewer-evidence-console.vercel.app
- HTTP check: `200`
- Live content check: page contains `Reviewer Evidence Console` and `Reviewer Proof Packet`.

## Product Decisions

- The first slice avoids live GitHub or Vercel API calls. Synthetic evidence makes the repo public-safe while preserving the real workflow shape.
- The UI frames evidence as source-backed claims, not vanity metrics.
- The packet generator lives in `src/lib/evidence.ts` so future workers can add real importers without rewriting the presentation layer.
- The app intentionally includes decision notes and risks because reviewers need to see judgment, not just green checkmarks.

## Future Work

- Add importers for GitHub PR URLs, Vercel deploy logs, and Playwright screenshot manifests.
- Add Markdown copy/export controls.
- Add a redaction pass before any real evidence is used in public packets.
- Add responsive screenshot evidence to the proof packet itself.
