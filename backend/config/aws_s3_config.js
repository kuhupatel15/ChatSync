const { S3 } = require("@aws-sdk/client-s3");
const env_config  = require ("../config/env_config");

const s3config = new S3({
  region: env_config.aws_bucket_region,
  credentials: {
    accessKeyId: env_config.aws_access_key,
    secretAccessKey: env_config.aws_secret_key,
  },
});

module.exports = s3config;
