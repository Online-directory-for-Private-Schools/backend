import { Request, Response } from "express";
import sendErrorResponse from "../../utils/makeErrorResponse.util";
import getCourseSchedulesService from "../../../services/course/schedules/getCourseSchedules.service";


export default async function getCourseSchedulesController(req: Request, res: Response) {
    const { courseId } = req.params;
    
    if (!courseId) {
        return sendErrorResponse("courseId is required", 400, res);
    }

    if(!Number(courseId)) {
        return sendErrorResponse("courseId has to be a number", 400, res);
    }

    try {
        const { schedules, error } = await getCourseSchedulesService(+courseId);

        if (error || !schedules) {
            return sendErrorResponse(error!.message, 400, res);
        }

        return res.status(200).json({ schedules });
    } catch (error) {
        return sendErrorResponse("There was an error while fetching schedules.", 500, res);
    }

}