const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Campaign = require('./Campaign'); // Import the Campaign model

const Influencer = sequelize.define('Influencer', {
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  niche: {
    type: DataTypes.STRING
  },
  reach: {
    type: DataTypes.INTEGER // Or FLOAT depending on your logic
  }
});

// Associations
Influencer.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Influencer, { foreignKey: 'userId' });

// New many-to-many relation for accepted campaigns
Influencer.belongsToMany(Campaign, { through: 'AcceptedCampaigns', foreignKey: 'influencerId' });
Campaign.belongsToMany(Influencer, { through: 'AcceptedCampaigns', foreignKey: 'campaignId' });

module.exports = Influencer;
