import React from "react";
import { Link } from "react-router-dom";

const SignupSuccess = () => {
    return (
        <div className="w-full p-8 md:p-10 rounded-xl shadow-lg bg-white bg-opacity-90 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Signup Successful!</h1>
            <p className="text-lg text-gray-600 mb-6">
                Welcome to the platform! You can now log in or go back to the homepage.
            </p>
            <div className="flex justify-center space-x-4">
                <Link
                    to="/"
                    className="btn-secondary px-4 py-2 text-sm font-medium rounded disabled:opacity-50"
                >
                    Go to Home
                </Link>
                <Link
                    to="/login"
                    className="btn-submit px-4 py-2 text-sm font-medium rounded disabled:opacity-50"
                >
                    Go to Login
                </Link>
            </div>
        </div>
    );
};

export default SignupSuccess;
