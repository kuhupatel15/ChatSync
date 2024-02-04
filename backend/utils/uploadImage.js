// import { env_conf } from '../config/env_config';
// import { aws_s3_conf } from '../config/aws_s3_config'
// import { S3Client, PutObjectCommand, UploadPartCommand } from "@aws-sdk/client-s3"

// const s3Client = new S3Client({
//     region: env_conf.region,
//     credentials: {
//         accessKeyId: env_conf.spaces_key,
//         secretAccessKey: env_conf.secret_key,
//     }
// });

// async function uploadFileToS3(file, fileName) {
//     const fileBuffer = file;
//     const params = {
//         Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
//         Key: `mushroomex-lucky-draw/${fileName}`,
//         Body: fileBuffer,
//         ContentType: "video/mp4"
//     }
//     const command = new PutObjectCommand(params);
//     await s3Client.send(command);
//     return fileName;
// }



