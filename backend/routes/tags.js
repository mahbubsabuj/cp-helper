const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Tag } = require("../models/tag");

router.get("/", async (req, res) => {
  const tagList = await Tag.find();
  if (!tagList) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).json({ success: true, tagList: tagList });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const tag = await Tag.findById(id);
  if (!tag) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).json({ success: true, tag: tag });
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  let tag = new Tag({ name });
  tag = await tag.save();
  if (!tag) {
    return res
      .status(500)
      .json({ success: false, message: "The tag cannot be created" });
  }
  return res.status(200).json({ success: true, problem: tag });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(500).json({ success: false, message: "Invalid tag id!" });
  }
  const tag = await Tag.findByIdAndDelete(id);
  if (!tag) {
    return res.status(500).json({
      success: false,
      message: "tag with given id cannot be deleted!",
    });
  }
  return res
    .status(204)
    .json({ success: true, message: "successfully deleted!" });
});

router.get("/", async (req, res) => {
  const tagCount = await Tag.countDocuments();
  if (!tagCount) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).json({ success: true, tagCount: tagCount });
});



module.exports = router;
