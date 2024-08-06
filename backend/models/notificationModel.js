const mongoose = require('mongoose');

const notificationModel = mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
        reciever: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        content: String,
        reaadBy: {
            type: Boolean,
            default: false
        },

    }, { timestamps: true }
)

const Notification = mongoose.model("Notification", notificationModel);

module.exports = Notification;
