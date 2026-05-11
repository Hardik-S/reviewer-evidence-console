export type EvidenceStatus = "verified" | "watch" | "missing";
export type EvidenceProvenance =
  | "public-source"
  | "run-log"
  | "demo-fixture"
  | "missing-artifact";

export type EvidenceItem = {
  id: string;
  title: string;
  source: string;
  sourceHref?: string;
  status: EvidenceStatus;
  provenance: EvidenceProvenance;
  verifiedAt?: string;
  summary: string;
  reviewerValue: string;
  decision: string;
  redactionState: string;
  trustLevel: string;
  nextQuestion: string;
};

export const evidenceItems: EvidenceItem[] = [
  {
    id: "pr",
    title: "Scoped implementation commit",
    source: "Hardik-S/reviewer-evidence-console@3dd4b1b",
    sourceHref:
      "https://github.com/Hardik-S/reviewer-evidence-console/commit/3dd4b1bd2aa07359e9d43a1afc403940b76ae60d",
    status: "verified",
    provenance: "public-source",
    verifiedAt: "2026-05-10 20:19 America/Toronto",
    summary:
      "The worker shipped the first slice in a narrow branch and fast-forwarded main to a documented commit.",
    reviewerValue:
      "Lets a reviewer inspect the actual diff instead of trusting portfolio copy.",
    decision:
      "Use a source-backed commit rather than a placeholder PR label for the demo packet.",
    redactionState: "Public-safe commit metadata only; no private local paths or credentials.",
    trustLevel: "Source-backed",
    nextQuestion: "Would a PR thread or review comment add more context than the commit alone?"
  },
  {
    id: "tests",
    title: "Behavior verification",
    source: "Worker run-log: npm run test and npm run build",
    status: "verified",
    provenance: "run-log",
    verifiedAt: "2026-05-10 20:19 America/Toronto",
    summary:
      "Unit tests covered packet generation and the production build completed during the worker handoff.",
    reviewerValue:
      "Separates working behavior from a static mockup and records the exact verification gate.",
    decision:
      "Keep deterministic packet logic in src/lib/evidence.ts so future importers can be tested without UI churn.",
    redactionState: "Command output summarized; no machine-specific logs exposed in the public fixture.",
    trustLevel: "Run-log backed",
    nextQuestion: "Should the next pass attach raw CI or terminal output as a downloadable artifact?"
  },
  {
    id: "deploy",
    title: "Public deploy evidence",
    source: "https://reviewer-evidence-console.vercel.app",
    sourceHref: "https://reviewer-evidence-console.vercel.app",
    status: "verified",
    provenance: "public-source",
    verifiedAt: "2026-05-10 20:19 America/Toronto",
    summary:
      "The production Vercel alias returned HTTP 200 and contained the expected product and packet text.",
    reviewerValue:
      "Lets reviewers inspect the shipped surface without cloning locally.",
    decision:
      "Expose the live deploy as evidence but keep the app static until real importers exist.",
    redactionState: "Public URL only.",
    trustLevel: "Source-backed",
    nextQuestion: "Does the live URL still match the latest fixer branch after this quality pass deploys?"
  },
  {
    id: "screenshots",
    title: "Rendered UI proof",
    source: "Responsive screenshot manifest",
    status: "missing",
    provenance: "missing-artifact",
    summary:
      "A responsive screenshot set has not been attached yet for desktop and mobile verification.",
    reviewerValue:
      "Prevents claims about polish from relying only on source diffs.",
    decision:
      "Keep this visible as a missing item instead of pretending source review proves visual polish.",
    redactionState: "No screenshot artifact exists yet.",
    trustLevel: "Missing",
    nextQuestion: "Can the next pass capture desktop and mobile screenshots after the fixer deploy?"
  },
  {
    id: "importers",
    title: "Real importer boundary",
    source: "Representative future GitHub and Vercel importers",
    status: "watch",
    provenance: "demo-fixture",
    summary:
      "The current app does not call live GitHub or Vercel APIs; importer behavior is represented by fixture data.",
    reviewerValue:
      "Makes the public demo honest about what is automated today versus planned next.",
    decision:
      "Keep live importers out of the public first slice until redaction and account boundaries are designed.",
    redactionState: "Synthetic labels only.",
    trustLevel: "Representative",
    nextQuestion: "Which importer should ship first: GitHub commits, Vercel deploys, or screenshot manifests?"
  }
];

export function packetMetrics(items: EvidenceItem[]) {
  const verifiedCount = items.filter((item) => item.status === "verified").length;

  return {
    verifiedCount,
    totalCount: items.length,
    watchCount: items.filter((item) => item.status === "watch").length,
    missingCount: items.filter((item) => item.status === "missing").length
  };
}

export function riskFlags(items: EvidenceItem[]) {
  return items
    .filter((item) => item.status !== "verified")
    .map((item) => `${item.title}: ${item.status} (${item.provenance})`);
}

export function packetText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function generatePacket(items: EvidenceItem[]) {
  const metrics = packetMetrics(items);
  const evidenceLines = items
    .map(
      (item) => {
        const verified = item.verifiedAt
          ? ` Verified: ${packetText(item.verifiedAt)}.`
          : "";
        const link = item.sourceHref
          ? ` Link: ${packetText(item.sourceHref)}.`
          : "";

        return [
          `- ${packetText(item.title)} [${item.status}; ${item.provenance}]: ${packetText(item.summary)}`,
          `Source: ${packetText(item.source)}.${link}${verified}`,
          `Reviewer value: ${packetText(item.reviewerValue)}.`,
          `Decision: ${packetText(item.decision)}.`,
          `Redaction: ${packetText(item.redactionState)}.`,
          `Next question: ${packetText(item.nextQuestion)}.`
        ].join(" ");
      }
    )
    .join("\n");

  return [
    "# Reviewer Proof Packet",
    "",
    `Verified evidence: ${metrics.verifiedCount}/${metrics.totalCount}`,
    `Watch items: ${metrics.watchCount}`,
    `Missing items: ${metrics.missingCount}`,
    "",
    "## Evidence",
    evidenceLines,
    "",
    "## Reviewer Guidance",
    "Inspect verified items first, then ask for watch or missing evidence before treating the project as production-quality proof."
  ].join("\n");
}
