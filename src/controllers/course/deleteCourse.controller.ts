import { Request, Response } from "express";
import { IAuthRequest } from "../../interfaces/requests.interface";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import { DeleteResponse } from "../../interfaces/responses.interface";
import deleteCourseService from "../../services/course/deleteCourse.service";

export default async function deleteCourseController(req: Request, res: Response) {
    const { courseId } = req.params;

    const { authUser } = req as IAuthRequest;

    if(!Number(courseId)) {
        return sendErrorResponse("courseId has to be a number", 400, res)
    }

    try {
        const { error } = await deleteCourseService({courseId: +courseId}, authUser.id);

        if(error) {
            return sendErrorResponse(error.message, 400, res)
        }

        const resp: DeleteResponse = {
            info: "deleted course successfully"
        }

        return res.json(resp)

    } catch (error) {
        return sendErrorResponse("an error occured while deleting course", 500, res)
    }
}
