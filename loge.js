document.querySelector('.login-button').addEventListener('click', function() {
    var username = prompt('请输入您的用户名:');
    if(username) {
      // 存储用户名并跳转到选择聊天室界面
    }
  });
  // 示例：为跑步聊天室添加消息
function sendMessage(message) {
    var chatroomRef = firebase.database().ref('running-chatroom');
    chatroomRef.push().set({
      username: username,
      message: message,
      timestamp: Date.now()
    });
  }
  