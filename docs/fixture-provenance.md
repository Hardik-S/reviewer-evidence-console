# Fixture Provenance

This repository is public, so the displayed evidence records use synthetic or public-safe metadata. The fixture shape models the evidence a reviewer should ask for without importing private logs, credentials, customer screenshots, or personal data.

## Current Evidence Rows

| Row | What it models | Current backing | Boundary |
| --- | --- | --- | --- |
| Scoped implementation branch | A narrow implementation commit or PR | Public commit `3dd4b1bd2aa07359e9d43a1afc403940b76ae60d` | Public GitHub metadata only |
| Behavior verification | Test and build output | Coordination run log reported `npm run test` and `npm run build` for the shipped slice | No private logs or local paths exposed |
| Public deploy evidence | Live reviewer path | `https://reviewer-evidence-console.vercel.app` returned HTTP 200 during the worker run | Synthetic page content only |
| Rendered UI proof | Desktop and mobile screenshot manifest | Marked `watch` because screenshots were not attached in the first worker slice | Future screenshots must avoid real personal data |

## Why This Boundary Exists

The product demonstrates a reviewer workflow, not a live importer. Public-safe fixtures keep the demo reproducible while making every trust boundary visible. A production version would add GitHub, Vercel, and screenshot importers only after a redaction review.
