import { NextFunction } from "express"
import { CustomRequest, CustomResponse } from "../types"
import db from "../db"

const DummyController = {
    dummyFunc: async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
        try {
            res.json(
                await db.caching.service.getDummy(),
            )
        } catch (e) {
            next(e)
        }
    },
}

export default DummyController

