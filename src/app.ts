import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import { queryParser } from "express-query-parser";

import indexRouter from "./routes";
import { errorHandling } from "./modules/helpers";
import { corsAfter, corsBefore, createOffsetFieldInQuery } from "./modules/middlewares";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    queryParser({
        parseNull: true,
        parseUndefined: true,
        parseBoolean: true,
        parseNumber: true,
    }),
);

// cors
app.use(corsBefore);
app.use(corsAfter);

// redis cookieSessions store | if needed
// app.use(cookieSessions);

// create offset field in GET methods if limit and page exists
app.use(createOffsetFieldInQuery);

// Routes
app.use("/api", indexRouter);

// Error Handling
app.use(errorHandling);

export default app;
