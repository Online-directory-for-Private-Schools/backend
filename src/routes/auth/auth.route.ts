import { Router } from "express";
import registerController from "../../controllers/auth/register.controller";
import loginController from "../../controllers/auth/login.controller";
import { VerificationRouter } from "./verification/verification.route";
import { authInfoChangeRouter } from "./change/authInfoChange.route";

const router = Router();


router.post("/register", registerController)

router.post("/login", loginController)

router.use("/verification", VerificationRouter);

router.use("/change", authInfoChangeRouter)

export {
    router as authRouter
}