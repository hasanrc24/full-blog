const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");
const commentRouter = require("./routes/commentRouter");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
