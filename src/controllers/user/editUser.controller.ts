import { Request, Response } from "express";
import { AuthRequest, EditUserRequest } from "../../interfaces/requests.interface";
import { DeleteResponse, GetUserResponse } from "../../interfaces/responses.interface";
import deleteUserService from "../../services/user/deleteUser.service";
import checkUserRequest from "./utils/checkRequest.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import editUserService from "../../services/user/editUser.service";
import isObjectEmpty from "../../utils/isObjectEmpty.util";
import makeRespErrorUtil from "../../utils/makeRespError.util";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import isNumeric from "../../utils/isNumeric.util";
import { isNumber } from "class-validator";

export default async function editUserController(req: Request, res: Response) {
    const { authUser } = req as AuthRequest;

    const { id } = req.params;

    const { name, phone_number, cityId }: EditUserRequest = req.body;


    const { ok, errMessage, status } = checkUserRequest(id, authUser.id);

    let resp: GetUserResponse;


    if (!ok) {
        return sendErrorResponse(errMessage!, status!, res);
    }

    const filteredBodyObj = filterObjectFromFalsyValues({ name, phone_number, cityId });
    
    if(isObjectEmpty(filteredBodyObj)) {
        return sendErrorResponse("You must provide at least one user attribute to edit", 400, res)
    }


    if(cityId) {
        if(!isNumber(cityId)) {
            return sendErrorResponse("cityId must be a number", 400, res);
        }
    }


    try {

        // call editUser service
        const { user, error } = await editUserService({...filteredBodyObj, id});

        // error checking
        if (error) {
            return sendErrorResponse(error.message, 400, res);
        }

       
        resp = {
           user
        }

        return res.json(resp);
        
    } catch (error) {
        return sendErrorResponse("An error occurred while editing user", 500, res);
    }
}
