import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import styles from "./HomePage.module.css";
import Chat from "../../components/Chat/Chat.jsx";

const HomePage = () => {
    return (
        <div className={styles.page_container}>
            <Sidebar/>
            <Chat/>
        </div>
    );
};

export default HomePage;
