import { Request, Response } from "express";
import { IAuthRequest, ICreateCourseRequest } from "../../interfaces/requests.interface";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import doesObjectContainFalsy from "../../utils/doesObjectContainFalsy.util";
import createCourseService from "../../services/course/createCourse.service";
import { CourseResponse } from "../../interfaces/responses.interface";
import xor from "../../utils/xor.util";

export default async function createCourseController(req: Request, res: Response) {
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
    }: ICreateCourseRequest = req.body;

    let abstractCourseInfo = {
        title,
        teacher_name,
        description,
        isActive,
        schoolId,
        pricePerSession,
        monthlyPrice
    };

    let typedCourseInfo = {
        ...abstractCourseInfo,
        moduleId,
        nonAcademicTypeId,
    };

    const { id: userId } = (req as IAuthRequest).authUser;

    if (nonAcademicTypeId && moduleId) {
        return sendErrorResponse("moduleId and nonAcademicTypeId can't be set together", 400, res);
    }


    if (doesObjectContainFalsy(abstractCourseInfo)) {
        return sendErrorResponse("please provide all required fields", 400, res);
    }

    if(!xor(moduleId, nonAcademicTypeId)) {
        return sendErrorResponse("either one of moduleId or nonAcademicId has to be provided", 400, res)
    } else {
        if(!Number(moduleId) && !nonAcademicTypeId) {
            return sendErrorResponse("moduleId has to be a number", 400, res);
        }

        if(!Number(nonAcademicTypeId) && !moduleId) {
            return sendErrorResponse("nonAcademicTypeId has to be a number", 400, res);
        }
    }

    try {
        const { course, error } = await createCourseService(typedCourseInfo, userId);

        if (error && !course) {
            return sendErrorResponse(error.message, 400, res);
        }

        const resp: CourseResponse = { course };

        return res.json(resp);
    } catch (error) {
        console.log(error);
        return sendErrorResponse("an error occurred while creating the course", 500, res);
    }
}
