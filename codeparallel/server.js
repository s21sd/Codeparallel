import express from "express";
import { Server } from 'socket.io';
import http from 'http';
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000

io.on('connection', (scoket) => {
    console.log('Socket connected', scoket.id)
})




server.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`)
})