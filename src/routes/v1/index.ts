import { Router } from "express";
import DummyController from "../../controllers/DummyController";

const router = Router();

router.get("/dummy", DummyController.dummyFunc);

export default router;