const express = require("express");
const router = express.Router();
const {
  saveVocabulary,
  getVocabularyHistory,
} = require("../controllers/vocabularyController");
const authMiddleware = require("../middleware/auth");

router.post("/save", authMiddleware, saveVocabulary);
router.get("/history", authMiddleware, getVocabularyHistory);

module.exports = router;
