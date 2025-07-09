import { z } from "zod";

export const BinCollectionSchema = z.object({
  service: z.string(),
  round: z.string(),
  schedule: z.string(),
  day: z.string(),
  date: z.string(),
  read_date: z.string()
});

export const ReadingBinCollectionResponseSchema = z.object({
  uprn: z.string(),
  success: z.boolean(),
  error_code: z.number(),
  error_description: z.string(),
  code_description: z.string(),
  collections: z.array(BinCollectionSchema)
});
