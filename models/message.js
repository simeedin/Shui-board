const createDbConnection = require("./db");
const db = createDbConnection();

function createMessage(messageId, content, username, createdAt, channelId) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO message (messageId, content, username, createdAt, channelId) VALUES (?, ?, ?, ?, ?)`,
      [messageId, content, username, createdAt, channelId],
      (error) => {
        if (error) reject(error.message);
        else resolve(true);
      }
    );
  });
}

async function addMessage(messageId, content, username, createdAt, channelId) {
  for (const id of channelId) {
    await createMessage(messageId, content, username, createdAt, id);
  }
}


function displayChannelMessages(channelId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM message WHERE channelId = ? ORDER BY createdAt `,
      channelId,
      (error, rows) => {
        if (error) reject(error.message);
        else resolve(rows);
      }
    );
  });
}

module.exports = { addMessage, displayChannelMessages };
