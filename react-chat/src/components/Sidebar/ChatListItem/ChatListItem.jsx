import React from 'react';
import styles from "../ChatList.module.css";
import accountImage from "../../../icons/account.png";
import doneAllImage from "../../../icons/done_all.png";

const ChatListItem = ({messages}) => {
    const formatted = messages.length > 0 && messages[0].timestamp
        ? new Date(messages[0].timestamp)
            .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    const renderMessageContent = () => {
        if (messages.length > 0) {
            const lastMessage = messages[0];
            if (lastMessage.image) {
                return lastMessage.imageName || 'Изображение прикреплено';
            } else {
                return lastMessage.content;
            }
        }
        return '';
    };

    return (
        <>
            <div className={styles.chat_list}>
                <img src={accountImage} alt="account image" className={styles.icon_profile}/>
                <div className={styles.chat_profile}>
                    <span className={styles.nickname}
                          title="Nickname Nickname Nickname Nickname Nickname">Nickname</span>
                    <div className={styles.last_message}>{renderMessageContent()}</div>
                </div>
                <div className={styles.sidebar_message_time_container}>
                    <span className={styles.sidebar_message_time}>{formatted}</span>
                    <img src={doneAllImage} alt="done all" style={{width: '16px'}}/>
                </div>
            </div>
        </>
    );
};

export default ChatListItem;
