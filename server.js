const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/message'); // 假设message模型文件路径

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 配置Socket.io连接
io.on('connection', (socket) => {
    console.log('A user connected');

    // 监听消息发送事件
    socket.on('sendMessage', async (data) => {
        const { group, user, message } = data;

        // 保存消息到数据库
        const newMessage = new Message({ group, user, message });
        await newMessage.save();

        // 广播消息给群组内所有用户
        io.to(group).emit('receiveMessage', data);
    });

    // 监听加入群组事件
    socket.on('joinGroup', (group) => {
        socket.join(group);
        console.log(`User joined group: ${group}`);
    });

    // 监听断开连接事件
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chatApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const messageSchema = new mongoose.Schema({
    group: String,
    user: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
