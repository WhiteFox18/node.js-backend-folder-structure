import { GetObjectCommand, S3 } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import config from "../../config"
import { ObjectIdentifier } from "@aws-sdk/client-s3/dist-types/models/models_0"

export class S3ClientAdapter {
    private readonly client: S3

    constructor(private readonly bucket_name: string) {
        this.client = new S3({
            region: config.aws.region,
            credentials: {
                accessKeyId: config.aws.access_key_id,
                secretAccessKey: config.aws.secret_access_key,
            },
        })

        this.bucket_name = bucket_name
    }

    listObjects = async ({ prefix }: { prefix?: string; }) => {
        try {
            return await this.client.listObjects({
                Bucket: this.bucket_name,
                Prefix: prefix || "",
            })
        } catch (e) {

        }
    }

    getObject = async ({ prefix, key }: { prefix?: string; key: string }) => {
        try {
            return await this.client.getObject({
                Bucket: this.bucket_name,
                Key: prefix ? `${prefix}/${key}` : key,
            })
        } catch (e) {

        }
    }

    putObject = async ({
                           prefix,
                           filename,
                           body,
                       }: { prefix?: string; filename: string; body: Uint8Array | Buffer }) => {
        try {
            return await this.client.putObject({
                Bucket: this.bucket_name,
                Key: prefix ? `${prefix}/${filename}` : filename,
                Body: body,
            })
        } catch (e) {

        }
    }

    getSignedS3Url = ({ key }: { key: string }) => {
        try {
            const s3Params = {
                Key: key,
            }
            const objectParams = {
                Bucket: this.bucket_name,
                ...s3Params,
            }
            const getObject = new GetObjectCommand(objectParams)


            return getSignedUrl(this.client, getObject, { expiresIn: 24 * 60 * 60 }) // 24h
        } catch (e) {

        }
    }

    listSignedS3Url = ({ keys }: { keys: string[] }) => {
        const getSignedUrlHttpRequests = keys.map(key => {
            return this.getSignedS3Url({ key })
        })

        return Promise.all(getSignedUrlHttpRequests)
    }

    deleteObjects = (keys: string[]) => {
        try {
            const arrayObjectKeys: ObjectIdentifier[] = keys.map(key => ({
                Key: key,
            }))

            return this.client.deleteObjects({
                Bucket: this.bucket_name,
                Delete: {
                    Objects: arrayObjectKeys,
                },
            })
        } catch (e) {

        }
    }
}
