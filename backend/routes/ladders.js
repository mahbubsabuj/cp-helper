const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Ladder } = require("../models/ladder");

router.get("/", async (req, res) => {
  const ladderList = await Ladder.find().populate({
    path: "problems",
    populate: "tags",
  });
  if (!ladderList) {
    return res.status(500).json({ success: false, message: "" });
  }
  res.status(200).json({ success: true, ladderList: ladderList });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const ladder = await Ladder.findById(id).populate({
    path: "problems",
    populate: "tags",
  });
  if (!ladder) {
    return res.status(404).json({ success: false, message: "" });
  }
  return res.status(200).json({ success: true, ladder: ladder });
});

router.post("/", async (req, res) => {
  const { name, problems } = req.body;
  let ladder = new Ladder({ name, problems });
  ladder = await ladder.save();
  if (!ladder) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(201).json({ success: true, ladder: ladder });
});

router.get("/get/count", async (req, res) => {
  const ladderCount = await Ladder.countDocuments();
  if (!ladderCount) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).json({ success: true, ladderCount: ladderCount });
});

module.exports = router;
