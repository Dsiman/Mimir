const { Sessions } = require('../models');
const guild = `239310955639603200`;

module.exports = async () => {
    const query = Sessions.aggregate(
        [
            { $match: { guilds: guild } },
            { $group: { _id: '$game', total: { $sum: '$duration' } } },
            { $sort: { total: -1, _id: 1 } },
            { $limit: 20 },
        ])
        .cursor();

    const pResult = new Promise((resolve, reject) => {
        const records = [];
        query.exec()
            .eachAsync(doc => records.push(doc))
            .then(() => {
                resolve(records);
            }).catch((err) => {
                console.log('findTopGamesForGuild', err);
                reject(err);
            });
    });
    return pResult;
};