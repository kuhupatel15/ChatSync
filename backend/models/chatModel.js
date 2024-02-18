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
chatModel.pre("save", function (next) {
  if (this.isModified("isGroupChat") && this.isGroupChat) {
    // Set grpProfileimg only if isGroupChat is true
    this.grpProfileimg = "https://www.tenniscall.com/images/chat.jpg";
  }
  next();
});

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
