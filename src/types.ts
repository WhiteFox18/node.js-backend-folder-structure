import { Request, Response } from "express"
import { AnyObject } from "yup/lib/object"

export enum ElasticIndexes {
    person = "person"
}

export enum RedisKeys {
    dummy_key = "dummy_key"
}

export interface ValidateProps extends AnyObject {
    body?: {
        [key: string]: AnyObject
    };
    params?: {
        [key: string]: AnyObject
    };
    query?: {
        [key: string]: AnyObject
    };
}


// TODO: ADD YOUR OWN LOCALS INTERFACE
export interface CustomResponse extends Response {
    locals: any
}

export interface CustomRequest extends Request {
    query: any,
    params: any
}

/*
* use this SQL to get a list of all tables, in key: value format
*
* TODO: FILL THE INTERFACE
*
    SELECT string_agg(concat(table_name, ' = "', table_name, '"'), ', ' ORDER BY table_name)
    FROM information_schema.tables
    WHERE table_schema = 'public';
*
* then copy-paste, it as it is and done
* */
export enum DatabaseTables {

}

export enum AWSBucketNames {
    dummy_images = "dummy-images",
}

export enum FileTypes {
    jpg = ".jpg",
    jpeg = ".jpeg",
    png = ".png",
    svg = ".svg"
}

export interface SendMail {
    email: string;
    code: string;
}