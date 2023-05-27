import { Request, Response } from "express";
import sendErrorResponse from "../../utils/makeErrorResponse.util";
import sendVerificationService from "../../../services/auth/verification/sendVerification.service";
import { IUserVerificationResponse } from "../../../interfaces/responses.interface";
import { IAuthRequest } from "../../../interfaces/requests.interface";

export default async function sendVerificationController(req: Request, res: Response) {

    const { id: authUserId } = (req as IAuthRequest).authUser;


    try {
        const { info, error } = await sendVerificationService(authUserId);

        if (!info && error) {
            return sendErrorResponse(error.message, 400, res);
        }

        const resp: IUserVerificationResponse = { info };

        res.send(resp);

    } catch (error) {
        console.error(error)
        return sendErrorResponse("there was an error while sending verification email", 500, res);
    }
}
