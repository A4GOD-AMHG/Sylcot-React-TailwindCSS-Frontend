import { useCallback, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import AuthService from '@/services/AuthService';
import { notifyError, notifySuccess } from '@/utils/toast';

const readStoredUser = () => {
    try {
        return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('user')) : null;
    } catch {
        return null;
    }
};

// Each action notifies the user and rethrows so pages can decide what to do next (navigate, show form state...).
const withToast = async (action, successMessage) => {
    try {
        const data = await action();
        notifySuccess(successMessage ?? data?.message);
        return data;
    } catch (error) {
        notifyError(error.message);
        throw error;
    }
};

const AuthProvider = ({ children }) => {
    // Restored from localStorage so a page reload keeps the session.
    const [user, setUser] = useState(readStoredUser);

    const login = async (credentials) => {
        const data = await withToast(() => AuthService.login(credentials), 'Welcome back!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return data;
    };

    const register = (userData) => withToast(() => AuthService.register(userData));

    const verifyEmail = useCallback((token) => withToast(() => AuthService.verifyEmail(token)), []);

    const forgotPassword = (email) => withToast(() => AuthService.forgotPassword(email));

    const resetPassword = (data) => withToast(() => AuthService.resetPassword(data));

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        notifySuccess('Logged out');
    };

    const value = {
        user,
        login,
        register,
        verifyEmail,
        resetPassword,
        forgotPassword,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
