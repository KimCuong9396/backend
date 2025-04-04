const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/learning-platform",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Đã kết nối MongoDB");
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
