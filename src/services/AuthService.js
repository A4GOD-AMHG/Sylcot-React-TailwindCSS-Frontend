import api from '@/services/api';

const AuthService = {
    login: async (credentials) => (await api.post('/auth/login', credentials)).data,
    register: async (userData) => (await api.post('/auth/register', userData)).data,
    forgotPassword: async (email) => (await api.post('/auth/forgot-password', { email })).data,
    // The backend expects the new password under `new_password`.
    resetPassword: async ({ token, password }) =>
        (await api.post('/auth/reset-password', { token, new_password: password })).data,
    verifyEmail: async (token) =>
        (await api.get('/auth/verify-email', { params: { token } })).data,
};

export default AuthService;
