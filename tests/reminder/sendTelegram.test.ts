import { sendTelegramMessage } from "../../src/reminder/sendTelegram.ts";

describe("sendTelegramMessage", () => {
  const token = "test-token";
  const chatId = "123456";
  const message = "Hello world!";

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("sends a Telegram message successfully", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ ok: true, text: "OK" }));

    await sendTelegramMessage(token, chatId, message);

    expect(fetchMock).toHaveBeenCalledWith(
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
    fetchMock.mockResponseOnce("Bad request", { status: 400 });

    await expect(sendTelegramMessage(token, chatId, message)).rejects.toThrow(
      "Failed to send Telegram message.",
    );

    expect(fetchMock).toHaveBeenCalled();
  });
});
