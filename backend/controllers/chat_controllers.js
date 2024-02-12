const express = require('express');
const User = require('../models/userModel');
const Chat = require('../models/chatModel')


exports.addChat = async (req, res) => {
    try {
        const { receiver_id } = req.body;
        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: receiver_id } } },
            ],
        })
        
        if (isChat.length > 0) {
            return res.status(200).json({ msg: "chat exists", isChat })
        }
        else {
            var createdchat = await Chat.create({
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, receiver_id]
            })
            
            return res.status(200).json(createdchat);
        }
    }
    catch (err) {
        return res.status(500).json({ err })
    }
}

exports.fetchChat = async (req, res) => {
    try {
        
        const chat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users","-password").populate("latestMessage")
            .sort({ updatedAt: -1 })
            
        return res.status(200).json({ chat });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

exports.createGroup = async (req, res) => {
    try {
        const { users, grpname } = req.body;
        //var members = JSON.parse(users);
        users.push(req.user);
        var grpchat = await Chat.create({
            chatName: grpname,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user
        })
        return res.status(200).json({ msg: `Group ${grpchat.chatName} has been created successfully`, grpchat });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

exports.renameGroup = async (req, res) => {
    try {
        const { chatId, newgrpname } = req.body;

        const grp = await Chat.findOne({ _id: chatId });
        if (grp.groupAdmin !== req.user._id) {
            return res.status(401).json({ msg: 'Only group admins can change the name of the group' })
        }

        const updatedChat = await Chat.findByIdAndUpdate(chatId, { chatName: newgrpname, }, { new: true, })
        return res.status(200).json({ msg: `Group has been renamed successfully`, updatedChat });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

exports.removeMemberFromGrp = async (req, res) => {
    try {
        const { chatId, memberId } = req.body;

        const grp = await Chat.findOne({ _id: chatId });
        if (grp.groupAdmin !== req.user._id) {
            return res.status(401).json({ msg: 'Only group admins can change the name of the group' })
        }

        const updatedChat = await Chat.findByIdAndUpdate(chatId, { $pull: { users: memberId }, }, { new: true, })
        return res.status(200).json({ msg: "Removed successfully.", updatedChat });

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}

exports.addMemberInGrp = async (req, res) => {
    try {
        const { chatId, memberId } = req.body;

        const grp = await Chat.findOne({ _id: chatId });
        if (grp.groupAdmin !== req.user._id) {
            return res.status(401).json({ msg: 'Only group admins can change the name of the group' })
        }

        const updatedChat = await Chat.findByIdAndUpdate(chatId, { $push: { users: memberId }, }, { new: true, })
        return res.status(200).json({ msg: "Added successfully.", updatedChat });

    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ err })
    }
}
