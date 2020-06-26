const {
    TWITTER_CONSUMER_KEY = "", 
    TWITTER_CONSUMER_SECRET = "", 
    TELEGRAM_TOKEN = "",
    BASE_URL = "",
    SERVER_TG_REQUEST_API_ENTRY = "/tg_req",
    PORT = "3001"
} = process.env;

// const Twitter = require("twitter");
const Restify = require("restify");
const Slimbot = require("slimbot");
const UrlJoin = require("url-join");

// const client = new Twitter({
//     consumer_key: TWITTER_CONSUMER_KEY,
//     consumer_secret: TWITTER_CONSUMER_SECRET,
// });

const slimbot = new Slimbot(TELEGRAM_TOKEN);

const server = Restify.createServer();
server.use(Restify.plugins.bodyParser());
server.post(SERVER_TG_REQUEST_API_ENTRY, (req, res, next) => {
    const update = req.body || {};
    if (update.message) {
        const { message } = update;
        slimbot.sendMessage(message.chat.id, "Message received");
    }
    return next();
});
const tgUrl = UrlJoin(BASE_URL, SERVER_TG_REQUEST_API_ENTRY);
console.log(`setting telegram webhook url to ${tgUrl}`);
slimbot.setWebhook({
    url: tgUrl,
});
server.listen(PORT, () => console.log(`listening to port ${PORT}`));

const handleShutdown = (sig) => () => {
    console.info(`${sig} signal received.`);
    slimbot.deleteWebhook(() => console.log("Telegram webhook deleted"));
    server.close(() => console.log('Http server closed.'));
};
["SIGINT", "SIGTERM"].forEach((sig) => process.on(sig, handleShutdown(sig)));