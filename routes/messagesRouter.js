const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
const { addMessage, displayChannelMessages } = require("../models/message");
const { checkChannelId, checkValidUser } = require("../middleware/channel");

router.post("/", checkChannelId, checkValidUser, (req, res) => {
  const { content, username, channelId } = req.body;
  const messageId = uuidv4();
  const createdAt = moment().format('YY/MM/DD, h:mm:ss a');

  try {
    addMessage(messageId, content, username, createdAt, channelId);
    res.json({ success: true, message: content, username: username, createdAt: createdAt, channelId: channelId });
  } catch (error) {
    res.json({ success: false, message: "Could not create message" });
  }
});

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
