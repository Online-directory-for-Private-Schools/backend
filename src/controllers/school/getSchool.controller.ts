import { Request, Response } from "express";
import { SchoolResponse } from "../../interfaces/responses.interface";
import { getSchoolService } from "../../services/School/getSchool.service";
import makeErrorResponseUtil from "../../services/School/utils/makeErrorResponse.util";

export default async function getSchoolController(req: Request, res: Response){
    
    const { id } = req.params;

    let resp: SchoolResponse


    if(!id || !Number(id)) {
        resp = makeErrorResponseUtil("please provide a correct ID to fetch a school")

        return res.status(400).json(resp)
    }

    


    try {
        // get school by invoking the service
        const {school, error} = await getSchoolService({id: +id})
    
        if(error || !school) {
            resp = { error }
    
            return res.status(400).json(resp)
        }
    
    
        resp = {
            school
        }
    
        return res.status(200).json(resp)
    } catch (error) {
        
        resp = makeErrorResponseUtil("an error occured while fetching school info")

        return res.status(500).json(resp)
    }


}