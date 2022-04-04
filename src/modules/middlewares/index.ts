import { Request, NextFunction, Response } from "express";

export const dummyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (e) {
    next(e);
  }
};
