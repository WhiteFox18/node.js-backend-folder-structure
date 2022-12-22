import { S3ClientAdapter } from "./aws"
import { AWSBucketNames } from "../../types"

export const dummyAWS = new S3ClientAdapter(AWSBucketNames.dummy_images)


