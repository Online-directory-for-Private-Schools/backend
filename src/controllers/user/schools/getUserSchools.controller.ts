import { Request, Response } from "express";
import { IAuthRequest } from "../../../interfaces/requests.interface";
import { IGetUserSchoolsResponse } from "../../../interfaces/responses.interface";
import getUserSchoolsService from "../../../services/user/school/getUserSchool.service";
import sendErrorResponse from "../../utils/makeErrorResponse.util";
import checkUserRequest from "../utils/checkRequest.util";

export default async function getUserSchoolsController(req: Request, res: Response) {
    const { id: authUserId } = (req as IAuthRequest).authUser;

    const {userId: reqUserId} = req.params

    const { ok, errMessage, status } = checkUserRequest(reqUserId, authUserId);

    if (!ok) {
        return sendErrorResponse(errMessage!, status!, res);
    }
    
    let resp: IGetUserSchoolsResponse;

    try {
        const { schools, error } = await getUserSchoolsService(authUserId);

        if (error && !schools) {
            return sendErrorResponse(error.message, 400, res);
        }

        resp = { schools };

        return res.json(resp);

    } catch (error) {
        return sendErrorResponse(
            "There was an error while retrieving the user's schools",
            500,
            res
        );
    }
}
