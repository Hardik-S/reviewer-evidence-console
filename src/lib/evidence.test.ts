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
    summary: "Production build completed.",
    reviewerValue: "Confirms the app compiles."
  },
  {
    id: "deploy",
    title: "Deploy proof",
    source: "Vercel",
    status: "watch",
    summary: "Preview deploy pending.",
    reviewerValue: "Confirms the app is public."
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
  });
});
