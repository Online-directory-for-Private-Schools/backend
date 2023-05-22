import { Router } from "express";
import changePasswordController from "../../../controllers/auth/change/changePassword.controller";
import { requireAuth } from "../../../middlewares/auth/requireAuth.middleware";
import changeEmailController from "../../../controllers/auth/change/changeEmail.controller";


const router = Router();

router.use(requireAuth)

router.put("/email/", changeEmailController)
router.post("/password/", changePasswordController)



export {
    router as authInfoChangeRouter
}