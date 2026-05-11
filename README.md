# Reviewer Evidence Console

Reviewer Evidence Console turns scattered engineering evidence into a reviewer-ready proof packet. It is built as a public portfolio product because the first slice uses only synthetic project evidence.

## Portfolio Signal

Most portfolios ask reviewers to trust claims. This product shows a stronger habit: collect the actual PR, test, deploy, screenshot, and decision evidence behind a shipped project, then turn it into a compact packet that a hiring manager or founder can inspect quickly.

## Reviewer Path

1. Open the live demo at https://reviewer-evidence-console.vercel.app.
2. Check the reviewed-project snapshot for repo, commit, deploy URL, and last verification time.
3. Inspect each evidence card for source, reviewer value, redaction boundary, and recommended action.
4. Review the generated Markdown packet and note the readiness label before treating the project as finished proof.
5. Inspect `src/data/evidence.ts`, `src/lib/evidence.ts`, and `src/lib/evidence.test.ts` to confirm the fixture boundary and packet logic.

## Stack Rationale

- Next.js App Router keeps the product deployable on Vercel and leaves room for future server routes or AI-assisted packet drafting.
- TypeScript keeps evidence records and packet generation explicit.
- Fixture-first data keeps the public demo safe and reproducible.
- Plain CSS keeps the first slice lightweight while still allowing a polished product interface.
- Vitest covers packet generation so the visible proof packet is not just static copy.

## Local Setup

Known-good environment:

- Node.js `>=20.9.0`
- npm with lockfile install support

```powershell
npm ci
npm run test
npm run typecheck
npm run build
npm run dev
```

`npm install` currently reports 2 moderate advisories from the framework dependency tree. No forced audit fix is applied because that can change framework versions outside this focused quality pass.

## Verification

Current verification target:

```powershell
npm run test
npm run typecheck
npm run build
```

Live verification:

- Production URL: https://reviewer-evidence-console.vercel.app
- HTTP check: `200`
- Live content check: page contains `Reviewer Evidence Console` and `Reviewer Proof Packet`.
- Source commit shown in the app: `3dd4b1bd2aa07359e9d43a1afc403940b76ae60d`.
- Verification boundary: tests verify packet-generation behavior and state counting; they do not prove the truth of the displayed fixture records.

## Fixture Provenance

The app separates real public-safe project metadata from synthetic modeled evidence. The current fixture rows are documented in `docs/fixture-provenance.md`; rejected implementation alternatives and quality-pass decisions are recorded in `docs/decision-log.md`.

## Product Decisions

- The first slice avoids live GitHub or Vercel API calls. Synthetic evidence makes the repo public-safe while preserving the real workflow shape.
- The UI frames evidence as source-backed claims, not vanity metrics.
- Fixture records live in `src/data/evidence.ts`; packet metrics, readiness, normalization, and Markdown generation live in `src/lib/evidence.ts` so future workers can add real importers without rewriting the presentation layer.
- The app intentionally includes decision notes and risks because reviewers need to see judgment, not just green checkmarks.
- Screenshot evidence is intentionally marked as `watch` until a desktop/mobile screenshot manifest exists.

## Future Work

- Add importers for GitHub PR URLs, Vercel deploy logs, and Playwright screenshot manifests.
- Add Markdown copy/export controls.
- Add a redaction pass before any real evidence is used in public packets.
- Add responsive screenshot evidence to the proof packet itself.
