import { vi, describe, beforeEach, it, expect } from "vitest";

// ⛔ Must come before imports
vi.mock("../../../src/reminder/message/getReminderDayLabel.ts", async () => {
  const actual = await vi.importActual<typeof import("../../../src/reminder/message/getReminderDayLabel.ts")>(
    "../../../src/reminder/message/getReminderDayLabel.ts"
  );

  return {
    ...actual,
    getReminderDayLabel: vi.fn(), // Only override this
  };
});

import { getReminderDayLabel, ReminderDay } from "../../../src/reminder/message/getReminderDayLabel.ts";
import { generateReminderMessage } from "../../../src/reminder/message/generateReminderMessage.ts";
import type { BinCollection } from "../../../src/types/binTypes.ts";

describe("generateReminderMessage", () => {
  const date = new Date("2025-07-14T00:00:00Z");

  const baseCollections: BinCollection[] = [
    {
      service: "Food Waste Collection Service",
      round: "FOOD5",
      schedule: "Mon",
      day: "Monday",
      date: "14/07/2025 00:00:00",
      read_date: "Monday 14th of July",
      jsDate: date,
    },
    {
      service: "Recycling Collection Service",
      round: "2AREC",
      schedule: "MonFort2",
      day: "Monday",
      date: "14/07/2025 00:00:00",
      read_date: "Monday 14th of July",
      jsDate: date,
    },
    {
      service: "Domestic Waste Collection Service",
      round: "2ADOM",
      schedule: "MonFort1",
      day: "Monday",
      date: "14/07/2025 00:00:00",
      read_date: "Monday 14th of July",
      jsDate: date,
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("formats a single bin collection message correctly", () => {
    (getReminderDayLabel as ReturnType<typeof vi.fn>).mockReturnValue(ReminderDay.None);

    const message = generateReminderMessage(date, [baseCollections[0]]);
    expect(message).toContain("🥕 🍌 Food Waste Collection Service");
    expect(message).toMatch(/\*Date:\*.*Monday 14 July/);
  });

  it("formats multiple bin collections correctly", () => {
    (getReminderDayLabel as ReturnType<typeof vi.fn>).mockReturnValue(ReminderDay.None);

    const message = generateReminderMessage(date, baseCollections);
    expect(message).toContain("🥕 🍌 Food Waste Collection Service");
    expect(message).toContain("🟥 ♻️ Recycling Collection Service");
    expect(message).toContain("🗑️ ⬛ Domestic Waste Collection Service");
    expect(message).toMatch(/\*Date:\*.*Monday 14 July/);
  });

  it("includes label when getReminderDayLabel returns a value", () => {
    (getReminderDayLabel as ReturnType<typeof vi.fn>).mockReturnValue(ReminderDay.Tomorrow);

    const message = generateReminderMessage(date, [baseCollections[0]]);
    expect(message).toContain("*Date:* (Tomorrow) Monday 14 July");
  });
});
