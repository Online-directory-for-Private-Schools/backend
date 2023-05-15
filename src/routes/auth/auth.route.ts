import { Router } from "express";
import registerController from "../../controllers/auth/register.controller";
import loginController from "../../controllers/auth/login.controller";
import { VerificationRouter } from "./verification/verification.route";

const router = Router();


router.post("/register", registerController)

router.post("/login", loginController)

router.use("/verification", VerificationRouter);

export {
    router as authRouter
}