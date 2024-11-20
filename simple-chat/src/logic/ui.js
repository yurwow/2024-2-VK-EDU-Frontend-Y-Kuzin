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
