import { describe, it, expect, beforeEach, vi } from "vitest";
import { sendTelegramMessage } from "../../src/reminder/sendTelegram.ts";

describe("sendTelegramMessage", () => {
  const token = "test-token";
  const chatId = "123456";
  const message = "Hello world!";

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it("sends a Telegram message successfully", async () => {
    (fetch as vi.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, text: "OK" }),
    });

    await sendTelegramMessage(token, chatId, message);

    expect(fetch).toHaveBeenCalledWith(
      `https://api.telegram.org/bot${token}/sendMessage`,
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }),
    );
  });

  it("throws an error if the response is not ok", async () => {
    (fetch as vi.Mock).mockResolvedValue({ ok: false, text: async () => "Bad request" });

    await expect(sendTelegramMessage(token, chatId, message)).rejects.toThrow(
      "Failed to send Telegram message.",
    );

    expect(fetch).toHaveBeenCalled();
  });
});
