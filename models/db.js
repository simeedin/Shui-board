const sqlite3 = require('sqlite3').verbose();



function createDbConnection() {
  const db = new sqlite3.Database('./shuiBoard.sqlite', (error) => {
    if (error) return console.log(error.message);
    createTable(db)
  })

  return db;
}

function createTable(db) {
  db.exec(`
  CREATE TABLE IF NOT EXISTS board (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY (channelId) REFERENCES channel(channelId)
  );
  CREATE TABLE IF NOT EXISTS channel (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    channelId text NOT NULL
    subscriber text NOT NULL,
    owner text NOT NULL,
    FOREIGN KEY (messageId) REFERENCES message(messageId)
  );
  CREATE TABLE IF NOT EXISTS message (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    messageId text NOT NULL,
    content text NOT NULL,
    user text NOT NULL,
  );
  CREATE TABLE IF NOT EXISTS subscriber (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    channelId text NOT NULL,
    userId text NOT NULL
  );
  CREATE TABLE IF NOT EXISTS user (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    userId text NOT NULL,
    userName text NOT NULL,
    password text NOT NULL
  );
  `);
}

module.exports = createDbConnection;