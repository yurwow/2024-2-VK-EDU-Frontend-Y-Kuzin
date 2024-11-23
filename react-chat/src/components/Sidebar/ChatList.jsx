import styles from './ChatList.module.css';
import accountImage from '../../icons/account.png'
import doneAllImage from '../../icons/done_all.png'

const ChatList = () => {


    return (
        <div className={styles.chat_list}>
            <img src={accountImage} alt="account image" className={styles.icon_profile}/>
            <div className={styles.chat_profile}>
                <span className={styles.nickname} title="Nickname Nickname Nickname Nickname Nickname">Nickname</span>
                <div className={styles.last_message}></div>
            </div>
            <div className={styles.sidebar_message_time_container}>
                <span className={styles.sidebar_message_time}></span>
                <img src={doneAllImage} alt="done all" style={{width: '16px'}}/>
            </div>
        </div>
    );
};

export default ChatList;
