const { Client, Collection } = require("discord.js");
const fs = require('fs');
const ascii = require("ascii-table");
const client = new Client();



// Collections
client.commands = new Collection();
client.functions = new Collection();
client.config = require('./config.js');

//Commands handler
fs.readdir('./commands/', async (err, files) => {
    let table = new ascii("Commands");
    table.setHeading("Command", "Load status");
    files.forEach( file => {
        if (!file.endsWith('.js')) return;
        let pull = require(`./commands/${file}`);
        let cmdName = file.split('.')[0];
        client.commands.set(cmdName, pull);
        table.addRow(cmdName, 'Good');
        if (err) { 
            table.addRow(file, `Bad  -> missing a help.name, or help.name is not a string.`); 
            return console.error;       
        }
    });
    console.log(table.toString());
});

//Function handler
fs.readdir('./functions/', async (err, files) => {
    let table = new ascii("Functions");
    table.setHeading("Functions", "Load status");
    files.forEach( file => {
        if (!file.endsWith('.js')) return;
        let pull = require(`./functions/${file}`);
        let functionsname = file.split('.')[0];
        client.functions.set(functionsname, pull);
        table.addRow(functionsname, 'Good');
        if (err) { 
            table.addRow(file, `Bad  -> missing a help.name, or help.name is not a string.`); 
            return console.error;       
        }
    });
    console.log(table.toString());
});

//Event handler 
fs.readdir('./events/', async (err, files) => {
    let table = new ascii("Events");
    table.setHeading("Events", "Load status");
    files.forEach( file => {
        if (!file.endsWith('.js')) return;
        let event = require(`./Events/${file}`);
        let eventname = file.split('.')[0];
        client.on(eventname, event.bind(null, client));
        table.addRow(eventname, 'Good');
        if (err) { 
            table.addRow(eventname, `Bad  -> missing a help.name, or help.name is not a string.`); 
            return console.error;       
        }
    });
    console.log(table.toString());
});


//client init
setTimeout(
    async function() 
        {
            try{
                client.functions.get('mongoose')(client) 
                client.login(client.config.token)
                setInterval(
                    async function() 
                        {
                            try{
                                await client.functions.get('topgames')(client)
                            } catch (error) { console.error(error) }
                        }, 
                    600000
                )
            } catch (error) { console.error(error) }
        },
    3000
)
