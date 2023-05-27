import { Request, Response } from "express";
import { UserType } from "../../db/entities/UserEntity";
import createUserAccountService from "../../services/auth/createUser.service";
import { TypeORMError } from "typeorm";
import { IRegisterRequest } from "../../interfaces/requests.interface";
import jwt from "jsonwebtoken";
import { config } from "../../configs/config";
import { IAuthResponse } from "../../interfaces/responses.interface";
import { EmailFactory } from "../../services/Email/Email.factory";
import { validateRegister } from "../../validation/auth/auth.validation";
import { ValidationError } from "yup";
import sendErrorResponse from "../utils/makeErrorResponse.util";

export default async function registerController(req: Request, res: Response) {
    let resp: IAuthResponse;

    const { name, email, phone_number, password, type, cityId }: IRegisterRequest = req.body;

    let validatedBody: IRegisterRequest;

    try {
        validatedBody = await validateRegister({
            name,
            email,
            phone_number,
            password,
            type,
            cityId,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }

    try {
        const { user, error } = await createUserAccountService(validatedBody);

        if (error || !user) {
            resp = { error };
            res.status(400).json(resp);
            return;
        }

        const token = jwt.sign({ ...user }, config.jwtSecret, { expiresIn: "2 days" });

        EmailFactory.Instance.createWelcomeEmail(user)
            .send()
            .finally(() => {
                resp = {
                    token,
                    user,
                };

                res.status(200).json(resp);
            })
            .catch(() => {});
    } catch (error) {
        if (error instanceof TypeORMError) {
            console.log(error.message);
        }

        console.log(error);

        resp = {
            error: {
                message: "an error occurred while registering a new user",
            },
        };

        return res.status(500).json(resp);
    }
}

const isRequestValid = ({ name, email, type, password, cityId }: any) => {
    const isFull = ![name, email, password, cityId].includes(undefined);

    const isTypeValid = [UserType.SCHOOL_OWNER, UserType.STUDENT].includes(type);

    return isFull && isTypeValid;
};
