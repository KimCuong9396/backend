const express = require("express");
const router = express.Router();
const { getReviewWords } = require("../controllers/reviseController");
const authenticateUser = require("../middleware/authenticateUser");

router.get("/due", authenticateUser, getReviewWords);

module.exports = router;
