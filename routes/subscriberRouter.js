const express = require("express");
const router = express.Router();
const { checkUser, checkChannelId } = require("../middleware/channel");
const { subscribeToChannel, getSubscribers } = require("../models/subscriber");

router.post("/", checkChannelId, checkUser, (req, res) => {
  const { channelId, username } = req.body;

  subscribeToChannel(channelId, username)
    .then(() => {
      res.json({
        message: "User subscribed to a channel",
        channelId: channelId,
        username: username,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to subscribe user to channel" });
    });
});

router.get("/", checkChannelId, async (req, res) => {
  const { channelId } = req.body;

  try {
    const allSubscribers = await getSubscribers(channelId);
    res.json({ success: true, subscribers: allSubscribers });
  } catch (error) {
    res.json({ success: false, message: "Could not get subscribers" });
  }
});

module.exports = router;
