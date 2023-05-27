import { Request, Response } from "express";
import { IAuthRequest, IEditUserRequest } from "../../interfaces/requests.interface";
import { IDeleteResponse, IUserResponse } from "../../interfaces/responses.interface";
import deleteUserService from "../../services/user/deleteUser.service";
import checkUserRequest from "./utils/checkRequest.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import editUserService from "../../services/user/editUser.service";
import isObjectEmpty from "../../utils/isObjectEmpty.util";
import makeRespErrorUtil from "../../utils/makeRespError.util";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import isNumeric from "../../utils/isNumeric.util";
import { isNumber } from "class-validator";
import { validateEditUser } from "../../validation/user/user.validation";
import { ValidationError } from "yup";

export default async function editUserController(req: Request, res: Response) {
    const { authUser } = req as IAuthRequest;

    const { id } = req.params;

    const { name, phone_number, cityId }: IEditUserRequest = req.body;

    const { ok, errMessage, status } = checkUserRequest(id, authUser.id);

    if (!ok) {
        return sendErrorResponse(errMessage!, status!, res);
    }

    let resp: IUserResponse;

    let validatedBody: IEditUserRequest;

    try {
        validatedBody = { ...(await validateEditUser({ id, name, phone_number, cityId })), id };
    } catch (error) {
        if (error instanceof ValidationError) {
            return sendErrorResponse(error.errors[0], 400, res);
        }

        return sendErrorResponse("an error occured while validating data", 500, res);
    }

   

    const filteredBodyObj = filterObjectFromFalsyValues(validatedBody);

    if (isObjectEmpty(filteredBodyObj)) {
        return sendErrorResponse("You must provide at least one user attribute to edit", 400, res);
    }


    try {
        // call editUser service
        const { user, error } = await editUserService({ ...filteredBodyObj, id });

        // error checking
        if (error) {
            return sendErrorResponse(error.message, 400, res);
        }

        resp = {
            user,
        };

        return res.json(resp);
    } catch (error) {
        return sendErrorResponse("An error occurred while editing user", 500, res);
    }
}
