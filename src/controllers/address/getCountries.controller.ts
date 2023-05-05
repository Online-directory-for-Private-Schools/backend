import { Request, Response } from "express";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import getCountriesService from "../../services/address/getCountries.service";



export default async function getCountriesController(req: Request, res: Response) {
    try {

        const { countries, error } = await getCountriesService();

        if(error || !countries) {
            return sendErrorResponse(error!.message, 400, res);
        }

        return res.status(200).json(countries);

    } catch (error) {
        return sendErrorResponse("There was an error while fetching countries.", 500, res);
    }
}