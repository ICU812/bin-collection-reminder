// Entry point: orchestrates fetching bin collection data and sending a reminder

import "dotenv/config";
import { fetchBinCollections } from "./collection/fetchCollectionData.ts";
import { getNextCollections } from "./collection/getNextCollections.ts";
import { generateReminderMessage } from "./reminder/message/generateReminderMessage.ts";
import { sendTelegramMessage as sendReminderMessage } from "./reminder/sendTelegram.ts";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID!;
const UPRN = process.env.UPRN!;

if (!BOT_TOKEN) {
    throw new Error("Missing BOT_TOKEN environment variable.");
}
if (!CHAT_ID) {
    throw new Error("Missing CHAT_ID environment variable.");
}
if (!UPRN) {
    throw new Error("Missing UPRN environment variable.");
}

async function main() {
    const upcomingBinCollections = await fetchBinCollections(UPRN);
    const { nextCollectionDate, nextCollections } = getNextCollections(upcomingBinCollections);

    const message = generateReminderMessage(nextCollectionDate, nextCollections);
    await sendReminderMessage(BOT_TOKEN, CHAT_ID, message);
}

main().catch(err => {
    console.error("❌ Error:", err.message);
    process.exit(1);
});
