const { checkUsernameExists } = require("../models/user");

async function checkUsername(req, res, next) {
  const { username } = req.body;
  const check = await checkUsernameExists(username);

  if (!check) {
    next();
  } else {
    res.json({ success: false, message: "Username already exists" });
  }
}

module.exports = { checkUsername };
