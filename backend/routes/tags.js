const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Tag } = require("../models/tag");

router.post("/", async (req, res) => {
  const { name } = req.body;
  let tag = new Tag({ name });
  tag = await tag.save();
  if (!tag) {
    res
      .status(500)
      .json({ success: false, message: "The tag cannot be created" });
  } else {
    res.status(200).json({ success: true, problem: tag });
  }
});

module.exports = router;
