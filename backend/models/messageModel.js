const mongoose = require('mongoose')

const Message = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: { type: String, trim: true }, 
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true
})
