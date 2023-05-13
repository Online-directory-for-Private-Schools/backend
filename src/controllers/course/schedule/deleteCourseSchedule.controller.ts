import { Request, Response } from "express";
import sendErrorResponse from "../../utils/makeErrorResponse.util";
import { IAuthRequest } from "../../../interfaces/requests.interface";
import deleteCourseSchedulesService from "../../../services/course/schedules/deleteCourseSchedule.service";


export default async function deleteCourseSchedulesController(req: Request, res: Response) {
    const { courseId, scheduleId } = req.params;
    
    const { id: authUserId } = (req as IAuthRequest).authUser;
    
    if (!courseId) {
        return sendErrorResponse("courseId is required", 400, res);
    }

    if(!Number(courseId)) {
        return sendErrorResponse("courseId has to be a number", 400, res);
    }

    if (!scheduleId) {
        return sendErrorResponse("scheduleId is required", 400, res);
    }

    if(!Number(scheduleId)) {
        return sendErrorResponse("scheduleId has to be a number", 400, res);
    }

    try {
        const { info, error } = await deleteCourseSchedulesService(+courseId, +scheduleId, authUserId);

        if (error) {
            return sendErrorResponse(error!.message, 400, res);
        }

        return res.status(200).json({ info });
    } catch (error) {
        return sendErrorResponse("There was an error while fetching schedules.", 500, res);
    }

}