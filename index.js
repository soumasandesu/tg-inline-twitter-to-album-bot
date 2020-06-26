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
const UrlJoin = require("url-join");

// const client = new Twitter({
//     consumer_key: TWITTER_CONSUMER_KEY,
//     consumer_secret: TWITTER_CONSUMER_SECRET,
// });

const server = Restify.createServer();
server.use(Restify.bodyParser());
server.post(SERVER_TG_REQUEST_API_ENTRY, (req, res, next) => {
    const context = req.body;
    if (update.message) {
        slimbot.sendMessage(message.chat.id, "Message received");
    }
    return next();
})
slimbot.setWebhook({
    url: UrlJoin(BASE_URL, SERVER_TG_REQUEST_API_ENTRY),
});
server.listen(PORT);
console.log(`listening to port ${PORT}`);