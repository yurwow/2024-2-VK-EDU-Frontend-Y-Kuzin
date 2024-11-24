import React from 'react';
import HeaderSideBar from "./HeaderSideBar.jsx";
import ChatList from "./ChatList.jsx";
import styles from "./Sidebar.module.css";

const Sidebar = ({ chats, activeChat, onCreateChat, onSelectChat}) => {
    return (
        <div className={styles.chat_list_container}>
            <HeaderSideBar />
            <ChatList chats={chats} activeChat={activeChat} onCreateChat={onCreateChat} onSelectChat={onSelectChat}/>
        </div>
    );
};

export default Sidebar;
