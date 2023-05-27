import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../configs/config";
import { IAuthRequest } from "../../interfaces/requests.interface";


interface AuthTokenUser {
    id: string;
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.header("Authorization")

        console.log(req.headers)

        if (!authHeader) {
            res.status(401).json({
                error: {
                    message: "Authorization token is required",
                },
            });

            return;
        }

        
        // token = "Bearer TOKEN_HERE
        const token = authHeader.split(" ")[1];

        // checking if token is valid
        const { id } = jwt.verify(token, config.jwtSecret) as AuthTokenUser;

        // adding the user id to the request object
        (req as IAuthRequest).authUser = { id };

        // executing the protected controller function after we have validated the token
        next();

    } catch (error) {
        if(error instanceof jwt.TokenExpiredError) {
            res.status(400).json({
                error: {
                    message: "Expired token",
                },
            });

            return;
        }

        if(error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                error: {
                    message: "Invalid token",
                },
            });

            return;
        }


        res.status(500).json({
            error: {
                message: "An error has occurred while authenticating.",
            },
        });

        return;
    }
}
