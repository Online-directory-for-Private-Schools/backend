import { Request, Response } from "express";
import { IAuthRequest, IEditSchoolRequest } from "../../interfaces/requests.interface";
import { ISchoolResponse } from "../../interfaces/responses.interface";
import { editSchoolService } from "../../services/School/editSchool.service";
import makeRespError from "../../utils/makeRespError.util";
import isObjectEmpty from "../../utils/isObjectEmpty.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import { isNumber } from "class-validator";
import isNumeric from "../../utils/isNumeric.util";
import { validateEditSchool } from "../../validation/school/school.validation";
import { ValidationError } from "yup";

export default async function editSchoolController(req: Request, res: Response) {
    const { authUser } = req as IAuthRequest;

    const { id } = req.params;

    const {
        name,
        bio,
        cityId,
        isHiring,
        email,
        phone_number,
        website,
        streetName,
        lat,
        lng,
    }: IEditSchoolRequest = req.body;

    let resp: ISchoolResponse;

    let validatedBody: IEditSchoolRequest;

    try {
        validatedBody = await validateEditSchool({
            id,
            name,
            bio,
            cityId,
            isHiring,
            email,
            phone_number,
            website,
            streetName,
            lat,
            lng,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }

    const filteredBodyObj = filterObjectFromFalsyValues(validatedBody);


    if (isObjectEmpty(filteredBodyObj)) {
        return sendErrorResponse("At least one school attribute needs to be provided", 400, res);
    }

    try {
        // call editUser service
        const { school, error } = await editSchoolService(filteredBodyObj, authUser.id);

        // error checking
        if (error || !school) {
            resp = { error };

            return res.status(400).json(resp);
        }

        resp = { school };

        return res.json(resp);
    } catch (error) {
        // TODO: [SEG310-86] handle error types
        resp = makeRespError("an error occured while editing the school");

        console.log(error);

        return res.status(500).json(resp);
    }
}
