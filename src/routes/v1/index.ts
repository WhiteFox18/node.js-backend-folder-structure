import { Router } from "express"
import DummyController from "../../controllers/DummyController"
import { validate } from "../../modules/middlewares"
import * as yup from "yup"

const router = Router()

router
    .get(
        "/dummy",
        validate({
            query: {
                search: yup.string().nullable(),
            },
        }),
        DummyController.dummyFunc,
    )

export default router