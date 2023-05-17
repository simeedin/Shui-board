const sqlite3 = require("sqlite3").verbose();

function createDbConnection() {
  const db = new sqlite3.Database("./shuiBoard.sqlite", (error) => {
    if (error) return console.log(error.message);
    createTable(db);
  });

  return db;
}

function createTable(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS board (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      channelId TEXT NOT NULL,
      FOREIGN KEY (channelId) REFERENCES channel(channelId)
    );
    
    CREATE TABLE IF NOT EXISTS message (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      messageId TEXT NOT NULL,
      content TEXT NOT NULL,
      user TEXT NOT NULL,
      channelId TEXT NOT NULL,
      FOREIGN KEY (channelId) REFERENCES channel(channelId)
    );
    
    CREATE TABLE IF NOT EXISTS channel (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      owner TEXT NOT NULL,
      channelId TEXT NOT NULL,
      messageId VARCHAR(300),
      FOREIGN KEY (messageId) REFERENCES message(messageId)
    );
    
    CREATE TABLE IF NOT EXISTS subscriber (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      channelId TEXT NOT NULL,
      userId TEXT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS user (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `);
}

module.exports = createDbConnection;
