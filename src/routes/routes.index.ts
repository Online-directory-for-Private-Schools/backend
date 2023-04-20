import { Router } from "express";

import { SchoolRouter as schoolRouter } from "./school/school.route";
import { UserRouter as userRouter } from "./user/user.route";
import { authRouter } from "./auth/auth.route";

const router = Router()


router.use('/schools', schoolRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);


export default router;