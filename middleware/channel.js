const {
  checkChannelExists,
  checkChannelNameExists,
} = require("../models/channel");
const {
  checkUsernameExists,
  userIsSubscribed,
} = require("../models/user");

async function checkUser(req, res, next) {
  const { username } = req.body;
  const check = await checkUsernameExists(username);

  // if valid user exists
  if (check == true) {
    next();
  } else {
    res.json({ success: false, message: "Invalid username" });
  }
}

//for posting message:
async function checkValidUser(req, res, next) {
  const { username, channelId } = req.body;
  const userExists = await checkUsernameExists(username);
  // user is subscribed or owns channel:
  const isSubscribed = await userIsSubscribed(channelId, username);

  if (userExists && isSubscribed) {
    next();
  } else {
    res.json({
      success: false,
      message: "Invalid user: user does not have permission to post",
    });
  }
}

async function checkChannelId(req, res, next) {
  const { channelId } = req.body;
  const check = await checkChannelExists(channelId);

  if (check == true) {
    next();
  } else {
    res.json({ success: false, message: "Invalid channel id" });
  }
}

async function checkChannelName(req, res, next) {
  const { channelName } = req.body;
  const check = await checkChannelNameExists(channelName);

  if (!check) {
    next();
  } else {
    res.json({ success: false, message: "Channel name already exists" });
  }
}

module.exports = {
  checkUser,
  checkChannelId,
  checkChannelName,
  checkValidUser,
};
