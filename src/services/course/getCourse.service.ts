import { CourseResponse } from "../../interfaces/responses.interface";
import getExistingCourse from "./utils/getExistingCourse.util";

interface CourseInfo {
    courseId: number;
}

export async function getCourseService(courseInfo: CourseInfo): Promise<CourseResponse> {
    return await getExistingCourse(courseInfo);
}
