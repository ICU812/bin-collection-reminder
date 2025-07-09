import { getReminderDayLabel } from "./dateUtils.ts";
import { BinCollection, BinType } from "./types.ts";

export function getNextCollections(collections: BinCollection[]): { date: Date; items: BinCollection[] } {
    const nextCollectionDate = collections.reduce<Date | null>((earliest, c) => {
        return (!earliest || c.jsDate! < earliest) ? c.jsDate! : earliest;
    }, null);

    if (!nextCollectionDate) throw new Error("No upcoming collections found.");

    const nextCollections = collections.filter(c => c.jsDate!.getTime() === nextCollectionDate.getTime());
    console.log({ items: nextCollections })
    return { date: nextCollectionDate, items: nextCollections };
}

const binEmojis: Record<BinType, string> = {
    [BinType.Food]: "🥕 🍌",     // earthy, composty — tweakable
    [BinType.Recycling]: "🟥 ♻️", // red
    [BinType.Domestic]: "🗑️ ⬛",   // black
    [BinType.Garden]: "🌳 🟩"   // green
};

export function formatCollectionMessage(date: Date, items: BinCollection[]): string {
    const label = getReminderDayLabel(date);
    const labelStr = label ? ` (${label})` : "";

    const dateStr = date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    const services = items.map(formatBinService).join("\n");

    return `🗑️ *Bin Collection Reminder*

*Date:* ${dateStr}${labelStr}

*Collections:*
${services}`;
}


export function formatBinService(c: BinCollection): string {
    const binType = classifyBin(c.service);
    const emoji = binType ? binEmojis[binType] : "🗑️"; // fallback
    return `${emoji} ${c.service}`;
}

export function classifyBin(serviceName: string): BinType | null {
    switch (serviceName) {
        case BinType.Food:
            return BinType.Food;
        case BinType.Recycling:
            return BinType.Recycling;
        case BinType.Domestic:
            return BinType.Domestic;
        case BinType.Garden:
            return BinType.Garden;
        default:
            return null;
    }
}