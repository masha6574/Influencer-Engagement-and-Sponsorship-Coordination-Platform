/* eslint-disable no-unused-vars */
// SignUpStep1.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../SignUpContext";
import "../check.css";

const SignUpStep1 = () => {
    const { formData, updateFormData } = useSignup();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        if (!formData.role) newErrors.role = "Role (Influencer or Sponsor) is required.";
        return newErrors;
    };

    const handleNext = () => {
        setIsSubmitted(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            navigate("/signup/step2");
        } else {
            setErrors(validationErrors);
        }
    };

    const handleBack = () => {
        navigate("/"); // Redirect to home or previous page if needed
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Step 1: Account Info</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    className={`input ${errors.name ? 'input-error' : ''}`}
                />
            </div>

            <div className="mb-4">
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className={`input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (
                    <p className="error-message">{errors.email}</p>
                )}
            </div>

            <div className="mb-4">
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => updateFormData({ password: e.target.value })}
                    className={`input ${errors.password ? 'input-error' : ''}`}
                />
            </div>

            <div className="mb-4">
                <select
                    value={formData.role}
                    onChange={(e) => updateFormData({ role: e.target.value })}
                    className={`input ${errors.role ? 'input-error' : ''}`}
                >
                    <option value="">Choose Role</option>
                    <option value="influencer">Influencer</option>
                    <option value="sponsor">Sponsor</option>
                </select>
            </div>

            <div className="flex justify-between mt-6">
                <button onClick={handleBack} className="btn btn-secondary">Back</button>
                <button onClick={handleNext} className="btn btn-primary">Next</button>
            </div>
        </div>
    );
};

export default SignUpStep1;
