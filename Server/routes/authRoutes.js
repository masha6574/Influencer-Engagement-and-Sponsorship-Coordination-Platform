const express = require("express");
const { register, login, authenticateJWT } = require("../controllers/authController");

const router = express.Router();

// Route to register a new user
router.post("/register", register);

// Route to login a user and get a JWT token
router.post("/login", login);

// Protected route example (requires JWT authentication)
router.get("/profile", authenticateJWT, (req, res) => {
  res.json({ message: "Protected user data", user: req.user });
});

module.exports = router;
