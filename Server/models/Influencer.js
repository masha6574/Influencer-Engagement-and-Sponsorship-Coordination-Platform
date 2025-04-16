const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

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

Influencer.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasOne(Influencer, { foreignKey: 'userId' });

module.exports = Influencer;
