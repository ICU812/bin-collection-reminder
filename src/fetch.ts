import fetch from "node-fetch";
import { ReadingBinCollectionResponseSchema } from "./schema.ts";
import { BinCollection } from "./types.ts";

export async function fetchBinCollections(uprn: string): Promise<BinCollection[]> {
  const res = await fetch(`https://api.reading.gov.uk/api/collections/${uprn}`);
  if (!res.ok) throw new Error(`Reading API error: ${res.status} ${res.statusText}`);

  const raw = await res.json();
  console.log({ raw });
  const parsed = ReadingBinCollectionResponseSchema.safeParse(raw);

  if (!parsed.success) {
    console.error("Invalid response from Reading API:", parsed.error.format());
    throw new Error("Reading API response validation failed.");
  }

  const collectionsWithJsDate = parsed.data.collections.map(c => ({ ...c, jsDate: parseDate(c.date) }));
  return collectionsWithJsDate
}

function parseDate(dateStr: string): Date {
  // Expect format: "DD/MM/YYYY HH:mm:ss"
  const match = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/.exec(dateStr);

  if (!match) {
    // ❌ Doesn't match expected pattern
    return new Date(NaN); // Equivalent to "Invalid Date"
    // Throw invalid date - notification 
  }

  const [, dd, mm, yyyy, hh, min, ss] = match;

  const iso = `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}`;
  const parsed = new Date(iso);

  return isNaN(parsed.getTime()) ? new Date(NaN) : parsed;
}