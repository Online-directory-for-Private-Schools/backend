import { Request, Response } from "express";
import { IAuthRequest, ICreateCourseRequest } from "../../interfaces/requests.interface";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import createCourseService from "../../services/course/createCourse.service";
import { ICourseResponse } from "../../interfaces/responses.interface";
import { validateCreateCourse } from "../../validation/course/course.validation";
import { ValidationError } from "yup";

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


    let validatedBody: ICreateCourseRequest;

    try {
        validatedBody = await validateCreateCourse(typedCourseInfo)
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }


    try {
        const { course, error } = await createCourseService(typedCourseInfo, userId);

        if (error && !course) {
            return sendErrorResponse(error.message, 400, res);
        }

        const resp: ICourseResponse = { course };

        return res.json(resp);
    } catch (error) {
        console.log(error);
        return sendErrorResponse("an error occurred while creating the course", 500, res);
    }
}
