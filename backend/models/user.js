const mongoose = require("mongoose");

//name, email, city, country, passwordHash, onlineJudge handles(will be added), .......

const userSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  city: {type: String, required: true},
  country: {type: String, required: true},
  passwordHash: {type: String, required: true},
  //... and some other fields
});


exports.User = mongoose.model("User", userSchema);
