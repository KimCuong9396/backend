const VocabularyHistory = require("../models/VocabularyHistory");

// @desc    Lưu từ vựng đã học
// @route   POST /api/vocabulary/save
// @access  Private
exports.saveVocabulary = async (req, res) => {
  try {
    const { wordId, status } = req.body;
    const userId = req.user.id; // Lấy từ middleware xác thực

    // Kiểm tra từ vựng đã được lưu chưa
    const existingEntry = await VocabularyHistory.findOne({ userId, wordId });
    if (existingEntry) {
      return res.status(400).json({ message: "Từ vựng đã được lưu trước đó" });
    }

    const newHistory = new VocabularyHistory({
      userId,
      wordId,
      status: status || "learned",
    });

    await newHistory.save();
    res.status(200).json({ message: "Đã lưu từ vựng", history: newHistory });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// @desc    Lấy danh sách từ vựng đã học (dùng cho ôn tập)
// @route   GET /api/vocabulary/history
// @access  Private
exports.getVocabularyHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await VocabularyHistory.find({ userId })
      .populate("wordId") // Lấy thông tin chi tiết từ Word
      .sort({ learnedAt: -1 });
    res.status(200).json({ history });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};
