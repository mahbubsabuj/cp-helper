const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Problem } = require("../models/problem");

router.get("/", async (req, res) => {
  const problemList = await Problem.find().populate("tags");
  if (!problemList) {
    res.status(500).json({ success: false, message: "" });
  } else {
    res.status(200).json({ success: true, problemList: problemList });
  }
});

router.post("/", async (req, res) => {
  const { name, difficulty, tags, judgeName, link } = req.body;
  let problem = new Problem({
    name,
    difficulty,
    tags,
    judgeName,
    link,
  });
  problem = await problem.save();
  if (!problem) {
    res
      .status(500)
      .json({ success: false, message: "The problem cannot be created" });
  } else {
    res.status(200).json({ success: true, problem: problem });
  }
});

module.exports = router;
