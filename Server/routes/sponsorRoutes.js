// Server/routes/sponsorRoutes.js
const express = require('express');
const { getMySponsorDetails } = require('../controllers/SponsorController');
const { authenticateJWT } = require('../controllers/authController');

const router = express.Router();

router.get('/details', authenticateJWT, getMySponsorDetails);  // Apply middleware here

module.exports = router;
