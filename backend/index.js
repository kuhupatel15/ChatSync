const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");

require("./middlewares/mongoConnection.js").connectDB();
require("dotenv").config({ path: './.env' });
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

app.use(bodyParser.json())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
const logger = require("morgan");
app.use(logger("tiny"));

app.use("/user", require("./routes/userRoutes.js"));
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

app.listen(
    3000,
    console.log('Server is running on 3000')
)