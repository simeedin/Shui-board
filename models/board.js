const createDbConnection = require("./db");
const db = createDbConnection();

function getBoard(channelId) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO board (channelId) VALUES (?)`,
      [channelId],
      function (error) {
        if (error) reject(error.message);
        else {
          console.log("Board updated");
          resolve(true);
        }
      }
    );
  });
}

module.exports = { getBoard };
