const express = require('express');
const app = express.Router();
const { UserRegister, UserLogin, VerifyOTP, ForgotPassword, ResetPassword, GetAllUsers } = require('../controllers/auth_controllers');
const { isAuthenticated } = require("../middlewares/isAuthenticated")

app.post('/register', UserRegister);
app.post('/verifyotp', VerifyOTP);
app.post('/login', UserLogin);
app.post('/forgot-password', ForgotPassword);
app.post('/reset-password', ResetPassword);
app.get('/get-all-users', isAuthenticated, GetAllUsers);


module.exports = app;
