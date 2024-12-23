import HomePage from "./pages/HomePage/HomePage.jsx";
import {BrowserRouter, HashRouter, Navigate, Route, Routes} from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound.jsx";
import RegistrationPage from "./components/RegisterPage/RegistrationPage.jsx";
import AuthPage from "./components/LoginPage/AuthPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/chat/chat1"/>}/>
                <Route
                    path="/chat/:chatId"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route path='/register' element={<RegistrationPage/>}/>
                <Route path='/login' element={<AuthPage/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
