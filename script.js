// Load messages from local storage
window.onload = function() {
    var username = localStorage.getItem('username');
    if (username) {
        document.getElementById("username").value = username;
        showChatInput();
    }
    
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    var chatBoxElement = document.getElementById("chat-box");
    messages.forEach(function(message) {
        appendMessageToChat(message.sender, message.content);
    });
};

function startChat() {
    var usernameInput = document.getElementById("username");
    var username = usernameInput.value.trim();
    if (username === "") {
        alert("Please enter your name.");
        return;
    }
    localStorage.setItem('username', username);
    showChatInput();
}

function showChatInput() {
    var nameInput = document.getElementById("name-input");
    var chatInputElement = document.getElementById("chat-input");

    nameInput.style.display = "none";
    chatInputElement.style.display = "flex";
    document.getElementById("message-input").focus(); // Focus on message input field
}

function sendMessage() {
    var username = localStorage.getItem('username');
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value.trim();
    if (message === "") {
        alert("Please enter a message.");
        return;
    }

    var chatBoxElement = document.getElementById("chat-box");
    var messageObj = {
        sender: username,
        content: message
    };
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(messageObj);
    localStorage.setItem('messages', JSON.stringify(messages));
    appendMessageToChat(username, message); // Call function to append message to chat box
    messageInput.value = "";
    chatBoxElement.scrollTop = chatBoxElement.scrollHeight;
}

function deleteMessage(button) {
    var messageDiv = button.parentNode;
    var messageContent = messageDiv.querySelector('.message-content').innerText;
    var messages = JSON.parse(localStorage.getItem('messages')) || [];
    var filteredMessages = messages.filter(function(message) {
        return message.content !== messageContent;
    });
    localStorage.setItem('messages', JSON.stringify(filteredMessages));
    messageDiv.remove();
}

function appendMessageToChat(sender, content) {
    var chatBoxElement = document.getElementById("chat-box");
    var messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.innerHTML = "<div class='message-sender'>" + sender + "</div><div class='message-content'>" + content + "</div><button class='delete-button' onclick='deleteMessage(this)'>❌</button>";
    chatBoxElement.appendChild(messageDiv);
}

// Add event listener to send message when Send button is clicked
document.getElementById("send-button").addEventListener("click", function() {
    sendMessage();
});

// Add event listener to send message when Enter key is pressed
document.getElementById("message-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
