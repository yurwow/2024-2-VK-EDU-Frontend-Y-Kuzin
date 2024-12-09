import {
    enterChat,
    exitChat,
    handleDeleteMessages,
    handleEnterKey,
    updateActiveChatUI,
    updateSidebarChats
} from "./logic/ui";
import {saveMessage} from "./logic/storage";
import {handleFileUpload} from "./logic/fileUpload";
import {adjustTextHeight} from "./logic/adjustTextHeight";
import {handleSubmit} from "./logic/handleSubmit";
import {handleWindowLoad} from "./logic/onLoad";

const form = document.querySelector('form');
handleEnterKey(form);

const input = document.querySelector('.form-input');
const messageContainer = document.querySelector('.message-container');
const deleteMessages = document.querySelector('.delete_msg');

deleteMessages.addEventListener('click', () => {
    handleDeleteMessages(currentChatId, messageContainer, chatItems, updateSidebarChats);
});

let attachedImage = null;
const fileUpload = document.getElementById('file_upload');
const imagePreview = document.getElementById('image-preview');

fileUpload.addEventListener('change', (event) => {
    handleFileUpload(event, (image) => {
        attachedImage = image;
    }, imagePreview);
});

const textHeight = document.querySelector('.form-input');
adjustTextHeight(textHeight, messageContainer);

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
    currentChatId = handleWindowLoad(chatItems, messageContainer, loadMessages, updateActiveChatUI, updateSidebarChats);
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

form.addEventListener('submit', (event) => {
    handleSubmit(
        event,
        input,
        attachedImage,
        fileUpload,
        messageContainer,
        saveMessage,
        displayMessage,
        updateSidebarChats,
        currentChatId,
        lastMessageTextElement,
        lastMessageTimeElement,
        imagePreview,
        chatItems
    );
});

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
