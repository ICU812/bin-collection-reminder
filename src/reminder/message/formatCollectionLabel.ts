import { BinCollection } from "../../types/binTypes";

export function formatCollectionLabel(c: BinCollection): string {
    const binCollectionType = getBinCollectionType(c.service);
    const emoji = binCollectionType ? binCollectionEmojis[binCollectionType] : "🗑️"; // fallback
    return `${emoji} ${c.service}`;
}

function getBinCollectionType(binCollectionName: string): BinCollectionType | null {
    switch (binCollectionName) {
        case BinCollectionType.Food:
            return BinCollectionType.Food;
        case BinCollectionType.Recycling:
            return BinCollectionType.Recycling;
        case BinCollectionType.Domestic:
            return BinCollectionType.Domestic;
        case BinCollectionType.Garden:
            return BinCollectionType.Garden;
        default:
            return null;
    }
}

enum BinCollectionType {
    Food = "Food Waste Collection Service",
    Recycling = "Recycling Collection Service",
    Domestic = "Domestic Waste Collection Service",
    Garden = "Garden Waste Collection Service"
}

const binCollectionEmojis: Record<BinCollectionType, string> = {
    [BinCollectionType.Food]: "🥕 🍌",     // black caddy -- food to differentiate from domestic
    [BinCollectionType.Recycling]: "🟥 ♻️", // red wheelie bin
    [BinCollectionType.Domestic]: "🗑️ ⬛",   // black wheelie bin
    [BinCollectionType.Garden]: "🌳 🟩"   // green wheelie bin
};
