module.exports = client => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        game: {
            name: "your requests",
            type: "LISTENING"
        }
    });
};