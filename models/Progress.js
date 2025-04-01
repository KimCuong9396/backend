const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Liên kết với model User
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  learnedAt: {
    type: Date,
    default: Date.now, // Lưu thời gian học từ vựng
  },
});

module.exports = mongoose.model("Progress", ProgressSchema);
