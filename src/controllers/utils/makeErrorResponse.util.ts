import { Response } from "express";
import { SchoolResponse } from "../../interfaces/responses.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";



export default function sendErrorResponse(errorMsg: string, status: number, res: Response) {
    const resp: SchoolResponse = makeRespErrorUtil(errorMsg);
    res.status(status).json(resp);
}
