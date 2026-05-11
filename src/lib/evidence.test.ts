import { describe, expect, it } from "vitest";
import {
  type EvidenceItem,
  generatePacket,
  packetMetrics,
  riskFlags
} from "./evidence";

const fixture: EvidenceItem[] = [
  {
    id: "build",
    title: "Build proof",
    source: "npm run build",
    status: "verified",
    provenance: "run-log",
    verifiedAt: "2026-05-10 21:56 America/Toronto",
    summary: "Production build completed.",
    reviewerValue: "Confirms the app compiles.",
    decision: "Treat build output as a required reviewer gate.",
    redactionState: "No sensitive output included.",
    trustLevel: "Run-log backed",
    nextQuestion: "Should this run have attached raw terminal output?"
  },
  {
    id: "deploy",
    title: "Deploy proof",
    source: "Vercel",
    status: "watch",
    provenance: "demo-fixture",
    summary: "Preview deploy pending.",
    reviewerValue: "Confirms the app is public.",
    decision: "Keep pending deploys visible instead of hiding them.",
    redactionState: "Synthetic placeholder only.",
    trustLevel: "Representative",
    nextQuestion: "Has the preview URL been attached?"
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
    expect(riskFlags(fixture)).toEqual(["Deploy proof: watch (demo-fixture)"]);
  });

  it("generates a reviewer-readable Markdown packet", () => {
    const packet = generatePacket(fixture);

    expect(packet).toContain("# Reviewer Proof Packet");
    expect(packet).toContain("Verified evidence: 1/2");
    expect(packet).toContain("Build proof [verified; run-log]");
    expect(packet).toContain("Deploy proof [watch; demo-fixture]");
    expect(packet).toContain("Reviewer value: Confirms the app compiles.");
    expect(packet).toContain("Decision: Treat build output as a required reviewer gate.");
  });

  it("normalizes imported text before writing packet Markdown", () => {
    const packet = generatePacket([
      {
        id: "injected",
        title: "Injected\n# Heading",
        source: "Fixture\n- fake source",
        status: "watch",
        provenance: "demo-fixture",
        summary: "Line one\n# forged heading",
        reviewerValue: "Shows\nstructure safety.",
        decision: "Stop imported fields\nfrom forging sections.",
        redactionState: "Synthetic only.",
        trustLevel: "Representative",
        nextQuestion: "Can this render safely?"
      }
    ]);

    expect(packet).not.toContain("\n# forged heading");
    expect(packet).not.toContain("Injected\n# Heading");
    expect(packet).toContain("Line one # forged heading");
    expect(packet).toContain("Reviewer value: Shows structure safety.");
    expect(packet).toContain("Decision: Stop imported fields from forging sections.");
  });
});
