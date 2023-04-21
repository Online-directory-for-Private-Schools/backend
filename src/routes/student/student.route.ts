
import { Router } from "express";
import createStudentController from "../../controllers/Student/createStudent.controller";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";


const router = Router()


router.use(requireAuth)

router.post("/", createStudentController)


export {
    router as StudentRouter
};
