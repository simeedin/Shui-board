const createDbConnection = require('./db');
const db = createDbConnection();

function createMessage(content, user, channelId) {
    db.run(
        `INSERT `
    )
}

module.export = { createMessage };