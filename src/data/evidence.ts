import type { EvidenceItem } from "@/lib/evidence";

export const reviewedProject = {
  name: "Reviewer Evidence Console",
  repo: "Hardik-S/reviewer-evidence-console",
  commit: "3dd4b1bd2aa07359e9d43a1afc403940b76ae60d",
  deployUrl: "https://reviewer-evidence-console.vercel.app",
  checkedAt: "2026-05-10 20:19 America/Toronto"
};

export const evidenceItems: EvidenceItem[] = [
  {
    id: "branch",
    title: "Scoped implementation branch",
    source: "GitHub commit 3dd4b1b on Hardik-S/reviewer-evidence-console",
    sourceUrl:
      "https://github.com/Hardik-S/reviewer-evidence-console/commit/3dd4b1bd2aa07359e9d43a1afc403940b76ae60d",
    status: "verified",
    evidenceType: "source",
    collectedAt: "2026-05-10 20:19 America/Toronto",
    summary:
      "The first slice shipped in a narrow branch, then fast-forwarded to main with no unrelated file churn recorded in the coordination run log.",
    reviewerValue:
      "Shows scope control and gives reviewers a concrete commit to inspect.",
    decisionRationale:
      "A commit URL is more trustworthy than a generic PR label because it anchors the packet to immutable source history.",
    redactionBoundary:
      "Public GitHub metadata only; no private repo, credential, or customer evidence is included.",
    recommendedAction:
      "Inspect the commit before treating portfolio claims as evidence-backed."
  },
  {
    id: "tests",
    title: "Behavior verification",
    source: "npm run test and npm run build",
    status: "verified",
    evidenceType: "test",
    collectedAt: "2026-05-10 20:19 America/Toronto",
    summary:
      "Unit tests cover packet generation and the production build completed for the shipped slice.",
    reviewerValue:
      "Separates working behavior from a static mockup and gives future fixers a regression baseline.",
    decisionRationale:
      "Packet generation is the product's core claim, so logic tests belong beside the evidence module.",
    redactionBoundary:
      "Commands run against synthetic fixture data only.",
    recommendedAction:
      "Rerun the commands after each quality pass and record the exact outcome."
  },
  {
    id: "deploy",
    title: "Public deploy evidence",
    source: "Vercel production alias",
    sourceUrl: "https://reviewer-evidence-console.vercel.app",
    status: "verified",
    evidenceType: "deploy",
    collectedAt: "2026-05-10 20:19 America/Toronto",
    summary:
      "The production URL returned HTTP 200 and contained the expected app title plus proof-packet text.",
    reviewerValue:
      "Lets reviewers inspect the shipped surface without cloning the repository locally.",
    decisionRationale:
      "A public deployment is the quickest reviewer path, but it still needs source and test evidence beside it.",
    redactionBoundary:
      "The deploy serves synthetic modeled evidence only.",
    recommendedAction:
      "Re-check the URL after each Vercel deployment to avoid stale public proof."
  },
  {
    id: "screenshots",
    title: "Rendered UI proof",
    source: "Desktop and mobile screenshot manifest",
    status: "watch",
    evidenceType: "screenshot",
    collectedAt: "2026-05-10 20:19 America/Toronto",
    summary:
      "Responsive screenshots were identified as a quality gate but were not attached in the worker's initial slice.",
    reviewerValue:
      "Prevents claims about polish from relying only on source diffs.",
    decisionRationale:
      "Screenshots are marked watch rather than missing because they are a follow-up quality artifact, not a blocker for the current synthetic demo.",
    redactionBoundary:
      "Future screenshots must avoid real personal data and credentials.",
    recommendedAction:
      "Attach desktop and mobile screenshots before presenting the project as a finished portfolio case study."
  }
];
