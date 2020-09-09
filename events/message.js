module.exports = async (client, message) => {
    const prefix = client.config.prefix
    if (!message.guild) return;
    if (message.author.bot) return;
    
    try {
        await client.functions.get('profiles')(message.member, 'Update', client)
    } catch (error) { console.error(error) }
    
    if (message.content.indexOf(prefix) !== 0) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) return;
    try {
        cmd.run(client, message, args);
    } catch (error) {
        console.error(error);
    }
};