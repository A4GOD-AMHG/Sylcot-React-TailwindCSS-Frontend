import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_GO_GIN_BACKEND,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Keep the session alive with the token the backend sends near expiry,
// and turn every failure into an Error carrying the API's { error } message.
api.interceptors.response.use(
    response => {
        const refreshed = response.headers['x-refresh-token'];
        if (refreshed) localStorage.setItem('token', refreshed);
        return response;
    },
    error => {
        // Expired/invalid session on a protected route: drop it and go back to login.
        if (error.response?.status === 401 && !error.config?.url?.startsWith('/auth')) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.assign('/auth/login');
        }
        return Promise.reject(new Error(
        error.response?.data?.error || (error.response ? 'Unexpected server error' : 'Cannot reach the server')
        ));
    }
);

export default api;
