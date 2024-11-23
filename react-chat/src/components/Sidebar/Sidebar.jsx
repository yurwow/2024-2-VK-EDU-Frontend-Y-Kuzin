import React from 'react';
import HeaderSideBar from "./HeaderSideBar.jsx";
import ChatList from "./ChatList.jsx";
import styles from "./Sidebar.module.css";
import FloatingButton from "../FloatingButton/FloatingButton.jsx";

const Sidebar = () => {
    return (
        <div className={styles.chat_list_container}>
            <HeaderSideBar />
            <ChatList/>
            <FloatingButton/>
        </div>
    );
};

export default Sidebar;
