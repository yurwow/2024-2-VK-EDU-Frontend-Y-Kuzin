export function handleSubmit(
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
    chatItems) {

    event.preventDefault();

    if (input.value.trim() === "" && !attachedImage) {
        return;
    }

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
