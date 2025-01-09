const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "key", { expiresIn: "5d" });
};

module.exports = generateToken;
