
import { Router } from "express";
import { User, UserType } from "../../db/entities/UserEntity";


const router = Router()


router.get("/", async (req, res) => {
    const users = await User.find()
    res.json(users)
});


router.post("/", async (req, res) => {

    const { name, email, phone_number, type } = req.body;

})


export {
    router as UserRouter
};
