import { Response } from "express";
import { ISchoolResponse } from "../../interfaces/responses.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";



export default function sendErrorResponse(errorMsg: string, status: number, res: Response) {
    const resp: ISchoolResponse = makeRespErrorUtil(errorMsg);
    res.status(status).json(resp);
}
