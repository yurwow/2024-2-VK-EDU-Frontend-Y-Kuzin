const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messageContainer = document.querySelector('.message-container');


const chats = document.querySelector('.chat-container');
const backButton = document.querySelector('.icon-back');
backButton.addEventListener('click', () => {
    exitChat();
})

const exitChat = () => {
    messageContainer.innerHTML = '';

    // Скрываем элементы чата, если нужно
    chats.style.display = 'none';
    form.style.display = 'none';
    messageContainer.style.display = 'none';
}


const lastMessageTimeElement = document.querySelector('.sidebar-message-time');
const lastMessageTextElement = document.querySelector('.last-message');

const scrollButton = document.getElementById('scroll-to-bottom');
// Показать кнопку только, если мы не внизу страницы
messageContainer.addEventListener('scroll', function() {
    if (messageContainer.scrollHeight - messageContainer.scrollTop > messageContainer.clientHeight + 100) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});
// Прокрутка вниз при нажатии на кнопку
scrollButton.addEventListener('click', function() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
});

window.onload = function() {
    let messages = [];
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('message')) {
            const message = JSON.parse(localStorage.getItem(key));
            messages.push({ key, message });
        }
    });
    messages.sort((a, b) => {
        return parseInt(a.key.split('_')[1]) - parseInt(b.key.split('_')[1]);
    });
    messages.forEach(msgObj => {
        displayMessage(msgObj.message.text, msgObj.message.time, msgObj.message.send);
    });
    // Отобразить время, текст последнего сообщения
    if (messages.length > 0) {
        const lastMessageTime = messages[messages.length - 1].message;
        lastMessageTimeElement.textContent = lastMessageTime.time;
        const lastMessageText = messages[messages.length - 1].message;
        lastMessageTextElement.textContent = lastMessageText.text;
    }
}

form.addEventListener('submit', handleSubmit);

function handleSubmit (event) {
    if (input.value === "") {
        event.preventDefault()
    } else {
        event.preventDefault();
        let sender = 'я';
        const date = new Date();
        const options = { hour: '2-digit', minute: '2-digit' };
        const timeStr = date.toLocaleTimeString([], options);

        const message = { text: input.value, time: timeStr, send: sender };
        saveMessage(message)
        displayMessage(input.value, timeStr, sender);

        lastMessageTimeElement.textContent = timeStr;
        lastMessageTextElement.textContent = input.value;

        input.value = "";
    }
}

function saveMessage(message) {
    const uniqueKey = 'message_' + Date.now();
    localStorage.setItem(uniqueKey, JSON.stringify(message));
}

function displayMessage(text, time, send) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");

    const messageText = document.createElement("span")
    messageText.innerText = text;

    const messageTime = document.createElement("span");
    messageTime.innerText = time;
    messageTime.classList.add("message-time");

    const messageSender = document.createElement("span");
    messageSender.innerText = send;
    messageSender.classList.add("message-send")

    newMessage.append(messageText, messageTime, messageSender)
    messageContainer.prepend(newMessage)

    messageContainer.scrollTop = messageContainer.scrollHeight;
}
