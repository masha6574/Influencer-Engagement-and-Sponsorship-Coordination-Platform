const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const AdRequest = sequelize.define("AdRequest", {
  messages: DataTypes.TEXT,
  requirements: DataTypes.TEXT,
  payment_amount: DataTypes.INTEGER,
  status: DataTypes.ENUM("Pending", "Accepted", "Rejected")
});

module.exports = AdRequest;