const Campaign = require('../models/Campaign');
const AdRequest = require('../models/AdRequest');
const { Op } = require('sequelize');

// GET all campaigns for the logged-in sponsor
const getAllMyCampaigns = async (req, res) => {
    try {
        const sponsorId = req.user.userId;
        const campaigns = await Campaign.findAll({ where: { sponsorId } });
        res.status(200).json(campaigns);
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ error: 'Failed to fetch campaigns.' });
    }
};

// POST create a new campaign
const createCampaign = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { title, description, category, budget, isPublic } = req.body;

        const campaign = await Campaign.create({
            title,
            description,
            category,
            budget,
            isPublic,
            userId
        });

        res.status(201).json(campaign);
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).json({ error: 'Failed to create campaign.' });
    }
};

// PUT update an existing campaign
const updateCampaign = async (req, res) => {
    try {
        const sponsorId = req.user.userId;
        const campaignId = req.params.id;

        const campaign = await Campaign.findOne({ where: { id: campaignId, sponsorId } });

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found or unauthorized.' });
        }

        const { title, description, category, budget, isPublic } = req.body;

        await campaign.update({ title, description, category, budget, isPublic });

        res.status(200).json(campaign);
    } catch (error) {
        console.error('Error updating campaign:', error);
        res.status(500).json({ error: 'Failed to update campaign.' });
    }
};

// DELETE a campaign
const deleteCampaign = async (req, res) => {
    try {
        const sponsorId = req.user.userId;
        const campaignId = req.params.id;

        const campaign = await Campaign.findOne({ where: { id: campaignId, sponsorId } });

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found or unauthorized.' });
        }

        await campaign.destroy();

        res.status(200).json({ message: 'Campaign deleted successfully.' });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(500).json({ error: 'Failed to delete campaign.' });
    }
};

// --- CRUD for AdRequests ---

// POST create a new ad request for a campaign
const createAdRequest = async (req, res) => {
    try {
        const { campaignId } = req.params;  // Get campaignId from params
        const sponsorId = req.user.userId;
        const { influencerId, message, proposedTerms } = req.body;

        // Check if the campaign belongs to the logged-in sponsor
        const campaign = await Campaign.findOne({ where: { id: campaignId, sponsorId } });
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found or unauthorized.' });
        }

        // Create the ad request
        const adRequest = await AdRequest.create({
            campaignId,
            influencerId,
            message,
            proposedTerms,
        });

        res.status(201).json(adRequest);
    } catch (error) {
        console.error('Error creating ad request:', error);
        res.status(500).json({ error: 'Failed to create ad request.' });
    }
};

// GET all ad requests for a specific campaign
const getAdRequestsForCampaign = async (req, res) => {
    try {
        const { campaignId } = req.params;
        const sponsorId = req.user.userId;

        // Check if the campaign belongs to the logged-in sponsor
        const campaign = await Campaign.findOne({ where: { id: campaignId, sponsorId } });
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found or unauthorized.' });
        }

        // Fetch all ad requests for the campaign
        const adRequests = await AdRequest.findAll({ where: { campaignId } });

        res.status(200).json(adRequests);
    } catch (error) {
        console.error('Error fetching ad requests:', error);
        res.status(500).json({ error: 'Failed to fetch ad requests.' });
    }
};

// PUT update an ad request
const updateAdRequest = async (req, res) => {
    try {
        const { adRequestId } = req.params;
        const { status, message, proposedTerms } = req.body;
        const sponsorId = req.user.userId;

        // Find the ad request to update
        const adRequest = await AdRequest.findOne({ where: { id: adRequestId } });
        if (!adRequest) {
            return res.status(404).json({ error: 'Ad request not found.' });
        }

        // Check if the ad request belongs to the specified campaign and sponsor
        const campaign = await Campaign.findOne({ where: { id: adRequest.campaignId, sponsorId } });
        if (!campaign) {
            return res.status(403).json({ error: 'Unauthorized to update this ad request.' });
        }

        // Update the ad request
        await adRequest.update({ status, message, proposedTerms });

        res.status(200).json(adRequest);
    } catch (error) {
        console.error('Error updating ad request:', error);
        res.status(500).json({ error: 'Failed to update ad request.' });
    }
};

// DELETE an ad request
const deleteAdRequest = async (req, res) => {
    try {
        const { adRequestId } = req.params;
        const sponsorId = req.user.userId;

        // Find the ad request to delete
        const adRequest = await AdRequest.findOne({ where: { id: adRequestId } });
        if (!adRequest) {
            return res.status(404).json({ error: 'Ad request not found.' });
        }

        // Check if the ad request belongs to the specified campaign and sponsor
        const campaign = await Campaign.findOne({ where: { id: adRequest.campaignId, sponsorId } });
        if (!campaign) {
            return res.status(403).json({ error: 'Unauthorized to delete this ad request.' });
        }

        // Delete the ad request
        await adRequest.destroy();

        res.status(200).json({ message: 'Ad request deleted successfully.' });
    } catch (error) {
        console.error('Error deleting ad request:', error);
        res.status(500).json({ error: 'Failed to delete ad request.' });
    }
};

module.exports = {
    getAllMyCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    createAdRequest,
    getAdRequestsForCampaign,
    updateAdRequest,
    deleteAdRequest,
};
