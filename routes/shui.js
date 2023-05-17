const { Router } = require("express");
const router = new Router();
const { v4: uuidv4 } = require("uuid");

const { getBoard, createBoard } = require("../models/board");
const { createChannel, getChannel } = require("../models/channel");
const { subscribeToChannel } = require("../models/subscriber");
const { createUser, getUserIdByUsername } = require("../models/user");
const {createMessage} = require('../models/message');

router.get("/board", async (req, res) => {
  // const channelId = req.query.channelId;
  try {
    const board = await getBoard();

    res.json({ success: true, board: board });
} catch (error) {
    res.json({ success: false, message: 'Could not get board' });
}

  // getBoard()
  //   .then(() => {
  //     res.json({ message: "Board retrieved" });
  //   })
  //   .catch((error) => {
  //     console.log("Error retrieving board:", error);
  //     res.status(500).json({ error: "Failed to retrieve board" });
  //   });
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
    const channel = await getChannel(channelId);
    console.log(channel)
    res.json({ success: true, channel: channel });
} catch (error) {
    res.json({ success: false, message: 'Could not get channel' });
}
});

router.post('/message', (req, res) => {
  const {channelId, userId, content} = req.body;
  const messageId = uuidv4();
  
  try {
    createMessage(channelId, userId, content, messageId);
    res.json({ success: true, message: content});
  } catch (error) {
    res.json({ success: false, message: 'Could not create message'})
  }

  
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  // const user = await getAllUsers();
  const userId = uuidv4();

  createUser(username, password, userId)
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
