import { S3Client } from "@aws-sdk/client-s3"
import multer from "multer"
import multerS3 from "multer-s3"
import config from "../config"
import path from "path"
import CustomError from "./errors/CustomError"
import { Request } from "express"
import { AWSBucketNames, FileTypes } from "../types"

const s3 = new S3Client({
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.access_key_id,
        secretAccessKey: config.aws.secret_access_key,
    },
})

const filterImage = (...file_types: FileTypes[]) => {
    return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        const ext = path.extname(file.originalname)
        if (file_types.indexOf(ext as FileTypes) === -1) {
            return cb(new CustomError({
                statusCode: 400,
                message: "onlyImagesAccepted",
                description: `only ${file_types.join((", "))} formats accepted`,
                fields: [],
            }))
        }
        cb(null, true)
    }
}

const multerStorageConfig = (bucket_name: AWSBucketNames) => {
    return multerS3({
        s3: s3,
        bucket: bucket_name,
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname })
        },
        key: function(req, file, cb) {
            cb(null, Date.now() + "." + file.originalname.split(".")[file.originalname.split(".").length - 1])
        },
    })
}

export const uploadDummyImages = multer({
    storage: multerStorageConfig(AWSBucketNames.dummy_images),
    fileFilter: filterImage(FileTypes.jpg, FileTypes.png, FileTypes.jpeg),
})

