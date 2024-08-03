const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const env_config = require("./config/env_config.js");
require("./middlewares/mongoConnection.js").connectDB();
require("dotenv").config({ path: "./.env" });


// cors
const cors = require("cors");
// app.use(
//   cors({
//     origin: env_config.frontend_url,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//   })
// );
app.use(cors({ credentials: true, origin: true }));
// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin; report-to=default');
//   next();
// });

// logger
const logger = require("morgan");
app.use(logger("tiny"));

// bodyparser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

// session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.JWT_SECRET,
  })
);
app.use(cookieparser());

app.use(bodyParser.json());

app.use("/user", require("./routes/userRoutes.js"));
app.use("/chat", require("./routes/chatRoutes.js"));
app.use("/message", require("./routes/messageRoutes.js"));

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    // origin: "http://localhost:5173",
    origin: env_config.frontend_url
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    console.log('\x1b[33m%s\x1b[0m',"3 ", "recieved ", "setup(user._id)", userData)
    socket.join(userData);
    console.log('\x1b[33m%s\x1b[0m',"4 ", "joined room ", userData)
    socket.emit("connected");
    console.log('\x1b[33m%s\x1b[0m',"5 ", "sent ", "connected --> frontend")
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("join-room", (roomid) => {
    // console.log(roomid)
    socket.join(roomid);
    console.log("User Joined Room: " + roomid);
  });

  socket.on("new-message", (msg) => {
    var chat = msg.chat;
    if (!chat.users) return console.log("chat.users not defined");
    
    chat.users.forEach((user) => {
      if (user == msg.sender) return;
      socket.to(user).emit("message-recieved", msg, (ack) => {
        
        if (ack === "success") {
          console.log("Socket emit successful");
        } else {
          console.log("Socket emit failed");
        }
      });
    });
  });
});
