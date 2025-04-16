const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('influencer_db', 'root', 'Saksham2006', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
