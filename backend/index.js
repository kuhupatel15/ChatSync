const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

require('./middlewares/mongoConnection.js').connectDB();
require('dotenv').config({ path: './.env' });
const session = require('express-session');
const cookieparser = require('cookie-parser');
const cors = require('cors');

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.JWT_SECRET,
    })
);
app.use(cookieparser());

app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
const logger = require('morgan');
const env_config = require('./config/env_config.js');
app.use(logger('tiny'));

app.use(cors({
    origin: `${env_config.frontend_url}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use('/user', require('./routes/userRoutes.js'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});