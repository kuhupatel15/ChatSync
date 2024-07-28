const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const Chat = require("../models/chatModel.js")
exports.isAuthenticated = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded._id).select("-password");
            next();
        } catch (error) {
            res.status(401).json("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401).json("Not authorized, no token");
    }
};
 exports.isAdmin = async (req,res,next)=>{
    const {chatId}=req.body;
    try{
        let user =req.user;
        
        let grp =await Chat.findById(chatId);
            if(String(grp.groupAdmin)===String(user._id)){
                next();
            }else{
                res.status(401).json({msg:'You are not an Admin !'})
            }
        
    }catch(error){
        res.status(500).json('Something went wrong!')
    }
 }