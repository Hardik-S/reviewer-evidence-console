"use client";

import { useState } from "react";

type PacketActionsProps = {
  packet: string;
};

export function PacketActions({ packet }: PacketActionsProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  async function copyPacket() {
    try {
      await navigator.clipboard.writeText(packet);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  const label =
    copyState === "copied"
      ? "Copied packet"
      : copyState === "failed"
        ? "Copy unavailable"
        : "Copy packet";

  return (
    <div className="packetActions" aria-label="Proof packet actions">
      <button type="button" onClick={copyPacket}>
        {label}
      </button>
      <a href="#evidence-cards">Review source trail</a>
      <a href="#risk-flags">Show gaps</a>
    </div>
  );
}
