import { Request, Response } from "express";
import createSchoolService from "../../services/School/createSchool.service";
import { TypeORMError } from "typeorm";
import { IAuthRequest, ICreateSchoolRequest } from "../../interfaces/requests.interface";
import { ISchoolResponse } from "../../interfaces/responses.interface";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import { ValidationError } from "yup";
import { validateCreateSchool } from "../../validation/school/school.validation";

export default async function createSchoolController(req: Request, res: Response) {
    let resp: ISchoolResponse;

    const { id: authUserId } = (req as IAuthRequest).authUser;

    const {
        name,
        bio,
        isHiring,
        email,
        phone_number,
        website,
        lng,
        lat,
        cityId,
        street_name,
        userId,
    }: ICreateSchoolRequest = req.body;

    let validatedBody: ICreateSchoolRequest;

    try {
        validatedBody = await validateCreateSchool({
            name,
            bio,
            isHiring,
            email,
            phone_number,
            website,
            lng,
            lat,
            cityId,
            street_name,
            userId,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }

    if (authUserId !== userId) {
        return sendErrorResponse(
            "You are not authorized to create a school for this user.",
            401,
            res
        );
    }

    try {
        const { school, error } = await createSchoolService(validatedBody);

        if (error) {
            resp = { error };
            res.status(400).json(resp);
            return;
        }

        res.status(200).json({
            school,
        });
    } catch (error) {
        if (error instanceof TypeORMError) {
            console.log(error.message);
        }

        return sendErrorResponse("an error has occured while creating the school", 500, res);
    }
}

const isRequestValid = ({
    userId,
    name,
    lng,
    email,
    phone_number,
    lat,
    cityId,
    street_name,
}: any) => {
    const isFull = ![userId, name, email, phone_number, lng, lat, cityId, street_name].includes(
        undefined
    );

    return isFull;
};
