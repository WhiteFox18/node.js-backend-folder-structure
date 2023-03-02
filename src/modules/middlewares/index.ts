import { NextFunction, Request, Response } from "express"
import { getOffset } from "../helpers"
import session from "express-session"
import { v4 } from "uuid"
import redisClient from "../redis"
import connectRedis from "connect-redis"
import cors from "cors"
import * as yup from "yup"
import { ObjectShape } from "yup/lib/object"
import config from "../../config"
import { ValidateProps } from "../../types"

const RedisStore = connectRedis(session)

const allowedOrigins = config.allowed_origins

export const validate = (schema: ValidateProps) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("params")
        console.log(req.params)
        console.log("query")
        console.log(req.query)
        console.log("body")
        console.log(req.body)

        let error: any = null

        if (schema.query || schema.params) {
            await yup.object({
                params: yup.object(schema.params as ObjectShape),
                query: yup.object(schema.query as ObjectShape),
            }).validate({
                query: req.query,
                params: req.params,
            }, {
                abortEarly: false,
            })
                .catch(err => {
                    error = err
                })
        }

        if (schema.body) {
            await yup.object({
                body: yup.object(schema.body as ObjectShape),
            }).validate({
                body: req.body,
            }, {
                abortEarly: false,
                strict: true,
            })
                .catch(err => {
                    if (error) {
                        error = {
                            ...error,
                            inner: [...error.inner, ...err.inner],
                        }
                    } else {
                        error = err
                    }
                })
        }

        if (error) {
            throw error
        }

        return next()
    } catch (err) {
        if (typeof err === "object") {
            const fields: { [key: string]: string[] } = {
                params: [],
                query: [],
                body: [],
            }

            err.inner.forEach((field: any) => {
                fields[field.path.split(".")[0]].push(...field.errors)
            })

            return res.status(400).json({
                error: {
                    type: "validation",
                    description: "validation",
                    fields: fields,
                },
            })
        }
        next(err)
    }
}

export const cookieSessions = session({
    genid: () => v4(),
    saveUninitialized: false,
    rolling: true,
    resave: false,
    proxy: true,
    store: new RedisStore({ client: redisClient }),
    secret: config.session_secret,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: config.node_env !== "development",
        httpOnly: true,
        sameSite: config.node_env === "production" ? "strict" : "none",
    },
})

export const corsBefore = cors({
    origin(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin && config.node_env !== "production") return callback(null, true)

        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error("cors"), false)
        }

        return callback(null, true)
    },
    credentials: true,
})


export const corsAfter = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin
    if (allowedOrigins.indexOf(origin) > -1) {
        // Website you wish to allow connecting
        res.setHeader("Access-Control-Allow-Origin", origin)
    }

    // Request methods you wish to allow
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", "true")

    res.setHeader("Cache-Control", "no-store, no-cache")

    next()
}

export const createOffsetFieldInQuery = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "GET") {
        if (req.query.limit && req.query.page) {
            const offset = getOffset({
                limit: Number.parseInt(req.query.limit as string),
                page: Number.parseInt(req.query.page as string),
            })

            req.query.offset = offset.toString()
        }
    }

    next()
}