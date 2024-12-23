import React, { useRef, useState } from 'react';
import styles from './ChatInput.module.css';
import emojiIcon from '../../icons/emoji.png';
import addFileIcon from '../../icons/addFile.png';
import sendIcon from '../../icons/sendMsg.png';
import microIcon from '../../icons/micro.svg';
import delete_img from '../../icons/delete_img.png';
import microOnIcon from "../../icons/microOn.svg";
import { emojiList } from './emoji.js';
import { useParams } from 'react-router-dom';
import { apiFetch } from "../Api/updateToken.js";

const ChatInput = ({ onSendMessage }) => {
    const { chatId } = useParams();
    const textareaRef = useRef(null);
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null); // Для отображения записи

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (e) => {
                setAudioBlob(e.data);
                setAudioUrl(URL.createObjectURL(e.data)); // Создаем URL для прослушивания
            };
            mediaRecorder.start();
            setRecorder(mediaRecorder);
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (recorder) {
            recorder.stop();
            setIsRecording(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            setImage(file);
        } else {
            alert('Only images are allowed!');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleSubmit = async () => {
        if (!chatId) {
            alert("Chat ID is missing. Cannot send message.");
            return;
        }

        if (message.trim() === '' && !image && !audioBlob) return;

        const formData = new FormData();
        formData.append('chat', chatId);
        formData.append('text', message.trim() || '');
        if (image) {
            formData.append('files', image);
        }
        if (audioBlob) {
            formData.append('voice', audioBlob, 'voice_message.wav');
        }

        try {
            const response = await apiFetch('http://localhost:8080/api/messages/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const newMessage = await response.json();
                onSendMessage(newMessage);
                setMessage('');
                setImage(null);
                setAudioBlob(null);
                setAudioUrl(null); // Очищаем запись

                if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                }
            } else {
                const errorData = await response.json();
                console.error('Failed to send message:', errorData);
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const handleEmojiClick = (emoji) => {
        setMessage((prevMessage) => prevMessage + emoji);
        setEmojiPickerVisible(false);
    };

    return (
        <div>
            {isDragging && (
                <div
                    className={styles.drag_overlay}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                >
                    <p>Drop your image here</p>
                </div>
            )}
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div
                    className={`${styles.input_container} ${isDragging ? styles.dragging : ''}`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onDragLeave={handleDragLeave}
                >
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
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="preview"
                                    style={{ width: '100px', height: '100px' }}
                                />
                                <a onClick={() => setImage(null)}>
                                    <img className={styles.image_preview_delete} src={delete_img} alt="delete img" />
                                </a>
                            </div>
                        )}
                        {audioUrl && (
                            <div className={styles.audio_preview}>
                                <audio controls src={audioUrl}></audio>
                                <a onClick={() => setAudioUrl(null)}>
                                    <img className={styles.image_preview_delete} src={delete_img} alt="delete icon"/>
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
                    <button
                        type="button"
                        className={styles.mic_button}
                        onClick={isRecording ? stopRecording : startRecording}
                    >
                        <img
                            src={isRecording ? microOnIcon : microIcon}
                            alt="microphone"
                            style={{ width: '24px' }}
                            className={isRecording ? styles.recording : ''}
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput;
