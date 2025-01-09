const Admin = require("../models/Staff/Admin");
const verifyToken = require("../utils/verifyToken");

const isLoggedIn = async (req, res, next) => {
  // Get Token from header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];


  // verify token
  const verifiedToken = verifyToken(token);

    if (verifiedToken) {
        //find the admin
       const user = await Admin.findById(verifiedToken.id).select('name email role')
    // save user into req.object
    req.userAuth = user;
    next();
  } else {
    const err = new Error("Token expired or invalid token");
  }
};

module.exports = isLoggedIn;
