import {Router} from "express";
import testRouter from "./v1"

const router = Router()

router
    .use("/v1", testRouter)

export default router