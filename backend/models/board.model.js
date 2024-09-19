const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: String,
  labels: [String],
  date: String,
  tasks: [String],
  desc: String,
});

const boardSchema = new mongoose.Schema({
  title: String,
  cards: [cardSchema],
});

module.exports = mongoose.model("Board", boardSchema);
