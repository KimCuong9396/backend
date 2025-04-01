const Progress = require("../models/Progress");

// Lấy danh sách từ đã học của người dùng hiện tại
const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ token

    if (!userId) {
      return res.status(401).json({ message: "Bạn chưa đăng nhập" });
    }

    const words = await Progress.find({ userId });
    res.status(200).json(words);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi server khi lấy danh sách từ đã học", error });
  }
};

// Cập nhật từ đã học của người dùng
const updateUserProgress = async (req, res) => {
  const { word } = req.body;
  const userId = req.user.id; // Lấy userId từ token

  if (!userId || !word) {
    return res.status(400).json({ message: "Thiếu thông tin cần thiết" });
  }

  try {
    let updatedWord = await Progress.findOneAndUpdate(
      { word, userId }, // Tìm từ đã học theo userId và từ
      { word, userId },
      { new: true, upsert: true } // Nếu chưa có thì tạo mới
    );

    res.status(200).json({ message: "Đã lưu từ vựng", updatedWord });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lưu từ vựng", error });
  }
};

module.exports = { getUserProgress, updateUserProgress };
