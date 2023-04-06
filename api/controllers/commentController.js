const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");

const addComment = async (req, res) => {
  try {
    let comment = new Comment({
      body: req.body.body,
      author: req.body.userId,
      blog: req.body.blogId,
    });
    (await comment.populate("blog", "_id title body author")).populate(
      "author",
      "_id name image"
    );
    await Blog.findByIdAndUpdate(
      req.body.blogId,
      { $push: { comments: comment._id } },
      { new: true }
    );
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Failed to create comment", error: error });
  }
};

module.exports = { addComment };
