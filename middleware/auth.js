const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Lấy token từ header
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  // Kiểm tra nếu không có token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Không có token, xác thực thất bại" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token không hợp lệ" });
  }
};
// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token)
//     return res.status(401).json({ message: "Không có quyền truy cập" });

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET || "your_jwt_secret"
//     );
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Token không hợp lệ" });
//   }
// };

// module.exports = authMiddleware;
