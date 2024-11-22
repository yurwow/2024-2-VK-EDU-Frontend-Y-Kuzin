export const saveMessage = (currentChatId, message) => {
    const uniqueKey = `${currentChatId}_message_${Date.now()}`;
    localStorage.setItem(uniqueKey, JSON.stringify(message));

    const lastMessageKey = `${currentChatId}_lastMessage`;
    localStorage.setItem(lastMessageKey, JSON.stringify({
        text: message.text || (message.imageName ? `[Image: ${message.imageName}]` : "Без текста"),
        time: message.time
    }));
};
