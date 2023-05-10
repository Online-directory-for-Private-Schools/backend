import { ICourseResponse } from "../../interfaces/responses.interface";
import getExistingCourse from "./utils/getExistingCourse.util";

interface CourseInfo {
    courseId: number;
}

export async function getCourseService(courseInfo: CourseInfo): Promise<ICourseResponse> {
    return await getExistingCourse(courseInfo);
}
