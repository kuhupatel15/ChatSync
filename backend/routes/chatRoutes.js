const express = require('express');
const app = express.Router();
const { addChat, fetchChat, createGroup, renameGroup, removeMemberFromGrp, addMemberInGrp } = require('../controllers/chat_controllers');
const { isAuthenticated } = require("../middlewares/isAuthenticated")

app.post('/add-chat', isAuthenticated, addChat);
app.get('/fetch-chats', isAuthenticated, fetchChat);
app.post('/create-group', isAuthenticated, createGroup);
app.post('/rename-group', isAuthenticated, renameGroup);
app.post('/remove-from-group', isAuthenticated, removeMemberFromGrp);
app.post('/add-to-group', isAuthenticated, addMemberInGrp);


module.exports = app;
