import React from 'react';
import styles from './HeaderSideBar.module.css';
import menuIcon from '../../../icons/menu.png'
import searchIcon from '../../../icons/search.png'
const HeaderSideBar = () => {
    return (
        <>
            <header className={styles.header_container}>
                <img src={menuIcon} alt="menu" className={styles.sidebar_setting_icon}/>
                <span>Messenger</span>
                <img src={searchIcon} alt="search" className={styles.sidebar_setting_icon}/>
            </header>
        </>
    );
};

export default HeaderSideBar;
