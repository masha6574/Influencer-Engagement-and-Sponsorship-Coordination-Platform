import React, { useState } from "react";
import axios from "axios";
import './LoginForm.css';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null); // To store user info after login

  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASSWORD = "admin123";

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check for hardcoded admin credentials first
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setMessage("Admin login successful!");

      const adminProfile = {
        name: "Admin",
        email: ADMIN_EMAIL,
        role: "admin",
      };

      localStorage.setItem("token", "admin-token"); // Simulated token
      setProfile(adminProfile);
      navigate("/admin-dashboard");
      return;
    }

    // Normal user login via API
    try {
      const response = await axios.post("http://localhost:2020/api/auth/login", {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token); // Store token

      setMessage("Login successful!");

      console.log("Token: ", token);

      // Fetch profile after login using token
      const profileResponse = await axios.get("http://localhost:2020/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(profileResponse.data.user); // set user info
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Invalid login. Please check your credentials.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {message && <p className="message">{message}</p>}

      {profile && (
        <div className="profile">
          <h3>Welcome, {profile.name}</h3>
          <p>Email: {profile.email}</p>
          <p>Role: {profile.role}</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
