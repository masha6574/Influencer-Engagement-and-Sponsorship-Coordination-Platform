// /SignUp/steps/SignUpStep1.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../SignUpContext";
import "../check.css";

const SignUpStep1 = () => {
    const { formData, updateFormData } = useSignup();
    const navigate = useNavigate();

    const handleNext = () => navigate("/signup/step2");

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Step 1: Account Info</h2>
            <input type="text" placeholder="Name" value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                className="input" />
            <input type="email" placeholder="Email" value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="input" />
            <input type="password" placeholder="Password" value={formData.password}
                onChange={(e) => updateFormData({ password: e.target.value })}
                className="input" />
            <select value={formData.role}
                onChange={(e) => updateFormData({ role: e.target.value })}
                className="input">
                <option value="">Choose Role</option>
                <option value="influencer">Influencer</option>
                <option value="sponsor">Sponsor</option>
            </select>
            <button onClick={handleNext} className="btn">Next</button>
        </div>
    );
};

export default SignUpStep1;
