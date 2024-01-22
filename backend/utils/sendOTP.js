const userVerification = require('../models/userVerificationmodel.js')
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer')
const env_config = require('../config/env_config.js')
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env_config.auth_mail,
        pass: env_config.auth_mail_pass
    }
})

exports.sendOTPverification = async ({ _id, userEmail }, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
        var mailOptions = {
            from: env_config.auth_mail,
            to: userEmail,
            subject: 'Verify your email',
            html: `<p>Enter <b>${otp}</b> on site to get your email verified .</p>`
        };
        const hashedOTP = await bcrypt.hash(otp, 10);
        const newOTPverification = await new userVerification({
            userID: _id,
            otp: hashedOTP
        })
        await newOTPverification.save();
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: "Verification email sent" })
    }
    catch (error) {
        console.log(error)
    }
}
 
exports.sendOTPforPasswordChange = async ({ _id, userEmail }, res) => {
    try {
        console.log(_id,userEmail)
        const token = jwt.sign({id: _id}, env_config.jwt_secret, {expiresIn: "1h"})
        var mailOptions = {
            from: env_config.auth_mail,
            to: userEmail,
            subject: 'Verify your email for password change',
            html: `http://localhost:3000/user/reset-password/${_id}/${token}`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: "Password reset link has been sent to your mail. " })
    }
    catch (error) {
        console.log(error)
    }
}
