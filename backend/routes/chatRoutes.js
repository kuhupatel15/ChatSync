const express = require("express");
const app = express.Router();
const {
  addChat,
  fetchChat,
  createGroup,
  renameGroup,
  removeMemberFromGrp,
  addMemberInGrp,
  uploadProfileImgOfGrp,
  SelectedChat_Info,
  ExitFromGrp,
} = require("../controllers/chat_controllers");
const { isAuthenticated ,isAdmin} = require("../middlewares/isAuthenticated");
const upload = require("../utils/multer");

app.post("/add-chat", isAuthenticated, addChat);
app.get("/fetch-chats", isAuthenticated, fetchChat);
app.post("/create-group", isAuthenticated, upload.single("file"), createGroup);
app.post("/rename-group", isAuthenticated,isAdmin, renameGroup);
app.post("/remove-from-group", isAuthenticated,isAdmin, removeMemberFromGrp);
app.post("/add-to-group", isAuthenticated,isAdmin, addMemberInGrp);
app.get("/selected-chat", isAuthenticated, SelectedChat_Info);
app.post(
  "/upload-profileimg/:chatId",
  isAuthenticated,
  upload.single("file"),
  uploadProfileImgOfGrp
);
app.put("/exit-group", isAuthenticated, ExitFromGrp);

module.exports = app;
