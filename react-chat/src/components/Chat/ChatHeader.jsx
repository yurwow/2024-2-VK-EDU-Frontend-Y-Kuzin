import React from 'react';
import styles from './ChatHeader.module.css';
import iconBack from '../../icons/button_back.png'
import accountIcon from '../../icons/account.png'
import deleteHistoryIcon from '../../icons/delete_history.png'
import searchIcon from '../../icons/search.png'
import moreMenuIcon from '../../icons/moreMenu.png'

const ChatHeader = ({ handleClearMessages, chatInfo }) => {
    const formatLastSeen = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();

        const isToday =
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        const isYesterday =
            date.getDate() === now.getDate() - 1 &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (isToday) {
            return `${time}`;
        } else if (isYesterday) {
            return `Вчера в ${time}`;
        } else {
            return date.toLocaleDateString([], { day: '2-digit', month: 'long', year: 'numeric' }) + ` в ${time}`;
        }
    };

    return (
        <div className={styles.header_container}>
            <div className={styles.profile}>
                <img src={iconBack} alt="icon back" className={styles.icon_back} />
                <img src={chatInfo.avatar || accountIcon} alt="account icon" style={{ width: '36px' }} />
                <div className={styles.profile_container}>
                    <span className={styles.nickname} title={chatInfo.title}>{chatInfo.title}</span>
                    <span className={styles.span_online}>
                        Был(а) в сети: {formatLastSeen(chatInfo.updated_at)}
                    </span>
                </div>
            </div>
            <div className={styles.profile_search}>
                <img
                    onClick={handleClearMessages}
                    src={deleteHistoryIcon}
                    alt="delete icon"
                    className={styles.delete_msg}
                />
                <img src={searchIcon} alt="search icon" className={styles.icon_search} />
                <img src={moreMenuIcon} alt="menu" className={styles.icon_setting_chat} />
            </div>
        </div>
    );
};

export default ChatHeader;
