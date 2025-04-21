const { Op } = require('sequelize'); // Sequelize operators
const Influencer = require('../models/Influencer');
const User = require('../models/User');
const AdRequest = require('../models/AdRequest');
const Campaign = require('../models/Campaign');
const { Sponsor } = require('../models');

// GET /api/influencer/profile
const getProfile = async (req, res) => {  // Mark the function as async
    try {
        // Find the influencer using userId from the decoded token (from req.user)
        const influencer = await Influencer.findOne({ where: { userId: req.user.userId } });

        if (!influencer) {
            return res.status(404).json({ message: 'Influencer not found' });
        }

        // Now find the user associated with this influencer using userId from the decoded token
        const user = await User.findByPk(req.user.userId);  // Ensure req.user.userId exists and is correct

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send back both influencer and user data as JSON
        res.json({ influencer, user });
    } catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: 'Error fetching profile', error: err.message });
    }
};

// PUT /api/influencer/profile
const updateProfile = async (req, res) => {
    const { name, category, niche, reach } = req.body;

    if (!name || !category || !niche || !reach) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Update User's name
        await User.update({ name }, { where: { id: req.user.userId } });

        // Update Influencer fields
        await Influencer.update({ category, niche, reach }, {
            where: { userId: req.user.userId }
        });

        // Fetch updated records to return
        const updatedUser = await User.findByPk(req.user.userId);
        const updatedInfluencer = await Influencer.findOne({
            where: { userId: req.user.userId }
        });

        res.json({
            message: 'Profile updated successfully',
            user: updatedUser,
            influencer: updatedInfluencer
        });
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// GET /api/influencer/ad-requests
exports.getAdRequests = async (req, res) => {
    try {
        const requests = await AdRequest.findAll({
            where: { influencerId: req.user.id }, // Use userId from JWT to filter requests
            order: [['createdAt', 'DESC']]
        });

        res.json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// POST /api/influencer/ad-requests/:id/:action
exports.handleAdRequest = async (req, res) => {
    const { id, action } = req.params;
    const validActions = ['accept', 'reject', 'negotiate'];

    if (!validActions.includes(action)) {
        return res.status(400).json({ message: 'Invalid action' });
    }

    try {
        const request = await AdRequest.findOne({
            where: { id, influencerId: req.user.id } // Ensure the influencerId matches the JWT userId
        });

        if (!request) return res.status(404).json({ message: 'Ad request not found' });

        // Check for valid transition: cannot accept already accepted or reject already rejected, etc.
        if (action === 'accept' && request.status !== 'pending') {
            return res.status(400).json({ message: 'Cannot accept this request, it is already processed' });
        }

        if (action === 'reject' && request.status !== 'pending') {
            return res.status(400).json({ message: 'Cannot reject this request, it is already processed' });
        }

        request.status = action;
        await request.save();

        res.json({ message: `Ad request ${action}ed` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// GET /api/campaigns
const getPublicCampaigns = async (req, res) => {
    const { category, minBudget } = req.query;
    const influencerId = req.user.userId; // ✅ define influencerId

    try {
        const where = {
            isPublic: true,
        };

        if (category) where.category = { [Op.like]: `%${category}%` };
        if (minBudget) where.budget = { [Op.gte]: Number(minBudget) };

        const campaigns = await Campaign.findAll({
            where,
            include: [
                {
                    model: Sponsor,
                    required: true,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name']
                        }
                    ]
                },
                {
                    model: Influencer,
                    where: { id: influencerId },
                    required: false, // ✅ allow campaigns without this influencer
                    attributes: ['id']
                }
            ]
        });

        const result = campaigns.map(c => {
            const json = c.toJSON();
            json.isAcceptedByUser = json.Influencers && json.Influencers.some(i => i.id === influencerId);
            delete json.Influencers; // ✅ remove raw influencer data if not needed
            return json;
        });

        res.json(result);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// POST /api/influencer/campaigns/:id/accept
const acceptCampaign = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the campaign by its primary key
        const campaign = await Campaign.findByPk(id, {
            include: [
                {
                    model: Sponsor, 
                    as: 'sponsor' // Include sponsor data (optional)
                }
            ]
        });

        if (!campaign || !campaign.isPublic) {
            return res.status(404).json({ message: 'Campaign not found or not public' });
        }

        const influencerExists = await campaign.hasInfluencer(req.user.userId);
        if (influencerExists) {
            return res.status(400).json({ message: 'You have already accepted this campaign' });
        }

        // Record the influencer acceptance using the junction table `AcceptedCampaigns`
        await campaign.addInfluencer(req.user.userId, { through: { acceptedAt: new Date() } });

        res.json({ message: 'Campaign accepted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { getProfile, updateProfile, getPublicCampaigns, acceptCampaign };