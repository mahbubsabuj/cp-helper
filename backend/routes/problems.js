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

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    res.status(500).json({ success: false, message: "Invalid problem id!" });
  } else {
    const { name, difficulty, tags, judgeName, link } = req.body;
    const prev = await Problem.findOne({ _id: id });
    if (!prev) {
      res.status(500).json({
        success: false,
        message: "Cannot update problem with given id!",
      });
    } else {
      const problem = await Problem.findByIdAndUpdate(
        id,
        {
          name: name || prev.name,
          difficulty: difficulty || prev.difficulty,
          tags: tags || prev.tags,
          judgeName: judgeName || prev.judgeName,
          link: link || prev.link,
        },
        { new: true }
      );
      if (!problem) {
        res.status(500).json({
          success: false,
          message: "Cannot update problem with given id!",
        });
      } else {
        res.status(201).json({ success: true, problem: problem });
      }
    }
  }
});

router.get("/get/count", async (req, res) => {
  const problemCount = await Problem.countDocuments();
  if (!problemCount) {
    res.status(404).json({ success: false, message: "" });
  } else {
    res.status(200).json({ success: true, problemCount: problemCount });
  }
});

module.exports = router;
