import { Request, Response } from "express";
import { GetUserResponse } from "../../interfaces/responses.interface";
import { AuthRequest } from "../../interfaces/requests.interface";
import getUserService from "../../services/user/getUser.service";
import checkUserRequest from "./utils/checkRequest.util";

export default async function getUserController(req: Request, res: Response) {
    const { authUser } = req as AuthRequest;

    const { id } = req.params;

    let resp: GetUserResponse;

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
        // call getUser service
        const { user, error } = await getUserService({ id });

        // error checking
        if (error || !user) {
            resp = {
                error,
            };

            return res.status(400).json(resp);
        }

        resp = { user };

        return res.json(resp);

    } catch (error) {

        resp = {
            error: {
                message: "An error occurred while retrieving user"
            }
        }

        return res.status(500).json(resp);

    }
}