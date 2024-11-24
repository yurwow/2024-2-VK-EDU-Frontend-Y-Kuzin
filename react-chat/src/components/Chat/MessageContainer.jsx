import React from 'react';
import styles from './MessageContainer.module.css';

const MessageContainer = ({ messages = [] }) => {
    return (
        <div className={styles.message_container}>
            {messages.map((msg) => (
                <div key={msg.id} className={styles.message}>
                    {msg.image && (
                        <div className={styles.message_image}>
                            <img src={msg.image} alt="attached" style={{maxWidth: '100px', maxHeight: '100px'}}/>
                        </div>
                    )}
                    <span className={styles.message_text}>{msg.content}</span>
                    <div className={styles.message_metadata}>
                        <span className={styles.message_time}>
                            {msg.timestamp
                                ? new Date(msg.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })
                                : '—'}
                        </span>
                        <span className={styles.message_send}>{msg.sender}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageContainer;
