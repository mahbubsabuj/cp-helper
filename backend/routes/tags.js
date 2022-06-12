const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Tag } = require("../models/tag");

router.get("/", async (req, res) => {
  const tagList = await Tag.find();
  if (!tagList) {
    res.status(500).json({ success: false, message: "" });
  } else {
    res.status(200).json({ success: true, tagList: tagList });
  }
});

router.get("/:id", async(req, res) => {
  const id = req.params.id;
  const tag = await Tag.findById(id)
  if (!tag) {
    res.status(500).json({success: false, message: ""})
  } else {
    res.status(200).json({success: true, tag: tag})
  }
}) 

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

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    res.status(500).json({ success: false, message: "Invalid tag id!" });
  } else {
    const tag = await Tag.findByIdAndDelete(id);
    if (!tag) {
      res.status(500).json({
        success: false,
        message: "tag with given id cannot be deleted!",
      });
    } else {
      res.status(204).json({ success: true, message: "successfully deleted!" });
    }
  }
});

module.exports = router;
