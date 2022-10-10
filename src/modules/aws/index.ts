import { S3ClientAdapter } from "./aws";
import { AWSBucketNames } from "../../types";

export const adminAWS = new S3ClientAdapter(AWSBucketNames.pharmacy_admin_images);

export const categoryAWS = new S3ClientAdapter(AWSBucketNames.pharmacy_category_images);

export const companyAWS = new S3ClientAdapter(AWSBucketNames.pharmacy_company_logo);
export const companyUserAWS = new S3ClientAdapter(AWSBucketNames.pharmacy_company_user_img);

export const productAWS = new S3ClientAdapter(AWSBucketNames.pharmacy_product_images);
export const productCollectionAWS = new S3ClientAdapter(AWSBucketNames.pharmacy_product_collection_images);


