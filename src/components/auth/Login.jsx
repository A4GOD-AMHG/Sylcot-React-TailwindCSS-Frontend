import { useState } from 'react';
import { FiSun, FiMoon, FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useTheme from '@/hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setIsShowPassword] = useState(false);
    const { toggleTheme, isDark } = useTheme();
    const navigate = useNavigate();
    const { login } = useAuth()

    const handleShowPassword = () => setIsShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch {
            // login() already shows the error toast
        }
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-8">
            <div className='flex items-center justify-between mb-6'>
                <button
                    onClick={() => navigate("/")}
                    className="cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    <FiArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
                </button>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">Welcome to Sylcot</h2>
                <button
                    onClick={toggleTheme}
                    className="h-min p-2 rounded-lg cursor-pointer bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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
                    <label className="block text-gray-700 dark:text-white mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input"
                        required
                    />
                </div>
                <div className="relative">
                    <label className="block text-gray-700 dark:text-white mb-2">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10 custom-input"
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
                <button
                    type="submit"
                    className="button"
                >
                    Sign In
                </button>
                <div className="text-center space-y-4">
                    <Link to="/auth/forgot-password" className="text-md text-blue-600 font-medium hover:underline block">
                        Forgot Password?
                    </Link>
                    <p className="text-gray-600 font-medium dark:text-gray-300">
                        Don't have an account?{' '}
                        <Link to="/auth/register" className="text-blue-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};