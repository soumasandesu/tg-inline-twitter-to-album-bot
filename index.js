const {
    TWITTER_CONSUMER_KEY = "", 
    TWITTER_CONSUMER_SECRET = "", 
    TELEGRAM_TOKEN = "",
    BASE_URL = "",
    SERVER_TG_REQUEST_API_ENTRY = "/tg_req",
    PORT = "3001"
} = process.env;

const TelegramBot = require('node-telegram-bot-api');
const UrlJoin = require('url-join');

const bot = new TelegramBot(TELEGRAM_TOKEN, {
    webHook: {
        port: PORT,
    },
});
bot.on("message", (msg) => {
    console.log(JSON.stringify(msg));

    const { chat, date, from, text } = msg;

    if (typeof text !== "string" || text.length === 0) {
        return;
    }

    bot.sendMessage(
        chat.id,
        "Message received:\n" +
        `from: ${from.username}\n`+
        `text: ${text}\n` +
        `time: ${date}`
    );
});
bot.setWebHook(UrlJoin(BASE_URL, `/bot${TELEGRAM_TOKEN}`));
bot.setMyCommands({ commands: [
    {
        command: "/album",
        description: "TWEET_URL  Fetch a tweet and convert as a telegram album message.",
    }
] })

const handleShutdown = (sig) => () => {
    console.info(`${sig} signal received.`);
    if (bot.hasOpenWebHook()) {
        bot.closeWebHook()
            .then(() => console.log("Telegram webhook stopped"));
    }
    if (bot.isPolling()) {
        bot.stopPolling()
            .then(() => console.log("Telegram polling stopped"));
    }
    console.log("exiting...");
};
["SIGINT", "SIGTERM"].forEach((sig) => process.on(sig, handleShutdown(sig)));