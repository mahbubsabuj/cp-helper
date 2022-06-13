const mongoose = require("mongoose");

//problem = name, difficulty, tags, judgeName, link

const ProblemSchema = mongoose.Schema({
  name: { type: String, require: true },
  difficulty: { type: String, require: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  judgeName: { type: String, require: true },
  link: { type: String, require: true },
});

exports.Problem = mongoose.model("Problem", ProblemSchema);
