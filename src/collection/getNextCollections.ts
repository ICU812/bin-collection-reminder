import { BinCollection } from "../types/binTypes.ts";

/**
 * A convenience wrapper for the next set of bin collections.
 * Includes the shared date as a top-level field for easier processing.
 */
export interface BinReminderData {
    nextCollectionDate: Date;
    nextCollections: BinCollection[]
}

export function getNextCollections(collections: BinCollection[]): BinReminderData {
    const nextCollectionDate = collections.reduce<Date | null>((earliest, c) => {
        return (!earliest || c.jsDate! < earliest) ? c.jsDate! : earliest;
    }, null);

    if (!nextCollectionDate) throw new Error("No upcoming collections found.");

    const nextCollections = collections.filter(c => c.jsDate!.getTime() === nextCollectionDate.getTime());

    return { nextCollectionDate, nextCollections };
}
