import { Request, Response } from "express";
import { UserType } from "../../db/entities/UserEntity";
import createUserAccountService from "../../services/auth/createUser.service";
import { TypeORMError } from "typeorm";
import { IRegisterRequest } from "../../interfaces/requests.interface";
import jwt from "jsonwebtoken";
import { config } from "../../configs/config";
import { IAuthResponse } from "../../interfaces/responses.interface";
import { EmailFactory } from "../../services/Email/Email.factory";

export default async function registerController(req: Request, res: Response) {
    let resp: IAuthResponse;

    if (!isRequestValid(req.body)) {
        resp = {
            error: {
                message: "Invalid request",
            },
        };

        res.status(400).json(resp);

        return;
    }

    const { name, email, phone_number, password, type, cityId}: IRegisterRequest = req.body;

    try {
        const { user, error } = await createUserAccountService({
            name,
            email,
            phone_number,
            password,
            type,
            cityId,
        });

        if (error || !user) {
            resp = { error };
            res.status(400).json(resp);
            return;
        }

        const token = jwt.sign({...user}, config.jwtSecret, { expiresIn: "2 days" });

       await EmailFactory.Instance.createWelcomeEmail(user).send();

        resp = {
            token,
            user
        };

        res.status(200).json(resp);
        
    } catch (error) {
        if (error instanceof TypeORMError) {
            console.log(error.message);
        }

        console.log(error)

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
