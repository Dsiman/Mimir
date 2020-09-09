const mongoose = require('mongoose');
const { Sessions } = require('../models');

module.exports = async (oldMember, newMember, todo, client) => {
    switch (todo) {
        case 'Create' :
            const Session = {
                game: newMember.presence.game,
                userID: newMember.user.id,
                start: new Date(),
                ended: "Unfinished"
            };
            const mergedS = Object.assign({ _id: mongoose.Types.ObjectId() }, Session);   
            const newSession = await new Sessions(mergedS);
            return newSession.save()
                .then(console.log(`New Session! ${newMember.user.username} is playing ${newMember.presence.game}`));
        break;
            
        case 'Update' :
            const session = await client.functions.get('sessions')(oldMember, newMember, "Get", client) 
            const updateSession =  {
                end: new Date(),
                ended: "Finished"
            };
            const diff = await client.functions.get('fancytimeformat')(updateSession.end.getTime() - session[0].start.getTime(), 'Full')
            return await Sessions.updateOne(session[0], updateSession)
                .then(
                    console.log(`Session for "${session[0].userID}" has been ended.\r\nGame: ${session[0].game} With Time: ${diff}`)
                );  
        break;
            
        case 'Get' :
            try {
                const gamedata = await Sessions.find({game: oldMember.presence.game, userID: oldMember.user.id, ended: 'Unfinished'});
                if (gamedata) {
                    return gamedata;
                } else {
                    return;
                }
            } catch (error) { console.error(error) };
        break;

        case "GetUser" :
            try {
                const gamedata = await Sessions.find({ended: 'Finished', userID: oldMember });
                if (gamedata) {
                    return gamedata;
                } else {
                    return;
                }
            } catch (error) { console.error(error) };
        break;
            
        case "GetGame" :
            try {
                const gamedata = await Sessions.find({ended: 'Finished', game: oldMember });
                if (gamedata) {
                    return gamedata;
                } else {
                    return;
                }
            } catch (error) { console.error(error) };
        break;
            
        case "GetAll" :
            try {
                const gamedata = await Sessions.find({ended: 'Finished', start: { $gte: oldMember }, end: { $lte: newMember }});
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
//{ start: { $gte: 1 } }