const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { User } = require("../models/user");
const salt = process.env.SALT;

router.get("/", async (req, res) => {
  const users = await User.find();
  if (!users) {
    return res.status(404).json({ success: false, message: "" });
  }
  res.status(200).json({ success: true, users: users });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(500).json({ success: false, message: "Invalid user id" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).json({ success: true, user: user });
});

router.post("/", async (req, res) => {
  const { name, email, city, country, password, isAdmin } = req.body;
  let user = new User({
    name,
    email,
    city,
    country,
    passwordHash: bcrypt.hashSync(password, +salt),
    isAdmin,
  });
  user = await user.save();
  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "user cannot be created!" });
  }
  return res.status(201).json({ success: true, user: user });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(500)
      .json({ success: false, mesasge: "Invalid user id!" });
  }
  const userPrev = await User.findById(id);
  if (!userPrev) {
    return res.status(500).json({
      success: false,
      message: "the user cannot be updated!",
    });
  }
  const { name, email, city, country, password, isAdmin } = req.body;
  const user = await User.findByIdAndUpdate(
    id,
    {
      name: name || userPrev.name,
      email: email || userPrev.email,
      city: city || userPrev.city,
      country: country || userPrev.country,
      passwordHash: password
        ? bcrypt.hashSync(password, +salt)
        : userPrev.passwordHash,
      isAdmin: isAdmin || userPrev.isAdmin,
    },
    { new: true }
  );
  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "the user cannot be updated!" });
  }
  return res.status(200).json({ success: true, user: user });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(500).json({ success: false, message: "invalid user id" });
  }
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res
      .status(500)
      .json({ success: false, message: "the user cannot be deleted!" });
  }
  return res
    .status(200)
    .json({ success: true, message: "user deleted successfully" });
});

router.get("/get/count", async (req, res) => {
  const userCount = await User.countDocuments();
  if (!userCount) {
    return res.status(500).json({ success: false, message: "" });
  }
  return res.status(200).json({ success: true, userCount: userCount });
});

module.exports = router;
