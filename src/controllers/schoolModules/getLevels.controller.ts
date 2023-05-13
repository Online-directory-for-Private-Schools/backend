import { Request, Response } from "express";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import getLevelsService from "../../services/schoolModules/getLevels.service";

export default async function getLevelsController(req: Request, res: Response) {
    // to decide if we should load sub-entities or not
    const { eager } = req.query;

    let isEager = false;

    if (eager) {
        if (!["true", "false"].includes(eager as unknown as string)) {
            return sendErrorResponse("eager has to be a boolean", 400, res);
        }
        isEager = (eager as unknown as string) === "true";
    }

    try {
        const { levels, error } = await getLevelsService(isEager);

        if (error || !levels) {
            return sendErrorResponse(error!.message, 400, res);
        }

        return res.status(200).json(levels);
    } catch (error) {
        return sendErrorResponse("There was an error while fetching levels.", 500, res);
    }
}
