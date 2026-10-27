import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';
import useTheme from '@/hooks/useTheme';
import { useAuth } from '@/context/AuthContext';

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setIsShowPassword] = useState(false);
    const { toggleTheme, isDark } = useTheme();
    const [showConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();
    const [error, setError] = useState('');

    const handleShowPassword = () => setIsShowPassword(!showPassword);
    const handleShowConfirmPassword = () => setIsShowConfirmPassword(!showConfirmPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!name) {
                setError('Name is required');
                return;
            }
            if (!email || !password) {
                setError('Email and password are required');
                return;
            }
            if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
                setError('Password must be at least 8 characters long, a capital letter, a number, and a special character');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            setError('');
            await register({ name, email, password });
            // The account must be verified by email before logging in.
            navigate('/auth/login');
        } catch {
            // register() already shows the error toast
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-8">
            <div className='flex justify-between mb-6'>
                <button
                    onClick={() => navigate("/")}
                    className="cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">Create Account</h2>
                <button
                    onClick={toggleTheme}
                    className="h-min p-2 rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                    {isDark ? (
                        <FiSun className="w-5 h-5 text-gray-800 dark:text-white" />
                    ) : (
                        <FiMoon className="w-5 h-5 text-gray-800 dark:text-white" />
                    )}
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 dark:text-white mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="custom-input"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-white mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input"
                        required
                    />
                </div>
                <div className='relative'>
                    <label className="block text-gray-700 dark:text-white mb-2">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="custom-input"
                        required
                    />
                    <button
                        type="button"
                        onClick={handleShowPassword}
                        className="absolute right-2 cursor-pointer bottom-2 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        {showPassword ? (
                            <FiEyeOff className="w-5 h-5" />
                        ) : (
                            <FiEye className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <div className='relative'>
                    <label className="block text-gray-700 dark:text-white mb-2">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="custom-input"
                        required
                    />
                    <button
                        type="button"
                        onClick={handleShowConfirmPassword}
                        className="absolute right-2 cursor-pointer bottom-2 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        {showConfirmPassword ? (
                            <FiEyeOff className="w-5 h-5" />
                        ) : (
                            <FiEye className="w-5 h-5" />
                        )}
                    </button>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                    type="submit"
                    className="button"
                >
                    Register
                </button>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                    Already have an account?{' '}
                    <Link to="/auth/login" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
};