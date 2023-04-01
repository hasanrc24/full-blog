const express = require("express");
const {
  allBlogs,
  newBlog,
  searchBlog,
  getBlog,
  editBlog,
  deleteBlog,
} = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(allBlogs).post(authMiddleware, newBlog);
router.route("/search").get(searchBlog);
router.route("/:id").get(getBlog).put(editBlog).delete(deleteBlog);

module.exports = router;
