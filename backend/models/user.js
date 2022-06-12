const mongoose = require("mongoose");

//name, email, city, country, passwordHash, onlineJudge handles(will be added), .......

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, default: "" },
  country: { type: String, default: "" },
  passwordHash: { type: 
    String, required: true },
  isAdmin: { type: Boolean, default: "" },
  //... and some other fields
});

exports.User = mongoose.model("User", userSchema);
