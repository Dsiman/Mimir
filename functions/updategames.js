module.exports = async (client, type) => {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const allgames = await client.functions.get('sessions')(firstDay, lastDay, "GetAll", client)
    
    var organized = []
    var top = []
    var found = false
    
    for (let i = 0; i < allgames.length; i++) {
        const gametime = allgames[i].end.getTime() - allgames[i].start.getTime()
        const game = {
            game: allgames[i].game,
            time: gametime,
        };
        
        for (let b = 0; b < organized.length; b++) {
            if(organized[b].game == allgames[i].game){
                const updatedgame = {
                    game: allgames[i].game,
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
    
    return organized
};