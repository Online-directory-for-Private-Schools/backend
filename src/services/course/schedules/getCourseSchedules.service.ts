import { Course } from "../../../db/entities/Course/CourseEntity";
import { ICourseScheduleResponse, ICourseSchedulesResponse } from "../../../interfaces/responses.interface";
import makeRespErrorUtil from "../../../utils/makeRespError.util";

export default async function getCourseSchedulesService(courseId: number): Promise<ICourseSchedulesResponse> {
    const course = await Course.findOneBy({
        id: courseId,
    });

    if (!course) {
        return makeRespErrorUtil("course not found");
    }

    const { schedules } = course;

    return { schedules };
}
