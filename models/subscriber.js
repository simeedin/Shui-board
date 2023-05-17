const createDbConnection = require("./db");
const db = createDbConnection();

function subscribeToChannel(channelId, username) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO subscriber (channelId, username) VALUES (?, ?)`,
      [channelId, username],
      (error) => {
        if (error) reject(error.message);
        else resolve(true);
      }
    );
  });
}

//get all subsrcibers from a channel
function getSubscribers(channelId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM subscriber WHERE channelId = ? `,
      channelId,
      (error, rows) => {
        if (error) reject(error.message);
        else resolve(rows);
      }
    );
  });
}

module.exports = { subscribeToChannel, getSubscribers };
