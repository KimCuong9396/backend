const Word = require("../models/word");

// Lấy danh sách tất cả các từ
const getWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
};

// Thêm một từ mới
// Thêm từ mới, kiểm tra từ không được trùng
const addWord = async (req, res) => {
  try {
    const { word, meaning, image, pronunciation, example } = req.body;

    // Kiểm tra từ đã tồn tại chưa
    const existingWord = await Word.findOne({ word: word });
    if (existingWord) {
      return res
        .status(400)
        .json({ message: "Từ này đã tồn tại trong hệ thống." });
    }

    // Nếu chưa có, tạo từ mới
    const newWord = new Word({
      word,
      meaning,
      image,
      pronunciation,
      example,
    });

    await newWord.save();
    res.status(201).json({ message: "Thêm từ thành công!", word: newWord });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xóa một từ
const deleteWord = async (req, res) => {
  try {
    const { id } = req.params;
    await Word.findByIdAndDelete(id);
    res.json({ message: "Xóa thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa" });
  }
};

module.exports = { getWords, addWord, deleteWord };
