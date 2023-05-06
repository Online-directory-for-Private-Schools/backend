import { Request, Response } from "express";
import { SchoolResponse } from "../../interfaces/responses.interface";
import { getSchoolService } from "../../services/School/getSchool.service";
import makeRespError from "../../utils/makeRespError.util";
import sendErrorResponse from "../utils/makeErrorResponse.util";

export default async function getSchoolController(req: Request, res: Response) {
    const { id } = req.params;

    let resp: SchoolResponse;

    if (!id || !Number(id)) {
        resp = makeRespError("please provide a correct ID to fetch a school");

        return res.status(400).json(resp);
    }

    try {
        // get school by invoking the service
        const { school, error } = await getSchoolService({ id: +id });

        if (error || !school) {
            return sendErrorResponse(error!.message, 400, res);
        }

        resp = {
            school,
        };

        return res.status(200).json(resp);
    } catch (error) {
        resp = makeRespError("an error occured while fetching school info");

        return res.status(500).json(resp);
    }
}
