import { Router } from "express";

import { SchoolRouter } from "./school/school.route";
import { authRouter } from "./auth/auth.route";
import { StudentRouter } from "./student/student.route";
import { UserRouter } from "./user/user.route";
import { AddressesRouter } from "./address/address.route";

const router = Router()


router.use('/schools', SchoolRouter);
router.use('/students', StudentRouter);
router.use('/auth', authRouter);
router.use('/user', UserRouter);
router.use("/addresses", AddressesRouter)


export default router;