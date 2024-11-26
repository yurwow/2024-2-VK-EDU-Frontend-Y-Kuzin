export function handleWindowLoad(chatItems, messageContainer, loadMessages, updateActiveChatUI, updateSidebarChats) {
    const savedChatId = localStorage.getItem('activeChatId');
    let currentChatId = savedChatId || 'chat1';

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

    return currentChatId;
}
