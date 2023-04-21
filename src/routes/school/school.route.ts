
import { Router } from "express";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import createSchoolController from "../../controllers/school/createSchool.controller";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";


const router = Router()


router.use(requireAuth)

router.get("/", async (req, res) => {
    const schools = await PrivateSchool.find()
    res.json(schools);
});


router.post("/", createSchoolController);



export {
    router as SchoolRouter
};
