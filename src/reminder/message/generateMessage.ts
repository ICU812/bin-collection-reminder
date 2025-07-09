import { BinCollection } from "../../types/binTypes.ts";
import { formatBinService } from "./binIcons.ts";
import { getReminderDayLabel } from "./reminderDate.ts";

export function generateReminderMessage(date: Date, items: BinCollection[]): string {
    const label = getReminderDayLabel(date);
    const labelStr = label ? ` (${label})` : "";

    const dateStr = date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    const services = items.map(formatBinService).join("\n\n");

    return `${services}

*Date:* ${labelStr} ${dateStr}`
}



