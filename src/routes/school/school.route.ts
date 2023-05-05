
import { Router } from "express";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import createSchoolController from "../../controllers/school/createSchool.controller";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";
import getSchoolController from "../../controllers/school/getSchool.controller";
import editSchoolController from "../../controllers/school/editSchool.controller";
import deleteSchoolController from "../../controllers/school/deleteSchool.controller";
import searchSchoolsController from "../../controllers/school/searchSchools.controller";


const router = Router()


router.use(requireAuth)



// router.get("/", searchSchoolsController);

router.get("/:id", getSchoolController)

router.put("/:id", editSchoolController)

router.delete("/:id", deleteSchoolController)

router.post("/", createSchoolController);



export {
    router as SchoolRouter
};
