import './index.css';

const form = document.querySelector('form');
const input = document.querySelector('.form-input');
const messageContainer = document.querySelector('.message-container');
const deleteMessages = document.querySelector('.delete_msg');

deleteMessages.addEventListener('click', (e) => {
    window.localStorage.clear();
    location.reload();
})

let attachedImage = null;
const fileUpload = document.getElementById('file_upload');
const imagePreview = document.getElementById('image-preview');

fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();

        reader.onload = function(e) {
            attachedImage = e.target.result; // Сохраняем изображение в переменную
            const imgElement = document.createElement('img');
            imgElement.src = attachedImage;
            imgElement.alt = 'Uploaded Image';
            imgElement.style.maxWidth = '200px';
            imagePreview.innerHTML = ''; // Очищаем контейнер перед добавлением
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
    this.style.height = 'auto'; // сбрасываем высоту
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

function loadMessages() {
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
        displayMessage(msgObj.message.text, msgObj.message.time, msgObj.message.send, msgObj.message.image);
    });
}

window.onload = function() {
    loadMessages();
}

form.addEventListener('submit', handleSubmit);

function handleSubmit (event) {
    if (input.value.trim() === "" && !attachedImage) {
        event.preventDefault()
    } else {
        event.preventDefault();
        let sender = 'я';
        const date = new Date();
        const options = { hour: '2-digit', minute: '2-digit' };
        const timeStr = date.toLocaleTimeString([], options);
        const message = {
            text: input.value.trim() || null,
            image: attachedImage || null,
            time: timeStr,
            send: sender
        };

        saveMessage(message)
        displayMessage(input.value, timeStr, sender, attachedImage);
        input.value = "";
        imagePreview.innerHTML = '';
        attachedImage = null;

        input.style.height = '20px';
        const textareaHeight = input.offsetHeight;
        const containerHeight = `calc(100vh - ${textareaHeight + 150}px)`;
        messageContainer.style.height = containerHeight;
    }
}

function saveMessage(message) {
    const uniqueKey = 'message_' + Date.now();
    localStorage.setItem(uniqueKey, JSON.stringify(message));
}

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
        messageText.innerText = text;
        textContainer.appendChild(messageText);
    }

    const messageTime = document.createElement("span");
    messageTime.innerText = time;
    messageTime.classList.add("message-time");

    const messageSender = document.createElement("span");
    messageSender.innerText = send;
    messageSender.classList.add("message-send");

    textContainer.append(messageTime, messageSender);
    newMessage.appendChild(textContainer);
    messageContainer.prepend(newMessage);

    messageContainer.scrollTop = messageContainer.scrollHeight;
}
