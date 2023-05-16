const createDbConnection = require("./db");
const db = createDbConnection();

function createMessage(content, user, channelId) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO message (content, user, channelId) VALUES (?, ?, ?)`,
      [content, user, channelId],
      (error) => {
        if (error) reject(error.message);
        else resolve(true);
      }
    );
  });
}

module.exports = { createMessage };
