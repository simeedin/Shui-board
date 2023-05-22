const createDbConnection = require("./db");
const db = createDbConnection();

function createChannel(username, channelId, channelName) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO channel (username, channelId, channelName) VALUES (?, ?, ?)`,
      [username, channelId, channelName],
      (error) => {
        if (error) reject(error.message);
        else resolve(true);
      }
    );
  });
}

function getChannel(channelId) {
  return new Promise((resolve, reject) => {
    console.log(channelId);
    db.get(
      `SELECT * FROM channel WHERE channelId = ? `,
      channelId,
      (error, rows) => {
        if (error) reject(error.message);
        else resolve(rows);
      }
    );
  });
}

function checkChannelExists(channelId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM channel WHERE channelId = ?`,
      [channelId],
      (error, row) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(!!row);
        }
      }
    );
  });
}

function checkChannelNameExists(channelName) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM channel WHERE channelName = ?`,
      [channelName],
      (error, row) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(!!row);
        }
      }
    );
  });
}

module.exports = {
  createChannel,
  getChannel,
  checkChannelExists,
  checkChannelNameExists,
};
