const createDbConnection = require("./db");
const db = createDbConnection();

function createMessage(messageId, content, userId, channelId) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO message (messageId, content, userId, channelId) VALUES (?, ?, ?, ?)`,
      [messageId, content, userId, channelId],
      (error) => {
        if (error) reject(error.message);
        else resolve(true);
      }
    );
  });
}

module.exports = { createMessage };
