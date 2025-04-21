const sequelize = require('../config/database');

// Import all models
const User = require('./User');
const Sponsor = require('./Sponsor');
const Influencer = require('./Influencer');
const Campaign = require('./Campaign');
const AdRequest = require('./AdRequest');

// ===================
// Associations
// ===================

// 1. User - Sponsor (One-to-One)
User.hasOne(Sponsor, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Sponsor.belongsTo(User, {
    foreignKey: 'userId'
});

// 2. User - Influencer (One-to-One)
User.hasOne(Influencer, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
Influencer.belongsTo(User, {
    foreignKey: 'userId'
});

// 3. Sponsor - Campaign (One-to-Many) using Sponsor.userId as PK
Sponsor.hasMany(Campaign, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    },
    sourceKey: 'userId', // 👈 this is the key difference
    onDelete: 'CASCADE'
});
Campaign.belongsTo(Sponsor, {
    foreignKey: 'userId',
    targetKey: 'userId'  // 👈 this tells Sequelize to use Sponsor.userId
});

// 4. Campaign - AdRequest (One-to-Many)
Campaign.hasMany(AdRequest, {
    foreignKey: {
        name: 'campaignId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
AdRequest.belongsTo(Campaign, {
    foreignKey: 'campaignId'
});

// 5. Influencer - AdRequest (One-to-Many)
Influencer.hasMany(AdRequest, {
    foreignKey: {
        name: 'influencerId',
        allowNull: false
    },
    onDelete: 'CASCADE'
});
AdRequest.belongsTo(Influencer, {
    foreignKey: 'influencerId'
});

module.exports = {
    sequelize,
    User,
    Sponsor,
    Influencer,
    Campaign,
    AdRequest
};
