const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
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
    profileImg: {
      type: "String",

      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// User.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// User.pre("save", async function (next) {
//   if (!this.isModified) {
//     next();
//   }

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

module.exports = mongoose.model("UserData", User);
