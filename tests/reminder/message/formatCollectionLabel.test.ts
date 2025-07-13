import { describe, expect, it } from "vitest";
import { formatCollectionLabel } from "../../../src/reminder/message/formatCollectionLabel.ts";
import type { BinCollection } from "../../../src/types/binTypes.ts";

describe("formatCollectionLabel", () => {
  const baseBin: Omit<BinCollection, "service"> = {
    round: "X",
    schedule: "Mon",
    day: "Monday",
    date: "14/07/2025 00:00:00",
    read_date: "Monday 14th of July",
    jsDate: new Date("2025-07-14T00:00:00Z"),
  };

  it("formats Food Waste Collection correctly", () => {
    const bin: BinCollection = {
      ...baseBin,
      service: "Food Waste Collection Service",
    };
    expect(formatCollectionLabel(bin)).toBe(
      "🥕 🍌 Food Waste Collection Service",
    );
  });

  it("formats Recycling Collection correctly", () => {
    const bin: BinCollection = {
      ...baseBin,
      service: "Recycling Collection Service",
    };
    expect(formatCollectionLabel(bin)).toBe(
      "🟥 ♻️ Recycling Collection Service",
    );
  });

  it("formats Domestic Waste Collection correctly", () => {
    const bin: BinCollection = {
      ...baseBin,
      service: "Domestic Waste Collection Service",
    };
    expect(formatCollectionLabel(bin)).toBe(
      "🗑️ ⬛ Domestic Waste Collection Service",
    );
  });

  it("formats Garden Waste Collection correctly", () => {
    const bin: BinCollection = {
      ...baseBin,
      service: "Garden Waste Collection Service",
    };
    expect(formatCollectionLabel(bin)).toBe(
      "🌳 🟩 Garden Waste Collection Service",
    );
  });

  it("uses fallback emoji for unknown service", () => {
    const bin: BinCollection = { ...baseBin, service: "Mystery Bin" };
    expect(formatCollectionLabel(bin)).toBe("🗑️ Mystery Bin");
  });
});
