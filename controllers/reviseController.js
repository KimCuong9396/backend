const UserProgress = require("../models/UserProgress");

const getReviewWords = async (req, res) => {
  const userId = req.user.id; // Lấy user từ JWT

  try {
    // Lấy danh sách từ cần ôn tập (có thời gian nhắc lại <= thời gian hiện tại)
    const wordsDue = await UserProgress.find({
      user_id: userId,
      nextReview: { $lte: new Date() },
    });

    // Phân loại từ thành nhóm "Dễ" và "Khó"
    const difficultWords = wordsDue.filter(
      (word) => word.status === "difficult"
    );
    const easyWords = wordsDue.filter((word) => word.status === "easy");

    res.json({ difficultWords, easyWords });
  } catch (error) {
    res.status(500).json({ error: "Lỗi tải danh sách ôn tập" });
  }
};

module.exports = { getReviewWords };
