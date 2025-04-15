const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Campaign = sequelize.define("Campaign", {
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  start_date: DataTypes.DATE,
  end_date: DataTypes.DATE,
  budget: DataTypes.INTEGER,
  visibility: DataTypes.ENUM("public", "private"),
  goals: DataTypes.TEXT
});

module.exports = Campaign;