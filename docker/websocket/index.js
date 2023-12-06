const redis = require("redis");
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();


const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || null;
const REDIS_PREFIX = process.env.REDIS_PREFIX || null;
const SERVER_PORT = 3000;
const ALLOWED_ORIGINS = ["http://0.0.0.0:8888"];


const client = redis.createClient({
    socket: {
        port: REDIS_PORT,
        host: REDIS_HOST,
    }
});

const subscriber = client.duplicate();
const publisher = client.duplicate();


(async () => {
    await subscriber.connect();
    await publisher.connect();
    // await client.connect();
})();

subscriber.on('connect', () => {
    console.log('subscriber connected!');
});

subscriber.on('error', (err) => {
    console.log(`subscriber error:${err}`);
});

publisher.on('connect', () => {
    console.log('publisher connected!');
});

publisher.on('error', (err) => {
    console.log(`publisher error:${err}`);
});


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


io.on('connection', function (socket) {
    console.log('user connected to server!');
    socket.on('disconnect', function () {
        console.log('user left')
        socket.disconnect();
    });
});


server.listen(SERVER_PORT, () => {
    // console.log(smsDepositChannel, smsWithdrawalChannel);
    console.log(`Server is running at http://localhost:${SERVER_PORT} (Redis at localhost:${REDIS_PORT})`);
});
