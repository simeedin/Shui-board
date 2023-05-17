const { Router } = require("express");
const router = new Router();
const { getBoard } = require("../models/board");

router.get("/board", async (req, res) => {
  try {
    const board = await getBoard();

    res.json({ success: true, board: board });
  } catch (error) {
    res.json({ success: false, message: "Could not get board" });
  }
});

module.exports = router;
