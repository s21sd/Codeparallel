import express from "express";
import { Server } from 'socket.io';
import http from 'http';
import ACTIONS from "./Actions.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000

const userSocketMap = {}
function getAllConnectedClients(roomId) {
    Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketid) => {
        return {
            socketid,
            username: userSocketMap[socketid]
        }
    })
}
io.on('connection', (scoket) => {
    // console.log('Socket connected', scoket.id)

    scoket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[scoket.id] = username;
        scoket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        console.log(clients)

    })
})




server.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`)
})