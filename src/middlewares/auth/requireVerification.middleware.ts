import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../configs/config";
import { IAuthRequest } from "../../interfaces/requests.interface";
import { User } from "../../db/entities/UserEntity";
import { Auth } from "../../db/entities/Authentication/AuthEntity";
import sendErrorResponse from "../../controllers/utils/makeErrorResponse.util";


interface AuthTokenUser {
    id: string;
}

/**
 * 
 * @description Should always run after requireAuth middleware since it depends on the authentication ID of the user
 */
export async function requireVerification(req: Request, res: Response, next: NextFunction) {
    try {

        const {id: authUserId} = (req as IAuthRequest).authUser

        const userAuth = await Auth.findOne({
            where: {userId: authUserId}
        })

        if(!userAuth) {
            return sendErrorResponse("User doesn't exist", 400, res)
        }


        // checking the user's verification status
        if(!userAuth.verified) {
            return sendErrorResponse("User has to be verified to do this operation", 403, res);
        }
        
        next();

    } catch (error) {
        res.status(500).json({
            error: {
                message: "An error has occurred while checking user verification status.",
            },
        });

        return;
    }
}
