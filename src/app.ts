import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, {NextFunction, Request, Response} from "express";
import logger from "morgan";
import indexRouter from "./routes"
import {errorHandling} from "./modules/helpers";

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

app.use(cors({
    origin(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error("cors"), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
        // Website you wish to allow to connect
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
});

// Routes
app.use("/api", indexRouter)

// Error Handling
app.use(errorHandling)

export default app;
