const createDbConnection = require("./db");
const db = createDbConnection();

function createMessage(messageId, content, username, channelId) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO message (messageId, content, username, channelId) VALUES (?, ?, ?, ?)`,
      [messageId, content, username, channelId],
      (error) => {
        if (error) reject(error.message);
        else resolve(true);
      }
    );
  });
}

function displayChannelMessages(channelId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM message WHERE channelId = ? `,
      channelId,
      (error, rows) => {
        if (error) reject(error.message);
        else resolve(rows);
      }
    );
  });
}

module.exports = { createMessage, displayChannelMessages };
