import React, { useState } from "react";
import axios from "axios";
import "./SponsorForm.css";

const SponsorForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [role, setRole] = useState("sponsor"); // Default role as 'sponsor'
  const [budget, setBudget] = useState(""); // New state for budget
  const [message, setMessage] = useState(""); // State for success or error message

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      role,
      company,
      industry,
      budget, // Include the budget in the data
    };

    try {
      const response = await axios.post(
        "http://localhost:2020/api/auth/register", // Adjust URL if needed
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Registration successful:", response.data);
      setMessage("Registration successful! Welcome aboard."); // Success message
      // You can handle success (redirect, show success message, etc.)
    } catch (error) {
      console.error("Error registering sponsor:", error.response?.data || error.message);
      setMessage("Error registering sponsor. Please try again."); // Error message
    }
  };

  return (
    <div className="form-container">
      <h2>Sponsor Registration</h2>
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
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="budget">Budget</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            min="0" // Ensure the budget is a non-negative number
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

export default SponsorForm;
