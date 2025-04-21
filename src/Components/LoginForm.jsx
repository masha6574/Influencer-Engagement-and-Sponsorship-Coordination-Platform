import React, { useState } from "react";
import axios from "axios";
import './LoginForm.css';
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../login-animation.json"; // Ensure the animation file is in src

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);

  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASSWORD = "admin123";

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Admin check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setMessage("Admin login successful!");
      const adminProfile = {
        name: "Admin",
        email: ADMIN_EMAIL,
        role: "admin",
      };
      localStorage.setItem("token", "admin-token");
      setProfile(adminProfile);
      navigate("/admin-dashboard");
      return;
    }

    // Sponsor/Influencer login
    try {
      const response = await axios.post("http://localhost:2020/api/auth/login", {
        email,
        password,
      });
  
      const { token } = response.data;
      localStorage.setItem("token", token);
      setMessage("Login successful!");

      const profileResponse = await axios.get("http://localhost:2020/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = profileResponse.data.user;
      setProfile(user);

      // Redirect based on role
      if (user.role === "sponsor") {
        navigate("/sponsor-dashboard/home");
      } else if (user.role === "influencer") {
        navigate("/influencer/dashboard"); // Update this to actual influencer dashboard route
      } else {
        navigate("/login");
      }

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Invalid login. Please check your credentials.");
    }
  };
  

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <Lottie animationData={loginAnimation} loop={true} className="lottie-animation" />
      </div>

      <div className="login-right">
        <div className="form-container">
          <h2>Welcome Back 👋</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="primary-btn">Login</button>
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
      </div>
    </div>
  );
};

export default LoginForm;
