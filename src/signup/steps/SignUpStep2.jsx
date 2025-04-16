// /SignUp/steps/SignUpStep2.jsx
import React from "react";
import { useSignup } from "../SignUpContext";
import { useNavigate } from "react-router-dom";
import "../check.css";

const SignUpStep2 = () => {
    const { formData, updateFormData } = useSignup();
    const navigate = useNavigate();

    const handleNext = () => navigate("/signup/step3");

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Step 2: Profile Info</h2>
            {formData.role === "influencer" ? (
                <>
                    <input type="text" placeholder="Category" value={formData.category}
                        onChange={(e) => updateFormData({ category: e.target.value })} className="input" />
                    <input type="text" placeholder="Niche" value={formData.niche}
                        onChange={(e) => updateFormData({ niche: e.target.value })} className="input" />
                    <input type="number" placeholder="Reach" value={formData.reach}
                        onChange={(e) => updateFormData({ reach: e.target.value })} className="input" />
                </>
            ) : (
                <>
                    <input type="text" placeholder="Company" value={formData.company}
                        onChange={(e) => updateFormData({ company: e.target.value })} className="input" />
                    <input type="text" placeholder="Industry" value={formData.industry}
                        onChange={(e) => updateFormData({ industry: e.target.value })} className="input" />
                    <input type="number" placeholder="Budget" value={formData.budget}
                        onChange={(e) => updateFormData({ budget: e.target.value })} className="input" />
                </>
            )}
            <button onClick={handleNext} className="btn">Next</button>
        </div>
    );
};

export default SignUpStep2;
