const createDbConnection = require('./db');
const db = createDbConnection();

function createUser(username, password) {
    db.run(`INSERT INTO user (username, password) VALUES (?, ?) `,
    [username, password],
    (error) => {
        if (error) console.log(error.message);

        console.log('New user created');


    })
}



module.exports = { createUser }