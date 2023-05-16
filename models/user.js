const createDbConnection = require("./db");
const db = createDbConnection();
const { v4: uuidv4 } = require("uuid");

function createUser(username, password) {
  const userId = uuidv4();
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO user (userId, username, password) VALUES (?, ?, ?)`,
      [userId, username, password],
      function (error) {
        if (error) reject(error.message);
        else {
          console.log("New user created");
          resolve(true);
        }
      }
    );
  });
}

function getUserIdByUsername(username) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT userId FROM user WHERE username = ?`,
      [username],
      (error, row) => {
        if (error) reject(error.message);
        else resolve(row ? row.userId : null);
      }
    );
  });
}

module.exports = { createUser, getUserIdByUsername };
