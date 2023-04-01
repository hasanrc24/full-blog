const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addComment, getComments } = require("../controllers/commentController");
const router = express.Router();

router.route("/").post(authMiddleware, addComment);
router.route("/:blogId").get(authMiddleware, getComments);

module.exports = router;
