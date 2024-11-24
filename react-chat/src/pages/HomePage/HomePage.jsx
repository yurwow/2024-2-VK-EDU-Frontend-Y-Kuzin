import React, {useState, useEffect, useRef} from 'react';
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import styles from "./HomePage.module.css";
import Chat from "../../components/Chat/Chat.jsx";

const HomePage = () => {
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
        <div className={styles.page_container} >
            <Sidebar messages={messages}/>
            <Chat messages={messages} onSendMessage={handleSendMessage}/>
        </div>
    );
};

export default HomePage;
