const mongoose = require('mongoose');

const User = new mongoose.Schema({
  token: {
    type: String,
    default: "",
  },

  userName: {
    type: String,
    required: [true, "Please enter your name"],
  },

  userEmail: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    // select: false,
  },

  verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('UserData', User);
