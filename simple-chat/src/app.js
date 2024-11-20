import {enterChat, exitChat, updateActiveChatUI, updateSidebarChats} from "./logic/ui";
import {saveMessage} from "./logic/storage";

const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messageContainer = document.querySelector('.message-container');
const deleteMessages = document.querySelector('.delete_msg');

deleteMessages.addEventListener('click', (e) => {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`${currentChatId}_message`)) {
            localStorage.removeItem(key);
        }
    });

    const lastMessageKey = `${currentChatId}_lastMessage`;
    localStorage.removeItem(lastMessageKey);

    updateSidebarChats(chatItems);

    messageContainer.innerHTML = '<p>No messages yet.</p>';
});

let attachedImage = null;
const fileUpload = document.getElementById('file_upload');
const imagePreview = document.getElementById('image-preview');

fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(e) {
            attachedImage = e.target.result;
            const imgElement = document.createElement('img');
            imgElement.src = attachedImage;
            imgElement.alt = 'Uploaded Image';
            imgElement.style.maxWidth = '200px';
            imagePreview.innerHTML = '';
            imagePreview.appendChild(imgElement);
        };

        reader.readAsDataURL(file);
    }
});

const textHeight = document.querySelector('.form-input');

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});

textHeight.addEventListener('input', function() {
    this.style.height = 'auto';
    const scrollHeight = this.scrollHeight;
    if (scrollHeight <= 250) {
        this.style.height = scrollHeight + 'px';
    } else {
        this.style.height = '250px';
    }

    const textareaHeight = this.offsetHeight;
    const containerHeight = `calc(100vh - ${textareaHeight + 150}px)`;
    messageContainer.style.height = containerHeight;
});


const chatElements = document.querySelectorAll('.chat-list');
chatElements.forEach(chatElement => {
    chatElement.addEventListener('click', () => {
        enterChat(chats, form, messageContainer, loadMessages);
    });
});

const chats = document.querySelector('.chat-container');
const backButton = document.querySelector('.icon-back');
backButton.addEventListener('click', () => {
    exitChat(messageContainer, chats, form);
})

const lastMessageTimeElement = document.querySelector('.sidebar-message-time');
const lastMessageTextElement = document.querySelector('.last-message');

window.onload = () => {
    const savedChatId = localStorage.getItem('activeChatId');
    currentChatId = savedChatId || 'chat1';

    chatItems.forEach(chatItem => {
        const chatId = chatItem.getAttribute('data-chat-id');
        if (chatId === currentChatId) {
            chatItem.classList.add('active');
        } else {
            chatItem.classList.remove('active');
        }
    });

    updateActiveChatUI(chatItems, currentChatId);
    loadMessages();
    updateSidebarChats(chatItems);
};

function loadMessages() {
    messageContainer.innerHTML = '';
    let messages = [];

    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`${currentChatId}_message`)) {
            const message = JSON.parse(localStorage.getItem(key));
            messages.push({ key, message });
        }
    });

    messages.sort((a, b) => {
        const aTime = parseInt(a.key.split('_')[2]);
        const bTime = parseInt(b.key.split('_')[2]);
        return aTime - bTime;
    });

    messages.forEach(msgObj => {
        displayMessage(
            msgObj.message.text,
            msgObj.message.time,
            msgObj.message.send,
            msgObj.message.image
        );
    });
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    if (input.value.trim() === "" && !attachedImage) {
        event.preventDefault();
    } else {
        event.preventDefault();
        let sender = 'я';
        const date = new Date();
        const options = { hour: '2-digit', minute: '2-digit' };
        const timeStr = date.toLocaleTimeString([], options);

        const message = {
            text: input.value || null,
            image: attachedImage || null,
            imageName: fileUpload.files[0] ? fileUpload.files[0].name : null,
            time: timeStr,
            send: sender
        };

        saveMessage(currentChatId, message);
        displayMessage(input.value, timeStr, sender, attachedImage);

        if (message.imageName) {
            lastMessageTextElement.textContent = message.imageName;
        } else {
            lastMessageTextElement.textContent = input.value;
        }

        imagePreview.innerHTML = '';
        attachedImage = null;

        input.style.height = '20px';
        const textareaHeight = input.offsetHeight;
        const containerHeight = `calc(100vh - ${textareaHeight + 150}px)`;
        messageContainer.style.height = containerHeight;

        lastMessageTimeElement.textContent = timeStr;
        input.value = "";
        updateSidebarChats(chatItems);
    }
}

let currentChatId = 'chat1';

function displayMessage(text, time, send, image = null) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");

    if (image) {
        const imageContainer = document.createElement("div");
        const imgElement = document.createElement("img");
        imgElement.src = image;
        imgElement.alt = "Uploaded Image";
        imgElement.style.maxWidth = "200px";
        imgElement.classList.add("images");
        imageContainer.appendChild(imgElement)
        newMessage.appendChild(imgElement);
    }
    const textContainer = document.createElement("div");
    if (text) {
        const messageText = document.createElement("span");
        messageText.classList.add("message-text");
        messageText.innerText = text;
        textContainer.appendChild(messageText);
    }
    const metadataContainer = document.createElement("div");
    metadataContainer.classList.add("message-metadata");

    const messageTime = document.createElement("span");
    messageTime.innerText = time;
    messageTime.classList.add("message-time");

    const messageSender = document.createElement("span");
    messageSender.innerText = send;
    messageSender.classList.add("message-send");

    metadataContainer.append(messageTime, messageSender);
    textContainer.append(metadataContainer);
    newMessage.appendChild(textContainer);
    messageContainer.prepend(newMessage);

    messageContainer.scrollTop = messageContainer.scrollHeight;
}

const chatItems = document.querySelectorAll('.chat-list');

chatItems.forEach(chatItem => {
    chatItem.addEventListener('click', () => {
        const chatId = chatItem.getAttribute('data-chat-id');
        if (chatId !== currentChatId) {
            currentChatId = chatId;
            localStorage.setItem('activeChatId', currentChatId);

            messageContainer.innerHTML = '';
            loadMessages();

            chatItems.forEach(item => item.classList.remove('active'));
            chatItem.classList.add('active');
        }
    });
});
