import {Route, Routes} from "react-router-dom";
import HomePage from "../components/HomePage/HomePage.tsx";
import HistoryPage from "../components/HistoryPage/HistoryPage.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/history" element={<HistoryPage />} />
        </Routes>
    );
};

export default App;
