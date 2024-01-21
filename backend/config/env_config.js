require('dotenv').config();

const env_config = {
    jwt_secret : process.env.JWT_SECRET,
    jwt_token_expire : process.env.JWT_TOKEN_EXPIRE,
    auth_mail : process.env.AUTH_MAIL,
    auth_mail_pass : process.env.AUTH_PASS,
    mongodb_url : process.env.MONGODB_URL,
}

module.exports = env_config;