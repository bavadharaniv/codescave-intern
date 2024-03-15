const socket = io();

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (message !== '') {
        socket.emit('chat message', message);
        messageInput.value = '';
    }
}

socket.on('chat message', (msg) => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    messagesDiv.appendChild(messageElement);
});