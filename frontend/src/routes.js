import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LoginPage } from "./pages/LoginPage";
import { AuthPage } from "./pages/AuthPage";

export function useRoutes(isLogin) {
    if (isLogin) {
        return (
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<AuthPage />} />
            <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
    )
}