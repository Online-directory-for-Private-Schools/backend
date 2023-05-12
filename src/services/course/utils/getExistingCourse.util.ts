import { AppDataSource } from "../../../data-source";
import { Course } from "../../../db/entities/Course/CourseEntity";
import { ICourseResponse } from "../../../interfaces/responses.interface";
import makeRespErrorUtil from "../../../utils/makeRespError.util";

interface CourseInfo {
    courseId: number;
}

export default async function getExistingCourse(courseInfo: CourseInfo, getOwner = true): Promise<ICourseResponse> {

    const { courseId } = courseInfo;

    const courseExists = await AppDataSource.getRepository(Course).findOne({
        where: {id: courseId},
        relations: {
            school: {
                owner: getOwner
            }
        }
    })

    if(!courseExists) {
        return makeRespErrorUtil("course with the provided id doesn't exist")
    }
    

    return {
        course: courseExists
    }
}