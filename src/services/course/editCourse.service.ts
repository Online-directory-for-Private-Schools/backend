import { AppDataSource } from "../../data-source";
import { AcademicCourse } from "../../db/entities/Course/AcademicCourseEntity";
import { NonAcademicCourse } from "../../db/entities/Course/NonAcademicCourseEntity";
import { NonAcademicCourseTypes } from "../../db/entities/schoolLevels/NonAcademicCourseType";
import { SchoolModule } from "../../db/entities/schoolLevels/SchoolModuleEntity";
import { IEditCourseRequest } from "../../interfaces/requests.interface";
import { ICourseResponse } from "../../interfaces/responses.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import getExistingCourse from "./utils/getExistingCourse.util";

interface IEditCourseService extends IEditCourseRequest {
    id: number;
}

export async function editCourseService(
    courseInfo: IEditCourseService,
    userId: string
): Promise<ICourseResponse> {
    const {
        id,
        description,
        isActive,
        moduleId,
        monthlyPrice,
        nonAcademicTypeId,
        pricePerSession,
        teacher_name,
        title,
    } = courseInfo;

    const { course, error } = await getExistingCourse({ courseId: id });

    if (error || !course) {
        return makeRespErrorUtil(error!.message);
    }

    const { owner } = course.school;

    if (owner.id !== userId) {
        return makeRespErrorUtil("you are not allowed to edit this course");
    }

    if (moduleId) {
        const moduleExists = await SchoolModule.findOneBy({ id: moduleId });

        if (!moduleExists) {
            return makeRespErrorUtil("Module Doesn't exist");
        }

        (course as AcademicCourse).module = moduleExists;
    }

    if (nonAcademicTypeId) {
        const nonAcademicCourseTypeExists = await NonAcademicCourseTypes.findOneBy({ id: nonAcademicTypeId });

        if (!nonAcademicCourseTypeExists) {
            return makeRespErrorUtil("Module Doesn't exist");
        }

        (course as NonAcademicCourse).nonAcademicType = nonAcademicCourseTypeExists;
    }



    let filteredCourseInfo = filterObjectFromFalsyValues({
        description,
        monthlyPrice,
        pricePerSession,
        teacher_name,
        title,
    });

    if(isActive !== undefined) {
        filteredCourseInfo = {...filteredCourseInfo, isActive}
    }




    Object.keys(filteredCourseInfo).forEach(key => {
        (course as any)[key] = filteredCourseInfo[key];
    })

    await AppDataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(course);
        if(nonAcademicTypeId) {
            await transactionalEntityManager.save((course as NonAcademicCourse).nonAcademicType);
        }

        if(moduleId) {
            await transactionalEntityManager.save((course as AcademicCourse).module);
        }


    });


    await course.reload();

    return {course}



}
