"use client"
import React from 'react';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-600">Oops! Authentication Failed.</h1>
            <button
                onClick={() => window.location.replace("/auth/login")}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Try Again
            </button>
        </div>
    );
};

export default ErrorPage;
