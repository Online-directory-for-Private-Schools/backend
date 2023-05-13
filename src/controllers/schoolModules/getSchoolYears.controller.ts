import { Request, Response } from "express";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import isNumeric from "../../utils/isNumeric.util";
import getSchoolYearsService from "../../services/schoolModules/getSchoolYears.service";
import { ISchoolYearResponse } from "../../interfaces/responses.interface";

export default async function getSchoolYearsController(req: Request, res: Response) {
    const { levelId } = req.params;

    // to decide if we should load sub-entities or not
    const { eager } = req.query;

    let isEager = false;

    if (eager) {
        if (!["true", "false"].includes(eager as unknown as string)) {
            return sendErrorResponse("eager has to be a boolean", 400, res);
        }
        isEager = (eager as unknown as string) === "true";
    }

    if (!levelId) {
        return sendErrorResponse("levelId is required", 400, res);
    }

    if (!isNumeric(levelId)) {
        return sendErrorResponse("countryId has to be a number", 400, res);
    }

    try {
        const { schoolYears, error } = await getSchoolYearsService(+levelId, isEager);

        if (error || !schoolYears) {
            return sendErrorResponse(error!.message, 400, res);
        }

        let resp: ISchoolYearResponse = { schoolYears };

        return res.status(200).json(resp);
    } catch (error) {
        return sendErrorResponse("There was an error while fetching years.", 500, res);
    }
}
