export const enterChat = (chats, form, messageContainer, loadMessages) => {
    chats.style.display = 'block';
    form.style.display = 'block';
    messageContainer.style.display = 'flex';
    loadMessages();
};

export const exitChat = (messageContainer, chats, form) => {
    messageContainer.innerHTML = '';
    chats.style.display = 'none';
    form.style.display = 'none';
    messageContainer.style.display = 'none';
};

export const updateSidebarChats = (chatItems) => {
    chatItems.forEach(chatItem => {
        const chatId = chatItem.getAttribute('data-chat-id');
        const lastMessageKey = `${chatId}_lastMessage`;
        const lastMessage = JSON.parse(localStorage.getItem(lastMessageKey));

        const lastMessageText = chatItem.querySelector('.last-message');
        const lastMessageTime = chatItem.querySelector('.sidebar-message-time');

        if (lastMessage) {
            lastMessageText.textContent = lastMessage.text;
            lastMessageTime.textContent = lastMessage.time;
        } else {
            lastMessageText.textContent = "";
            lastMessageTime.textContent = "";
        }
    });
};

export const updateActiveChatUI = (chatItems, currentChatId) => {
    chatItems.forEach(chatItem => {
        const chatId = chatItem.getAttribute('data-chat-id');
        if (chatId === currentChatId) {
            chatItem.classList.add('active');
        } else {
            chatItem.classList.remove('active');
        }
    });
};

export function handleDeleteMessages(currentChatId, messageContainer, chatItems, updateSidebarChats) {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`${currentChatId}_message`)) {
            localStorage.removeItem(key);
        }
    });

    const lastMessageKey = `${currentChatId}_lastMessage`;
    localStorage.removeItem(lastMessageKey);

    updateSidebarChats(chatItems);

    messageContainer.innerHTML = '<p></p>';
}

export function handleEnterKey(form) {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
}
