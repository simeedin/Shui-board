const createDbConnection = require("./db");
const db = createDbConnection();


function createBoard(channelId) {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO board (channelId) VALUES (?)`,
    [channelId],
    (error) => {
      if (error) reject(error.message);
      else resolve(true);
    })
  })
}

function getBoard() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * from board`,
      function (error, rows) {
        if (error) reject(error.message);
        else {
          // console.log("Board updated");
          resolve(rows);
        }
      }
    );
  });
}

module.exports = { getBoard, createBoard };
