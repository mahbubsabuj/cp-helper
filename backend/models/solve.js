const mongoose = require("mongoose");

const solveSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
});

exports.Solve = mongoose.model("Solve", solveSchema);
