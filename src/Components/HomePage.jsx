import React from "react";
import './clouds.css';

const HomePage = ({ children }) => {
    return (
        <div className="relative">
            {/* Cloud-like animated background */}
            <div className="absolute inset-0 -z-10">
                <div className="cloud cloud-1 bg-pink-300 opacity-70 blur-3xl"></div>
                <div className="cloud cloud-2 bg-blue-300 opacity-70 blur-3xl"></div>
                <div className="cloud cloud-3 bg-purple-300 opacity-70 blur-3xl"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default HomePage;
