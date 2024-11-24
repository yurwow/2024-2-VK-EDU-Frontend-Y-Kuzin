import React from 'react';
import ChatHeader from "./ChatHeader.jsx";
import styles from "./Chat.module.css";
import MessageContainer from "./MessageContainer.jsx";
import ChatInput from "../ChatInput/ChatInput.jsx";

const Chat = ({ messages, onSendMessage }) => {
    return (
        <div className={styles.chat_container}>
            <ChatHeader />
            <MessageContainer messages={messages} />
            <ChatInput onSendMessage={onSendMessage} />
        </div>
    );
};

export default Chat;
