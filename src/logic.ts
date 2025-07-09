import { BinCollection } from "./types.ts";

export function getNextCollections(collections: BinCollection[]): { date: Date; items: BinCollection[] } {
  const earliest = collections.reduce<Date | null>((earliest, c) => {
    return (!earliest || c.jsDate! < earliest) ? c.jsDate! : earliest;
  }, null);

  if (!earliest) throw new Error("No upcoming collections found.");

  const items = collections.filter(c => c.jsDate!.getTime() === earliest.getTime());
  return { date: earliest, items };
}

export function formatCollectionMessage(date: Date, items: BinCollection[]): string {
  const dateStr = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  const services = items.map(c => `• ${c.service}`).join("\n");

  return `🗑️ *Bin Collection Reminder*

*Date:* ${dateStr}

*Collections:*
${services}`;
}
