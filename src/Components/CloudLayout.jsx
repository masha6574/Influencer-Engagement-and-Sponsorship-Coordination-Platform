// src/Components/CloudLayout.jsx
import React from "react";
import "../Components/clouds.css"; // make sure this path is correct

const CloudLayout = ({ children }) => {
    return (
        <div className="relative w-screen min-h-screen overflow-x-hidden">
            {/* Background Clouds */}
            <div className="clouds-container fixed top-0 left-0 w-full h-full z-0">
                <div className="cloud cloud-1"></div>
                <div className="cloud cloud-2"></div>
                <div className="cloud cloud-3"></div>
                <div className="cloud cloud-4"></div>
                <div className="cloud cloud-5"></div>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
export default CloudLayout;
