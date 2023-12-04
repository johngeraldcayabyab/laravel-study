const redis = require("redis");
const http = require('http');
const socketIO = require('socket.io');

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const SERVER_PORT = process.env.SERVER_PORT || 3000;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ["http://localhost:8001"];

const redisOptions = {
    port: REDIS_PORT
};

const subscriber = redis.createClient(redisOptions);

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGINS.join(', '));
    res.end(JSON.stringify({
        ok: true
    }));
});

const io = socketIO(server, {
    cors: {
        origins: ALLOWED_ORIGINS,
        methods: ["GET", "POST"]
    }
});

subscriber.on("subscribe", (channel, count) => {
    console.log('Subscribed to channel:', channel);
});

subscriber.on("message", (channel, message) => {
    console.log('Incoming message on channel:', channel);
    console.log("Message:", message);

    switch (channel) {
        case 'sms-deposit-room':
            smsDepositRoom(message);
            break;
        default:
            io.sockets.emit(channel, message);
            break;
    }
});

io.on('connection', (socket) => {
    console.log('User connected to server!');

    socket.on('disconnect', () => {
        console.log('User left');
    });
});

server.listen(SERVER_PORT, () => {
    console.log(`Server is running at http://localhost:${SERVER_PORT} (Redis at localhost:${REDIS_PORT})`);
});

function smsDepositRoom(message) {
    // Implement your logic for 'sms-deposit-room'
    // Example: io.sockets.emit('sms-deposit-room', message);
}
