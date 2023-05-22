import { Request, Response } from "express";
import { IAuthRequest, IChangePasswordRequest } from "../../../interfaces/requests.interface";
import { ValidationError } from "yup";
import validateChangePasswordReq from "../../../validation/auth/change/changePassword.validator";
import sendErrorResponse from "../../utils/makeErrorResponse.util";
import { sendErrorsResponse } from "../../utils/makeErrorsResponse.util";
import changePasswordService from "../../../services/auth/change/changePassword.service";
import { IChangeAuthInfoResponse } from "../../../interfaces/responses.interface";

export default async function changePasswordController(req: Request, res: Response) {
    const { oldPassword, newPassword, newPasswordConfirmation }: IChangePasswordRequest = req.body;

    const { id: userId } = (req as IAuthRequest).authUser;

    let validatedBody: IChangePasswordRequest;

    // data validation
    try {
        validatedBody = await validateChangePasswordReq({
            oldPassword,
            newPassword,
            newPasswordConfirmation,
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorsResponse(error.errors, 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }

    try {
        const { info, error } = await changePasswordService(validatedBody, userId);

        if (!info && error) {
            return sendErrorResponse(error.message, 400, res);
        }

        const resp: IChangeAuthInfoResponse = { info };

        return res.json(resp);
    } catch (error) {
        return sendErrorResponse("an error occured while changing password", 500, res);
    }
}
