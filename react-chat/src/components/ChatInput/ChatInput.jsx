import React, { useRef, useState } from 'react';
import styles from './ChatInput.module.css';
import emojiIcon from '../../icons/emoji.png';
import addFileIcon from '../../icons/addFile.png';
import sendIcon from '../../icons/sendMsg.png';
import delete_img from '../../icons/delete_img.png';
import {emojiList} from "./emoji.js";

const ChatInput = ({ onSendMessage, senderName }) => {
    const textareaRef = useRef(null);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleSubmit = () => {
        if (message.trim() === '' && !image) return;

        const newMessage = {
            sender: senderName || 'Я',
            content: message.trim(),
            timestamp: new Date().toISOString(),
            id: Date.now(),
            image: image,
            imageName: imageName
        };

        onSendMessage(newMessage);
        setMessage('');
        setImage(null);
        setImageName('');

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setImageName(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEmojiClick = (emoji) => {
        setMessage(prevMessage => prevMessage + emoji);
        setEmojiPickerVisible(false);
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.input_container}>
                <div className={styles.emoji_icon}>
                    <img
                        src={emojiIcon}
                        alt="emoji"
                        style={{ width: '24px' }}
                        onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
                    />
                </div>
                {emojiPickerVisible && (
                    <div className={styles.emoji_picker}>
                        {emojiList.map((emoji, index) => (
                            <span
                                key={index}
                                className={styles.emoji_item}
                                onClick={() => handleEmojiClick(emoji)}
                            >
                                {emoji}
                            </span>
                        ))}
                    </div>
                )}
                <div className="textarea-container">
                    {image && (
                        <div>
                            <img src={image} alt="preview" style={{ width: '100px', height: '100px' }} />
                            <a onClick={() => setImage(null)}>
                                <img className={styles.image_preview_delete} src={delete_img} alt="delete img" />
                            </a>
                        </div>
                    )}
                    <textarea
                        ref={textareaRef}
                        className={styles.form_input}
                        name="message-text"
                        placeholder="Написать сообщение"
                        rows="1"
                        value={message}
                        onInput={handleInput}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className={styles.emoji_icon}>
                    <label htmlFor="file_upload" className="file-upload-label">
                        <div className={styles.upload_icon}>
                            <img src={addFileIcon} alt="addFileIcon" style={{ width: '24px' }} />
                        </div>
                    </label>
                    <input
                        type="file"
                        id="file_upload"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
                <button
                    type="button"
                    className={styles.btn_send_msg}
                    onClick={handleSubmit}
                >
                    <img src={sendIcon} style={{ width: '24px' }} alt="send icon" />
                </button>
            </div>
        </form>
    );
};

export default ChatInput;
