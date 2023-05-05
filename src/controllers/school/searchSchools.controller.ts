import { Request, Response } from "express";
import { SearchSchoolsRequest } from "../../interfaces/requests.interface";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import isObjectEmpty from "../../utils/isObjectEmpty.util";
import makeRespError from "../../utils/makeRespError.util";
import { SearchSchoolsResponse } from "../../interfaces/responses.interface";
import { searchSchoolsService } from "../../services/School/searchSchools.service";
import checkIfNumericOrUndefined from "../../utils/checkIfNumberOrUndefined.util";
import { isNumber } from "class-validator";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import isNumeric from "../../utils/isNumeric.util";

export default async function searchSchoolsController(req: Request, res: Response) {
    let { name, cityId, countryId, provinceId, isHiring, page, limit }: SearchSchoolsRequest =
        req.query;

    let resp: SearchSchoolsResponse;


    if (!isNumber(+page!) || !isNumber(+limit!)) {
        return sendErrorResponse("page and limit must be numbers", 400, res);
    }

    if(cityId) {
        if(!isNumeric(cityId.toString())) {
            return sendErrorResponse("cityId must be numeric", 400, res);
        }
    }

    if(provinceId) {
        if(!isNumeric(provinceId.toString())) {
            return sendErrorResponse("provinceId must be numeric", 400, res);
        }
    }

    if(countryId) {
        if(!isNumeric(countryId.toString())) {
            return sendErrorResponse("countryId must be numeric", 400, res);
        }
    }



    if (!limit) {
        limit = 20;
    }

    if (!page) {
        page = 1;
    }

    // filtering the request to only have non-false values
    const filteredBodyObj = filterObjectFromFalsyValues({
        name,
        cityId,
        countryId,
        provinceId,
        isHiring,
        page: +page!,
        limit: +limit!,
    });

    try {
        const { data, error } = await searchSchoolsService(filteredBodyObj);

        // error checking
        if (error || !data) {
            return sendErrorResponse(error?.message!, 500, res)
        }

        resp = { data };

        return res.json(resp);
    } catch (error) {
        // TODO: [SEG310-86] handle error types
        resp = makeRespError("an error occured while searching for schools");

        console.log(error);

        return res.status(500).json(resp);
    }
}
