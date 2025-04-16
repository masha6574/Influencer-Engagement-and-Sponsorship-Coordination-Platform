const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sponsor = require('./Sponsor');

const Campaign = sequelize.define('Campaign', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.STRING
  },
  budget: {
    type: DataTypes.FLOAT
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

Campaign.belongsTo(Sponsor, { foreignKey: 'sponsorId', onDelete: 'CASCADE' });
Sponsor.hasMany(Campaign, { foreignKey: 'sponsorId' });

module.exports = Campaign;
