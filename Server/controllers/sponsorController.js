const { Sponsor } = require('../models');

const getMySponsorDetails = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized - user info missing" });
        }

        const sponsor = await Sponsor.findOne({ where: { userId: req.user.userId } });

        console.log(sponsor);

        if (!sponsor) {
            return res.status(404).json({ message: "Sponsor profile not found" });
        }

        res.json(sponsor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMySponsorDetails };