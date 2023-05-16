const createDbConnection = require('./db');
const db = createDbConnection();

function getBoard(channelId) {
    db.run(`INSERT INTO board (channelId) VALUES (?)`,
    [channelId],
    (error) => {
        if (error) console.log(error.message);

        console.log('Board updated');
    });
}


module.exports = {getBoard}