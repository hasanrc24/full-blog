const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addComment } = require("../controllers/commentController");
const router = express.Router();

router.route("/").post(authMiddleware, addComment);

module.exports = router;
