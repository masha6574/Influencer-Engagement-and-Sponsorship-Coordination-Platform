/* eslint-disable no-unused-vars */
// /SignUp/steps/SignUpStep3.jsx
import React, { useState } from "react";
import { useSignup } from "../SignUpContext";
import axios from "axios";
import "../check.css";

const SignUpStep3 = () => {
    const { formData } = useSignup();
    const [status, setStatus] = useState("");

    const handleSubmit = async () => {
        try {
            const res = await axios.post("http://localhost:2020/api/auth/register", formData);
            setStatus("✅ Registration successful!");
        } catch (err) {
            setStatus("❌ Registration failed.");
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Step 3: Review & Submit</h2>
            <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(formData, null, 2)}</pre>
            <button onClick={handleSubmit} className="btn mt-4">Submit</button>
            {status && <p className="mt-4 text-center">{status}</p>}
        </div>
    );
};

export default SignUpStep3;
