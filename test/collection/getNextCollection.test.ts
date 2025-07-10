import { getNextCollections } from "../../src/collection/getNextCollections.ts";
import type { BinCollection } from "../../src/types/binTypes.ts";

describe("getNextCollections", () => {
    const mockCollections: BinCollection[] = [
        {
            service: "Recycling Collection Service",
            round: "2AREC",
            schedule: "MonFort2",
            day: "Monday",
            date: "14/07/2025 00:00:00",
            read_date: "Monday 14th of July",
            jsDate: new Date("2025-07-14T00:00:00Z")
        },
        {
            service: "Food Waste Collection Service",
            round: "FOOD5",
            schedule: "Mon",
            day: "Monday",
            date: "21/07/2025 00:00:00",
            read_date: "Monday 21st of July",
            jsDate: new Date("2025-07-21T00:00:00Z")
        },
        {
            service: "Domestic Waste Collection Service",
            round: "2ADOM",
            schedule: "MonFort1",
            day: "Monday",
            date: "14/07/2025 00:00:00",
            read_date: "Monday 14th of July",
            jsDate: new Date("2025-07-14T00:00:00Z")
        }
    ];

    it("returns the earliest date and correct bins", () => {
        const { nextCollectionDate, nextCollections } = getNextCollections(mockCollections);

        expect(nextCollectionDate.toISOString()).toBe("2025-07-14T00:00:00.000Z");
        expect(nextCollections).toHaveLength(2);
        expect(nextCollections.map(c => c.service)).toEqual(
            expect.arrayContaining([
                "Recycling Collection Service",
                "Domestic Waste Collection Service"
            ])
        );
    });

    it("throws if there are no collections", () => {
        expect(() => getNextCollections([])).toThrow("No upcoming collections found.");
    });

    it("throws if jsDate is missing", () => {
        const broken = [{ ...mockCollections[0], jsDate: undefined }] as unknown as BinCollection[];
        expect(() => getNextCollections(broken)).toThrow();
    });
});
