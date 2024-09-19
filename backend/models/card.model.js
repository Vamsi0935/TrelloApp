const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: String,
  labels: [String],
  date: String,
  tasks: [String],
  desc: String,
});

module.exports = mongoose.model("Board", cardSchema);
