import { BinCollection } from "../../types/binTypes";

export function formatBinService(c: BinCollection): string {
    const binType = classifyBin(c.service);
    const emoji = binType ? binEmojis[binType] : "🗑️"; // fallback
    return `${emoji} ${c.service}`;
}

function classifyBin(serviceName: string): BinType | null {
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

enum BinType {
    Food = "Food Waste Collection Service",
    Recycling = "Recycling Collection Service",
    Domestic = "Domestic Waste Collection Service",
    Garden = "Garden Waste Collection Service"
}

const binEmojis: Record<BinType, string> = {
    [BinType.Food]: "🥕 🍌",     // earthy, composty — tweakable
    [BinType.Recycling]: "🟥 ♻️", // red
    [BinType.Domestic]: "🗑️ ⬛",   // black
    [BinType.Garden]: "🌳 🟩"   // green
};
