
import { Router } from "express";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import createSchoolController from "../../controllers/school/createSchool.controller";


const router = Router()


router.get("/", async (req, res) => {
    const schools = await PrivateSchool.find()
    res.json(schools);
});


router.post("/", createSchoolController);



export {
    router as SchoolRouter
};
