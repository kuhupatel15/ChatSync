const express = require("express");
const app = express.Router();
const {
  sendMessage,
  GetAllMessages,
} = require("../controllers/message_controllers");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

app.post("/send-message", isAuthenticated, sendMessage);
app.get("/get-all-messages/:chatId", isAuthenticated, GetAllMessages);

module.exports = app;
