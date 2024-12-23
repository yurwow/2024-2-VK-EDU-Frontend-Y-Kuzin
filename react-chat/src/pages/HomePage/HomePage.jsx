import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/SideBar/Sidebar.jsx";
import styles from "./HomePage.module.css";
import Chat from "../../components/Chat/Chat.jsx";
import { apiFetch } from "../../components/Api/updateToken.js";
import { Centrifuge } from "centrifuge"; // Импорт Centrifugo

const HomePage = () => {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(chatId || null);
    const [messages, setMessages] = useState([]);
    const centrifugeRef = useRef(null);
    const subscriptionRef = useRef(null);

    useEffect(() => {
        fetchChats();
    }, []);

    useEffect(() => {
        if (chatId) {
            setActiveChat(chatId);
        }
    }, [chatId]);

    useEffect(() => {
        if (activeChat) {
            fetchMessages(activeChat);
            connectCentrifugo(activeChat);
        }

        return () => {
            disconnectCentrifugo();
        };
    }, [activeChat]);

    const fetchChats = async () => {
        try {
            const response = await apiFetch('http://localhost:8080/api/chats/');
            if (response.ok) {
                const data = await response.json();
                setChats(data.results);
            } else {
                console.error("Failed to fetch chats:", await response.json());
            }
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    const fetchMessages = async (chatId) => {
        try {
            const response = await apiFetch(`http://localhost:8080/api/messages/?chat=${chatId}`);
            if (response.ok) {
                const data = await response.json();
                setMessages(data.results);
            } else {
                console.error("Failed to fetch messages:", await response.json());
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const connectCentrifugo = (chatId) => {
        if (centrifugeRef.current) {
            centrifugeRef.current.disconnect();
        }

        // Получение токена авторизации
        const token = JSON.parse(localStorage.getItem("authToken"))?.access;

        if (!token) {
            console.error("Cannot connect to Centrifugo: no token available");
            return;
        }

        // Инициализация Centrifuge
        const centrifuge = new Centrifuge('ws://localhost:8080/connection/websocket/', {
            getToken: () => {
                return fetch('http://localhost:8080/api/centrifugo/connect/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({}),
                })
                    .then(res => res.json())
                    .then(data => data.token);
            }
        });

        // Подключение Centrifugo
        centrifugeRef.current = centrifuge;
        centrifuge.connect();

        // Подписка на канал
        const channel = `chat_${chatId}`; // Название канала (например, chat_{id чата})
        const subscription = centrifuge.newSubscription(channel, {
            getToken: () => {
                return fetch('http://localhost:8080/api/centrifugo/subscribe/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ channel }),
                })
                    .then(res => res.json())
                    .then(data => data.token);
            }
        });

        subscription.on('publication', (data) => {
            console.log("Message received via Centrifugo:", data);
            setMessages((prevMessages) => [...prevMessages, data.data.message]);
        });

        subscription.subscribe();
        subscriptionRef.current = subscription;
    };

    const disconnectCentrifugo = () => {
        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
            subscriptionRef.current = null;
        }

        if (centrifugeRef.current) {
            centrifugeRef.current.disconnect();
            centrifugeRef.current = null;
        }
    };

    const handleSelectChat = (chatId) => {
        setActiveChat(chatId);
        navigate(`/chat/${chatId}`);
    };

    const activeChatInfo = chats.find(chat => chat.id === activeChat);
    const handleCreateChat = async () => {
        const chatData = {
            members: ["00dbe632-101e-4ec8-a0af-7efa7ab6e080"], // Укажите ID участников
            is_private: true,
            title: `New Chat ${chats.length + 1}`,
            avatar: null,
        };

        try {
            const response = await apiFetch('http://localhost:8080/api/chats/?fallback=on', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(chatData),
            });

            if (response.ok) {
                const newChat = await response.json();
                setChats((prevChats) => [...prevChats, newChat]);
                setActiveChat(newChat.id);
                navigate(`/chat/${newChat.id}`);
            } else {
                console.error("Failed to create chat:", await response.json());
            }
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };


    return (
        <div className={styles.page_container}>
            <Sidebar
                chats={chats}
                activeChat={activeChat}
                onSelectChat={handleSelectChat}
                handleCreateChat={handleCreateChat}
            />
            {activeChat && activeChatInfo && (
                <Chat
                    messages={messages}
                    chatInfo={activeChatInfo}
                    onSendMessage={(content) => {
                        if (centrifugeRef.current) {
                            centrifugeRef.current.publish(`chat_${activeChat}`, { content });
                        }
                    }}
                />
            )}
        </div>
    );
};

export default HomePage;
