import { Request, Response } from "express";
import { CreateCourseRequest } from "../../interfaces/requests.interface";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import doesObjectContainFalsy from "../../utils/doesObjectContainFalsy.util";

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
    }: CreateCourseRequest = req.body;

    let info = {
        title,
        teacher_name,
        description,
        isActive,
        schoolId,
        pricePerSession,
        monthlyPrice,
        moduleId,
        nonAcademicTypeId,
    };

    if (nonAcademicTypeId && moduleId) {
        return sendErrorResponse("moduleId and nonAcademicTypeId can't be set together", 400, res);
    }

    // for now, only handle academic type

    if (!moduleId) {
        return sendErrorResponse("moduleId is required", 400, res);
    }

    if (
        doesObjectContainFalsy(info)
    ) {
        return sendErrorResponse("please provide all required fields", 400, res);
    }

    try {
        // TODO: create the service
        const { course, error } = await createCourseService(info);
    } catch (error) {
        return sendErrorResponse("an error occurred while creating the course", 400, res);
    }
}
