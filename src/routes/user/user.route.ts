
import { Router } from "express";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";
import getUserController from "../../controllers/user/getUser.controller";
import deleteUserController from "../../controllers/user/deleteUser.controller";
import editUserController from "../../controllers/user/editUser.controller";
import getUserSchoolsController from "../../controllers/user/schools/getUserSchools.controller";


const router = Router()


router.use(requireAuth)


router.get("/:id", getUserController)


router.put("/:id", editUserController)


router.delete("/:id", deleteUserController)


router.get("/schools/:userId", getUserSchoolsController)



export {
    router as UserRouter
};
