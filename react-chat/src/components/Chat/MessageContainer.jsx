import React, { useEffect, useState } from 'react';
import styles from './MessageContainer.module.css';
import { formatDate } from "./formatDate.js";
import { apiFetch } from "../Api/updateToken.js";

const MessageContainer = ({ messages = [] }) => {
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await apiFetch("http://localhost:8080/api/user/current/");
                if (response.ok) {
                    const data = await response.json();
                    setCurrentUserId(data.id);
                } else {
                    console.error("Failed to fetch current user:", await response.json());
                }
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };

        fetchCurrentUser();
    }, []);

    return (
        <div className={styles.message_container}>
            {messages.map((msg) => {
                const isOwnMessage = msg.sender?.id === currentUserId;
                const imageUrl = msg.files && msg.files.length > 0 ? msg.files[0].item : null;
                const voiceUrl = msg.voice;
                return (
                    <div
                        key={msg.id}
                        className={`${isOwnMessage ? styles.message : styles.message_other}`}
                    >
                        {imageUrl && (
                            <div className={styles.message_image}>
                                <img
                                    src={imageUrl}
                                    alt="attached"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                            </div>
                        )}
                        {voiceUrl && (
                            <div className={styles.message_voice}>
                                <audio controls>
                                    <source src={voiceUrl} type="audio/wav" />
                                    Ваш браузер не поддерживает аудио-воспроизведение.
                                </audio>
                            </div>
                        )}
                        {msg.text && (
                            <span className={styles.message_text}>{msg.text}</span>
                        )}
                        <div className={styles.message_metadata}>
                            <span className={styles.message_time}>
                                {msg.created_at ? formatDate(msg.created_at) : '—'}
                            </span>
                            <span className={styles.message_send}>
                                {msg.sender?.username || 'Unknown Sender'}
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MessageContainer;
