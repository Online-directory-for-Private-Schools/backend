import { Request, Response } from "express";
import sendErrorResponse from "../../utils/makeErrorResponse.util";
import { IAuthRequest } from "../../../interfaces/requests.interface";
import verifyUserService from "../../../services/auth/verification/verifyUser.service";
import { IUserVerificationResponse } from "../../../interfaces/responses.interface";

export default async function verifyUserController(req: Request, res: Response) {
    const { userId } = req.params;

    const { id: authUserId } = (req as IAuthRequest).authUser;

    const { code } = req.body;

    if (!userId) {
        return sendErrorResponse("userId is required", 400, res);
    }

    if (authUserId !== userId) {
        return sendErrorResponse("you are not allowed to verify this user", 403, res);
    }

    try {
        const { info, error } = await verifyUserService(userId, code);

        if (!info && error) {
            return sendErrorResponse(error.message, 400, res);
        }

        const resp: IUserVerificationResponse = { info };

        res.send(resp);
        
    } catch (error) {
        console.log(error)
        return sendErrorResponse("there was an error while verifying the user's email", 500, res);
    }
}

