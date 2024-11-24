import HomePage from "./pages/HomePage/HomePage.jsx";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
  return (
    <>
        <HashRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/chat/chat1"/>}/>
                <Route path="/chat/:chatId" element={<HomePage/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </HashRouter>
    </>
  )
}

export default App
