const { Sessions } = require('../models');
const guild = `239310955639603200`;

module.exports = async (id) => {
    const query = Sessions.aggregate(
        [
            { $match: { game: id, guilds: guild } },
            { $group: { _id: '$uid', total: { $sum: '$duration' } } },
            { $sort: { total: -1, _id: 1 } },
        ])
        .cursor();

    const pResult = new Promise((resolve, reject) => {
        const records = [];
        query.exec()
            .eachAsync(doc => records.push(doc))
            .then(() => {
                resolve(records);
            }).catch((err) => {
                console.log('findPlayerRecordsForGame', err);
                reject(err);
            });
    });
    return pResult;
};