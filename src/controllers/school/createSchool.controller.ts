import { Request, Response } from "express";
import createSchoolService from "../../services/School/createSchool.service";
import { TypeORMError } from "typeorm";
import { CreateSchoolRequest } from "../../interfaces/requests.interface";
import { SchoolResponse } from "../../interfaces/responses.interface";

export default async function createSchoolController(req: Request, res: Response) {

    let resp: SchoolResponse;

    if (!isRequestValid(req.body)) {


        resp = {
            error: {
                message: "Invalid request",
            },
        }

        res.status(400).json(resp);

        return;
    }

    const { name, bio, isHiring, lng, lat, city, province, street_name, country, userId }: CreateSchoolRequest =
        req.body;

    try {
        const { school, error } = await createSchoolService({
            name,
            bio,
            isHiring,
            lng,
            lat,
            city,
            province,
            street_name,
            country,
            userId,
        });

        if (error) {
            resp = {error}
            res.status(400).json(resp);
            return;
        }

        res.status(200).json({
            school,
        });
    } catch (error) {
        if(error instanceof TypeORMError) {
            console.log(error.message)
        }

        resp = {
            error: {
                message: "an error has occured while creating the school",
            },
        }

        return res.status(500).json(resp);
    }
}

const isRequestValid = ({ userId, name, lng, lat, city, province, street_name, country }: any) => {
    const isFull = ![userId, name, lng, lat, city, province, street_name, country].includes(
        undefined
    );

    return isFull;
};
