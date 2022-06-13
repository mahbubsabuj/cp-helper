const mongoose = require("mongoose");

//name, list of problems

const ladderSchema = mongoose.Schema({
  name: { type: String, require: true },
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Problem" }],
});

exports.Ladder = mongoose.model("Ladder", ladderSchema);
