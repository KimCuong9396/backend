const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// @route   GET /api/users/me
// @desc    Lấy thông tin người dùng hiện tại
// @access  Private
router.get("/me", auth, userController.getCurrentUser);

module.exports = router;
