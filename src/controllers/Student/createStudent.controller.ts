import { Request, Response } from "express";
import createStudentService from "../../services/Student/createStudent.service";
import { TypeORMError } from "typeorm";
import { CreateStudentRequest } from "../../interfaces/requests.interface";
import { CreateStudentResponse } from "../../interfaces/responses.interface";



/**
 * 
 * @deprecated  student controllers will be removed due to merging the student entity with the user entity
 */
export default async function createStudentController(req: Request, res: Response) {

    let resp: CreateStudentResponse;

    if (!isRequestValid(req.body)) {
        
        resp = {
            error: {
                message: "Invalid request",
            },
        }

        res.status(400).json(resp);

        return;
    }

    const { city, province, country, userId }: CreateStudentRequest = req.body;

    try {
        const { student, error } = await createStudentService({ city, province, country, userId });

        if (error) {
            resp = { error }

            res.status(400).json(resp);
            return;
        }

        resp = { student }
        res.status(200).json(resp);

    } catch (error) {
        if(error instanceof TypeORMError) {
            console.log(error.message)
        }

        resp = {
            error: {
                message: "an error occurred while creating the student profile",
            },
        }
        
        return res.status(500).json(resp);
    }
}

const isRequestValid = ({ city, province, country, userId }: any) => {
    const isFull = ![city, province, country, userId].includes(undefined);

    return isFull;
};
