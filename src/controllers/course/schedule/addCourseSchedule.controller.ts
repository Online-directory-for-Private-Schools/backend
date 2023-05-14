import { Request, Response } from "express";
import isNumeric from "../../../utils/isNumeric.util";
import sendErrorResponse from "../../utils/makeErrorResponse.util";
import {
    DaysEnum,
    IAddCourseScheduleRequest,
    IAuthRequest,
} from "../../../interfaces/requests.interface";
import checkTimeFormat from "../../../utils/checkTimeFormat.util";
import addCourseScheduleService from "../../../services/course/schedules/addCourseSchedule.service";

export async function addCourseScheduleController(req: Request, res: Response) {
    const { courseId } = req.params;

    const { id: authUserId } = (req as IAuthRequest).authUser;

    

    const { start_time, end_time, day }: IAddCourseScheduleRequest = req.body;


    if (!start_time || !end_time || !day) {
        return sendErrorResponse("please provide all needed options to create schedule", 400, res);
    }

    if (!courseId) {
        return sendErrorResponse("courseId is required", 400, res);
    }

    if(!Number(courseId)) {
        return sendErrorResponse("courseId has to be a number", 400, res);
    }

    if (!isNumeric(courseId)) {
        return sendErrorResponse("courseId has to be a number", 400, res);
    }

    if(!checkTimeFormat(start_time) || !checkTimeFormat(end_time)) {
        return sendErrorResponse("start_time and end_time must be formatted as: hh:mm", 400, res);
    }
    

    if (start_time >= end_time) {
        return sendErrorResponse("start time must be less than end time", 400, res);
    }


    if (!(Object.values(DaysEnum).includes(day))) {
        return sendErrorResponse("invalid day value, please check DaysEnum", 400, res);
    }


    try {
        const { schedule, error } = await addCourseScheduleService({courseId: +courseId, start_time, end_time, day}, authUserId);

        if (error || !schedule) {
            return sendErrorResponse(error!.message, 400, res);
        }

        return res.status(200).json({ schedule });
    } catch (error) {
        return sendErrorResponse("There was an error while adding schedule.", 500, res);
    }
}
