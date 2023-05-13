import { Schedule } from "../../../db/entities/ScheduleEntity";
import { IAddCourseScheduleRequest } from "../../../interfaces/requests.interface";
import { ICourseScheduleResponse } from "../../../interfaces/responses.interface";
import makeRespErrorUtil from "../../../utils/makeRespError.util";
import getExistingCourse from "../utils/getExistingCourse.util";

export default async function addCourseScheduleController(scheduleInfo: IAddCourseScheduleRequest, userId: string): Promise<ICourseScheduleResponse> {
    const {courseId, day, end_time, start_time} = scheduleInfo

    const {course, error} = await getExistingCourse({courseId})

    if (error || !course) {
        return makeRespErrorUtil(error!.message);
    }

    const { owner } = course.school;

    if (owner.id !== userId) {
        return makeRespErrorUtil("you are not allowed to edit this course");
    }

    const schedule = Schedule.create({start_time, end_time, day});

    schedule.course = course;


    await schedule.save();


    return {schedule}


}