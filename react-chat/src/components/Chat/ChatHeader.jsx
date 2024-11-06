import React from 'react';
import styles from './ChatHeader.module.css';
import iconBack from '../../icons/button_back.png'
import accountIcon from '../../icons/account.png'
import deleteHistoryIcon from '../../icons/delete_history.png'
import searchIcon from '../../icons/search.png'
import moreMenuIcon from '../../icons/moreMenu.png'
const ChatHeader = () => {
    return (
        <div className={styles.header_container}>
            <div className={styles.profile}>
                <img src={iconBack} alt="icon back" className={styles.icon_back}/>
                <img src={accountIcon} alt="account icon" style={{width:'36px'}}/>
                <div className={styles.profile_container}>
                    <span className={styles.nickname} title="Nickname Nickname Nickname Nickname Nickname">Nickname Nickname Nickname Nickname Nickname</span>
                    <span className={styles.span_online}>Был в сети: недавно</span>
                </div>
            </div>
            <div className={styles.profile_search}>
                <img src={deleteHistoryIcon} alt="delete icon" className={styles.delete_msg}/>
                <img src={searchIcon} alt="search icon" className={styles.icon_search} />
                <img src={moreMenuIcon} alt="menu" className={styles.icon_setting_chat}/>
            </div>
        </div>
    );
};

export default ChatHeader;
