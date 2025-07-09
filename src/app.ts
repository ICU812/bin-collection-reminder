import "dotenv/config";
import { isTodayOrTomorrow } from "./dateUtils.ts";
import { fetchBinCollections } from "./fetch.ts";
import { formatCollectionMessage, getNextCollections } from "./logic.ts";
import { sendTelegramMessage } from "./sendNotification/notify.ts";

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
    const collections = await fetchBinCollections(UPRN);
    const { date, items } = getNextCollections(collections);
    if (isTodayOrTomorrow(date)) {
        const message = formatCollectionMessage(date, items);
        await sendTelegramMessage(BOT_TOKEN, CHAT_ID, message);
    }
}

main().catch(err => {
    console.error("❌ Error:", err.message);
    process.exit(1);
});
