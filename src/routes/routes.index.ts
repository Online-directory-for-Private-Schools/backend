import { Router } from "express";

import { SchoolRouter } from "./school/school.route";
import { authRouter } from "./auth/auth.route";
import { StudentRouter } from "./student/student.route";

const router = Router()


router.use('/schools', SchoolRouter);
router.use('/students', StudentRouter);
router.use('/auth', authRouter);


export default router;