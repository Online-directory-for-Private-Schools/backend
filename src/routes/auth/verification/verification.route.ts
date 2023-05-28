import { Router } from "express";
import sendVerificationController from "../../../controllers/auth/verification/sendVerification.controller";
import verifyUserController from "../../../controllers/auth/verification/verifyUser.controller";
import { requireAuth } from "../../../middlewares/auth/requireAuth.middleware";

const router = Router();

router.use(requireAuth)

router.get("/send/", sendVerificationController)

router.post("/verify/", verifyUserController)


export {
    router as VerificationRouter
}