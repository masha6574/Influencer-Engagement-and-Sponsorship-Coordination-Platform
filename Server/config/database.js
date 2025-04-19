const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('influencer_db', 'root', 'masha@6574', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
