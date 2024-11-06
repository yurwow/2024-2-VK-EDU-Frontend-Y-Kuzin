import React from 'react';
import styles from './MessageContainer.module.css';


const MessageContainer = () => {
    return (
        <div className={styles.message_container}>
            <div className={styles.message}>
                <span className={styles.message_text}>fnkjvdnjkfvjkdvfkd</span>
                <div className={styles.message_metadata}>
                    <span className={styles.message_time}>10:20</span>
                    <span className={styles.message_send}>я</span>
                </div>
            </div>
        </div>
    );
};

export default MessageContainer;
