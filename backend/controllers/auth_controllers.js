const User = require('../models/userModel.js')
const userVerification = require('../models/userVerificationmodel.js')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const env_config = require('../config/env_config')
const { sendOTPverification, sendOTPforPasswordChange } = require("../utils/sendOTP.js")
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: env_config.auth_mail,
      pass: env_config.auth_mail_pass
  }
})


exports.UserRegister = async (req, res, next) => {
  const { userName, userEmail, password } = req.body;

  if (!userName || !userEmail || !password) {
    res.status(400).json({ msg: 'Please select all fields' })
  }

  let user = await User.findOne({ userEmail });
  if (user) {
    res.status(409).json({ msg: 'User already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    userName,
    userEmail,
    password: hashedPassword,
  });

  const token = jwt.sign({ userEmail }, env_config.jwt_secret, {
    expiresIn: env_config.jwt_token_expire,
  });
  user.token = token;
  user.save().then((result) => {
    sendOTPverification(result, res)
  })
  res.status(200).json({ msg: "Check your mail to verify", Status: "Not verified",user })
};

exports.VerifyOTP = async (req, res) => {
  try {
    let { userID, otp } = req.body;
    if (!userID || !otp) {
      res.status(400).json({ msg: "Empty otp details are not allowed." })
    }
    const userToBeVerified = await userVerification.find({ userID })
    if (userToBeVerified.length <= 0) {
      res.status(400).json({ msg: "Account record doesn't exist" })
    }
    else {
      const hashedotp = userToBeVerified[0].otp;
      const validotp = bcrypt.compare(otp, hashedotp)
      if (!validotp) {
        res.status(400).json({ msg: "Invalid otp" })
      }
      else {
        await User.updateOne({ _id: userID }, { verified: true })
        await userVerification.deleteMany({ userID })
        res.status(200).json({ msg: "Successfully verified and registered", status: "Verified" })
      }
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.UserLogin = async (req, res) => {
  try {
    let { userEmail, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ userEmail });

    if (user) {
      const passCheck = bcrypt.compareSync(password, user.password);
      if (passCheck) {
        const token = jwt.sign({ userEmail }, env_config.jwt_secret, {
          expiresIn: env_config.jwt_token_expire,
        });
        await User.findOneAndUpdate({ userEmail: user.userEmail }, { token });
        res.json({ msg: "User successfully logged in", user });
      } else {
        res.status(401).json({ msg: "Invalid password" });
      }
    }
    else {
      res.json({ msg: "User not found" })
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.ForgotPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;
    // console.log(userEmail)
    if (!userEmail) {
      res.status(400).json({ msg: 'Please provide the email' })
    }

    let user = await User.findOne({ userEmail });
    if (user) {
      console.log(user)
      const token = jwt.sign({id: user._id}, env_config.jwt_secret, {expiresIn: "1h"})
        var mailOptions = {
            from: env_config.auth_mail,
            to: user.userEmail,
            subject: 'Verify your email for password change',
            html: `http://localhost:3000/user/reset-password/${user._id}/${token}`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: "Password reset link has been sent to your mail. " })
    }
    else{
      res.status(409).json({ msg: 'User does not exists' })
    }
  }
  catch (error) {
    res.status(500).json({ error })
  }
}

exports.ResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params
    const { password } = req.body

    jwt.verify(token, env_config.jwt_secret, (err, decoded) => {
      if (err) {
        return res.json({ msg: "Error with token : " + err })
      } else {
        bcrypt.hash(password, 10)
          .then(hash => {
            User.findByIdAndUpdate({ _id: id }, { password: hash })
              .then(u =>
                res.status(200).json({ msg: "Password has be successfully reset." })
              )
              .catch(err =>
                res.json({ err })
              )
          })
      }
    })
  }
  catch (error) {
    res.status(500).json({ error })
  }
}

