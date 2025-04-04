// controllers/wordController.js
const Word = require("../models/Word");

// @desc    Thêm từ vựng mới (Create)
// @route   POST /api/words
// @access  Public (hoặc Private nếu cần auth)
exports.createWord = async (req, res) => {
  try {
    const { word, meaning, image, pronunciation, example } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!word || !meaning || !image || !pronunciation || !example) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin từ vựng" });
    }

    // Kiểm tra từ vựng đã tồn tại chưa
    const existingWord = await Word.findOne({ word });
    if (existingWord) {
      return res.status(400).json({ message: "Từ vựng đã tồn tại" });
    }

    const newWord = new Word({
      word,
      meaning,
      image,
      pronunciation,
      example,
    });

    await newWord.save();
    res.status(201).json({ message: "Đã thêm từ vựng mới", word: newWord });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// @desc    Lấy danh sách từ vựng (Read)
// @route   GET /api/words
// @access  Public
exports.getAllWords = async (req, res) => {
  try {
    const words = await Word.find().sort({ word: 1 }); // Sắp xếp theo thứ tự alphabet
    res.status(200).json({ words });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// @desc    Lấy thông tin một từ vựng theo ID (Read single)
// @route   GET /api/words/:id
// @access  Public
exports.getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) {
      return res.status(404).json({ message: "Không tìm thấy từ vựng" });
    }
    res.status(200).json({ word });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// @desc    Cập nhật từ vựng (Update)
// @route   PUT /api/words/:id
// @access  Public (hoặc Private nếu cần auth)
exports.updateWord = async (req, res) => {
  try {
    const { word, meaning, image, pronunciation, example } = req.body;

    const updatedWord = await Word.findByIdAndUpdate(
      req.params.id,
      { word, meaning, image, pronunciation, example },
      { new: true, runValidators: true } // Trả về bản ghi đã cập nhật và chạy validation
    );

    if (!updatedWord) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy từ vựng để cập nhật" });
    }

    res.status(200).json({ message: "Đã cập nhật từ vựng", word: updatedWord });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// @desc    Xóa từ vựng (Delete)
// @route   DELETE /api/words/:id
// @access  Public (hoặc Private nếu cần auth)
exports.deleteWord = async (req, res) => {
  try {
    const word = await Word.findByIdAndDelete(req.params.id);
    if (!word) {
      return res.status(404).json({ message: "Không tìm thấy từ vựng để xóa" });
    }
    res.status(200).json({ message: "Đã xóa từ vựng thành công" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Lỗi server" });
  }
};
