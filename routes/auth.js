const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// @route   POST /api/auth/register
// @desc    Đăng ký tài khoản mới
// @access  Public
router.post("/register", authController.register);

// @route   POST /api/auth/login
// @desc    Đăng nhập
// @access  Public
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
