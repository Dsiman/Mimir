const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
	game: { type: String, index: true },
	time: { type: String, index: true },
    month: { type: String, index: true }
});


module.exports = mongoose.model('Games', gameSchema);