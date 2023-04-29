import { Request, Response } from "express";
import { AuthRequest } from "../../interfaces/requests.interface";
import { DeleteResponse, SchoolResponse } from "../../interfaces/responses.interface";
import makeErrorResponseUtil from "../../services/School/utils/makeErrorResponse.util";
import { deleteSchoolService } from "../../services/School/deleteSchool.service";

export default async function deleteSchoolController(req: Request, res: Response){
    const { authUser } = req as AuthRequest;

    const { id } = req.params;

    let resp: DeleteResponse;


    if(!Number(id)) {
        resp = makeErrorResponseUtil("id has to be a number")

        res.status(400).json(resp)

        return;
    }

    try {

        const { error } = await deleteSchoolService({id: +id}, authUser.id)

        if(error) {
            resp = {error}

            // TODO: [SEG310-87] handle error codes better
            return res.status(400).json(resp);
        }

        resp = {
            info: "Successfully deleted the school",
        }

        return res.json(resp)
        

        
    } catch (error) {
        resp = makeErrorResponseUtil("error while deleting the school")

        return res.status(500).json(resp)
    }
}

