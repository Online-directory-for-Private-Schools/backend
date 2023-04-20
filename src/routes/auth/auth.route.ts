import { Router } from "express";
import registerController from "../../controllers/auth/register.controller";
import loginController from "../../controllers/auth/login.controller";

const router = Router();

router.get("/", (req, res) => {
  res.send("auth endpoint");
});



// TODO: [SEG310-30] implement register, login and logout endpoints

router.post("/register", registerController)

router.post("/login", loginController)

router.post("/logout", (req, res) => {
    res.status(501).send("logout endpoint");
})


export {
    router as authRouter
}