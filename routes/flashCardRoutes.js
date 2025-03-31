const express = require("express");
const {
  getAllFlashCards,
  createFlashCard,
} = require("../controllers/flashCardController"); // Kiểm tra đúng đường dẫn

const router = express.Router();

// Định nghĩa route GET để lấy tất cả FlashCards
router.get("/", getAllFlashCards);

// Định nghĩa route POST để tạo mới FlashCard
router.post("/", createFlashCard);

module.exports = router;
