const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  image: { type: String, required: true },
  pronunciation: { type: String, required: true },
  example: { type: String, required: true },
});

module.exports = mongoose.model("Word", wordSchema);
