const env_config = require("../config/env_config");
const s3config = require("../config/aws_s3_config");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  credentials: {
    accessKeyId: env_config.aws_access_key,
    secretAccessKey: env_config.aws_secret_key,
  },
  region: env_config.aws_bucket_region,
});

const s3Storage = multerS3({
  s3: s3,
  bucket: env_config.aws_bucket_name,
  key: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: s3Storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 8,
  // },
});


module.exports = upload;
