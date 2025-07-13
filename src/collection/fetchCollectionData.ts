import { BinCollection } from "../types/binTypes.ts";
import { parseDate } from "./date.ts";
import { ReadingBinCollectionResponseSchema } from "./schema.ts";

export async function fetchBinCollections(
  uprn: string,
): Promise<BinCollection[]> {
  const res = await fetch(`https://api.reading.gov.uk/api/collections/${uprn}`);
  if (!res.ok)
    throw new Error(`Reading API error: ${res.status} ${res.statusText}`);

  const raw = await res.json();
  const parsed = ReadingBinCollectionResponseSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("Invalid response from Reading API:", parsed.error.format());
    throw new Error("Reading API response validation failed.");
  }

  const collectionsWithJsDate = parsed.data.collections.map((c) => ({
    ...c,
    jsDate: parseDate(c.date),
  }));
  return collectionsWithJsDate;
}
