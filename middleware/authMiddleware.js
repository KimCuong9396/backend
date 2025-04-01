const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Giả sử bạn có model User

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập" });
  }

  try {
    // Giải mã token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Người dùng không tồn tại" });
    }

    req.user = user; // Gán thông tin người dùng vào request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Xác thực thất bại", error });
  }
};

module.exports = authenticateUser;
