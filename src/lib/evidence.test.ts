import { describe, expect, it } from "vitest";
import {
  type EvidenceItem,
  generatePacket,
  packetMetrics,
  readinessReport,
  riskFlags
} from "./evidence";

const fixture: EvidenceItem[] = [
  {
    id: "build",
    title: "Build proof",
    source: "npm run build",
    status: "verified",
    summary: "Production build completed.",
    reviewerValue: "Confirms the app compiles.",
    evidenceType: "test",
    collectedAt: "2026-05-10 20:19 America/Toronto",
    decisionRationale: "Build proof is a required handoff gate.",
    redactionBoundary: "Synthetic output only.",
    recommendedAction: "Keep attached to the reviewer packet."
  },
  {
    id: "deploy",
    title: "Deploy proof",
    source: "Vercel",
    status: "watch",
    summary: "Preview deploy pending.",
    reviewerValue: "Confirms the app is public.",
    evidenceType: "deploy",
    collectedAt: "2026-05-10 20:19 America/Toronto",
    decisionRationale: "The reviewer needs a public URL before trusting polish claims.",
    redactionBoundary: "No real customer data.",
    recommendedAction: "Attach the production alias before marking ready."
  }
];

describe("evidence packet generation", () => {
  it("counts evidence states", () => {
    expect(packetMetrics(fixture)).toEqual({
      verifiedCount: 1,
      totalCount: 2,
      watchCount: 1,
      missingCount: 0
    });
  });

  it("surfaces non-verified risk flags", () => {
    expect(riskFlags(fixture)).toEqual(["Deploy proof: watch"]);
  });

  it("generates a reviewer-readable Markdown packet", () => {
    const packet = generatePacket(fixture);

    expect(packet).toContain("# Reviewer Proof Packet");
    expect(packet).toContain("Verified evidence: 1/2");
    expect(packet).toContain("Build proof [verified]");
    expect(packet).toContain("Deploy proof [watch]");
    expect(packet).toContain("Reviewer value: Confirms the app compiles.");
    expect(packet).toContain("Redaction boundary: Synthetic output only.");
  });

  it("includes source URLs when they are attached to evidence", () => {
    const packet = generatePacket([
      {
        ...fixture[0],
        sourceUrl: "https://example.test/commit/abc123"
      }
    ]);

    expect(packet).toContain("Source URL: https://example.test/commit/abc123.");
  });

  it("reports whether the packet is ready for reviewer handoff", () => {
    const report = readinessReport(fixture);

    expect(report.ready).toBe(false);
    expect(report.label).toBe("Needs evidence");
    expect(report.blockers).toEqual(["Deploy proof"]);
    expect(report.nextAction).toBe("Resolve 1 watch item before handoff.");
  });

  it("reports ready when every evidence item is verified", () => {
    const report = readinessReport([
      fixture[0],
      {
        ...fixture[1],
        status: "verified"
      }
    ]);

    expect(report).toEqual({
      ready: true,
      label: "Ready for handoff",
      blockers: [],
      nextAction: "Packet can be shared with a reviewer."
    });
  });

  it("normalizes Markdown-sensitive imported evidence text", () => {
    const packet = generatePacket([
      {
        ...fixture[0],
        title: "Build | proof",
        summary: "Production\nbuild completed with `npm run build`."
      }
    ]);

    expect(packet).toContain("Build / proof [verified]");
    expect(packet).toContain("Production build completed with 'npm run build'.");
  });
});
