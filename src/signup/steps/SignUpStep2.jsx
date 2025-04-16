import React, { useState } from "react";
import { useSignup } from "../SignUpContext";
import { useNavigate } from "react-router-dom";
import "../check.css";

const SignUpStep2 = () => {
    const { formData, updateFormData } = useSignup();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (formData.role === "influencer") {
            if (!formData.category) newErrors.category = "Category is required.";
            if (!formData.niche) newErrors.niche = "Niche is required.";
            if (!formData.reach || isNaN(formData.reach)) newErrors.reach = "Valid reach number is required.";
        } else if (formData.role === "sponsor") {
            if (!formData.company) newErrors.company = "Company name is required.";
            if (!formData.industry) newErrors.industry = "Industry is required.";
            if (!formData.budget || isNaN(formData.budget)) newErrors.budget = "Valid budget number is required.";
        }
        return newErrors;
    };

    const handleNext = () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            navigate("/signup/step3");
        } else {
            setErrors(validationErrors);
        }
    };

    const handleBack = () => {
        navigate("/signup/step1");
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Step 2: Profile Info</h2>

            {formData.role === "influencer" ? (
                <>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Category"
                            value={formData.category}
                            onChange={(e) => updateFormData({ category: e.target.value })}
                            className={`input ${errors.category ? 'input-error' : ''}`}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Niche"
                            value={formData.niche}
                            onChange={(e) => updateFormData({ niche: e.target.value })}
                            className={`input ${errors.niche ? 'input-error' : ''}`}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Reach"
                            value={formData.reach}
                            onChange={(e) => updateFormData({ reach: e.target.value })}
                            className={`input ${errors.reach ? 'input-error' : ''}`}
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Company"
                            value={formData.company}
                            onChange={(e) => updateFormData({ company: e.target.value })}
                            className={`input ${errors.company ? 'input-error' : ''}`}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Industry"
                            value={formData.industry}
                            onChange={(e) => updateFormData({ industry: e.target.value })}
                            className={`input ${errors.industry ? 'input-error' : ''}`}
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Budget"
                            value={formData.budget}
                            onChange={(e) => updateFormData({ budget: e.target.value })}
                            className={`input ${errors.budget ? 'input-error' : ''}`}
                        />
                    </div>
                </>
            )}

            <div className="flex justify-between mt-6">
                <button onClick={handleBack} className="btn btn-secondary">Back</button>
                <button onClick={handleNext} className="btn btn-primary">Next</button>
            </div>
        </div>
    );
};

export default SignUpStep2;
