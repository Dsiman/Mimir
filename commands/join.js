module.exports = {
    name: "join",
    category: "moderation",
    description: "Joins the voice channel of the user running the command",
    run: async (client, message, args) => {
    	const { voiceChannel } = message.member;
    	if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}
		message.channel.send(`Joining ${message.member.user.username}'s voice channel`);
		voiceChannel.join()
    }
}