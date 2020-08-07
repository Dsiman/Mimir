const { GoogleSpreadsheet } = require('google-spreadsheet');

module.exports = async (client, oldMember, newMember) => { 
    const keys = client.config.googlekeys
    const doc = new GoogleSpreadsheet(client.config.googlesheet);
    
    // Google auth and load
    await doc.useServiceAccountAuth({
        client_email: keys.client_email,
        private_key: keys.private_key,
    });
    await doc.loadInfo();
    console.log(`${doc.title} has been loaded`)
    
    //Grab date
    var today = new Date().toLocaleDateString(undefined, {
        day:'numeric',
        month: 'numeric',
        year: 'numeric'
    })
    
    // Get info for games
    const nice = await client.findTopGamesForGuild()
    
    // Make new sheet named the date
    const newSheet = await doc.addSheet({
        title: `${today}`,
        headerValues: ['Game','Time','Minutes'] 
    });
    
    // For every game in database make a name and time played 
    for (var i = 0, len = nice.length; i < len; i++) {
        
        // Define the array that holds each game
        var game = { Game: "", Time: "", Minutes: ""}
        
        // Gametime in a nice format
        game.Time = await fancyTimeFormat(nice[i].total, 'Full')
        
        // Gametime in total Hours
        game.Minutes = await fancyTimeFormat(nice[i].total)
        
        // Dont add games with less than 20 mins
        if (game.Minutes < 20) { break }
        
        // Game name
        game.Game = nice[i]._id 
        
        // add to array 
        await newSheet.addRow(game)
    }
    // Resize the Sheets
    await newSheet.resize({ rowCount: nice.length, columnCount: 3})
    reset = false
    console.log(reset)
}; 