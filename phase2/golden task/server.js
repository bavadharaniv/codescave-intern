const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const url = 'mongodb://localhost:27017';
const dbName = 'chat-app';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database successfully');
    const db = client.db(dbName);

    io.on('connection', (socket) => {
        console.log('A user connected');

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        socket.on('chat message', (msg) => {
            console.log('Message:', msg);
            db.collection('messages').insertOne({ message: msg });
            io.emit('chat message', msg);
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(Server is running on port ${PORT});
});