import { Request, Response } from "express";
import createSchoolService from "../../services/School/createSchool.service";
import { TypeORMError } from "typeorm";
import { CreateSchoolRequest } from "../../interfaces/requests.interface";
import { SchoolResponse } from "../../interfaces/responses.interface";
import makeRespError from "../../utils/makeRespError.util";
import { isNumber } from "class-validator";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import isNumeric from "../../utils/isNumeric.util";

export default async function createSchoolController(req: Request, res: Response) {

    let resp: SchoolResponse;

    if (!isRequestValid(req.body)) {

        resp = makeRespError("Invalid request");

        res.status(400).json(resp);

        return;
    }
    

    const { name, bio, isHiring, email,lng, lat, cityId, street_name, userId, phone, website }: CreateSchoolRequest =
        req.body;


    if(!isNumber(cityId)) {
        return sendErrorResponse("cityId must be a positive number", 400, res);
    }

    if(cityId < 0) {
        return sendErrorResponse("cityId must be a positive number", 400, res);
    }

    if(!isNumeric(lat) || !isNumeric(lng)) {
        return sendErrorResponse("lat and lng must be numeric", 400, res);
    }

    try {
        const { school, error } = await createSchoolService({
            name,
            bio,
            isHiring,
            lng,
            lat,
            cityId,
            street_name,
            userId,
            email,
            phone,
            website
        });

        if (error) {
            resp = {error}
            res.status(400).json(resp);
            return;
        }

        res.status(200).json({
            school,
        });
    } catch (error) {
        if(error instanceof TypeORMError) {
            console.log(error.message)
        }

        return sendErrorResponse("an error has occured while creating the school", 500, res);
    }
}

const isRequestValid = ({ userId, name, lng, lat, cityId, street_name}: any) => {
    const isFull = ![userId, name, lng, lat, cityId, street_name].includes(
        undefined
    );

    return isFull;
};

