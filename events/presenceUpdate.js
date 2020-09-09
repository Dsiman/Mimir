// Main function that runs on a presenceUpdate
module.exports = async (client, oldMember, newMember) => {
    
    const timestamp = new Date().toISOString().match(/(\d{2}:){2}\d{2}/)[0]
    if (newMember.presence.game && newMember.presence.game.name != 'Custom Status' && newMember.presence.game.name != 'Spotify') {
        if (oldMember.presence.game && oldMember.presence.game.name != 'Custom Status' && oldMember.presence.game.name != 'Spotify') {
            // If the old game is the same game as the original
            if (oldMember.presence.game.name == newMember.presence.game.name) {
                console.log(`${newMember.user.username} is continuing to play ${newMember.presence.game.name} at ${timestamp}`)
                return
            }
        // If Member has opened a new game and closed a old game
            console.log(`${newMember.user.username} is no longer playing ${oldMember.presence.game.name}at ${timestamp}`)
            console.log(`${newMember.user.username} is now playing ${newMember.presence.game.name}at ${timestamp}`)
        // Check for Database entry and update it
            let Oldgame = await client.functions.get('sessions')(oldMember, newMember, "Get", client)
            for (let i = 0; i < Oldgame.length; i++) {
                await client.functions.get('sessions')(oldMember, newMember, "Update", client)
            }
        // Make a new Database entry
            await client.functions.get('sessions')(oldMember, newMember, "Create", client)
        } else {
        // If Member has opened a new game
            console.log(`${newMember.user.username} is now playing ${newMember.presence.game.name}at ${timestamp}`)
        // Make a new Database entry
            await client.functions.get('sessions')(oldMember, newMember, "Create", client)
        }
    } else {
        if (oldMember.presence.game && oldMember.presence.game.name != 'Custom Status' && oldMember.presence.game.name != 'Spotify') {
        // If Member has closed a old game
            console.log(`${newMember.user.username} is no longer playing ${oldMember.presence.game.name}at ${timestamp}`)
        // Check for Database entry and update it
            let Oldgame = await client.functions.get('sessions')(oldMember, newMember, "Get", client)
            for (let i = 0; i < Oldgame.length; i++) {
                await client.functions.get('sessions')(oldMember, newMember, "Update", client)
            }
        } else {
        // If Member has updated status and its not a game
            console.log(`${newMember.user.username} is not playing a game.at ${timestamp}`)
        }
    }; 
};
