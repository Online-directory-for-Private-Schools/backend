import { ICourseResponse } from "../../interfaces/responses.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";
import getExistingCourse from "./utils/getExistingCourse.util";

interface CourseInfo {
    courseId: number;
}

export default async function deleteCourseService(
    schoolInfo: CourseInfo,
    userId: string
): Promise<ICourseResponse> {
    const { courseId } = schoolInfo;

    const { course, error } = await getExistingCourse({ courseId });

    if (error || !course) {
        return makeRespErrorUtil(error!.message);
    }

    const { owner } = course.school;

    if (owner.id !== userId) {
        return makeRespErrorUtil("you are not allowed to delete this course");
    }

    await course.remove();

    return {};
}
