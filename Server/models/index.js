const sequelize = require("../config/db");
const User = require("./User");
const Campaign = require("./Campaign");
const AdRequest = require("./AdRequest");

User.hasMany(Campaign, { foreignKey: "sponsorId" });
Campaign.belongsTo(User, { foreignKey: "sponsorId" });

Campaign.hasMany(AdRequest, { foreignKey: "campaignId" });
AdRequest.belongsTo(Campaign, { foreignKey: "campaignId" });

User.hasMany(AdRequest, { foreignKey: "influencerId" });
AdRequest.belongsTo(User, { foreignKey: "influencerId" });

module.exports = { sequelize, User, Campaign, AdRequest };