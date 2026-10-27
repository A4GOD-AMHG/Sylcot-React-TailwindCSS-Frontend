import { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const { verifyEmail } = useAuth();
    const [isVerifying, setIsVerifying] = useState(true);
    const [error, setError] = useState('');

    const token = searchParams.get('token');
    // The token is single-use: StrictMode's double effect run would make the second call fail.
    const requested = useRef(false);

    useEffect(() => {
        if (requested.current) return;
        requested.current = true;

        if (!token) {
            setError('Invalid verification link');
            setIsVerifying(false);
            return;
        }

        const verify = async () => {
            try {
                await verifyEmail(token);
            } catch (err) {
                setError(err.message || 'Failed to verify email');
            } finally {
                setIsVerifying(false);
            }
        };

        verify();
    }, [token, verifyEmail]);

    if (isVerifying) {
        return (
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8 text-center">
                <div className="mb-6">
                    <svg
                        className="w-16 h-16 text-blue-500 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                    Verifying Your Email...
                </h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8 text-center">
                <div className="mb-6 text-red-500">
                    <svg
                        className="w-16 h-16 mx-auto"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{error}</h2>
                <Link
                    to="/auth/login"
                    className="button px-2"
                >
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8 text-center">
            <div className="mb-6 text-green-500">
                <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Email Verified Successfully!
            </h2>
            <Link
                to="/auth/login"
                className="button px-2"
            >
                Go to Login
            </Link>
        </div>
    );
};