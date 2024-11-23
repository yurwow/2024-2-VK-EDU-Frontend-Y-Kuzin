import React, { useEffect, useState } from 'react';
import ChatHeader from "./ChatHeader.jsx";
import styles from "./Chat.module.css";
import MessageContainer from "./MessageContainer.jsx";
import ChatInput from "../ChatInput/ChatInput.jsx";

const Chat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }, [messages]);

    const handleSendMessage = (content) => {
        setMessages((prevMessages) => [content, ...prevMessages]);
    };

    return (
        <div className={styles.chat_container}>
            <ChatHeader />
            <MessageContainer messages={messages} />
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default Chat;
