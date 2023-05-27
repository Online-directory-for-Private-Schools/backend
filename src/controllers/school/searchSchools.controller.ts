import { Request, Response } from "express";
import { ISearchSchoolsRequest } from "../../interfaces/requests.interface";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import makeRespError from "../../utils/makeRespError.util";
import { ISearchSchoolsResponse } from "../../interfaces/responses.interface";
import { searchSchoolsService } from "../../services/School/searchSchools.service";
import { isNumber } from "class-validator";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import isNumeric from "../../utils/isNumeric.util";
import { validateSearchSchools } from "../../validation/school/school.validation";
import { ValidationError } from "yup";

export default async function searchSchoolsController(req: Request, res: Response) {
    let { name, cityId, countryId, provinceId, isHiring, page, limit }: ISearchSchoolsRequest =
        req.query;

    let resp: ISearchSchoolsResponse;

    let validatedBody: ISearchSchoolsRequest;

    try {
        validatedBody = await validateSearchSchools({
            name,
            cityId,
            countryId,
            provinceId,
            isHiring,
            page,
            limit,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }

    // filtering the request to only have non-false values
    const filteredBodyObj = filterObjectFromFalsyValues(validatedBody);

    try {
        const { data, error } = await searchSchoolsService(filteredBodyObj);

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
