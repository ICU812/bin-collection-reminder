import { describe, it, expect, beforeEach, vi } from "vitest";
import { fetchBinCollections } from "../../src/collection/fetchCollectionData.ts";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("fetchBinCollections - Reading bin collection API integration", () => {
  it("parses valid Reading API response correctly", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        uprn: "123456",
        success: true,
        error_code: 0,
        error_description: "Success",
        code_description: "Success",
        collections: [
          {
            service: "Food Waste Collection Service",
            round: "FOOD5",
            schedule: "Mon",
            day: "Monday",
            date: "14/07/2025 00:00:00",
            read_date: "Monday 14th of July",
          },
        ],
      }),
    }));

    const result = await fetchBinCollections("123456");

    expect(result).toHaveLength(1);
    expect(result[0].service).toBe("Food Waste Collection Service");
    expect(result[0].jsDate instanceof Date).toBe(true);
    expect(isNaN(result[0].jsDate!.getTime())).toBe(false);
    expect(fetch).toHaveBeenCalledWith("https://api.reading.gov.uk/api/collections/123456");
  });

  it("throws an error if the API response is not ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    }));

    await expect(fetchBinCollections("123456")).rejects.toThrow(
      "Reading API error: 500 Internal Server Error"
    );
  });

  it("throws an error if the API response schema is invalid", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ bad: "data" }),
    }));

    await expect(fetchBinCollections("123456")).rejects.toThrow(
      "Reading API response validation failed."
    );
  });

  it("parses multiple collections with valid dates", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        uprn: "123456",
        success: true,
        error_code: 0,
        error_description: "Success",
        code_description: "Success",
        collections: [
          {
            service: "Refuse Collection",
            round: "R1",
            schedule: "Tue",
            day: "Tuesday",
            date: "15/07/2025 00:00:00",
            read_date: "Tuesday 15th of July",
          },
          {
            service: "Recycling Collection",
            round: "R2",
            schedule: "Wed",
            day: "Wednesday",
            date: "16/07/2025 00:00:00",
            read_date: "Wednesday 16th of July",
          },
        ],
      }),
    }));

    const result = await fetchBinCollections("123456");

    expect(result).toHaveLength(2);
    expect(result[1].service).toBe("Recycling Collection");
  });
});
