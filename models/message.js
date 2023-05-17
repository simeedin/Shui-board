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

function insertMessage(messageId, channelId) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE channel SET messageId = ? WHERE channelId = ?`,
      messageId, channelId, 
      (error, rows) => {
        if (error) reject(error.message);
        else resolve(rows);
      }
    )
  })
}

module.exports = { createMessage, insertMessage };

