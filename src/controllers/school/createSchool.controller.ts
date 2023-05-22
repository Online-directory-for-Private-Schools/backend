import { Request, Response } from "express";
import createSchoolService from "../../services/School/createSchool.service";
import { TypeORMError } from "typeorm";
import { IAuthRequest, ICreateSchoolRequest } from "../../interfaces/requests.interface";
import { ISchoolResponse } from "../../interfaces/responses.interface";
import makeRespError from "../../utils/makeRespError.util";
import { isNumber } from "class-validator";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import isNumeric from "../../utils/isNumeric.util";

export default async function createSchoolController(req: Request, res: Response) {

    let resp: ISchoolResponse;


    const {id: authUserId} = (req as IAuthRequest).authUser;

    if (!isRequestValid(req.body)) {

        resp = makeRespError("Invalid request");

        res.status(400).json(resp);

        return;
    }
    

    const { name, bio, isHiring, email, phone_number, website, lng, lat, cityId, street_name, userId }: ICreateSchoolRequest =
        req.body;


    
    if(authUserId !== userId) {
        return sendErrorResponse("You are not authorized to create a school for this user.", 401, res);
    }


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
            email,
            phone_number,
            lng,
            lat,
            cityId,
            street_name,
            userId,
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

const isRequestValid = ({ userId, name, lng, email, phone_number, lat, cityId, street_name}: any) => {
    const isFull = ![userId, name, email, phone_number, lng, lat, cityId, street_name].includes(
        undefined
    );

    return isFull;
};

