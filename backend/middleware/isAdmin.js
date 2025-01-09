const Admin = require("../models/Staff/Admin");

const isAdmin = async (req, res, next) => {
  //find the user
  const userId = req?.userAuth?._id;

  const adminFound = await Admin.findById(userId);

  //Check if admin
  if (adminFound?.role === "admin") {
    next();
  } else {
    next(new Error("Access Denied, Admins only"));
  }
};

module.exports = isAdmin;
