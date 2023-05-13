import { Request, Response } from "express";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import getLevelsService from "../../services/schoolModules/getLevels.service";
import getHighschoolSpecialitiesService from "../../services/schoolModules/getHighShoolSpeciaities.service";

export default async function getHighschoolSpecialitiesController(req: Request, res: Response) {

    try {
        const { specialities, error } = await getHighschoolSpecialitiesService();

        if (error || !specialities) {
            return sendErrorResponse(error!.message, 400, res);
        }

        return res.status(200).json({specialities});
    } catch (error) {
        return sendErrorResponse("There was an error while fetching specialities.", 500, res);
    }
}
