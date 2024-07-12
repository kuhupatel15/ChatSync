const express = require("express");
const app = express.Router();
const {
  sendMessage,
  GetAllMessages,
  SetReadBy
} = require("../controllers/message_controllers");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

app.post("/send-message", isAuthenticated, sendMessage);
app.get("/get-all-messages/:chatId", isAuthenticated, GetAllMessages);
app.put("/readBy", isAuthenticated,SetReadBy );

module.exports = app;
