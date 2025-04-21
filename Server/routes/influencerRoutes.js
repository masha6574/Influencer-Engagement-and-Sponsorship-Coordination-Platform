const express = require('express');
const router = express.Router();

const { getProfile, updateProfile, getPublicCampaigns, acceptCampaign, getAdRequests, handleAdRequest } = require('../controllers/influencerController');
const { authenticateJWT } = require('../controllers/authController');


router.get('/profile', authenticateJWT, getProfile);

router.put('/profile', authenticateJWT, updateProfile);

router.get('/open-campaigns', authenticateJWT, getPublicCampaigns);

router.post('/campaigns/:id/accept', authenticateJWT, acceptCampaign);

router.get('/ad-requests', authenticateJWT, getAdRequests);

router.post('/ad-requests/:id/:action', authenticateJWT, handleAdRequest);
// // Get ad requests for the influencer
// router.get('/ad-requests', authenticateJWT, influencerController.getAdRequests);

// // Handle an ad request action (accept, reject, negotiate)
// router.post('/ad-requests/:id/:action', authenticateJWT, influencerController.handleAdRequest);

// // Accept a public campaign
// router.post('/campaigns/:id/accept', authenticateJWT, influencerController.acceptCampaign);

module.exports = router;