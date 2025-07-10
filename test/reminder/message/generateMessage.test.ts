import { generateReminderMessage } from '../../../src/reminder/message/generateReminderMessage.ts';
import { BinCollection } from "../../../src/types/binTypes";

it("formats a single bin collection message correctly", () => {
    const date = new Date("2025-07-14T00:00:00Z");
    const collections: BinCollection[] = [
        {
            service: "Food Waste Collection Service",
            round: "FOOD5",
            schedule: "Mon",
            day: "Monday",
            date: "14/07/2025 00:00:00",
            read_date: "Monday 14th of July",
            jsDate: date
        }
    ];

    const message = generateReminderMessage(date, collections);

    expect(message).toContain("🥕 🍌 Food Waste Collection Service");
    expect(message).toMatch(/\*Date:\*.*Monday 14 July/);
});

it("formats a multiple bin collections message correctly", () => {
    const date = new Date("2025-07-14T00:00:00Z");
    const collections: BinCollection[] = [
        {
            service: "Food Waste Collection Service",
            round: "FOOD5",
            schedule: "Mon",
            day: "Monday",
            date: "14/07/2025 00:00:00",
            read_date: "Monday 14th of July",
            jsDate: date
        },
        {
            service: "Recycling Collection Service",
            round: "2AREC",
            schedule: "MonFort2",
            day: "Monday",
            date: "14/07/2025 00:00:00",
            read_date: "Monday 14th of July",
            jsDate: date
        },
        {
            service: "Domestic Waste Collection Service",
            round: "2ADOM",
            schedule: "MonFort1",
            day: "Monday",
            date: "14/07/2025 00:00:00",
            read_date: "Monday 14th of July",
            jsDate: date
        },
    ];

    const message = generateReminderMessage(date, collections);
    console.log(message)

    expect(message).toContain("🥕 🍌 Food Waste Collection Service");
    expect(message).toContain("🟥 ♻️ Recycling Collection Service");
    expect(message).toContain("🗑️ ⬛ Domestic Waste Collection Service");
    expect(message).toMatch(/\*Date:\*.*Monday 14 July/);
});
