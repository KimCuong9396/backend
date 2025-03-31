// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const wordRoutes = require("./routes/wordRoutes");

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json()); // Thay thế bodyParser.json()

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server chạy trên cổng ${PORT}`));
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const auth = require("./routes/authRoutes");
const flashCards = require("./routes/flashCardRoutes");
const words = require("./routes/wordRoutes");
const app = express();
// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:5181", // Cho phép frontend gọi API
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Thay thế bodyParser.urlencoded()
// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/auth", auth);
app.use("/api/words", words);
app.use("/api/flashCards", flashCards);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
