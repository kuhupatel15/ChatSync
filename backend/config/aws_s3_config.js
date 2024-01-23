import { S3 } from "@aws-sdk/client-s3";
import { env_conf } from "../config/env_config";

export const s3config = new S3({
  region: env_conf.aws_bucket_region,
  credentials: {
    accessKeyId: env_conf.aws_access_key,
    secretAccessKey: env_conf.aws_secret_key,
  },
});