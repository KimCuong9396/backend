const mongoose = require("mongoose");

const vocabularyHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  wordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Word",
    required: true,
  },
  status: {
    type: String,
    enum: ["learned", "review"],
    default: "learned",
  },
  learnedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VocabularyHistory", vocabularyHistorySchema);
