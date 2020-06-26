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
bot.setWebHook(UrlJoin(BASE_URL, `/bot${TELEGRAM_TOKEN}`));

bot.on("message", (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "Message received:\n" +
        `from: ${message.from.username}\n`+
        `text: ${message.text}\n` +
        `time: ${message.date}`
    );
})