const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});
let User = mongoose.model("User", modelSchema);
module.exports = User;
