const getProfile = (req, res) => {
    res.json({
        message: "Protected profile",
        user: req.user
    });
};

module.exports = { getProfile };