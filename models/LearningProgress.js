const mongoose = require("mongoose");

const learningProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
});

// Index cho tìm kiếm tối ưu
learningProgressSchema.index({ userId: 1, courseName: 1 }, { unique: true });

module.exports = mongoose.model("LearningProgress", learningProgressSchema);
