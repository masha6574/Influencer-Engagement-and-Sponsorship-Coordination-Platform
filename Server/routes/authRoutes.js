const express = require("express");
const { register, login, authenticateJWT, getProfile } = require("../controllers/authController");

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateJWT, getProfile);

module.exports = router;
