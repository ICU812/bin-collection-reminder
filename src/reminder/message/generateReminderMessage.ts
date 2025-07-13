import { BinCollection } from "../../types/binTypes.ts";
import { formatCollectionLabel } from "./formatCollectionLabel.ts";
import { getReminderDayLabel } from "./getReminderDayLabel.ts";

export function generateReminderMessage(
  date: Date,
  items: BinCollection[],
): string {
  const label = getReminderDayLabel(date);
  const labelStr = label ? ` (${label})` : "";

  const dateStr = date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const services = items.map(formatCollectionLabel).join("\n\n");

  return `${services}

*Date:*${labelStr} ${dateStr}`;
}
