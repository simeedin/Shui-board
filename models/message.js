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

//tror ej vi behöver göra på detta sättet. Lättare med de nedan istället. Då slipper vi även ha messageId i channel. Alla messages tillhör fortfarande en channel via channelId, men jag tror inte det går att kunna visa alla då de blir array i våran channel table.

// function insertMessage(messageId, channelId) {
//   return new Promise((resolve, reject) => {
//     db.run(
//       `UPDATE channel SET messageId = ? WHERE channelId = ?`,
//       messageId, channelId,
//       (error, rows) => {
//         if (error) reject(error.message);
//         else resolve(rows);
//       }
//     )
//   })
// }

//se alla msgs för en kanal med channelId. Visas som array
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
