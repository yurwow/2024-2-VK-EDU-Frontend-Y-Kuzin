import React from 'react';
import styles from "../ChatList/ChatList.module.css";
import accountImage from "../../../icons/account.png";
import doneAllImage from "../../../icons/done_all.png";

const ChatListItem = ({ chatId, title, avatar, lastMessage, lastUpdated, onSelectChat, isActive }) => {

    const formattedTime = lastUpdated
        ? new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

    const renderLastMessage = () => {
        if (lastMessage) {
            if (lastMessage.files.length > 0) {
                return 'Изображение';
            }
            else if (lastMessage.voice){
                return  'Голосовое сообщение';
            }
            return lastMessage.text || '';
        }
        return '';
    };
    return (
        <div
            className={isActive ? `${styles.chat_list} ${styles.chat_list__active}` : styles.chat_list}
            onClick={() => onSelectChat(chatId)}>
            <img
                src={avatar || accountImage}
                alt="account avatar"
                className={styles.icon_profile}
            />
            <div className={styles.chat_profile}>
                <span className={styles.nickname} title={title || 'Unnamed Chat'}>
                    {title || 'Unnamed Chat'}
                </span>
                <div className={styles.last_message}>{renderLastMessage()}</div>
            </div>
            <div className={styles.sidebar_message_time_container}>
                <span className={styles.sidebar_message_time}>{formattedTime}</span>
                <img src={doneAllImage} alt="done all" style={{ width: '16px' }} />
            </div>
        </div>
    );
};

export default ChatListItem;
