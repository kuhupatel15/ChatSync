const express = require('express');
const app = express.Router();
const { addChat, fetchChat } = require('../controllers/chat_controllers');
const { isAuthenticated } = require("../middlewares/isAuthenticated")

app.get('/add-chat',isAuthenticated, addChat );
app.get('/fetch-chats',isAuthenticated, fetchChat );


module.exports = app;
