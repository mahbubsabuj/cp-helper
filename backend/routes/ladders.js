const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Ladder } = require("../models/ladder");

router.get("/", async (req, res) => {
  const ladderList = await Ladder.find();
  if (!ladderList) {
    res.status(500).json({ success: false, message: "" });
  } else {
    res.status(200).json({ success: true, ladderList: ladderList });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const ladder = await Ladder.findById(id);
  if (!ladder) {
    res.status(404).json({ success: false, message: "" });
  } else {
    res.status(200).json({ success: true, ladder: ladder });
  }
});

router.post("/", async (req, res) => {
  const { name, problems } = req.body;
  let ladder = new Ladder({name, problems});
  ladder = await ladder.save();
  if (!ladder) {
      res.status(500).json({success: false, message: ""})
  } else {
      res.status(201).json({success: true, ladder: ladder})
  }
});

module.exports = router;
