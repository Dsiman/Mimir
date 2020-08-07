module.exports = async (user, data) => {
    let profile = await client.getProfile(user);
    if (typeof profile !== 'object') profile = {};
    for (const key in data) {
        if (profile[key] !== data[key]) {
            profile[key] = data[key];
        } else {
            continue;
        }
    }
    console.log(`Profile "${profile.username}" (${profile.userID}) updated: ${Object.keys(data)}`);
    return await profile.updateOne(profile); 
};