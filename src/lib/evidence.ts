export type EvidenceStatus = "verified" | "watch" | "missing";

export type EvidenceItem = {
  id: string;
  title: string;
  source: string;
  status: EvidenceStatus;
  summary: string;
  reviewerValue: string;
};

export const evidenceItems: EvidenceItem[] = [
  {
    id: "pr",
    title: "Scoped implementation branch",
    source: "GitHub PR #12",
    status: "verified",
    summary:
      "The feature shipped in one branch with a narrow diff, reviewer notes, and no unrelated file churn.",
    reviewerValue:
      "Shows scope control and that the implementation can be inspected."
  },
  {
    id: "tests",
    title: "Behavior verification",
    source: "npm run test / npm run build",
    status: "verified",
    summary:
      "Unit tests cover the packet generator and the production build completes without type errors.",
    reviewerValue:
      "Separates working behavior from a static mockup."
  },
  {
    id: "deploy",
    title: "Public deploy evidence",
    source: "Vercel preview URL",
    status: "watch",
    summary:
      "Preview deployment is expected after the first Vercel run and should be attached to the packet.",
    reviewerValue:
      "Lets reviewers inspect the shipped surface without cloning locally."
  },
  {
    id: "screenshots",
    title: "Rendered UI proof",
    source: "Playwright screenshot manifest",
    status: "missing",
    summary:
      "A responsive screenshot set has not been attached yet for desktop and mobile verification.",
    reviewerValue:
      "Prevents claims about polish from relying only on source diffs."
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
    .map((item) => `${item.title}: ${item.status}`);
}

export function generatePacket(items: EvidenceItem[]) {
  const metrics = packetMetrics(items);
  const evidenceLines = items
    .map(
      (item) =>
        `- ${item.title} [${item.status}]: ${item.summary} Source: ${item.source}.`
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
