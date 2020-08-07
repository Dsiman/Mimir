const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    username: String,
    nickname: String,
    tag: String,
    avatar: String
});


module.exports = mongoose.model('Profile', profileSchema);