import { Request, Response } from "express";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import getCountriesService from "../../services/address/getCountries.service";
import getProvincesService from "../../services/address/getProvinces.service";
import isNumeric from "../../utils/isNumeric.util";
import getCitiesService from "../../services/address/getCities.service";



export default async function getCitiesController(req: Request, res: Response) {
    try {

        const { provinceId } = req.params;

        if(!provinceId) {
            return sendErrorResponse("provinceId is required", 400, res);
        }

        if(!isNumeric(provinceId)) {
            return sendErrorResponse("provinceId has to be a number", 400, res);
        }



        const { cities, error } = await getCitiesService(+provinceId);
        

        if(error || !cities) {
            return sendErrorResponse(error!.message, 400, res);
        }

        return res.status(200).json(cities);

    } catch (error) {
        return sendErrorResponse("There was an error while fetching cities.", 500, res);
    }
}