const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  name: String,
  Price: Number,
});
let Model = mongoose.model("products", modelSchema);
module.exports = Model;
