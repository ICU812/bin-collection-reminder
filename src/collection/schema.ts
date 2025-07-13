import { z } from "zod";

export const BinCollectionSchema = z.object({
  service: z.string(), // "Food Waste Collection Service"
  round: z.string(), // "FOOD5"
  schedule: z.string(), // "Mon"
  day: z.string(), // "Monday"
  date: z.string(), //"04/08/2025 00:00:00",
  read_date: z.string(), // "Monday 4th of August"
});

export const ReadingBinCollectionResponseSchema = z.object({
  uprn: z.string(),
  success: z.boolean(),
  error_code: z.number(),
  error_description: z.string(),
  code_description: z.string(),
  collections: z.array(BinCollectionSchema),
});
