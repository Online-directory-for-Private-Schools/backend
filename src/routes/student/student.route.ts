
import { Router } from "express";
import createStudentController from "../../controllers/Student/createStudent.controller";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";


const router = Router()


router.use(requireAuth)


/**
 * 
 * @deprecated  /student routes will be removed due to merging the student entity with the user entity
 */
router.post("/", createStudentController)


export {
    router as StudentRouter
};
