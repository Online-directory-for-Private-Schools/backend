import { Schedule } from "../../../db/entities/ScheduleEntity";
import { IDeleteResponse } from "../../../interfaces/responses.interface";
import makeRespErrorUtil from "../../../utils/makeRespError.util";
import getExistingCourse from "../utils/getExistingCourse.util";

export default async function deleteCourseSchedulesService(
    courseId: number,
    scheduleId: number,
    userId: string
): Promise<IDeleteResponse> {
    // get course

    const { course, error } = await getExistingCourse({ courseId });

    if (!course || error) {
        return makeRespErrorUtil(error!.message);
    }

    const { owner } = course.school;

    if (owner.id !== userId) {
        return makeRespErrorUtil("you are not allowed to edit this course");
    }

    const scheduleExists = await Schedule.findOne({
        where: { id: scheduleId },
        relations: { course: true },
    });

    if (!scheduleExists) {
        return makeRespErrorUtil("schedule doesn't exist");
    }

    // checking if schedule is for the same course
    if (scheduleExists.course.id !== courseId) {
        return makeRespErrorUtil("you can't delete this schedule from a different course");
    }

    // delete schedule
    await scheduleExists.remove();

    return {
        info: "Successfully deleted course schedule",
    };
}
