import { Router } from "express";
import DummyController from "../../controllers/DummyController";
import { dummyMiddleware } from "../../modules/middlewares";

const router = Router();

router.use(dummyMiddleware);

router.get("/dummy", DummyController.dummyFunc);

export default router;