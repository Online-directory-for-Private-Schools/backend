import { Response } from "express";
import { ISchoolResponse } from "../../interfaces/responses.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";

export function sendErrorsResponse(errors: string[], status: number, res: Response) {
    const resp: ISchoolResponse = makeRespErrorUtil(undefined, errors);
    res.status(status).json(resp);
}
