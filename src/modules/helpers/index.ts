import {NextFunction, Request, Response} from "express";

export const errorHandling = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    // error handling of yours
}