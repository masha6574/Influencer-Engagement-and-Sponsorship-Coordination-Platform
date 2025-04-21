// src/components/SignUpLayout.jsx (No Animations, Scroll Fix)
import React from 'react';
import { Outlet } from 'react-router-dom';
import './check.css'; // Ensure this path is correct or styles are global

const PlaceholderIcon = () => (
    <svg className="w-12 h-12 mb-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
    </svg>
);

const SignUpLayout = () => {
    return (
        // Root container: Minimum full screen height, flex layout
        <div className="flex w-full min-h-screen">

            {/* Left Decorative Column */}
            <div className="hidden lg:flex lg:w-1/3 bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white flex-col justify-center items-start space-y-12">
                {/* Feature sections */}
                <div className="text-left">
                    <h1 className="absolute top-[10%] left-[8%] text-4xl">Features</h1>
                </div>
                <div className="text-left">
                    <PlaceholderIcon />
                    <h2 className="absolute text-2xl font-semibold mb-2 top-[22%] left-[8%]">Feature One Title</h2>
                    <p className="text-blue-200">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                    </p>
                </div>
                <div className="text-left">
                    <PlaceholderIcon />
                    <h2 className="absolute text-2xl font-semibold mb-2 top-[44%] left-[8%]">Feature Two Title</h2>
                    <p className="text-blue-200">
                        Natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                    </p>
                </div>
                <div className="text-left">
                    <PlaceholderIcon />
                    <h2 className="absolute text-2xl font-semibold mb-2 top-[64%] left-[8%]">Feature Three Title</h2>
                    <p className="text-blue-200">
                        Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.
                    </p>
                </div>
            </div>

            {/* Right Content Column - NOW SCROLLABLE */}
            {/* Removed items-center, kept justify-center, Added overflow-y-auto */}
            <div className="w-full lg:w-2/3 flex justify-center p-6 md:p-12 py-12 bg-cloud-background overflow-y-auto">
                {/* ^^^^^^^^^^^^^^^^ Removed items-center */}
                {/* ^^^^^^^^^^^^^^ Added overflow-y-auto */}

                {/* Inner container for max-width */}
                {/* Content inside will now align to the top of the right column */}
                <div className="w-full max-w-lg">
                    {/* Outlet renders Step1, Step2, or Step3 */}
                    <Outlet />
                </div>

            </div> {/* End of Right Column */}
        </div> // End of Root Container
    );
};

export default SignUpLayout;