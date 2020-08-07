// update the 3 discord channels to be names of top played games

//Discord channel ID
const channels = [
    '419792221156671489',
    '362767572934066177',
    '647963067086274561'
]

//Emojis
const icon = [
    '🥇',
    '🥈',
    '🥉'
]

module.exports = async (client, oldMember, newMember) => {
    console.log(new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0])
    
    // Get the top games for our guild
    const topgames = await client.functions.get('findtopgamesforguild')()
    
    try {
            // If there is nothing returned from the database then return
            if (typeof topgames === 'undefined') { return };
            // If there is more channels than games in the database then return 
            if (topgames.length < channels.length){ return };
        
            // For each channel make a title and time played
            for (var i = 0, len = channels.length; i < len; i++) {

                // grabs the voicechannel to edit
                await client.guilds.get(client.config.guildid).channels.map(channel => {if (channel.id == channels[i]) voicechannel = channel});

                // Time to Days Hours Mins
                var time = await client.functions.get('fancytimeformat')(topgames[i].total, 'Short')

                // Update name of game for special cases
                switch (topgames[i]._id) {
                    case 'Halo: The Master Chief Collection' :
                        var name = 'Halo: MCC'
                        break;
                    case 'World of Warcraft Classic' :
                        var name = 'WOW: Classic'
                        break;
                    case 'Lethal League Blaze' :
                        var name = 'LL: Blaze'
                        break;
                    default: var name = topgames[i]._id
                }
                
                // Set name and time for game
                voicechannel.setName(`${icon[i]} ${name} ${time}`);
            }
    } catch (error) { 
        console.error(error)
    }
};