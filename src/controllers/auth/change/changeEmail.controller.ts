import { Request, Response } from "express";
import { IAuthRequest, IChangeEmailRequest } from "../../../interfaces/requests.interface";
import validateChangeEmailReq from "../../../validation/auth/change/changeEmail.validator";
import sendErrorResponse from "../../utils/makeErrorResponse.util";
import { sendErrorsResponse } from "../../utils/makeErrorsResponse.util";
import { ValidationError } from "yup";
import { IChangeAuthInfoResponse } from "../../../interfaces/responses.interface";
import changeEmailService from "../../../services/auth/change/changeEmail.service";

export default async function changeEmailController(req: Request, res: Response) {
    const { id: userId } = (req as IAuthRequest).authUser;

    const {email}: IChangeEmailRequest = req.body;

    let validatedBody: IChangeEmailRequest;

    // data validation
    try {
        validatedBody = await validateChangeEmailReq({
            email
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }

    try {
        const { info, error } = await changeEmailService(validatedBody, userId);

        if (!info && error) {
            return sendErrorResponse(error.message, 400, res);
        }

        const resp: IChangeAuthInfoResponse = { info };

        return res.json(resp);
    } catch (error) {
        return sendErrorResponse("an error occured while changing email", 500, res);
    }
}
