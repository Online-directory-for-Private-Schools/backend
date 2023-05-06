import { AcademicCourse } from "../../db/entities/Course/AcademicCourseEntity";
import { Course } from "../../db/entities/Course/CourseEntity";
import { NonAcademicCourse } from "../../db/entities/Course/NonAcademicCourseEntity";
import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import { NonAcademicCourseTypes } from "../../db/entities/schoolLevels/NonAcademicCourseType";
import { SchoolModule } from "../../db/entities/schoolLevels/SchoolModuleEntity";
import { ICreateCourseRequest } from "../../interfaces/requests.interface";
import { CourseResponse } from "../../interfaces/responses.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";

export default async function createCourseService(
    courseInfo: ICreateCourseRequest,
    reqUserId: string
): Promise<CourseResponse> {
    const {
        title,
        teacher_name,
        description,
        isActive,
        schoolId,
        pricePerSession,
        monthlyPrice,
        moduleId,
        nonAcademicTypeId,
    } = courseInfo;

    // check if school exists
    const schoolExists = await PrivateSchool.findOne({
        where: { id: schoolId },
        relations: {
            owner: true
        }
    });

    if (!schoolExists) {
        return makeRespErrorUtil("school doesn't exist");
    }

    const schoolOwnerId = schoolExists.owner.id;

    if (schoolOwnerId !== reqUserId) {
        return makeRespErrorUtil("you don't have permission to create a course on this school");
    }

    let course: AcademicCourse | NonAcademicCourse | Course = Course.create();

    if (!moduleId && !nonAcademicTypeId) {
        return makeRespErrorUtil("either moduleId or nonAcademicTypeId is required");
    }

    if (moduleId && nonAcademicTypeId) {
        return makeRespErrorUtil(
            "you can't specify both moduleId and nonAcademicTypeId for the same course"
        );
    }

    // check if module exists
    if (moduleId) {
        const moduleExists = await SchoolModule.findOneBy({ id: moduleId });

        if (!moduleExists) {
            return makeRespErrorUtil("module doesn't exist");
        }

        course = new AcademicCourse();

        (course as AcademicCourse).module = moduleExists;
    }

    // checking if non-academic type exists
    if (nonAcademicTypeId) {
        const nonAcademicTypeExists = await NonAcademicCourseTypes.findOneBy({
            id: nonAcademicTypeId,
        });

        if (!nonAcademicTypeExists) {
            return makeRespErrorUtil("non-academic type doesn't exist");
        }

        course = new NonAcademicCourse();

        (course as NonAcademicCourse).nonAcademicType = nonAcademicTypeExists;
    }

    course.title = title;
    course.teacher_name = teacher_name;
    course.description = description;
    course.isActive = isActive;
    course.pricePerSession = pricePerSession;
    course.monthlyPrice = monthlyPrice;

    course.school = schoolExists;

    await course.save();

    // to remove eager relations
    await course.reload();

    return { course: course };
}
