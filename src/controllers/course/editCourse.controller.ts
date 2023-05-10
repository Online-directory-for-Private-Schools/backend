import { Request, Response } from "express";
import {
    IAuthRequest,
    IEditCourseRequest
} from "../../interfaces/requests.interface";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import xor from "../../utils/xor.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import isObjectEmpty from "../../utils/isObjectEmpty.util";
import { editCourseService } from "../../services/course/editCourse.service";

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



    


    if(!Number(courseId)) {
        return sendErrorResponse("courseId has to be a number", 400, res);
    }


    if(moduleId && nonAcademicTypeId) {
        return sendErrorResponse("either one of moduleId or nonAcademicId has to be provided", 400, res)
    }

    if(moduleId) {
        if (!Number(moduleId)) {
            return sendErrorResponse("moduleId has to be a number", 400, res);
        }
    }

    if(nonAcademicTypeId) {
        if (!Number(nonAcademicTypeId)) {
            return sendErrorResponse("nonAcademicTypeId has to be a number", 400, res);
        }
    }


    let fileteredObj = filterObjectFromFalsyValues(courseInfo);

    if(isActive !== undefined) {
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
