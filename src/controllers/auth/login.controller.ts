import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TypeORMError } from "typeorm";
import { config } from "../../configs/config";
import { ILoginRequest } from "../../interfaces/requests.interface";
import { IAuthResponse } from "../../interfaces/responses.interface";
import checkUserLoginService from "../../services/auth/checkUserLogin.service";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import { ValidationError } from "yup";
import { validateLogin } from "../../validation/auth/auth.validation";

export default async function loginController(req: Request, res: Response) {
    let resp: IAuthResponse;

    const { email, password }: ILoginRequest = req.body;

    let validatedBody: ILoginRequest;

    try {
        validatedBody = await validateLogin({ email, password });
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }

    try {
        const { user, error } = await checkUserLoginService(validatedBody);

        if (error || !user) {
            resp = { error };
            res.status(400).json(resp);
            return;
        }

        const token = jwt.sign({ ...user }, config.jwtSecret, { expiresIn: "2 days" });

        resp = {
            token,
            user,
        };

        res.status(200).json(resp);
    } catch (error) {
        if (error instanceof TypeORMError) {
            console.log(error.message);
        }

        resp = {
            error: {
                message: "an error occurred while logging in",
            },
        };

        return res.status(500).json(resp);
    }
}

const isRequestValid = ({ email, password }: any) => {
    const isFull = ![email, password].includes(undefined);

    return isFull;
};
