const express = require('express');
const {
    createCampaign,
    getAllMyCampaigns,
    updateCampaign,
    deleteCampaign,
    createAdRequest,
    getAdRequestsForCampaign,
    updateAdRequest,
    deleteAdRequest
} = require('../controllers/campaignController');
const { authenticateJWT } = require('../controllers/authController');

const router = express.Router();

// Campaign routes (protected by JWT)
router.post('/', authenticateJWT, createCampaign);                // Create a new campaign
router.get('/my-campaigns', authenticateJWT, getAllMyCampaigns);             // Get all campaigns for the logged-in sponsor
router.put('/:id', authenticateJWT, updateCampaign);             // Update an existing campaign
router.delete('/:id', authenticateJWT, deleteCampaign);          // Delete a campaign

// AdRequest routes (protected by JWT)
router.post('/campaign/:campaignId/ad-request', authenticateJWT, createAdRequest);         // Create an ad request for a campaign
router.get('/campaign/:campaignId/ad-requests', authenticateJWT, getAdRequestsForCampaign); // Get all ad requests for a campaign
router.put('/ad-request/:adRequestId', authenticateJWT, updateAdRequest);                   // Update an ad request
router.delete('/ad-request/:adRequestId', authenticateJWT, deleteAdRequest);               // Delete an ad request

module.exports = router;
