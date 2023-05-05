import { Router } from "express";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";

const router = Router()

router.use(requireAuth)


router.get("/countries", ()=>{})

router.get("/provinces/:countryId", ()=>{} )

router.get("/cities/:provinceId", () => {})


export {
    router as AddressesRouter
}