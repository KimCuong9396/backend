const express = require("express");
const {
  getWords,
  addWord,
  deleteWord,
} = require("../controllers/wordController");
const router = express.Router();

router.get("/", getWords);
router.post("/", addWord);
router.delete("/:id", deleteWord);

module.exports = router;
