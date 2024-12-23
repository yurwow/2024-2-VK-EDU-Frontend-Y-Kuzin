import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeaderSideBar.module.css';
import menuIcon from '../../../icons/menu.png';
import searchIcon from '../../../icons/search.png';
import ProfileModal from "../ProfileModal/ProfileModal.jsx";
import ViewProfileModal from "../ViewProfileModal/ViewProfileModal.jsx";

const HeaderSideBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
    const navigate = useNavigate();

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

    const openViewProfile = () => {
        setIsViewProfileOpen(true);
        setIsMenuOpen(false);
    };

    const closeViewProfile = () => {
        setIsViewProfileOpen(false);
    };

    const confirmLogout = () => {
        localStorage.removeItem("authToken");
        alert("You have been logged out.");
        navigate('/login'); // Redirect to login page
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
                        <li onClick={openViewProfile}>View Profile</li>
                        <li onClick={openProfile}>Edit Profile</li>
                        <li onClick={() => setIsLogoutConfirmOpen(true)}>Logout</li>
                    </ul>
                </div>
            )}

            {isProfileOpen && <ProfileModal closeProfile={closeProfile} />}
            {isViewProfileOpen && <ViewProfileModal closeViewProfile={closeViewProfile} />}

            {isLogoutConfirmOpen && (
                <div className={styles.confirmModal}>
                    <div className={styles.confirmModalContent}>
                        <p>Are you sure you want to log out?</p>
                        <button
                            type="button"
                            onClick={confirmLogout}
                            className={styles.confirmButton}
                        >
                            Yes, Logout
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsLogoutConfirmOpen(false)}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default HeaderSideBar;
