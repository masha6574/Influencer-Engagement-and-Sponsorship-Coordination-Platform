const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('influencer_db', 'root', 'masha@6574', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+05:30',
});

module.exports = sequelize;
