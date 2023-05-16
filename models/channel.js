const createDbConnection = require("./db");
const db = createDbConnection();

function createChannel(owner) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO channel (owner) VALUES (?)`, [owner], (error) => {
      if (error) reject(error.message);
      else resolve(true);
    });
  });
}

function getChannel(channelId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM channel WHERE channelId = ? `,
      [channelId],
      (error, rows) => {
        if (error) reject(error.message);
        else resolve(rows);
      }
    );
  });
}

module.exports = { createChannel, getChannel };
