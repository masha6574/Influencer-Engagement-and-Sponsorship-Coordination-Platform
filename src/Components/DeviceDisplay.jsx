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
        <div className="relative w-full min-h-screen overflow-x-hidden">
            {/* Cloud Background */}
            {/* <HomePage /> */}

            <div className="relative z-10 w-full">
                {/* Navbar */}
                <Navbar />

                {/* Top Heading */}
                <div className="text-center text-4xl font-bold mt-30 mb-4 text-gray-800">
                    Connecting Brands with Influencers, Empowering Seamless Campaigns.
                </div>

                {/* Devices Section */}
                <div className="relative flex justify-center items-end mt-16 mb-24">
                    <div
                        className={`relative w-[480px] h-[300px] bg-gray-800 rounded-lg shadow-lg transition-all duration-1000 ease-in-out ${isHovered ? "scale-105" : "scale-50"
                            }`}
                    >
                        <img
                            src="/assets/laptop_test_img.png"
                            alt="Laptop Screen"
                            className="w-full h-full object-cover rounded-lg"
                        />

                        {/* Phone Overlay (left) */}
                        <div
                            className={`absolute -bottom-20 -left-28 w-[160px] h-[280px] bg-black rounded-[40px] shadow-2xl border-4 border-gray-700 flex items-center justify-center transition-all duration-1000 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <img
                                src="/assets/Phone_test_img.jpg"
                                alt="Phone Screen"
                                className="w-full h-full object-cover rounded-[40px]"
                            />
                        </div>

                        {/* Tab Overlay (right) */}
                        <div
                            className={`absolute -bottom-20 -right-35 w-[320px] h-[260px] bg-white rounded-[30px] shadow-2xl border-4 border-gray-300 flex items-center justify-center transition-all duration-1000 ease-in-out ${isHovered ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <img
                                src="/assets/Tab_test_img.jpg"
                                alt="Tab Screen"
                                className="w-full h-full object-cover rounded-[30px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="px-4">
                    <Card />
                </div>
            </div>
        </div>
    );
};

export default DevicesDisplay;
