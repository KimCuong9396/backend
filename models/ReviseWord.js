const mongoose = require("mongoose");

const ReviseWordSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  pronunciation: { type: String },
  example: { type: String },
  difficulty: { type: String, enum: ["easy", "difficult"], required: true }, // Phân nhóm dễ/khó
  nextReview: { type: Date, required: true }, // Lịch ôn tập
});

const ReviseWord = mongoose.model("ReviseWord", ReviseWordSchema);

module.exports = ReviseWord;
