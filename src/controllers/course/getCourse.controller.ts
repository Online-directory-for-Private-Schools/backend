import { Request, Response } from "express";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import { ICourseResponse } from "../../interfaces/responses.interface";
import { getCourseService } from "../../services/course/getCourse.service";

export default async function getCourseController(req: Request, res: Response) {
    const { courseId } = req.params;

    if (!Number(courseId)) {
        return sendErrorResponse("please provice a correct course id", 400, res);
    }

    try {
        const { course, error } = await getCourseService({ courseId: +courseId });

        if (error || !course) {
            return sendErrorResponse(error!.message, 400, res);
        }

        const resp: ICourseResponse = {course}

        return res.json(resp);


    } catch (error) {
        return sendErrorResponse("an error occured while getting the course", 500, res);
    }
}
