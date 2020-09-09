const Client = require("discord.js");

module.exports = {
    name: "join",
    category: "moderation",
    description: "Joins the voice channel of the user running the command",
    run: async (client, message, args) => {
        if (!message.mentions.users.first()) {
            message.channel.send('No mentioned user found try \r\n!UStats <@!239307675840544768>')
            message.delete()
            return
        }
        const Message = new Client.RichEmbed()
        var user = message.mentions.users.first().id
        const Usergames = await client.functions.get('sessions')(user, "", "GetUser", client)    
        var organized = []
        var top = []
        var found = false
    
        for (let i = 0; i < Usergames.length; i++) {
            const gametime = Usergames[i].end.getTime() - Usergames[i].start.getTime()
            const game = {
                game: Usergames[i].game,
                time: gametime,
            };

            for (let b = 0; b < organized.length; b++) {
                if(organized[b].game == Usergames[i].game){
                    const updatedgame = {
                        game: Usergames[i].game,
                        time: organized[b].time + gametime,
                    };
                    organized[b] = updatedgame
                    found = true
                    break   
                }
            };
            if (found == false){
                organized.push(game)
            }
            found = false

        };

        organized.sort((a, b) => b.time - a.time);
        
        for (let i = 0; i < organized.length; i++) {
            Message.addField(organized[i].game, await client.functions.get('fancytimeformat')(organized[i].time, 'Full'), false)
        }
        Message.setColor(0x00AE86),
        Message.setAuthor(message.mentions.users.first().username,`https://cdn.discordapp.com/avatars/${user}/${message.mentions.users.first().avatar}`)
        message.channel.send(Message)
        message.delete()
        
    }
}