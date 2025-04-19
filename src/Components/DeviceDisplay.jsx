import { useState, useEffect } from "react";
import HomePage from "./HomePage";
import Card from "./Card";
import Navbar from "./Navbar";

const DevicesDisplay = () => {
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsHovered(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative">
            {/* Cloud Background behind everything */}
            <HomePage />

            {/* Content should be ABOVE the background */}
            <div className="relative z-10">
                <Navbar />

                <div className="relative">
                    {/* Laptop */}
                    <div
                        className={`absolute top-0 left-[35%] w-198 h-120 bg-gray-800 rounded-lg shadow-lg transition-all duration-1000 ease-in-out ${isHovered ? "scale-105" : "scale-50"
                            }`}
                    >
                        <div className="absolute top-2 left-2 text-white text-sm">
                            <img
                                src="/assets/laptop_test_img.png"
                                alt="Laptop Screen"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        {/* Phone Overlay */}
                        <div
                            className={`absolute bottom-[-80px] left-[-120px] w-62 h-118 bg-black rounded-[40px] shadow-[2xl] border-4 border-gray-700 flex items-center justify-center transition-all duration-1000 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <img
                                src="/assets/Phone_test_img.jpg"
                                alt="Phone Screen"
                                className="w-full h-full object-cover rounded-[40px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="absolute top-[120%] overflow-x-hidden">
                    <Card />
                </div>
            </div>
        </div>
    );
};

export default DevicesDisplay;
