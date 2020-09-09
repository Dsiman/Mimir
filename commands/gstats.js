const Client = require("discord.js");
const apicalypse = require('apicalypse').default;

const requestOptions = {
    queryMethod: 'body',
    method: 'post', // The default is `get`
    baseURL: 'https://api-v3.igdb.com',
    headers: {
        'Accept': 'application/json',
        'user-key': '450987af012a6e0e41e9f5bd297c652c'
    },
    responseType: 'json',
    timeout: 10000, // 1 second timeout
};

module.exports = {
    name: "join",
    category: "moderation",
    description: "Joins the voice channel of the user running the command",
    run: async (client, message, args) => {
        
        const game = args.join(" ")
        if (!game) return;
        
        const gamestats = await client.functions.get('sessions')(game, "", "GetGame", client)
        if (gamestats == []) {
            message.channel.send('Couldnt find ' + game + ' in the database, Are you sure that is playing this game??')
                .then(msg => {
                    msg.delete(20000)
                })
            message.delete()
            return;
        }
        const gameinfo = []
        const newmessage = new Client.RichEmbed()
        var organized = []
        var total = 0
        var found = false
        
        //get the game info from IGDB
        const response = await apicalypse(requestOptions)
            .limit(10)       .fields(["age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"])
            .sort('name', 'desc')
            .search(game) // search for a specific name (search implementations can vary)
            .request('/games'); // execute the query and return a response object

        // Make Sure the info is correct
        for (let c = 0; c < response.data.length; c++) {
            if (response.data[c].name == game){
                gameinfo.push(response.data[c])
                break
            }
        }
        if (typeof gameinfo[0] == 'undefined') {
            message.channel.send('Couldnt find database info for ' + game + ', Are you sure that is a real game?')
                .then(msg => {
                    msg.delete(20000)
                })
            message.delete()
            return;
        }
        // get images for message
        const responseimage = await apicalypse(requestOptions)      
            .fields(["alpha_channel,animated,checksum,game,height,image_id,url,width"])
            .where("game = " + gameinfo[0].id + "")
            .request('/covers'); // execute the query and return a response object
        
        const responseimagesml = await apicalypse(requestOptions)      
            .fields(["alpha_channel,animated,checksum,game,height,image_id,url,width"])
            .where("game = " + gameinfo[0].id + "")
            .request('/artworks'); // execute the query and return a response object

        const responsecomplog = await apicalypse(requestOptions)      
            .fields(["category,checksum,trusted,url"])
            .where("id = " + gameinfo[0].id + "")
            .request('/company_websites'); // execute the query and return a response object

        for (let i = 0; i < gamestats.length; i++) {
            const gametime = gamestats[i].end.getTime() - gamestats[i].start.getTime()
            const user = {
                userID: gamestats[i].userID,
                time: gametime,
            };

            for (let b = 0; b < organized.length; b++) {
                if(organized[b].userID == gamestats[i].userID){
                    const updateduser = {
                        userID: gamestats[i].userID,
                        time: organized[b].time + gametime,
                    };
                    organized[b] = updateduser
                    found = true
                    break   
                }
            };
            if (found == false){
                organized.push(user)
            }
            found = false

        };
        organized.sort((a, b) => b.time - a.time);
        
        for (let b = 0; b < organized.length; b++) {
            const userm = await client.functions.get('profiles')(organized[b].userID, "Get2", client)
            if (userm.nickname != null) {
                var username = userm.nickname
            } else if (userm.username != null){
                var username = userm.username
            } else {
                await client.guilds.get(client.config.guildid).members.map(user => {if (user.id == organized[b].userID) user = User})
                var username = User.user.username
            }
            newmessage.addField(username, await client.functions.get('fancytimeformat')(organized[b].time, 'Full'), false)
            total = total + organized[b].time
        }
        
        if (typeof responseimage.data[0] != 'undefined'){
            newmessage.setThumbnail(responseimage.data[0].url.replace('//','https://'))
        }
        if (typeof responseimagesml.data[0] != 'undefined'){
            newmessage.setAuthor('Playtime',responseimagesml.data[0].url.replace('//','https://'),gameinfo[0].url)
        } else {
            newmessage.setAuthor('Playtime')
        }
        
        newmessage.setTitle(`${game} \r\nTotal Time: ${await client.functions.get('fancytimeformat')(total, 'Full')}`)
        //newmessage.setDescription(gameinfo[0].summary)
        newmessage.setFooter('Mimir','https://i.imgur.com/kFjYF46.png')
        newmessage.setColor('#0099ff')
        newmessage.setTimestamp(new Date())
        message.channel.send(newmessage)
            .then(msg => {
                msg.delete(1000000)
            })
        message.delete()
    }
}