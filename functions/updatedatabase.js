module.exports = async (client, member) => {    
//checks if user has a database entry and if they dont it will make one
    const profile = await client.functions.get('getprofile')(member)
    const newProfile = {
        userID: member.user.id,
        username: member.user.username,
        nickname: member.nickname,
        tag: member.user.tag,
        avatar: member.user.avatar
    };
    const updateProfile = {
        nickname: member.nickname,
        avatar: member.user.avatar    
    }
    if (!profile) {
        try {
            await await client.functions.get('createprofile')(newProfile);
        } catch (error) { console.error(error) }
    } else if (newProfile.nickname != profile.nickname || newProfile.avatar != profile.avatar) {
       try {
            await client.functions.get('updateprofile')(member, updateProfile);
        } catch (error) { console.error(error) } 
    }
};