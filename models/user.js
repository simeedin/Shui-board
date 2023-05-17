const createDbConnection = require("./db");
const db = createDbConnection();
const { v4: uuidv4 } = require("uuid");

function createUser(username, password, userId) {
  // const userId = uuidv4();
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

// function getAllUsers() {
//   return new Promise((resolve, reject) => {
//     db.get(`SELECT * FROM user WHERE username = ?`,
//     [username],
//     (error, rows) => {
//       if (error) {
//         reject(error.message);
//       } else {
//         resolve(rows);
//       }
//     });
//   });
// }

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
