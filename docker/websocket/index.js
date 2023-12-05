const redis = require("redis");
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();


const REDIS_HOST = "127.0.0.1";
const REDIS_PORT = process.env.FORWARD_REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || null;
const REDIS_PREFIX = process.env.REDIS_PREFIX || null;
const SERVER_PORT = 3000;
const ALLOWED_ORIGINS = ["http://0.0.0.0:8888"];


const redisOptions = {
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
};


// Create a Redis client
const subscriber = redis.createClient(redisOptions);


const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.end(JSON.stringify({
        ok: true
    }));
});

const io = socketIO(server, {
    cors: {
        origin: "http://0.0.0.0:8888",
        methods: ["GET", "POST"]
    }
});

const smsDepositChannel = `monoportal-sms-deposit-channel`;
const smsWithdrawalChannel = `monoportal-sms-withdrawal-channel`;


subscriber.subscribe(smsDepositChannel);
subscriber.subscribe(smsWithdrawalChannel);


// Listen for errors
subscriber.on('error', (err) => {
    console.error('Redis Error:', err);
});

// Listen for the subscribe event
subscriber.on('subscribe', (channel, count) => {
    console.log('Subscribed to channel:', channel);
    console.log('Total number of subscriptions:', count);
});

subscriber.on("message", function (channel, message) {
    console.log('incoming!!');
    console.log("Subscriber received message in channel '" + channel + "': " + message);
    switch (channel) {
        case smsDepositChannel:
            io.sockets.emit('monoportal-sms-deposit-frontend-channel', message);
            break;
        default:
            io.sockets.emit('monoportal-sms-deposit-frontend-channel', message);
            break;
    }
});


io.on('connection', function (socket) {
    console.log('user connected to server!');
    socket.on('disconnect', function () {
        console.log('user left')
        socket.disconnect();
    });
});


server.listen(SERVER_PORT, () => {
    console.log(smsDepositChannel, smsWithdrawalChannel);
    console.log(`Server is running at http://localhost:${SERVER_PORT} (Redis at localhost:${REDIS_PORT})`);
});
