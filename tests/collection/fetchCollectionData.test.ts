import fetchMock from "jest-fetch-mock";
import { fetchBinCollections } from "../../src/collection/fetchCollectionData.ts";

describe("fetchBinCollections - Reading bin collection API integration", () => {


  beforeEach(() => fetchMock.resetMocks());

  it("parses valid Reading API response correctly", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
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
    );

    const result = await fetchBinCollections("123456");

    expect(result).toHaveLength(1);
    expect(result[0].service).toBe("Food Waste Collection Service");
    expect(result[0].jsDate instanceof Date).toBe(true);
    expect(isNaN(result[0].jsDate!.getTime() ?? NaN)).toBe(false);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.reading.gov.uk/api/collections/123456",
    );
  });

  it("throws an error if the API response is not ok", async () => {
    fetchMock.mockResponseOnce("Server error", { status: 500, statusText: "Internal Server Error" });

    await expect(fetchBinCollections("123456")).rejects.toThrow(
      "Reading API error: 500 Internal Server Error"
    );
  });

  it("throws an error if the API response schema is invalid", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ bad: "data" }));

    await expect(fetchBinCollections("123456")).rejects.toThrow(
      "Reading API response validation failed."
    );
  });

  it("parses multiple collections with valid dates", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
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
    );

    const result = await fetchBinCollections("123456");

    expect(result).toHaveLength(2);
    expect(result[1].service).toBe("Recycling Collection");
  });
});

