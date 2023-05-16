const { Router } = require("express");
const router = new Router();

const { getBoard } = require("../models/board");
const { createChannel, getChannel } = require("../models/channel");
const { subscribeToChannel } = require("../models/subscriber");
const { createUser, getUserIdByUsername } = require("../models/user");

router.get("/board", (req, res) => {
  const channelId = req.query.channelId;

  getBoard(channelId)
    .then(() => {
      res.json({ message: "Board retrieved" });
    })
    .catch((error) => {
      console.log("Error retrieving board:", error);
      res.status(500).json({ error: "Failed to retrieve board" });
    });
});

router.post("/channel", (req, res) => {
  createChannel(req.body.owner)
    .then(() => {
      res.json({ message: "Channel created" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to create channel" });
    });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  createUser(username, password)
    .then(() => {
      const userId = getUserIdByUsername(username);

      const channelId = "channelId"; // Replace with the actual channelId

      subscribeToChannel(channelId, userId)
        .then(() => {
          res.json({ message: "User signed up and subscribed to a channel" });
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .json({ error: "Failed to subscribe user to channel" });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to create user" });
    });
});

module.exports = router;
