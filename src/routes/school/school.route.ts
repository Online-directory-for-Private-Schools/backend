
import { Router } from "express";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";


const router = Router()


router.get("/", async (req, res) => {
    const schools = await PrivateSchool.find()
    res.json(schools);
});



export {
    router as SchoolRouter
};
