import {FC} from "react";
import {clearHistory, useAppDispatch, useAppSelector} from "../Store/store";
import { Link } from "react-router-dom";
import styles from "./HistoryPage.module.css";

const HistoryPage: FC = () => {
    const history = useAppSelector((state) => state.translation.history);

    const dispatch = useAppDispatch();
    const handleClearHistory = () => {
        dispatch(clearHistory());
    };

    return (
        <>
            <div className={styles.header_container}>
                <button onClick={handleClearHistory} className={styles.clearButton}>
                    Очистить историю
                </button>
                <Link to="/">Назад</Link>
            </div>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>История переводов</h1>
                </div>
                <div className={styles.historyList}>
                    {history.length > 0 ? (
                        history.map((item, index) => (
                            <div key={index} className={styles.historyItem}>
                                <div>From {item.from}: {item.input}</div>
                                <div>To {item.to}: {item.output}</div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.div}>История пуста</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default HistoryPage;
