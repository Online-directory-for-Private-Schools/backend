import { Router } from "express";

import { SchoolRouter } from "./school/school.route";
import { UserRouter } from "./user/user.route";

const router = Router()


router.use('/schools', SchoolRouter);
router.use('/users', UserRouter);


export default router;