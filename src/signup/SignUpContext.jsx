// /signup/SignupContext.jsx
import React, { createContext, useState, useContext } from "react";
import "./check.css";
const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", role: "",
        category: "", niche: "", reach: "", company: "", industry: "", budget: ""
    });

    const updateFormData = (updates) => {
        setFormData((prev) => ({ ...prev, ...updates }));
    };

    return (
        <SignUpContext.Provider value={{ formData, updateFormData }}>
            {children}
        </SignUpContext.Provider>
    );
};

export const useSignup = () => useContext(SignUpContext);
