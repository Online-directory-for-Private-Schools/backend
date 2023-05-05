import { Request, Response } from "express";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import getCountriesService from "../../services/address/getCountries.service";
import getProvincesService from "../../services/address/getProvinces.service";
import isNumeric from "../../utils/isNumeric.util";



export default async function getProvincesController(req: Request, res: Response) {
    try {

        const { countryId } = req.params;

        if(!countryId) {
            return sendErrorResponse("countryId is required", 400, res);
        }

        if(!isNumeric(countryId)) {
            return sendErrorResponse("countryId has to be a number", 400, res);
        }



        const { provinces, error } = await getProvincesService(+countryId);
        

        if(error || !provinces) {
            return sendErrorResponse(error!.message, 400, res);
        }

        return res.status(200).json(provinces);

    } catch (error) {
        return sendErrorResponse("There was an error while fetching provinces.", 500, res);
    }
}