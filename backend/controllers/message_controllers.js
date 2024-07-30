const express = require('express');
const User = require('../models/userModel');
const Chat = require('../models/chatModel')
const Message = require('../models/messageModel')

exports.GetAllMessages = async (req, res) => {
    try {
        const { chatId } = req.params;
        const allmessages = await Message.find({ chat: chatId }).populate("sender","profileImg userName")
        return res.status(200).json(allmessages);
    } catch (err) {
        
        return res.status(500).json({ msg: err })
    }
}

exports.sendMessage = async (req, res) => {
    try {
        const { content, chatId } = req.body;
        var message = await Message.create({
            content,
            sender: req.user._id,
            chat: chatId,
            readBy:[req.user._id]
            })
        const msg =await Message.findById(message._id).populate("sender").populate("chat")
        // if(toString(req.user._id)===toString(msg.sender))
        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
        return res.status(200).json(msg);
    }
    catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

exports.SetReadBy = async (req,res)=>{
    try{
        const {userId,msgId} = req.body;
        const updatedMsg = await Message.findByIdAndUpdate(
            msgId,
            { $push: { readBy: userId } },
            { new: true }
          );
        //   const updateChat = await Chat.findByIdAndUpdate(
        //     updatedMsg.chat ,
        //     {latestMessage:updatedMsg.content}
        //   );
          
          return res.status(200).json({ msg: "Readed successfully.",updatedMsg });
        }
        catch(err){
            console.log(err)
            res.status(500).json({msg:err.message});
        }
}
