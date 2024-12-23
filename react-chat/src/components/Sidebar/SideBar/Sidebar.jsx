import React from 'react';
import HeaderSideBar from "../HeaderSideBar/HeaderSideBar.jsx";
import ChatList from "../ChatList/ChatList.jsx";
import styles from "./SideBar.module.css";

const Sidebar = ({ chats, activeChat, onCreateChat, onSelectChat, handleCreateChat}) => {
    return (
        <div className={styles.chat_list_container}>
            <HeaderSideBar />
            <ChatList chats={chats} activeChat={activeChat} onCreateChat={onCreateChat} onSelectChat={onSelectChat} handleCreateChat={handleCreateChat}/>
        </div>
    );
};

export default Sidebar;
