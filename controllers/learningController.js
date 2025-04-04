const LearningProgress = require("../models/LearningProgress");

// @desc    Lấy tất cả dữ liệu học tập của người dùng
// @route   GET /api/learning
// @access  Private
exports.getLearningProgress = async (req, res) => {
  try {
    const learningProgress = await LearningProgress.find({
      userId: req.user.id,
    }).sort({ lastAccessed: -1 });
    res.json(learningProgress);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// @desc    Thêm hoặc cập nhật dữ liệu học tập
// @route   POST /api/learning
// @access  Private
exports.updateLearningProgress = async (req, res) => {
  try {
    const { courseName, progress } = req.body;

    if (!courseName || progress === undefined) {
      return res
        .status(400)
        .json({ message: "Thiếu thông tin khóa học hoặc tiến độ" });
    }

    if (progress < 0 || progress > 100) {
      return res.status(400).json({ message: "Tiến độ phải từ 0 đến 100%" });
    }

    // Tìm và cập nhật, nếu không tồn tại thì tạo mới (upsert)
    const learningData = await LearningProgress.findOneAndUpdate(
      { userId: req.user.id, courseName },
      {
        progress,
        lastAccessed: Date.now(),
      },
      { new: true, upsert: true }
    );

    res.json(learningData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// @desc    Xóa dữ liệu học tập
// @route   DELETE /api/learning/:courseId
// @access  Private
exports.deleteLearningProgress = async (req, res) => {
  try {
    const learningProgress = await LearningProgress.findById(
      req.params.courseId
    );

    if (!learningProgress) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy dữ liệu học tập" });
    }

    // Kiểm tra người dùng có quyền xóa
    if (learningProgress.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Không có quyền xóa dữ liệu này" });
    }

    await learningProgress.remove();
    res.json({ message: "Đã xóa dữ liệu học tập" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};
