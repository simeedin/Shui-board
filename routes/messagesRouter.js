const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { createMessage, displayChannelMessages } = require("../models/message");
const { checkChannelId, checkValidUser } = require("../middleware/channel");

router.post("/", checkChannelId, checkValidUser, (req, res) => {
  const { content, username, channelId } = req.body;
  const messageId = uuidv4();

  try {
    createMessage(messageId, content, username, channelId);
    // insertMessage(messageId, channelId);
    res.json({ success: true, message: content, username: username });
  } catch (error) {
    res.json({ success: false, message: "Could not create message" });
  }
});

//get all messages som finns i en channel
router.get("/", checkChannelId, async (req, res) => {
  const { channelId } = req.body;

  try {
    const allMessages = await displayChannelMessages(channelId);
    res.json({ success: true, messages: allMessages });
  } catch (error) {
    res.json({ success: false, message: "fail" });
  }
});

module.exports = router;
