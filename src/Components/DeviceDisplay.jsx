import { useState, useEffect } from "react";
import Card from "./Card";
import Navbar from "./Navbar";
const DevicesDisplay = () => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {

        // This effect will trigger after the component has mounted
        const timer = setTimeout(() => {
            setIsHovered(true); // Trigger transition after the component is mounted
        }, 100); // Set a small delay (100ms) to ensure transition is visible

        return () => clearTimeout(timer); // Clean up timer on unmount
    }, []);

    return (
        <div>
            <Navbar />
            <div className="relative">
                {/* Laptop */}
                <div className={`absolute top-0 left-[35%] w-198 h-120 bg-gray-800 rounded-lg shadow-lg transition-all duration-1000 ease-in-out ${isHovered ? "scale-105" : "scale-50"}`}>
                    <div className="absolute top-2 left-2 text-white text-sm">
                        {/* Image added here */}
                        <img src="/assets/laptop_test_img.png" alt="Laptop Screen" className="w-full h-full object-cover rounded-lg" />
                    </div>

                    {/* Phone Overlaying the Laptop */}
                    <div className={`absolute bottom-[-80px] left-[-120px] w-62 h-118 bg-black rounded-[40px] shadow-[2xl] border-4 border-gray-700 flex items-center justify-center transition-all duration-1000 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"}`}>
                        <img src="/assets/Phone_test_img.jpg" alt="Phone Screen" className="w-full h-full object-cover rounded-[40px]" />
                    </div>
                </div>

            </div>
            <div className="absolute top-[120%] overflow-x-hidden">
                <Card />
            </div>
        </div>
    );
};

export default DevicesDisplay;
