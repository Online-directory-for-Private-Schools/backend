import { Router } from "express";
import { requireAuth } from "../../middlewares/auth/requireAuth.middleware";
import createCourseController from "../../controllers/course/createCourse.controller";
import deleteCourseController from "../../controllers/course/deleteCourse.controller";
import getCourseController from "../../controllers/course/getCourse.controller";
import editCourseController from "../../controllers/course/editCourse.controller";
import searchCoursesController from "../../controllers/course/searchCourses.controller";
import getCourseSchedulesController from "../../controllers/course/schedule/getCourseSchedules.controller";
import { addCourseScheduleController } from "../../controllers/course/schedule/addCourseSchedule.controller";
import deleteCourseSchedulesController from "../../controllers/course/schedule/deleteCourseSchedule.controller";

const router = Router();

router.use(requireAuth);

router.get("/", searchCoursesController);
router.get("/:courseId", getCourseController);
router.put("/:courseId", editCourseController);
router.delete("/:courseId", deleteCourseController);
router.post("/", createCourseController);


router.post("/:courseId/schedules/",addCourseScheduleController);
router.get("/:courseId/schedules/", getCourseSchedulesController);
router.delete("/:courseId/schedules/:scheduleId", deleteCourseSchedulesController);



export { router as CourseRouter };
