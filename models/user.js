const createDbConnection = require("./db");
const db = createDbConnection();

function createUser(userId, username, password) {
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

function checkUsernameExists(username) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM user WHERE username = ?`,
      [username],
      (error, row) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(!!row); // Return true if row exists, false otherwise
        }
      }
    );
  });
}

// function userIsOwner(channelId, username) {
//   return new Promise((resolve, reject) => {
//     db.get(
//       `SELECT * FROM channelId = ? WHERE username = ?`, // fel här: "channelId = ?"
//       [channelId, username],
//       (error, row) => {
//         if (error) {
//           reject(error.message);
//         } else {
//           resolve(!!row);
//         }
//       }
//     );
//   });
// }

function userIsSubscribed(channelId, username) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM subscriber WHERE channelId = ? AND username = ?`,
      [channelId, username],
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

// function getUserIdByUsername(username) {
//   return new Promise((resolve, reject) => {
//     db.get(
//       `SELECT userId FROM user WHERE username = ?`,
//       [username],
//       (error, row) => {
//         if (error) reject(error.message);
//         else resolve(row ? row.userId : null);
//       }
//     );
//   });
// }

module.exports = { createUser, checkUsernameExists, userIsSubscribed };
