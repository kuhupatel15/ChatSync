const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserData" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    grpProfileimg:{
      type: "String",
    },
  },
  { timestamps: true }
);

// Pre-save hook to conditionally set grpProfileimg based on isGroupChat
// chatModel.pre("save", function (next) {
  // if (this.isModified("isGroupChat") && this.isGroupChat) {
  //   // Set grpProfileimg only if isGroupChat is true
  //   this.grpProfileimg = "https://www.tenniscall.com/images/chat.jpg";
  // }
//   next();
// });

// chatModel.pre("save", function (next) {
//   // Set grpProfileimg if provided
//   if (this.grpProfileimg) {
//     this.grpProfileimg = this.grpProfileimg;
//   }

//   if (this.isModified("isGroupChat") && this.isGroupChat) {
//     // Set grpProfileimg only if isGroupChat is true
//     this.grpProfileimg = "https://www.tenniscall.com/images/chat.jpg";
//   }
//   next();
// });

chatModel.pre("save", function (next) {
  // Check if isGroupChat is true and grpProfileimg is provided
  if (this.isGroupChat && this.grpProfileimg) {
    // Set grpProfileimg to the provided value
    this.grpProfileimg = this.grpProfileimg;
  } else if (this.isGroupChat && !this.grpProfileimg) {
    // Set grpProfileimg to the default value if isGroupChat is true and grpProfileimg is not provided
    this.grpProfileimg = "https://www.tenniscall.com/images/chat.jpg";
  } else {
    // If isGroupChat is false, do not include the grpProfileimg field in the model
    delete this.grpProfileimg;
  }
  next();
});

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
