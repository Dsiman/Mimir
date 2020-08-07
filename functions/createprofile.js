const mongoose = require('mongoose');
const { Profile } = require('../models');

module.exports = async (profile) => {    
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, profile);   
    const newProfile = await new Profile(merged);
    return newProfile.save()
        .then(console.log(`New profile saved for user "${merged.username}" (${merged.userID})`));
};