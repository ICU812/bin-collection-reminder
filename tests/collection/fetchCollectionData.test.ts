import { fetchBinCollections } from "../../src/collection/fetchCollectionData.ts";
import fetchMock from "jest-fetch-mock";

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
