export type EvidenceStatus = "verified" | "watch" | "missing";
export type EvidenceType = "source" | "test" | "deploy" | "screenshot" | "decision";

export type EvidenceItem = {
  id: string;
  title: string;
  source: string;
  sourceUrl?: string;
  status: EvidenceStatus;
  evidenceType: EvidenceType;
  collectedAt: string;
  summary: string;
  reviewerValue: string;
  decisionRationale: string;
  redactionBoundary: string;
  recommendedAction: string;
};

export type ReadinessReport = {
  ready: boolean;
  label: "Ready for handoff" | "Needs evidence";
  blockers: string[];
  nextAction: string;
};

export function normalizePacketText(value: string) {
  return value
    .replace(/\r?\n|\r/g, " ")
    .replace(/\|/g, "/")
    .replace(/`/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

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

export function readinessReport(items: EvidenceItem[]): ReadinessReport {
  const blockers = items
    .filter((item) => item.status !== "verified")
    .map((item) => item.title);
  const watchCount = items.filter((item) => item.status === "watch").length;
  const missingCount = items.filter((item) => item.status === "missing").length;
  const issueCount = watchCount + missingCount;

  if (issueCount === 0) {
    return {
      ready: true,
      label: "Ready for handoff",
      blockers,
      nextAction: "Packet can be shared with a reviewer."
    };
  }

  const issueLabel =
    issueCount === 1
      ? watchCount === 1
        ? "watch item"
        : "missing item"
      : "items";

  return {
    ready: false,
    label: "Needs evidence",
    blockers,
    nextAction: `Resolve ${issueCount} ${issueLabel} before handoff.`
  };
}

export function generatePacket(items: EvidenceItem[]) {
  const metrics = packetMetrics(items);
  const evidenceLines = items
    .map((item) => {
      const title = normalizePacketText(item.title);
      const summary = normalizePacketText(item.summary);
      const source = normalizePacketText(item.source);
      const reviewerValue = normalizePacketText(item.reviewerValue);
      const redactionBoundary = normalizePacketText(item.redactionBoundary);
      const recommendedAction = normalizePacketText(item.recommendedAction);

      return [
        `- ${title} [${item.status}]: ${summary}`,
        `  - Source: ${source}.`,
        `  - Collected: ${normalizePacketText(item.collectedAt)}.`,
        `  - Reviewer value: ${reviewerValue}.`,
        `  - Redaction boundary: ${redactionBoundary}.`,
        `  - Recommended action: ${recommendedAction}.`
      ].join("\n");
    })
    .join("\n");
  const readiness = readinessReport(items);

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
    "## Handoff Readiness",
    `${readiness.label}: ${readiness.nextAction}`,
    "",
    "## Reviewer Guidance",
    "Inspect verified items first, then ask for watch or missing evidence before treating the project as production-quality proof."
  ].join("\n");
}
