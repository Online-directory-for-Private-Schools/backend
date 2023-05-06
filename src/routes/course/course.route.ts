import { Router } from "express";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";

const router = Router()

router.use(requireAuth)


router.get("/", () => {})
router.get("/:courseId", () => {})
router.put("/:courseId", () => {})
router.delete("/:courseId", () => {})


router.post("/", () => {})

