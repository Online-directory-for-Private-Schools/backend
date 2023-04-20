
import { Router } from "express";
import createStudentController from "../../controllers/Student/createStudent.controller";


const router = Router()


router.post("/", createStudentController)


export {
    router as StudentRouter
};
