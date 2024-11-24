import React, { useState } from 'react';
import styles from './HeaderSideBar.module.css';
import menuIcon from '../../../icons/menu.png';
import searchIcon from '../../../icons/search.png';
import ProfileModal from "../ProfileModal/ProfileModal.jsx";

const HeaderSideBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const openProfile = () => {
        setIsProfileOpen(true);
        setIsMenuOpen(false);
    };

    const closeProfile = () => {
        setIsProfileOpen(false);
    };

    return (
        <header className={styles.header_container}>
            <img
                src={menuIcon}
                alt="menu"
                className={styles.sidebar_setting_icon}
                onClick={toggleMenu}
            />
            <span>Messenger</span>
            <img src={searchIcon} alt="search" className={styles.sidebar_setting_icon} />

            {isMenuOpen && (
                <div className={styles.dropdownMenu}>
                    <ul>
                        <li onClick={openProfile}>Edit profile</li>
                    </ul>
                </div>
            )}

            {isProfileOpen && <ProfileModal closeProfile={closeProfile} />}
        </header>
    );
};

export default HeaderSideBar;
