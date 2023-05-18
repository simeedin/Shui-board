const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { createBoard } = require("../models/board");
const { createChannel, getChannel } = require("../models/channel");
const {
  checkUser,
  checkChannelId,
  checkChannelName,
} = require("../middleware/channel");
const { subscribeToChannel } = require("../models/subscriber");

router.post("/", checkUser, checkChannelName, (req, res) => {
  const channelId = uuidv4();
  const { username, channelName } = req.body;

  createChannel(username, channelId, channelName)
    .then(() => {
      createBoard(channelId);
      subscribeToChannel(channelId, username);
      res.json({ message: "Channel created", channelId: channelId });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to create channel" });
    });
});

router.get("/", checkChannelId, async (req, res) => {
  const { channelId } = req.body;
  try {
    const channel = await getChannel(channelId);
    console.log(channel);
    res.json({ success: true, channel: channel });
  } catch (error) {
    res.json({ success: false, message: "Could not get channel" });
  }
});

module.exports = router;
