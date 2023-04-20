import { Request, Response } from "express";
import createStudentService from "../../services/Student/createStudent.service";
import { TypeORMError } from "typeorm";

export default async function createStudentController(req: Request, res: Response) {
    if (!isRequestValid(req.body)) {
        res.status(400).json({
            error: {
                message: "Invalid request",
            },
        });

        return;
    }

    const { city, province, country, userId } = req.body;

    try {
        const { student, error } = await createStudentService({ city, province, country, userId });

        if (error) {
            res.status(400).json(error);
            return;
        }

        res.status(200).json({
            student,
        });
    } catch (error) {
        if(error instanceof TypeORMError) {
            console.log(error.message)
        }
        
        return res.status(500).json({
            error: {
                message: "an error occurred while creating the student profile",
            },
        });
    }
}

const isRequestValid = ({ city, province, country, userId }: any) => {
    const isFull = ![city, province, country, userId].includes(undefined);

    return isFull;
};
