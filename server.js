const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Khởi tạo app Express
const app = express();

// Middleware
app.use(express.json()); // Xử lý JSON
app.use(express.urlencoded({ extended: true })); // Xử lý x-www-form-urlencoded
app.use(cors());

// Kết nối database
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
app.use("/api/learning", require("./routes/learning"));
app.use("/api/words", require("./routes/word"));
app.use("/api/vocabulary", require("./routes/vocabulary"));
// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));
