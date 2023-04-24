import { Request, Response } from "express";
import { AuthRequest } from "../../interfaces/requests.interface";
import { DeleteUserResponse } from "../../interfaces/responses.interface";
import deleteUserService from "../../services/user/deleteUser.service";
import checkUserRequest from "./utils/checkRequest.util";

export default async function deleteUserController(req: Request, res: Response) {
    const { authUser } = req as AuthRequest;

    const { id } = req.params;

    let resp: DeleteUserResponse;

    const { ok, errMessage, status } = checkUserRequest(id, authUser.id);

    if (!ok) {
        resp = {
            error: {
                message: errMessage!,
            },
        };

        res.status(status!).send(resp);

        return;
    }

    try {
        // call deleteUser service
        const { error } = await deleteUserService({ id });

        // error checking
        if (error) {
            resp = {
                error,
            };

            return res.status(400).json(resp);
        }

       
        resp = {
            info: "Successfully deleted user"
        }

        return res.json(resp);
        
    } catch (error) {
        resp = {
            error: {
                message: "An error occurred while deleting user",
            },
        };

        return res.status(500).json(resp);
    }
}
