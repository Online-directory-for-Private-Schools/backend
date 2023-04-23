import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TypeORMError } from "typeorm";
import { config } from "../../configs/config";
import { LoginRequest } from "../../interfaces/requests.interface";
import { AuthResponse } from "../../interfaces/responses.interface";
import checkUserLoginService from "../../services/auth/checkUserLogin.service";

// TODO: Refactor with Register controller

export default async function loginController(req: Request, res: Response) {
    let resp: AuthResponse;

    if (!isRequestValid(req.body)) {
        resp = {
            error: {
                message: "Invalid request",
            },
        };

        res.status(400).json(resp);

        return;
    }

    const { email, password }: LoginRequest = req.body;

    try {
        const { user, error } = await checkUserLoginService({ email, password });

        if (error || !user) {
            resp = { error };
            res.status(400).json(resp);
            return;
        }

        const token = jwt.sign({...user}, config.jwtSecret, { expiresIn: "2 days" });

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
