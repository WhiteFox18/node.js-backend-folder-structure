import {NextFunction, Request, Response, Router} from "express";
import { Dummy } from "../../services";

const router = Router()

router.get("/dummy", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await Dummy.dummyFunc())
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default router