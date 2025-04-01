const express = require("express");
const {
  getUserProgress,
  updateUserProgress,
} = require("../controllers/progressController");
const authenticateUser = require("../middleware/authMiddleware"); // Middleware xác thực

const router = express.Router();

router.get("/update", authenticateUser, getUserProgress); // Lấy danh sách từ đã học
router.post("/update", authenticateUser, updateUserProgress); // Lưu từ đã học

module.exports = router;
