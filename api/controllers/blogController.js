const Blog = require("../models/blogModel");

const allBlogs = async (req, res) => {
  try {
    let blog = await Blog.find()
      .populate("author", "_id name email")
      .populate({
        path: "comments",
        populate: { path: "author", select: "_id name email" },
      });
    res.json(blog);
  } catch (error) {
    res.status(400);
  }
};

const newBlog = async (req, res) => {
  let blog = await Blog.create({
    title: req.body.title,
    body: req.body.body,
    author: req.user._id,
  });
  blog = await blog.populate("author", "_id name email");
  if (blog) {
    res.status(201).json(blog);
  } else {
    res.status(400).send("Could not create a blog");
  }
};

const searchBlog = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { body: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await Blog.find(keyword)
    .populate("author", "_id name email")
    .populate({
      path: "comments",
      populate: { path: "author", select: "_id name email" },
    });
  res.send(users);
};

const getBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id)
      .populate("author", "_id name email")
      .populate({
        path: "comments",
        populate: { path: "author", select: "_id name email" },
      });
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    // Check user role
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== blog.author.toString()
    ) {
      res
        .status(403)
        .json({ message: "You do not have permission to edit this post" });
      return;
    }

    blog.title = req.body.title;
    blog.body = req.body.body;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    // Check user role
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== blog.author.toString()
    ) {
      res
        .status(403)
        .json({ message: "You do not have permission to delete this post" });
      return;
    }

    await blog.deleteOne();
    res.json({ message: "Blog post deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  allBlogs,
  newBlog,
  searchBlog,
  getBlog,
  editBlog,
  deleteBlog,
};
