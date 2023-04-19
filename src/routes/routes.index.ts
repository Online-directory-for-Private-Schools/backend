import { Router } from "express";

import { SchoolRouter } from "./school/school.route";

const router = Router()


router.use('/school', SchoolRouter);


export default router;