import { createPortal } from 'react-dom';
import styles from './ViewProfileModal.module.css';
import buttonBack from '../../../icons/button_back.png';
import { useEffect, useState } from "react";
import {apiFetch} from "../../Api/updateToken.js";

const ViewProfileModal = ({ closeViewProfile }) => {
    const [userProfile, setUserProfile] = useState(null);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await apiFetch("http://localhost:8080/api/user/current/", {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserProfile(data);
                } else {
                    console.error("Failed to fetch user profile:", await response.json());
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeViewProfile();
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeViewProfile]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeViewProfile();
        }
    };

    return createPortal(
        <div className={styles.profileModal} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <header className={styles.header}>
                    <img src={buttonBack} onClick={closeViewProfile} alt="button back" className={styles.icon} />
                    <h2>View Profile</h2>
                </header>
                {userProfile ? (
                    <section>
                        <div className={styles.section_img}>
                            <img
                                src={userProfile?.avatar || 'https://via.placeholder.com/150'}
                                alt="profile avatar"
                                style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                            />
                        </div>
                        <div className={styles.profileDetails}>
                            <p><strong>id:</strong> {userProfile.id || "N/A"}</p>
                            <p><strong>Name:</strong> {userProfile.first_name || "N/A"}</p>
                            <p><strong>Last Name:</strong> {userProfile.last_name || "N/A"}</p>
                            <p><strong>Username:</strong> @{userProfile.username || "N/A"}</p>
                            <p><strong>Bio:</strong> {userProfile.bio || "No bio available"}</p>
                            <p><strong>Status:</strong> {userProfile.is_online ? "Online" : "Offline"}</p>
                            <p><strong>Last Online:</strong> {userProfile.last_online_at ? formatDate(userProfile.last_online_at) : "Unknown"}</p>
                        </div>
                    </section>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>,
        document.getElementById('modal_view')
    );
};

export default ViewProfileModal;
