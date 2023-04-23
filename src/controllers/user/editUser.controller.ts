import { Request, Response } from "express";
import { AuthRequest } from "../../interfaces/requests.interface";
import { DeleteUserResponse, GetUserResponse } from "../../interfaces/responses.interface";
import deleteUserService from "../../services/user/deleteUser.service";
import checkUserRequest from "./utils/checkRequest.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import editUserService from "../../services/user/editUser.service";
import isObjectEmpty from "../../utils/isObjectEmpty.util";

export default async function editUserController(req: Request, res: Response) {
    const { authUser } = req as AuthRequest;

    const { id } = req.params;

    const { name, phone_number, city, province, country } = req.body;


    const { ok, errMessage, status } = checkUserRequest(id, authUser.id);

    let resp: GetUserResponse;


    if (!ok) {
        resp = {
            error: {
                message: errMessage!,
            },
        };

        res.status(status!).send(resp);

        return;
    }

    const filteredBodyObj = filterObjectFromFalsyValues({ name, phone_number, city, province, country });
    
    if(isObjectEmpty(filteredBodyObj)) {
        resp = {
            error: {
                message: "You must provide at least one user attribute to edit"
            }
        }

        res.status(400).json(resp)

        return;
    }


    try {

        // call editUser service
        const { user, error } = await editUserService({...filteredBodyObj, id});

        // error checking
        if (error) {
            resp = {
                error,
            };

            return res.status(400).json(resp);
        }

       
        resp = {
           user
        }

        return res.json(resp);
        
    } catch (error) {
        resp = {
            error: {
                message: "An error occurred while editing user",
            },
        };

        return res.status(500).json(resp);
    }
}
