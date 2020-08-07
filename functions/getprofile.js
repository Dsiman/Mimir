const mongoose = require('mongoose');
const { Profile } = require('../models');

module.exports = async (user) => {
    const data = await Profile.findOne({ userID: user.id });
        if (data) return data;
        else return;
};