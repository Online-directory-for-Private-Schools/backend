import { Router } from "express";

import { SchoolRouter } from "./school/school.route";
import { authRouter } from "./auth/auth.route";
import { StudentRouter } from "./student/student.route";
import { UserRouter } from "./user/user.route";
import { AddressesRouter } from "./address/address.route";
import { CourseRouter } from "./course/course.route";
import { SchoolModulesRouter } from "./schoolModules/schoolModules.route";

const router = Router()


router.use('/schools', SchoolRouter);
router.use('/students', StudentRouter);
router.use('/auth', authRouter);
router.use('/user', UserRouter);
router.use("/addresses", AddressesRouter)
router.use("/courses/", CourseRouter)
router.use("/school-modules/", SchoolModulesRouter)


export default router;