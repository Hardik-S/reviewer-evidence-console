# Reviewer Evidence Console

Reviewer Evidence Console turns scattered engineering evidence into a reviewer-ready proof packet. It is built as a public portfolio product because the first slice uses only synthetic project evidence.

## Reviewer Quick Path

```powershell
npm ci
npm run test
npm run typecheck
npm run build
```

Then inspect:

- `src/lib/evidence.ts` for the evidence schema, fixture records, provenance labels, risk flags, and Markdown packet generation.
- `src/lib/evidence.test.ts` for behavior coverage around metrics, risk flags, packet context, and Markdown normalization.
- `src/app/page.tsx` for the rendered reviewer workflow.

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
npm ci
npm run test
npm run typecheck
npm run build
npm run dev
```

Use `npm ci` for review because `package-lock.json` is the resolved dependency source of truth. `package.json` pins the versions validated in this pass so future installs do not silently drift to newer Next, React, TypeScript, or Vitest releases.

## Verification

Current verification target for this branch:

```powershell
npm run test
npm run typecheck
npm run build
```

`npm run build` uses `next build --webpack`. The default Next 16 Turbopack build hit a Windows path-length panic inside the required long automation worktree path; webpack completed successfully and is the stable local/Vercel build gate for this repo.

Live verification:

- Production URL: https://reviewer-evidence-console.vercel.app
- HTTP check: `200`
- Live content check: page contains `Reviewer Evidence Console` and `Reviewer Proof Packet`.

## Current Evidence Snapshot

| Field | Value |
| --- | --- |
| Repo | `Hardik-S/reviewer-evidence-console` |
| Worker commit | `3dd4b1bd2aa07359e9d43a1afc403940b76ae60d` |
| Fixer branch | `fixer/PPQ-2026-05-10-001-quality-pass-20260510-2153` |
| Deploy URL | https://reviewer-evidence-console.vercel.app |
| Verification timestamp | 2026-05-10 22:00 America/Toronto |
| Commands | `npm run test`; `npm run typecheck`; `npm run build` |
| Screenshot evidence | Missing; intentionally visible as a packet risk until captured. |

## Synthetic Fixture Boundary

The app is public-safe because it does not ingest private local sessions, credentials, customer data, or personal documents. The fixture records now label provenance explicitly:

- `public-source`: backed by a public URL such as the commit or live deploy.
- `run-log`: backed by the automation handoff text rather than a live API call.
- `demo-fixture`: representative workflow data that is not yet a real imported artifact.
- `missing-artifact`: evidence the product should request before claiming full readiness.

Reviewer-facing copy should treat `demo-fixture` and `missing-artifact` entries as prompts for follow-up, not as proof. Future real importers need a redaction pass before their output is safe for public packets.

## Product Decisions

- The first slice avoids live GitHub or Vercel API calls. Synthetic evidence makes the repo public-safe while preserving the real workflow shape.
- The UI frames evidence as source-backed claims, not vanity metrics, and separates source-backed records from representative demo fixtures.
- The packet generator lives in `src/lib/evidence.ts` so future workers can add real importers without rewriting the presentation layer.
- The app intentionally includes decision notes, redaction state, trust level, next reviewer questions, and risks because reviewers need to see judgment, not just green checkmarks.

## Known Gaps And Reviewer Questions

- Responsive screenshots are still missing and should be attached before claiming visual polish.
- Real GitHub, Vercel, and screenshot-manifest importers are not implemented.
- Markdown is generated safely from normalized text, but copy/export controls are not implemented yet.
- Live deploy freshness still depends on manual verification until CI or Vercel inspect metadata is added.
- Accessibility was reviewed structurally, but no automated axe or Playwright pass is committed yet.

## Future Work

- Add importers for GitHub PR URLs, Vercel deploy logs, and Playwright screenshot manifests.
- Add Markdown copy/export controls.
- Add a redaction pass before any real evidence is used in public packets.
- Add responsive screenshot evidence to the proof packet itself.
