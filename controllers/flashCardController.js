const FlashCard = require("../models/FlashCard");

// Lấy tất cả FlashCards
const getAllFlashCards = async (req, res) => {
  try {
    const flashCards = await FlashCard.find();
    res.json(flashCards);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Tạo mới FlashCard
const createFlashCard = async (req, res) => {
  const { front, back, image, audio } = req.body;

  try {
    // Kiểm tra nếu đã tồn tại
    const existingCard = await FlashCard.findOne({ front });
    if (existingCard) {
      return res.status(400).json({ message: "FlashCard đã tồn tại!" });
    }

    const newCard = new FlashCard({ front, back, image, audio });
    await newCard.save();

    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = { getAllFlashCards, createFlashCard };
