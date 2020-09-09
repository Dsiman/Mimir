const mongoose = require('mongoose');
const { Game } = require('../models');

module.exports = async (data, client) => {
    switch (todo) {
        case 'Create' :
            const newGame = {
                game: data.game,
                time: data.time,
                month: data.month,
            };
            const mergedS = Object.assign({ _id: mongoose.Types.ObjectId() }, Session);   
            const newMGame = await new Game(mergedS);
            return newMGame.save()
                .then(console.log(`New Game! ${game.game} time: ${data.time}`));
        break;
            
        case 'Update' :
            const session = await client.functions.get('game')(data, client) 
            const updategame =  {
                time: data.time,
            };
            return await Game.updateOne(session, updateSession)
                .then(
                    console.log(`Updated Time of "${game.game}" to ${game.time}`)
                );  
        break;
            
        case 'Get' :
            try {
                const gamedata = await Sessions.findOne({game: data.game, month: data.month});
                if (gamedata) {
                    return gamedata;
                } else {
                    return;
                }
            } catch (error) { console.error(error) };
        break;
            
        case "GetAll" :
            try {
                const gamedata = await Sessions.find();
                if (gamedata) {
                    return gamedata;
                } else {
                    return;
                }
            } catch (error) { console.error(error) };
        break;        
    
        default: return
    };
};