import {createPortal} from 'react-dom';
import styles from './ProfileModal.module.css';
import buttonBack from '../../../icons/button_back.png'
import okayIcon from '../../../icons/okay.png'
import addPhoto from '../../../icons/addPhoto.png'
import {useEffect} from "react";

const ProfileModal = ({ closeProfile }) => {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeProfile();
            }
        }
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [closeProfile]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeProfile();
        }
    };

    return createPortal(
        <div className={styles.profileModal} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                <header className={styles.header}>
                    <img src={buttonBack} onClick={closeProfile} alt="button back" className={styles.icon}/>
                    <h2>Edit Profile</h2>
                    <img src={okayIcon} alt="okay icon" className={styles.icon}/>
                </header>
                <section>
                    <div className={styles.section_img}>
                        <img  src={addPhoto} alt="add photo"
                              style={{width: '50px', height: '50px'}}/>
                    </div>
                    <form className={styles.form}>
                        <label className={styles.form_label}>
                            <div>Name:</div>
                            <input className={styles.input} type="text" placeholder="Name"/>
                        </label>
                        <label className={styles.form_label}>
                            <div>Username:</div>
                            <input className={styles.input}  type="text" placeholder="@nickname"/>
                        </label>
                        <label className={styles.form_label}>
                            Bio:
                            <textarea className={styles.textarea} placeholder="Frontend developer from Yekaterinburg"/>
                        </label>
                    </form>
                </section>
            </div>
        </div>,
        document.getElementById('modal')
    );
};

export default ProfileModal;
