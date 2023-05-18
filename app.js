const express = require("express");
const app = express();
const PORT = 8000;
const createDbConnection = require("./models/db");

const shuiRouter = require("./routes/shui");
const userRouter = require("./routes/userRouter");
const channelRouter = require("./routes/channelRouter");
const messagesRouter = require("./routes/messagesRouter");
const subscriberRouter = require("./routes/subscriberRouter");

app.use(express.json());

app.use("/api/shui", shuiRouter);
app.use("/api/user", userRouter);
app.use("/api/channel", channelRouter);
app.use("/api/message", messagesRouter);
app.use("/api/subscribe", subscriberRouter);

try {
  createDbConnection();
  console.log("Database connected");

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
} catch (error) {
  console.log("Failed to connect to the database:", error);
}
