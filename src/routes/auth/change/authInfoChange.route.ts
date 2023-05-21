import { Router } from "express";
import changePasswordController from "../../../controllers/auth/change/changePassword.controller";
import { requireAuth } from "../../../middlewares/auth/requireAuth.middleware";


const router = Router();

router.use(requireAuth)

router.post("/email/")
router.post("/password/", changePasswordController)



export {
    router as authInfoChangeRouter
}