const express = require("express");
const app = express();
const PORT = 8000;

const createDbConnection = require("./models/db");

const shuiRouter = require("./routes/shui");

app.use(express.json());
app.use("/api/shui", shuiRouter);

try {
  createDbConnection();
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
} catch (error) {
  console.log("Failed to connect to the database:", error);
}
