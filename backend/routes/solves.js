const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Solve } = require("../models/solve");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const solved = await Solve.find({ userId });
  if (!solved) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).json({ success: true, solved: solved });
});

router.post("/", async (req, res) => {
  const { userId, problemId } = req.body;
  let solve = new Solve({ userId, problemId });
  solve = await solve.save();
  if (!solve) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(201).json({ success: true, solve: solve });
});

router.delete("/:problemId", async (req, res) => {
  const problemId = req.params.problemId;
  const userId = req.query.userId;
  const deleted = await Solve.findOneAndDelete({ problemId, userId });
  if (!deleted) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).json({ success: true, message: "" });
});

module.exports = router;
