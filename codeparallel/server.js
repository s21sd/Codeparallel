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
    console.log(roomId)
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketid) => {
        return {
            socketid,
            username: userSocketMap[socketid]
        }
    })
}
io.on('connection', (socket) => {
    console.log('Socket connected', socket.id)

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        console.log(clients);
        clients.forEach(({ socketid }) => {
            io.to(socketid).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketid: socket.id
            })
        })

    })
})




server.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`)
})