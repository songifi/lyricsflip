const express = require("express");
const {
  registerAdminController,
  loginAdminController,
  getAllAdminController,
  getAdminProfileController,
  updateAdminController,
  deleteAdminController,
  
} = require("../../controllers/adminController");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

const adminRouter = express.Router();

// register
adminRouter.post("/register", registerAdminController);

//login
adminRouter.post("/login", loginAdminController);

// get all Admin
adminRouter.get("/", isLoggedIn, isAdmin, getAllAdminController);

//get single admin
adminRouter.get("/profile", isLoggedIn, isAdmin, getAdminProfileController);

//update Admin
adminRouter.put("/", isLoggedIn, isAdmin, updateAdminController);

//delete Admin
adminRouter.delete("/:id", deleteAdminController);



module.exports = adminRouter;
