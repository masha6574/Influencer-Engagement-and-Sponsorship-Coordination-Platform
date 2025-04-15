const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('influencer_db', 'root', 'Saksham2006', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => console.log(msg),  // This will log all SQL queries executed
});

module.exports = sequelize;
