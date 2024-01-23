const express = require('express');
const app = express.Router();
const { UserRegister, VerifyOTP, UserLogin, ForgotPassword, ResetPassword } = require('../controllers/auth_controllers')

app.post('/register', UserRegister);
app.post('/verifyotp', VerifyOTP);
app.post('/login', UserLogin);
app.post('/forgot-password', ForgotPassword);
app.post('/reset-password', ResetPassword );

module.exports = app;
