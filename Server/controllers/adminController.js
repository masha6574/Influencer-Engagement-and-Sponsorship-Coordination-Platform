const { Campaign, Sponsor, User, AdRequest, Influencer } = require('../models');
const { Op } = require('sequelize');

// Get campaigns with ongoing ad requests (status: pending or accepted)
exports.getOngoingCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      include: [
        {
          model: AdRequest,
          where: {
            status: ['pending', 'accepted']
          },
          required: true
        }
      ]
    });

    const data = campaigns.map(c => ({
      name: c.title,
      progress: `${Math.floor(Math.random() * 100)}%` // simulate progress
    }));

    res.json(data);
  } catch (error) {
    console.error("Error fetching ongoing campaigns:", error);
    res.status(500).json({ error: "Failed to fetch ongoing campaigns" });
  }
};

// Get flagged campaigns
exports.getFlaggedCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.findAll({
      where: { isFlagged: true }, // ensure isFlagged column exists
      include: [
        {
          model: Sponsor,
          attributes: ['companyName']
        }
      ]
    });

    const data = campaigns.map(c => ({
      name: c.title,
      company: c.Sponsor?.companyName || 'Unknown'
    }));

    res.json(data);
  } catch (error) {
    console.error("Error fetching flagged campaigns:", error);
    res.status(500).json({ error: "Failed to fetch flagged campaigns" });
  }
};

// Flag a user or campaign
exports.flagUserOrCampaign = async (req, res) => {
  const { type, id } = req.body;

  try {
    if (type === 'campaign') {
      await Campaign.update({ isFlagged: true }, { where: { id } });
    } else if (type === 'user') {
      await User.update({ isFlagged: true }, { where: { id } });
    } else {
      return res.status(400).json({ error: 'Invalid type' });
    }

    res.json({ message: `${type} flagged successfully.` });
  } catch (error) {
    console.error("Error flagging:", error);
    res.status(500).json({ error: "Failed to flag entity" });
  }
};

// Remove a user or campaign
exports.removeUserOrCampaign = async (req, res) => {
  const { type, id } = req.body;

  try {
    if (type === 'campaign') {
      await Campaign.destroy({ where: { id } });
    } else if (type === 'user') {
      await User.destroy({ where: { id } });
    } else {
      return res.status(400).json({ error: 'Invalid type' });
    }

    res.json({ message: `${type} removed successfully.` });
  } catch (error) {
    console.error("Error removing entity:", error);
    res.status(500).json({ error: "Failed to remove entity" });
  }
};

// Search campaigns, sponsors, or influencers by name
exports.searchEntities = async (req, res) => {
  const { query } = req.query;

  try {
    const users = await User.findAll({
      where: {
        name: { [Op.like]: `%${query}%` }
      },
      attributes: ['id', 'name', 'email', 'role']
    });

    const campaigns = await Campaign.findAll({
      where: {
        title: { [Op.like]: `%${query}%` }
      },
      attributes: ['id', 'title', 'category']
    });

    res.json({ users, campaigns });
  } catch (error) {
    console.error("Error searching entities:", error);
    res.status(500).json({ error: "Failed to search entities" });
  }
};

// Get general stats for dashboard
exports.getStats = async (req, res) => {
  try {
    const userCount = await User.count();
    const sponsorCount = await Sponsor.count();
    const influencerCount = await Influencer.count();
    const campaignCount = await Campaign.count();
    const requestCount = await AdRequest.count();

    res.json({
      users: userCount,
      sponsors: sponsorCount,
      influencers: influencerCount,
      campaigns: campaignCount,
      adRequests: requestCount
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
