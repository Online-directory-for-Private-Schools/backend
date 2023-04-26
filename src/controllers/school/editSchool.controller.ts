import { Request, Response } from "express";
import { AuthRequest, EditSchoolRequest } from "../../interfaces/requests.interface";
import { SchoolResponse } from "../../interfaces/responses.interface";
import { editSchoolService } from "../../services/School/editSchool.service";
import makeErrorResponseUtil from "../../services/School/utils/makeErrorResponse.util";
import isObjectEmpty from "../../utils/isObjectEmpty.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";

export default async function editSchoolController(req: Request, res: Response) {

    const { authUser } = req as AuthRequest;

    const { id } = req.params;


    

    const { name, bio, city, country, isHiring, province, street_name, lat, lng }: EditSchoolRequest = req.body;

    let resp: SchoolResponse;


    if(!Number(id)) {
        resp = makeErrorResponseUtil("id has to be a number")

        res.status(400).json(resp)

        return;
    }


    const filteredBodyObj = filterObjectFromFalsyValues({ name, bio, city, country, isHiring, province, street_name, lat, lng });
    

    if(isObjectEmpty(filteredBodyObj)) {
        resp = makeErrorResponseUtil("At least one school attribute needs to be provided")

        res.status(400).json(resp)

        return;
    }



    try {

        // call editUser service
        const { school, error } = await editSchoolService({...filteredBodyObj, id: +id}, authUser.id)

        // error checking
        if (error || !school) {
            resp = { error }

            return res.status(400).json(resp);
        }

       
        resp = { school }

        return res.json(resp);
        
    } catch (error) {
        // TODO: [SEG310-86] handle error types
        resp = makeErrorResponseUtil("an error occured while editing the school")

        console.log(error)

        return res.status(500).json(resp);
    }
}
