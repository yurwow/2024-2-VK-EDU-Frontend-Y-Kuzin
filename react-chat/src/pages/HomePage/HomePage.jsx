import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/SideBar/Sidebar.jsx";
import styles from "./HomePage.module.css";
import Chat from "../../components/Chat/Chat.jsx";

const HomePage = () => {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [chats, setChats] = useState({
        chat1: [],
        chat2: [],
    });
    const [activeChat, setActiveChat] = useState(chatId || 'chat1');

    useEffect(() => {
        const savedChats = localStorage.getItem('chatMessages');
        const savedActiveChat = localStorage.getItem('activeChat');

        if (savedChats) {
            setChats(JSON.parse(savedChats));
        }

        if (savedActiveChat && !chatId) {
            setActiveChat(savedActiveChat);
        } else if (chatId) {
            setActiveChat(chatId);
        }
    }, [chatId]);

    useEffect(() => {
        if (chats.chat1.length > 0 || chats.chat2.length > 0) {
            localStorage.setItem('chatMessages', JSON.stringify(chats));
        }
        localStorage.setItem('activeChat', activeChat);
    }, [chats, activeChat]);

    const handleSendMessage = (content) => {
        setChats((prevChats) => {
            const updatedChats = {
                ...prevChats,
                [activeChat]: [content, ...prevChats[activeChat]],
            };
            localStorage.setItem('chatMessages', JSON.stringify(updatedChats));
            return updatedChats;
        });
    };

    const handleSelectChat = (chatId) => {
        setActiveChat(chatId);
        navigate(`/chat/${chatId}`);
    };

    const handleCreateChat = () => {
        const newChatId = `chat${Object.keys(chats).length + 1}`;
        setChats((prevChats) => ({
            ...prevChats,
            [newChatId]: [],
        }));
        setActiveChat(newChatId);
        navigate(`/chat/${newChatId}`);
    };

    const handleClearMessages = () => {
        setChats((prevChats) => {
            const updatedChats = {
                ...prevChats,
                [activeChat]: [],
            };
            localStorage.setItem('chatMessages', JSON.stringify(updatedChats));
            return updatedChats;
        });
    };

    return (
        <div className={styles.page_container}>
            <Sidebar
                chats={chats}
                activeChat={activeChat}
                onSelectChat={handleSelectChat}
                onCreateChat={handleCreateChat}
            />
            <Chat
                handleClearMessages={handleClearMessages}
                messages={chats[activeChat]}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default HomePage;
