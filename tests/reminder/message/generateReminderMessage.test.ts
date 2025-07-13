import { generateReminderMessage } from "../../../src/reminder/message/generateReminderMessage.ts";
import { BinCollection } from "../../../src/types/binTypes.ts";

// Mock getReminderDayLabel to control the label output
jest.mock("../../../src/reminder/message/getReminderDayLabel.ts", () => ({
  getReminderDayLabel: jest.fn(),
}));

import { getReminderDayLabel } from "../../../src/reminder/message/getReminderDayLabel.ts";

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
    jest.resetAllMocks();
  });

  it("formats a single bin collection message correctly", () => {
    (getReminderDayLabel as jest.Mock).mockReturnValue(""); // falsy label

    const message = generateReminderMessage(date, [baseCollections[0]]);
    expect(message).toContain("🥕 🍌 Food Waste Collection Service");
    expect(message).toMatch(/\*Date:\*.*Monday 14 July/);
  });

  it("formats a multiple bin collections message correctly", () => {
    (getReminderDayLabel as jest.Mock).mockReturnValue(""); // falsy label

    const message = generateReminderMessage(date, baseCollections);

    expect(message).toContain("🥕 🍌 Food Waste Collection Service");
    expect(message).toContain("🟥 ♻️ Recycling Collection Service");
    expect(message).toContain("🗑️ ⬛ Domestic Waste Collection Service");
    expect(message).toMatch(/\*Date:\*.*Monday 14 July/);
  });

  it("includes label when getReminderDayLabel returns a value", () => {
    (getReminderDayLabel as jest.Mock).mockReturnValue("Tomorrow");

    const message = generateReminderMessage(date, [baseCollections[0]]);

    expect(message).toContain("*Date:* (Tomorrow) Monday 14 July");
  });
});
