const createDbConnection = require("./db");
const db = createDbConnection();

function createMessage(content, userId, channelId, messageId) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO message (content, user, channelId, messageId) VALUES (?, ?, ?, ?)`,
      [content, userId, channelId, messageId],
      (error) => {
        if (error) reject(error.message);
        else resolve(true);
      }
    );
  });
}

module.exports = { createMessage };
