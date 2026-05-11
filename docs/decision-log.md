# Decision Log

## Keep the first slice fixture-first

Live GitHub and Vercel importers were intentionally deferred. The first portfolio signal is the workflow judgment: a reviewer sees source evidence, verification evidence, deployment evidence, redaction boundaries, and remaining gaps in one packet.

Rejected alternative: calling live APIs immediately. That would make the demo more brittle, require token handling, and risk leaking local or private metadata before the redaction model exists.

## Split fixtures from packet logic

Fixture records now live in `src/data/evidence.ts`; packet metrics, readiness, normalization, and Markdown generation live in `src/lib/evidence.ts`.

Rejected alternative: keeping everything in one module. That was acceptable for the first worker slice, but it would make future importers harder to test and review.

## Normalize Markdown output

Imported evidence can contain pipes, backticks, and newlines. The packet generator now normalizes those characters so generated Markdown remains compact and reviewer-readable.

## Treat screenshots as a watch item

The app should not pretend it has visual proof that was not captured. Screenshot evidence is marked `watch`, not `verified`, so the packet's readiness gate tells the reviewer what still needs attention.
