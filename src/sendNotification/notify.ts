import fetch from "node-fetch";

export async function sendTelegramMessage(token: string, chatId: string, message: string): Promise<void> {
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "Markdown"
    })
  });

  if (!res.ok) {
    console.error("Telegram API error:", await res.text());
    throw new Error("Failed to send Telegram message.");
  }

  console.log("✅ Telegram message sent.");
}
