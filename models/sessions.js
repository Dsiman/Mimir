const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    to: String,
    for: String,
    date: Number,
    ended: Date,
    guilds: []
});

module.exports = mongoose.model('Sessions', sessionSchema);

