const express = require("express");
const router = express.Router();
const learningController = require("../controllers/learningController");
const auth = require("../middleware/auth");

// @route   GET /api/learning
// @desc    Lấy tất cả dữ liệu học tập của người dùng
// @access  Private
router.get("/", auth, learningController.getLearningProgress);

// @route   POST /api/learning
// @desc    Thêm hoặc cập nhật dữ liệu học tập
// @access  Private
router.post("/", auth, learningController.updateLearningProgress);

// @route   DELETE /api/learning/:courseId
// @desc    Xóa dữ liệu học tập
// @access  Private
router.delete("/:courseId", auth, learningController.deleteLearningProgress);

module.exports = router;
