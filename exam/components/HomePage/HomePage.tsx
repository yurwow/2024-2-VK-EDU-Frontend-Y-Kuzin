import { FC, useState } from "react";
import {Link} from "react-router-dom";
import switchIcon from "../../public/switch.svg";
import styles from "./HomePage.module.css";
import axios from "axios";
import { useAppDispatch } from "../Store/store.ts";
import { addTranslation } from "../Store/store.ts";

interface ITrasn {
    from: string;
    to: string;
    input: string;
    output: string;
}

const HomePage: FC = () => {
    const [inputText, setInputText] = useState<string>("");
    const [outputText, setOutputText] = useState<string>("");
    const [fromLanguage, setFromLanguage] = useState<string>("ru");
    const [toLanguage, setToLanguage] = useState<string>("en");
    const dispatch = useAppDispatch();

    const saveToLocalStorage = (translation: ITrasn) => {
        const savedHistory = localStorage.getItem("history");
        const history = savedHistory ? JSON.parse(savedHistory) : [];
        history.push(translation);
        localStorage.setItem("history", JSON.stringify(history));
    };

    const handleSwapLanguages = () => {
        const temp = fromLanguage;
        setFromLanguage(toLanguage);
        setToLanguage(temp);
        setInputText(outputText);
        setOutputText(inputText);
    };

    const handleTranslate = async () => {
        try {
            const response = await axios.get(
                "https://api.mymemory.translated.net/get",
                {
                    params: {
                        q: inputText,
                        langpair: `${fromLanguage}|${toLanguage}`,
                    },
                }
            );

            const translatedText = response.data.responseData.translatedText;
            setOutputText(translatedText);

            const newTranslation = {
                from: fromLanguage,
                to: toLanguage,
                input: inputText,
                output: translatedText,
            };

            dispatch(addTranslation(newTranslation));

            saveToLocalStorage(newTranslation);
        } catch (error) {
            console.log("Ошибка", error);
            setOutputText("Ошибка");
        }
    };

    return (
        <>
            <div className={styles.link}>
                <Link to="/history">История</Link>
            </div>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Exam</h1>
                </header>
                <div className={styles.content}>
                    <div className={styles.translator}>
                        <div className={styles.languageSelector}>
                            <select
                                value={fromLanguage}
                                onChange={(e) => setFromLanguage(e.target.value)}>
                                <option value="Autodetect">DETECT LANGUAGE</option>
                                <option value="ru">RUSSIAN</option>
                                <option value="en">ENGLISH</option>
                                <option value="es">SPANISH</option>
                            </select>
                        </div>
                        <div className={styles.textArea}>
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Text..."
                            ></textarea>
                        </div>
                        <button className={styles.btn} onClick={handleTranslate}>
                            Translate
                        </button>
                        <div className={styles.swapButton} onClick={handleSwapLanguages}>
                            <img src={switchIcon} alt="switch icon" />
                        </div>
                        <div className={styles.languageSelector}>
                            <select
                                value={toLanguage}
                                onChange={(e) => setToLanguage(e.target.value)}>
                                <option value="ru">RUSSIAN</option>
                                <option value="en">ENGLISH</option>
                                <option value="es">SPANISH</option>
                            </select>
                        </div>
                        <div className={styles.textArea}>
                            <div>{outputText || "Translation"}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
