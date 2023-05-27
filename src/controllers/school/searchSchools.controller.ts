import { Request, Response } from "express";
import { ISearchSchoolsRequest } from "../../interfaces/requests.interface";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import makeRespError from "../../utils/makeRespError.util";
import { ISearchSchoolsResponse } from "../../interfaces/responses.interface";
import { searchSchoolsService } from "../../services/School/searchSchools.service";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import { validateSearchSchools } from "../../validation/school/school.validation";
import { ValidationError } from "yup";

export default async function searchSchoolsController(req: Request, res: Response) {
    let { name, cityId, countryId, provinceId, isHiring, page, limit }: ISearchSchoolsRequest =
        req.query;

    let resp: ISearchSchoolsResponse;

    let validatedBody: ISearchSchoolsRequest;

    // filtering the request to only have non-false values
    const filteredBodyObj = filterObjectFromFalsyValues({
        name,
        cityId,
        countryId,
        provinceId,
        isHiring,
        page,
        limit,
    });

    try {
        validatedBody = await validateSearchSchools(filteredBodyObj);
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }


    try {
        const { data, error } = await searchSchoolsService(validatedBody);

        // error checking
        if (error || !data) {
            return sendErrorResponse(error?.message!, 500, res);
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
