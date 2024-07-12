const User = require("../models/userModel.js");
const userVerification = require("../models/userVerificationmodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const env_config = require("../config/env_config");
const {
  sendOTPverification,
  sendOTPforPasswordChange,
} = require("../utils/sendOTP.js");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env_config.auth_mail,
    pass: env_config.auth_mail_pass,
  },
});

exports.UserRegister = async (req, res, next) => {
  const { userName, userEmail, password } = req.body;
  try {
    if (!userName || !userEmail || !password) {
      return res.status(400).json({ msg: "Please select all fields" });
    }

    let user = await User.findOne({ userEmail });

    if (user) {
      return res.status(409).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await User.create({
      userName,
      userEmail,
      password: hash,
    });

    await user.save().then((result) => {
      sendOTPverification(result, res);
    });

    const token = jwt.sign({ _id: user._id }, env_config.jwt_secret, {
      expiresIn: env_config.jwt_token_expire,
    });

    return res.status(200).json({
      msg: "Check your mail to verify",
      token,
      Status: "Not verified",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.VerifyOTP = async (req, res) => {
  try {
    let { userID, otp } = req.body;

    if (!userID || !otp) {
      res.status(400).json({ msg: "Empty otp details are not allowed." });
    }

    const userToBeVerified = await userVerification.find({ userID });

    if (userToBeVerified.length <= 0) {
      res.status(400).json({ msg: "Account record doesn't exist" });
    } 
    else {
      const hashedotp = userToBeVerified[0].otp;
      const validotp = await bcrypt.compare(otp, hashedotp);
      if (!validotp) {
        res.status(400).json({ msg: "Invalid otp" });
      } 
      else {
        await User.updateOne({ _id: userID }, { verified: true });
        await userVerification.deleteMany({ userID });
        res.status(200).json({
          msg: "Successfully verified and registered",
          status: "Verified",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.UserLogin = async (req, res) => {
  try {
    if(req.body.email){
      const user = await User.findOne({ userEmail });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User not found or user not verified" });
    }
    const token = jwt.sign({ _id: user._id }, env_config.jwt_secret, {
      expiresIn: env_config.jwt_token_expire,
    });
    return res
      .status(200)
      .json({ token, user, msg: "User logged in successfully" });
    }else{
    const { userEmail, password } = req.body;
    const user = await User.findOne({ userEmail });
    if (!user || user.verified === false) {
      return res
        .status(400)
        .json({ msg: "User not found or user not verified" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: user._id }, env_config.jwt_secret, {
      expiresIn: env_config.jwt_token_expire,
    });
    return res
      .status(200)
      .json({ token, user, msg: "User logged in successfully" });}
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

exports.ForgotPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;

    if (!userEmail) {
      res.status(400).json({ msg: "Please provide the email" });
    }

    let user = await User.findOne({ userEmail });
    if (user && user.verified === true) {
      const token = jwt.sign({ id: user._id }, env_config.jwt_secret, {
        expiresIn: "1h",
      });
      var mailOptions = {
        from: env_config.auth_mail,
        to: user.userEmail,
        subject: "Verify your email for password change",
        html: `${env_config.frontend_url}/user/reset-password/${user._id}/${token}`,
      };
      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ msg: "Password reset link has been sent to your mail. " });
    } else {
      res.status(409).json({ msg: "User does not exists or not verified" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { id, token, password } = req.body;
    jwt.verify(token, env_config.jwt_secret, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.json({ msg: "Error with token : " + err });
      } else {
        bcrypt.hash(password, 10).then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) =>
              res
                .status(200)
                .json({ msg: "Password has be successfully reset." })
            )
            .catch((err) => res.json({ err }));
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.GetAllUsers = async (req, res) => {
  try {
    const allusers = await User.find({ _id: { $ne: req.user._id } });
    return res.status(200).json(allusers);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.SearchUser = async (req, res) => {
  try {
    if (req.query.name) {
      const users = await User.find({
        _id: { $ne: req.user._id },
        userName: { $regex: req.query.name, $options: "i" },
      });
      return res.status(200).json(users);
    } else {
      const users = await User.find({
        _id: { $ne: req.user._id },
      });
      return res.status(200).json(users);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

exports.uploadProfileImg = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.profileImg = req.file.location;
    await user.save();
    return res.status(200).json({
      msg: "Profile image is successfully uploaded",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};
