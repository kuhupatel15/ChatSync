const env_config = require('../config/env_config');
const s3config = require('../config/aws_s3_config')
const multer = require('multer')
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
// const aws = require('aws-sdk')

// ----------------------------

// module.exports = multer({
//     storage: multer.memoryStorage(),
//     limits: {
//         fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
//     },
// });

// -----------------------------

const s3 = new S3Client({
    credentials: {
        accessKeyId: env_config.aws_access_key, 
        secretAccessKey: env_config.aws_secret_key
    },
    region: env_config.aws_bucket_region
})

const s3Storage = multerS3({
    s3: s3, 
    bucket: env_config.aws_bucket_name, 
    acl: "public-read", 
    // metadata: (req, file, cb) => {
    //     cb(null, {fieldname: file.fieldname})
    // },
    key: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: s3Storage,
    limits: {
        fileSize: 1024 * 1024 * 8 
    }
})

// --------------------------


// aws.config.update({
//     secretAccessKey: env_config.aws_secret_key,
//     accessKeyId: env_config.aws_access_key,
//     region: process.env.REGION,
// });

// const s3 = new aws.S3();

// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         acl: "public-read",
//         bucket: env_config.,
//         key: function (req, file, cb) {
//             cb(null, file.originalname)
//         }
//     })
// })


module.exports = upload;