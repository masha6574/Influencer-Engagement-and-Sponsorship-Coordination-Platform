const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  role: DataTypes.ENUM("admin", "sponsor", "influencer", "user"), // Added "user"
  company: DataTypes.STRING,
  industry: DataTypes.STRING,
  category: DataTypes.STRING,
  niche: DataTypes.STRING,
  reach: DataTypes.INTEGER
});

module.exports = User;
