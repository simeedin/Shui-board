const { Router } = require("express");
const router = new Router();
const { v4: uuidv4 } = require("uuid");

const { getBoard, createBoard } = require("../models/board");
const { createChannel, getChannel } = require("../models/channel");
const { subscribeToChannel } = require("../models/subscriber");
const { createUser } = require("../models/user");
const {createMessage, insertMessage} = require('../models/message');

router.get("/board", async (req, res) => {
  try {
    const board = await getBoard();

    res.json({ success: true, board: board });
} catch (error) {
    res.json({ success: false, message: 'Could not get board' });
}

});

router.post("/channel", (req, res) => {
  const channelId = uuidv4();
  const owner = req.body.owner;
  createChannel(owner, channelId)
    .then(() => {
      createBoard(channelId)
      res.json({ message: "Channel created", channelId: channelId });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to create channel" });
    });
});

router.get("/channel", async (req, res) => {
  const channelId = req.body.channelId;
  try {
    const channel = await getChannel(channelId); //undefined
    console.log(channel)
    res.json({ success: true, channel: channel });
} catch (error) {
    res.json({ success: false, message: 'Could not get channel' });
}
});

router.post('/message', (req, res) => {
  const {content, userId, channelId} = req.body;
  const messageId = uuidv4();

  try {
    createMessage(messageId, content, userId, channelId);
    insertMessage(messageId, channelId)
    res.json({ success: true, message: content});
  } catch (error) {
    res.json({ success: false, message: 'Could not create message'})
  }

  
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  // const user = await getAllUsers();
  const userId = uuidv4();

  createUser(userId, username, password)
    .then(() => {
      // const channelId = "channelId"; // Replace with the actual channelId
      res.json({ message: "User signed up", userId: userId});
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to create user" });
    });
});

router.post('/subscribe', (req, res) => {
  const {channelId, userId} = req.body;

  subscribeToChannel(channelId, userId)
        .then(() => {
          res.json({ message: "User signed up and subscribed to a channel"});
        })
        .catch((error) => {
          console.log(error);
          res
            .status(500)
            .json({ error: "Failed to subscribe user to channel" });
        });

})

module.exports = router;
