const createDbConnection = require("./db");
const db = createDbConnection();

function subscribeToChannel(channelId, userId) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO subscriber (channelId, userId) VALUES (?, ?)`,
      [channelId, userId],
      (error) => {
        if (error) reject(error.message);
        else resolve(true);
      }
    );
  });
}

module.exports = { subscribeToChannel };
