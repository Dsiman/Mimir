const mongoose = require('mongoose');
const { Profile } = require('../models');
const guild = `239310955639603200`;

// EX. 
//      Data        = { data you want to send to the database or info about what you want from the database }
//
//      Structure   = "what collection you ware using" 
//            "Profile" "Sessions"
//
//      TODO        = "what action you want to take with the database" "
//          "Create" "Update" "Get" "Delete"
// EX.

module.exports = async (data, todo, client) => {
    
    switch (todo) {
///////////////////////////////////////////////////////////////////////////////////////////////////   
        case 'Create' :
                const newprofile = {
                    userID: data.user.id,
                    username: data.user.username,
                    nickname: data.nickname,
                    tag: data.user.tag,
                    avatar: data.user.avatar
                };
                const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, newProfile);   
                const newProfile = await new newprofile(merged);
                return newProfile.save()
                    .then(console.log(`New profile saved for user \r\n"${merged.username}" (${merged.userID})`));
///////////////////////////////////////////////////////////////////////////////////////////////////
        case 'Update' :
            const profile = await client.functions.get('profiles')(data, 'Profile', 'Get')
            const UpdateProfile = {
                nickname: data.nickname,
                avatar: data.user.avatar
            };
            if (!profile) {
                try {
                    await client.functions.get('profiles')(data, 'Profile', 'Create')
                } catch (error) { console.error(error) }
            } else if (UpdateProfile.nickname != profile.nickname || UpdateProfile.avatar != profile.avatar) {
                try {
                    let profile = await client.functions.get('profiles')(data, 'Profile', 'Get');
                    if (typeof profile !== 'object') profile = {};
                    for (const key in data) {
                            if (profile[key] !== data[key]) {
                                profile[key] = data[key];
                            } else {
                                continue;
                            }
                    }
                    console.log(`Profile Updated \r\nUsername: ${profile.username} ID: (${profile.userID}) \r\nAvatar: ${UpdateProfile.avatar} \r\nNickname: ${UpdateProfile.nickname}`);
                    return await Profile.updateOne(profile);     
                } catch (error) { console.error(error) } 
            }
        break;
///////////////////////////////////////////////////////////////////////////////////////////////////   
        case 'Get' :
            const userdata = await Profile.findOne({ userID: data.user.id});
            if (userdata) return userdata;
                else return;
            break;
        case 'Get2' :
            const userdata1 = await Profile.findOne({ userID: data});
            if (userdata1) return userdata1;
                else return;
            break;
            
///////////////////////////////////////////////////////////////////////////////////////////////////         
        case "Delete" :
            switch (structure) { 
                case 'Profile' :

                break;

                case 'Session' :
            
                break; 
            }
        break;
///////////////////////////////////////////////////////////////////////////////////////////////////
            
    default: return
    };
};