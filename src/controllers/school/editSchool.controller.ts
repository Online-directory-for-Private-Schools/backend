import { Request, Response } from "express";
import { IAuthRequest, IEditSchoolRequest } from "../../interfaces/requests.interface";
import { ISchoolResponse } from "../../interfaces/responses.interface";
import { editSchoolService } from "../../services/School/editSchool.service";
import makeRespError from "../../utils/makeRespError.util";
import isObjectEmpty from "../../utils/isObjectEmpty.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import sendErrorResponse from "../utils/makeErrorResponse.util";
import { isNumber } from "class-validator";
import isNumeric from "../../utils/isNumeric.util";

export default async function editSchoolController(req: Request, res: Response) {

    const { authUser } = req as IAuthRequest;

    const { id } = req.params;


    

    const { name, bio, cityId, isHiring, streetName, lat, lng }: IEditSchoolRequest = req.body;

    let resp: ISchoolResponse;


    if(!Number(id)) {
        return sendErrorResponse("id has to be a number", 400, res)
    }


    if(cityId) {
        if(!isNumber(cityId)) {
            return sendErrorResponse("cityId must be a positive number", 400, res);
        }
    
        if(cityId < 0) {
            return sendErrorResponse("cityId must be a positive number", 400, res);
        }
    }

    if(lat){

        if(!isNumeric(lat)) {
            return sendErrorResponse("lat must be numeric", 400, res);
        }
        
    }

    if(lng) {
        if(!isNumeric(lng)) {
            return sendErrorResponse("lng must be numeric", 400, res);
        }
    }


    const filteredBodyObj = filterObjectFromFalsyValues({ name, bio, cityId, isHiring, lat, streetName, lng });
    

    if(isObjectEmpty(filteredBodyObj)) {
        return sendErrorResponse("At least one school attribute needs to be provided", 400, res);
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
        resp = makeRespError("an error occured while editing the school")

        console.log(error)

        return res.status(500).json(resp);
    }
}
