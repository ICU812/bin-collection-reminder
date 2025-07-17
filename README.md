# 🗑️ Bin Collection Reminder

A small Node.js script that checks upcoming bin collection dates from Reading Borough Council's API and sends a reminder via Telegram.

## 📦 Features

Fetches bin collection dates from Reading Council's API using your UPRN.

Identifies the next collection date.

Sends a Telegram message listing upcoming bin collection types.

Runs automatically via GitHub Actions (cron job).

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/bin-collection-reminder.git
cd bin-collection-reminder
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Set environment variables

Create a .env file:

```ini
UPRN=your_uprn_here
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

### 4. Run manually

```bash
npm run dev
```

### 🤖 GitHub Actions

This project runs weekly via GitHub Actions (configured in .github/workflows). You can modify the cron schedule to suit your needs.

### 🧪 Testing

Unit tests are written with Vitest:

```bash
npm test
```

## 🪪 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
