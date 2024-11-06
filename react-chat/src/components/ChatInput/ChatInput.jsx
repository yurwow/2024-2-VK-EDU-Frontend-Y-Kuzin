import React from 'react';
import styles from './ChatInput.module.css';
import emojiIcon from '../../icons/emoji.png';
import addFileIcon from '../../icons/addFile.png';
import sendIcon from '../../icons/sendMsg.png';

const ChatInput = () => {
    return (
        <>
            <form className={styles.form} action="/">
                <div className={styles.input_container}>
                    <div className={styles.emoji_icon}>
                        <img src={emojiIcon} alt="emoji" style={{width: '24px'}}/>
                    </div>
                    <div className="textarea-container">
                        <textarea className={styles.form_input} name="message-text" placeholder="Написать сообщение"
                                  rows="1"></textarea>
                        <div id="image-preview"></div>
                    </div>
                    <div className={styles.emoji_icon}>
                        <label htmlFor="file_upload" className="file-upload-label">
                            <div className={styles.upload_icon}>
                                <img src={addFileIcon} alt="addFileIcon" style={{width: '24px'}}/>
                            </div>
                        </label>
                        <input type="file" id="file_upload" accept="image/*" style={{display: "none"}}/>
                    </div>
                    <button className={styles.btn_send_msg}>
                        <img src={sendIcon} style={{width:'24px'}}/>
                    </button>
                </div>
            </form>
        </>
    );
};

export default ChatInput;
