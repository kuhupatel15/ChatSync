const express = require("express");
const app = express.Router();
const {
  SearchUser,
  UserRegister,
  UserLogin,
  VerifyOTP,
  ForgotPassword,
  ResetPassword,
  GetAllUsers,
  uploadProfileImg
} = require("../controllers/auth_controllers");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const upload = require("../utils/multer");

app.post("/register", UserRegister);
app.post("/verifyotp", VerifyOTP);
app.post("/login", UserLogin);
app.post("/forgot-password", ForgotPassword);
app.post("/reset-password", ResetPassword);
app.get("/get-all-users", isAuthenticated, GetAllUsers);
app.get("/search", isAuthenticated, SearchUser);

app.post("/upload-profileimg/:chatId", isAuthenticated, upload.single("file"), uploadProfileImg);

module.exports = app;
