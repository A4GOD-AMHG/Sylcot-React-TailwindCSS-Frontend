import { Link } from 'react-router-dom';

export const PageNotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="flex justify-center">
                    <img src="/not-found.svg" alt="Page not found" />
                </div>
                <div>
                    <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
                    <h2 className="text-3xl font-medium text-gray-800 dark:text-white mb-8">
                        Page not Found
                    </h2>
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-xl font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};