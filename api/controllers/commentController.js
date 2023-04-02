const Comment = require("../models/commentModel");

const addComment = async (req, res) => {
  try {
    let comment = new Comment({
      body: req.body.body,
      author: req.user._id,
      blog: req.body.blogId,
    });
    comment.populate("blog", "_id title body author");
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

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId })
      .populate("author", "_id name email image")
      .populate("blog", "_id title body author");
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: "Failed to get comments", error: error });
  }
};

module.exports = { addComment, getComments };
