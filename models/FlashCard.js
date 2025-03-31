const mongoose = require("mongoose");

const flashCardSchema = new mongoose.Schema({
  front: { type: String, required: true, unique: true },
  back: { type: String, required: true },
  image: { type: String },
  audio: { type: String },
});

const FlashCard = mongoose.model("FlashCard", flashCardSchema);

module.exports = FlashCard;
