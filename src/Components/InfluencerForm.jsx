import React, { useState } from "react";
import axios from "axios";
import "./InfluencerForm.css";

const InfluencerForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("");
    const [niche, setNiche] = useState("");
    const [reach, setReach] = useState("");
    const [role, setRole] = useState("influencer"); // Default role as 'influencer'
    const [message, setMessage] = useState(""); // State for success or error message

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        const maxReach = 1000000000; // Adjust this limit based on your DB schema (e.g. INT)

        if (!Number.isInteger(Number(reach)) || Number(reach) < 0 || Number(reach) > maxReach) {
            setMessage(`Reach must be a number between 0 and ${maxReach.toLocaleString()}`);
            return;
        }

        const data = {
            name,
            email,
            password,
            role,
            category,
            niche,
            reach,
        };

        try {
            const response = await axios.post(
                "http://localhost:2020/api/auth/register",
                data,
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Registration successful:", response.data);
            setMessage("Registration successful! Welcome aboard as an Influencer.");
        } catch (error) {
            console.error("Error registering influencer:", error.response?.data || error.message);
            setMessage("Error registering influencer. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <h2>Influencer Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="niche">Niche</label>
                    <input
                        type="text"
                        id="niche"
                        value={niche}
                        onChange={(e) => setNiche(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reach">Reach</label>
                    <input
                        type="number"
                        id="reach"
                        value={reach}
                        onChange={(e) => setReach(e.target.value)}
                        required
                        min="0"
                        max="1000000000"
                    />
                </div>
                <button type="submit">Register</button>
            </form>

            {/* Display success or error message */}
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default InfluencerForm;
