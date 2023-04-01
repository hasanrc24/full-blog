const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoute = require("./routes/userRoutes");
const connectDB = require("./config/db");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
