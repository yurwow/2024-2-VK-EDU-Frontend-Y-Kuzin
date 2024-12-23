import { createPortal } from 'react-dom';
import styles from './ProfileModal.module.css';
import buttonBack from '../../../icons/button_back.png';
import okayIcon from '../../../icons/okay.png';
import addPhoto from '../../../icons/addPhoto.png';
import { useEffect, useState } from "react";
import {apiFetch} from "../../Api/updateToken.js";

const ProfileModal = ({ closeProfile }) => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        bio: "",
        avatar: null,
    });
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeProfile();
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeProfile]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeProfile();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            avatar: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        for (const key in formData) {
            if (formData[key] !== null) {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            const response = await apiFetch("http://localhost:8080/api/user/current/", {
                method: "PATCH",
                body: formDataToSend,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Profile updated successfully:", data);
                alert("Profile updated successfully!");
                closeProfile();
            } else {
                const errorData = await response.json();
                console.error("Failed to update profile:", errorData);
                alert("Failed to update profile: " + (errorData.detail || "Unknown error"));
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleDeleteProfile = async () => {
        try {
            const response = await apiFetch("http://localhost:8080/api/user/current/", {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Profile deleted successfully!");
                closeProfile();
            } else {
                const errorData = await response.json();
                console.error("Failed to delete profile:", errorData);
                alert("Failed to delete profile: " + (errorData.detail || "Unknown error"));
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return createPortal(
        <div className={styles.profileModal} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <header className={styles.header}>
                    <img src={buttonBack} onClick={closeProfile} alt="button back" className={styles.icon} />
                    <h2>Edit Profile</h2>
                    <img src={okayIcon} onClick={handleSubmit} alt="okay icon" className={styles.icon} />
                </header>
                <section>
                    <div className={styles.section_img}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            id="upload-avatar"
                        />
                        <label htmlFor="upload-avatar">
                            <img
                                src={addPhoto}
                                alt="add photo"
                                style={{ width: '50px', height: '50px', cursor: 'pointer' }}
                            />
                        </label>
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <label className={styles.form_label}>
                            <div>First Name:</div>
                            <input
                                className={styles.input}
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </label>
                        <label className={styles.form_label}>
                            <div>Last Name:</div>
                            <input
                                className={styles.input}
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </label>
                        <label className={styles.form_label}>
                            <div>Username:</div>
                            <input
                                className={styles.input}
                                type="text"
                                name="username"
                                placeholder="@nickname"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </label>
                        <label className={styles.form_label}>
                            Bio:
                            <textarea
                                className={styles.textarea}
                                name="bio"
                                placeholder="Tell us about yourself"
                                value={formData.bio}
                                onChange={handleChange}
                            />
                        </label>
                        <button type="submit" className={styles.submitButton}>Save Changes</button>
                    </form>
                    <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => setIsDeleteConfirmOpen(true)}
                    >
                        Delete Profile
                    </button>
                </section>
                {isDeleteConfirmOpen && (
                    <div className={styles.confirmModal}>
                        <p>Are you sure you want to delete your profile?</p>
                        <button
                            type="button"
                            onClick={handleDeleteProfile}
                            className={styles.confirmButton}
                        >
                            Yes, Delete
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsDeleteConfirmOpen(false)}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.getElementById('modal')
    );
};

export default ProfileModal;
