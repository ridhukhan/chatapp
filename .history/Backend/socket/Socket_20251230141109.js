import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const userSocketMap = {};
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

// Helper to get socket ids of a user
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId && userId !== "undefined") {
        userSocketMap[userId] = userSocketMap[userId] || [];
        userSocketMap[userId].push(socket.id);

        // emit online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    // ✅ Conversation rooms join
    socket.on("joinConversations", (conversationIds) => {
        conversationIds.forEach((convId) => {
            socket.join(convId); // join room per conversation
        });
    });

    // ✅ Send message to a conversation room
    socket.on("sendMessage", (message) => {
        const { conversationId } = message;

        // Send to everyone in that conversation except sender
        socket.to(conversationId).emit("newMessage", message);
    });

    // Disconnect handler
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        if (userSocketMap[userId]) {
            userSocketMap[userId] = userSocketMap[userId].filter(id => id !== socket.id);
            if (userSocketMap[userId].length === 0) delete userSocketMap[userId];
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server };
