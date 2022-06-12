const mongoose = require("mongoose");

//problem = name,

const tagSchema = mongoose.Schema({
  name: { type: String, require: true },
});

exports.Tag = mongoose.model("Tag", tagSchema);
