import { ReadingBinCollectionResponseSchema } from "../../src/collection/schema.ts";

describe("ReadingBinCollectionResponseSchema", () => {
  const validData = {
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
        read_date: "Monday 14th of July"
      }
    ]
  };

  it("parses valid data", () => {
    const result = ReadingBinCollectionResponseSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails when a required field is missing", () => {
    const { uprn, ...partial } = validData;
    const result = ReadingBinCollectionResponseSchema.safeParse(partial);
    expect(result.success).toBe(false);
  });

  it("fails when field types are incorrect", () => {
    const broken = { ...validData, error_code: "not a number" };
    const result = ReadingBinCollectionResponseSchema.safeParse(broken);
    expect(result.success).toBe(false);
  });

  it("fails when a nested collection is malformed", () => {
    const broken = {
      ...validData,
      collections: [{ ...validData.collections[0], date: 123 }]
    };
    const result = ReadingBinCollectionResponseSchema.safeParse(broken);
    expect(result.success).toBe(false);
  });
});
