const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { createUser } = require("../models/user");
const { checkUsername } = require("../middleware/user");

router.post("/signup", checkUsername, (req, res) => {
  const { username, password } = req.body;
  const userId = uuidv4();

  createUser(userId, username, password)
    .then(() => {
      res.json({
        message: "User signed up",
        userId: userId,
        username: username,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Failed to create user" });
    });
});

module.exports = router;
