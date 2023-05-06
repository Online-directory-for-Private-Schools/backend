import { Request, Response } from "express";
import {
    IAuthRequest,
    IEditCourseRequest,
    IEditSchoolRequest,
} from "../../interfaces/requests.interface";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import xor from "../../utils/xor.util";

export default async function editCourseController(req: Request, res: Response) {
    const { authUser } = req as IAuthRequest;

    const { courseId } = req.params;

    const courseInfo: IEditCourseRequest = req.body;

    const {
        title,
        description,
        isActive,
        moduleId,
        monthlyPrice,
        nonAcademicTypeId,
        pricePerSession,
        teacher_name,
    } = courseInfo;


    if(!Number(courseId)) {
        return sendErrorResponse("courseId has to be a number", 400, res);
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


    



    if(!Number(moduleId)) {
        return sendErrorResponse("moduleId has to be a number", 400, res);
    }

}
