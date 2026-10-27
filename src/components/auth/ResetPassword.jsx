import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';


export const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword({ token, password });
            setIsSubmitted(true);
        } catch {
            // resetPassword() already shows the error toast
        }
    };

    if (!token) {
        return (
            <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-md p-8 w-full max-w-md text-center space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Invalid reset link</h2>
                <Link to="/auth/forgot-password" className="button inline-block">Request a new link</Link>
            </div>
        );
    }
    return (
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
                {isSubmitted ? 'Password Updated' : 'Reset Password'}
            </h2>

            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 dark:text-white mb-2">New password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="custom-input"
                            minLength={8}
                            autoComplete="new-password"
                            required
                        />
                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            At least 8 characters with an uppercase, a lowercase, a number and a symbol.
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Update Password
                    </button>
                </form>
            ) : (
                <div className="text-center space-y-6">
                    <div className="flex justify-center text-green-500">
                        <FiCheckCircle className="w-12 h-12" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                        Your password has been changed. You can now sign in.
                    </p>
                    <Link
                        to="/auth/login"
                        className="inline-block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Go to Login
                    </Link>
                </div>
            )}

            {!isSubmitted && (
                <p className="text-gray-600 dark:text-gray-300 text-center mt-6">
                    Remember your password?{' '}
                    <Link to="/auth/login" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            )}
        </div>
    );
};