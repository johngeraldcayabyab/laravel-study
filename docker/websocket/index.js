const redis = require("redis");
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();


const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const SERVER_PORT = 3000;
const ALLOWED_ORIGINS = ["http://0.0.0.0:8888"];


const client = redis.createClient({
    socket: {
        port: REDIS_PORT, host: REDIS_HOST,
    }
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
        origin: "http://0.0.0.0:8888", methods: ["GET", "POST"]
    }
});


io.on('connection', function (socket) {
    console.log('user connected to server!');
    socket.on('disconnect', function () {
        console.log('user left');
        socket.disconnect();
    });
});

const smsDepositSubscriber = client.duplicate();

(async () => {
    await smsDepositSubscriber.connect();
    await smsDepositSubscriber.subscribe('sms-deposit-channel', (message) => {
        console.log(message);
        io.sockets.emit('sms-deposit-frontend-channel', message);
    });
})();


server.listen(SERVER_PORT, () => {
    console.log(`Server is running at http://localhost:${SERVER_PORT} (Redis at localhost:${REDIS_PORT})`);
});
