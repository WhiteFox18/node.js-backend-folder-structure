import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { getOffset } from "../helpers";
import session from "express-session";
import { v4 } from "uuid";
import redisClient from "../redis";
import connectRedis from "connect-redis";
import cors from "cors";
import config from "../../config";

const RedisStore = connectRedis(session);

const allowedOrigins = ["localhost:3000"];

export const validate = (...validations: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        validations = validations.flat();

        await Promise.all(validations.map((validation: any) => validation.run(req)));

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next();
        }

        const errorsArray: any = [];

        await errors.array().forEach(error => {
            if (!errorsArray.includes(error.param))
                errorsArray.push(error.param);
        });

        return res.status(400).json({
            error: {
                type: "validation",
                description: "validation",
                fields: errorsArray,
            },
        });
    };
};

export const cookieSessions = session({
    genid: () => v4(),
    saveUninitialized: false,
    rolling: true,
    resave: false,
    proxy: true,
    store: new RedisStore({ client: redisClient }),
    secret: config.session_secret,
    cookie: {
        maxAge: 1000 * 60,
        secure: false, // config.production === true,
        httpOnly: true,
        sameSite: "lax", // config.production === true ? "strict" : "none",
    },
});

export const corsBefore = cors({
    origin(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin && config.production === false) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error("cors"), false);
        }

        return callback(null, true);
    },
    credentials: true,
});


export const corsAfter = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        // Website you wish to allow connecting
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", "true");

    res.setHeader("Cache-Control", "no-store, no-cache");

    next();
};

export const createOffsetFieldInQuery = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "GET") {
        if (req.query.limit && req.query.page) {
            let offset = getOffset({
                limit: Number.parseInt(req.query.limit as string),
                page: Number.parseInt(req.query.page as string),
            });

            req.query.offset = offset.toString();
        }
    }

    next();
};