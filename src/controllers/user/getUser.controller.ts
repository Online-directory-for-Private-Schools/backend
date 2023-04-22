import { Request, Response } from "express";
import { GetUserResponse } from "../../interfaces/responses.interface";
import { AuthRequest } from "../../interfaces/requests.interface";

export default async function getUserController(req: Request, res: Response) {

    const { user } = req as AuthRequest;

    const { id } = req.params;

    let resp: GetUserResponse;

    // checking if id is provided in params
    if(!id) {
        resp = {
            error: {
                message: "a user id has to be provided"
            }
        }

        return res.status(400).json(resp);
    }


    // checking if id is provided in params matches the authenticated user's id
    if(id !== user.id) {
        resp = {
            error: {
                message: "You are not authorized to access this user"
            }
        }

        return res.status(403).json(resp)
    }


    // call getUser service



}
