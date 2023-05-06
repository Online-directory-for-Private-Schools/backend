import { Router } from "express";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";
import createCourseController from "../../controllers/course/createCourse.controller";
import deleteCourseController from "../../controllers/course/deleteCourse.controller";
import getCourseController from "../../controllers/course/getCourse.controller";

const router = Router();

router.use(requireAuth);

router.get("/", () => {});
router.get("/:courseId", getCourseController);
router.put("/:courseId", () => {});
router.delete("/:courseId", deleteCourseController);

router.post("/", createCourseController);

export { router as CourseRouter };
