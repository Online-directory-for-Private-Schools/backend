import { Request, Response } from "express";
import { SearchSchoolsRequest } from "../../interfaces/requests.interface";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import isObjectEmpty from "../../utils/isObjectEmpty.util";
import makeErrorResponseUtil from "../../services/School/utils/makeErrorResponse.util";
import { SearchSchoolsResponse } from "../../interfaces/responses.interface";
import { searchSchoolsService } from "../../services/School/searchSchools.service";
import checkIfNumericOrUndefined from "../../utils/checkIfNumberOrUndefined.util";

export default async function searchSchoolsController(req: Request, res: Response){
    
    const {name, city, country, province, isHiring, page, limit} : SearchSchoolsRequest = req.query;

    let resp: SearchSchoolsResponse;


    // filtering the request to only have non-false values
    const filteredBodyObj = filterObjectFromFalsyValues({name, city, country, province, isHiring, page: +page!, limit: +limit!});

    

    try {

        const {data, error} = await searchSchoolsService(filteredBodyObj)


                // error checking
                if (error || !data) {
                    resp = { error }
        
                    return res.status(400).json(resp);
                }
        
               
                resp = { data }
        
                return res.json(resp);


        
    } catch (error) {
        // TODO: [SEG310-86] handle error types
        resp = makeErrorResponseUtil("an error occured while searching for schools")

        console.log(error)

        return res.status(500).json(resp);
    }

    
}


