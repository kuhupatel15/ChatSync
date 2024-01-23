require('dotenv').config();

const env_config = {
    jwt_secret : process.env.JWT_SECRET,
    jwt_token_expire : process.env.JWT_TOKEN_EXPIRE,
    auth_mail : process.env.AUTH_MAIL,
    auth_mail_pass : process.env.AUTH_PASS,
    mongodb_url : process.env.MONGODB_URL,
    frontend_url: process.env.FRONTEND_URL,

    aws_access_key : process.env.AWS_S3_ACCESS_KEY,
    aws_secret_key : process.env.AWS_S3_ACCESS_SECRET_KEY,
    aws_bucket_name : process.env.AWS_S3_BUCKET_NAME,
    aws_bucket_region : process.env.AWS_S3_BUCKET_REGION,
}

module.exports = env_config;