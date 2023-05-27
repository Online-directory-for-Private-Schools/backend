import { Request, Response } from "express";
import {
    IAuthRequest,
    IEditCourseRequest
} from "../../interfaces/requests.interface";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import isObjectEmpty from "../../utils/isObjectEmpty.util";
import { editCourseService } from "../../services/course/editCourse.service";
import { validateEditCourse } from "../../validation/course/course.validation";
import { ValidationError } from "yup";

export default async function editCourseController(req: Request, res: Response) {
    const { authUser } = req as IAuthRequest;

    const { courseId } = req.params;


    const {
        title,
        description,
        isActive,
        moduleId,
        monthlyPrice,
        nonAcademicTypeId,
        pricePerSession,
        teacher_name,
    } = req.body;


    const courseInfo: IEditCourseRequest = {
        title,
        description,
        isActive,
        moduleId,
        monthlyPrice,
        nonAcademicTypeId,
        pricePerSession,
        teacher_name,
    }



    let validatedBody: IEditCourseRequest;

    try {
        validatedBody = await validateEditCourse(courseInfo)
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }



    let fileteredObj = filterObjectFromFalsyValues(validatedBody);

    if(validatedBody.isActive !== undefined) {
        fileteredObj = {...fileteredObj, isActive}
    }


    if(isObjectEmpty(fileteredObj)) {
        return sendErrorResponse("At least one course attribute must be provided", 400, res);
    }


    try {

        const { course, error } = await editCourseService({...fileteredObj, id: +courseId}, authUser.id)


        if (error || !course) {
            return sendErrorResponse(error!.message, 400, res);
        }

       
        const resp = { course }

        return res.json(resp);
        
    } catch (error) {
        console.log(error)
        return sendErrorResponse("an error occured while editing the course", 500, res)
    }
    


}
