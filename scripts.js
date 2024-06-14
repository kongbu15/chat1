function showLogin() {
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('login-modal').style.display = 'none';
}

function login() {
    var username = document.getElementById('username').value;
    if (username) {
        alert('登录成功，欢迎' + username);
        closeLogin(); // 隐藏登录界面
        showChatroomSelection(); // 显示选择群组界面
    } else {
        alert('请输入用户名');
    }
}


function showChatroomSelection() {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('chatroom-container').style.display = 'block';
}
function enterChatroom(roomName) {
    var chatroomContainer = document.getElementById('chatroom-container');
    chatroomContainer.innerHTML = `
        <h1>${roomName}群组</h1>
        <div id="chat-box" class="chat-box"></div>
        <input type="text" id="message-input" placeholder="输入消息">
        <button onclick="sendMessage('${roomName}')">发送</button>
    `;
    chatroomContainer.style.display = 'block'; // 确保显示出下一个页面内容
}
function enterChatroom(roomName) {
    alert('进入' + roomName + '群组');
    // 这里可以添加进一步的逻辑，比如进入具体的聊天室页面
}
function enterChatroom(roomName) {
    var chatroomContainer = document.getElementById('chatroom-container');
    chatroomContainer.innerHTML = `
        <h1>${roomName}群组</h1>
        <div id="chat-box" class="chat-box"></div>
        <input type="text" id="message-input" placeholder="输入消息">
        <button onclick="sendMessage('${roomName}')">发送</button>
    `;
}

function sendMessage(roomName) {
    var message = document.getElementById('message-input').value;
    var chatBox = document.getElementById('chat-box');
    if (message) {
        var username = document.getElementById('username').value;
        var newMessage = document.createElement('p');
        newMessage.textContent = `${username}: ${message}`;
        chatBox.appendChild(newMessage);
        document.getElementById('message-input').value = '';
    } else {
        alert('请输入消息');
    }
}
// scripts.js
const socket = io();

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    const group = 'running'; // 假设群组名称为'running'
    const user = 'user1'; // 假设用户名称为'user1'

    socket.emit('sendMessage', { group, user, message });
    messageInput.value = '';
}

socket.on('receiveMessage', (data) => {
    const messagesDiv = document.getElementById('messages');
    const newMessage = document.createElement('div');
    newMessage.textContent = `${data.user}: ${data.message}`;
    messagesDiv.appendChild(newMessage);
});

// 加入群组
socket.emit('joinGroup', 'running');
