import { Router } from "express";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";
import createCourseController from "../../controllers/course/createCourse.controller";
import deleteCourseController from "../../controllers/course/deleteCourse.controller";
import getCourseController from "../../controllers/course/getCourse.controller";
import editCourseController from "../../controllers/course/editCourse.controller";
import searchCoursesController from "../../controllers/course/searchCourses.controller";

const router = Router();

router.use(requireAuth);

router.get("/", searchCoursesController);
router.get("/:courseId", getCourseController);
router.put("/:courseId", editCourseController);
router.delete("/:courseId", deleteCourseController);
router.post("/", createCourseController);

router.post("/:courseId/schedules/");
router.get("/:courseId/schedules/");
router.put("/:courseId/schedules/:scheduleId");
router.delete("/:courseId/schedules/:scheduleId");



export { router as CourseRouter };
