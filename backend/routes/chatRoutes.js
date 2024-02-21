const express = require("express");
const app = express.Router();
const {
  addChat,
  fetchChat,
  createGroup,
  renameGroup,
  removeMemberFromGrp,
  addMemberInGrp,
  uploadProfileImgOfGrp
} = require("../controllers/chat_controllers");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const upload = require("../utils/multer");


app.post("/add-chat", isAuthenticated, addChat);
app.get("/fetch-chats", isAuthenticated, fetchChat);
app.post("/create-group", isAuthenticated, createGroup);
app.post("/rename-group", isAuthenticated, renameGroup);
app.post("/remove-from-group", isAuthenticated, removeMemberFromGrp);
app.post("/add-to-group", isAuthenticated, addMemberInGrp);

app.post("/upload-profileimg/:chatId", isAuthenticated, upload.single("file"), uploadProfileImgOfGrp);


module.exports = app;
