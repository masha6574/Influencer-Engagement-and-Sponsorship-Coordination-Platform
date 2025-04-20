import React from "react";
import { Link } from "react-router-dom";

const SignupSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-6">🎉 Signup Successful!</h1>
            <p className="text-lg mb-8">Welcome to the platform! You can now log in or go back to the homepage.</p>
            <div className="space-x-4">
                <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Go to Home
                </Link>
                <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                    Go to Login
                </Link>
            </div>
        </div>
    );
};

export default SignupSuccess;
