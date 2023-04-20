import { Request, Response } from "express";
import { UserType } from "../../db/entities/UserEntity";
import createUserAccountService from "../../services/auth/createUser.service";
import { TypeORMError } from "typeorm";

export default async function registerController(req: Request, res: Response) {
    if (!isRequestValid(req.body)) {
        res.status(400).json({
            error: "Invalid request",
        });

        return;
    }

    const { name, email, phone_number, password, type } = req.body;

    try {
        const { user, error } = await createUserAccountService({
            name,
            email,
            phone_number,
            password,
            type,
        });

        // Todo: do JWT authentication here

        if (error) {
            res.status(400).json(error);
            return;
        }

        res.status(200).json({
            user,
        });
    } catch (error) {
        if(error instanceof TypeORMError) {
            console.log(error.message)
        }
        
        return res.status(500).json({
            error: {
                message: "an error occurred while registering a new user",
            },
        });
    }
}

const isRequestValid = ({ name, email, type, password }: any) => {
    const isFull = ![name, email, password].includes(undefined);

    const isTypeValid = [UserType.SCHOOL_OWNER, UserType.STUDENT].includes(type);

    return isFull && isTypeValid;
};
