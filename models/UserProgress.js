const mongoose = require("mongoose");

const UserProgressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  word: { type: String, required: true },
  status: { type: String, enum: ["easy", "difficult"], required: true },
  next_review: { type: Date, required: true },
});

module.exports = mongoose.model("UserProgress", UserProgressSchema);
