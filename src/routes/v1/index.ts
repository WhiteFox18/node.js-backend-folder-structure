import { Router } from "express";
import DummyController from "../../controllers/DummyController";
import { validate } from "../../modules/middlewares";
import { query } from "express-validator";

const router = Router();

router
    .get("/dummy",
        validate([
            query("smth").optional({ checkFalsy: true, nullable: true }).isString(),
        ]),
        DummyController.dummyFunc);

export default router;