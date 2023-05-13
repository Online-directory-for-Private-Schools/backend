import { Request, Response } from "express";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import isNumeric from "../../utils/isNumeric.util";
import getModulesService from "../../services/schoolModules/getModules.service";

export default async function getModulesController(req: Request, res: Response) {

    const {yearId} = req.params;

    if(!yearId) {
        return sendErrorResponse("yearId is required", 400, res);
    }

    if(!isNumeric(yearId)) {
        return sendErrorResponse("yearId has to be a number", 400, res);
    }


    try {
        const { modules, error } = await getModulesService(+yearId);
        

        if(error || !modules) {
            return sendErrorResponse(error!.message, 400, res);
        }

        return res.status(200).json({modules});

    } catch (error) {
        return sendErrorResponse("There was an error while fetching modules.", 500, res);
    }

    

}