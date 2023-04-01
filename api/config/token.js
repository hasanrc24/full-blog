const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "blog-app", {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
