// src/Components/CloudLayout.jsx
import React from "react";
import "../Components/clouds.css"; // make sure this path is correct

const CloudLayout = ({ children }) => {
    return (
        <div className="relative w-screen h-screen">
            {/* Background Clouds */}
            <div class="clouds-container">
                <div class="cloud cloud-1"></div>
                <div class="cloud cloud-2"></div>
                <div class="cloud cloud-3"></div>
                <div class="cloud cloud-4"></div>
                <div class="cloud cloud-5"></div>
            </div>


            {/* Foreground Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default CloudLayout;
