const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, "blog-app");

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {}
  } else {
    res.status(401).send("Unauthorized request");
  }
};

module.exports = authMiddleware;
