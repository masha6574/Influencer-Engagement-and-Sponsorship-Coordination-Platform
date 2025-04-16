/* eslint-disable no-unused-vars */
// /signup/SignUpLayout.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./check.css";

const SignUpLayout = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -200, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
            >
                <Outlet />
            </motion.div>
        </AnimatePresence>
    );
};

export default SignUpLayout;
