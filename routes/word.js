// routes/word.js
const express = require("express");
const router = express.Router();
const {
  createWord,
  getAllWords,
  getWordById,
  updateWord,
  deleteWord,
} = require("../controllers/wordController");

// Nếu cần bảo vệ các route bằng auth, thêm middleware authMiddleware
const authMiddleware = require("../middleware/auth");

// Thêm từ vựng mới
router.post("/", createWord); // Có thể thêm authMiddleware: router.post("/", authMiddleware, createWord)

// Lấy tất cả từ vựng
router.get("/", getAllWords);

// Lấy một từ vựng theo ID
router.get("/:id", getWordById);

// Cập nhật từ vựng
router.put("/:id", updateWord); // Có thể thêm authMiddleware

// Xóa từ vựng
router.delete("/:id", deleteWord); // Có thể thêm authMiddleware

module.exports = router;
