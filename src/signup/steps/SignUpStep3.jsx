import React, { useState } from "react";
import { useSignup } from "../SignUpContext";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Added for redirect
import "../check.css";

const SignUpStep3 = () => {
    const { formData } = useSignup();
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // ✅ Initialize

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name || !formData.email || !formData.password || !formData.role) {
            newErrors.form = "Please complete all the fields.";
        }
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const res = await axios.post("http://localhost:2020/api/auth/register", formData);
                setStatus("✅ Registration successful!");

                // ✅ Redirect to success page after a short delay
                setTimeout(() => {
                    navigate("/signup-success");
                }, 0);
            } catch (err) {
                setStatus("❌ Registration failed. Please try again.");
                console.error(err);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Step 3: Review & Submit</h2>

            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Account Info</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div><strong>Name:</strong> {formData.name}</div>
                    <div><strong>Email:</strong> {formData.email}</div>
                    <div><strong>Password:</strong> {formData.password}</div>
                    <div><strong>Role:</strong> {formData.role}</div>
                </div>
            </div>

            {formData.role === "influencer" ? (
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Profile Info (Influencer)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div><strong>Category:</strong> {formData.category}</div>
                        <div><strong>Niche:</strong> {formData.niche}</div>
                        <div><strong>Reach:</strong> {formData.reach}</div>
                    </div>
                </div>
            ) : (
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Profile Info (Sponsor)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div><strong>Company:</strong> {formData.company}</div>
                        <div><strong>Industry:</strong> {formData.industry}</div>
                        <div><strong>Budget:</strong> {formData.budget}</div>
                    </div>
                </div>
            )}

            {status && <div className="mt-4 text-lg">{status}</div>}

            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </div>
    );
};

export default SignUpStep3;
