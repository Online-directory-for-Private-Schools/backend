
import { Router } from "express";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";


const router = Router()


router.use(requireAuth)


router.get("/:id", (req, res) => {
    
})


router.put("/:id", (req, res) => {

})


router.delete("/:id", (req, res) => {

})



export {
    router as UserRouter
};
