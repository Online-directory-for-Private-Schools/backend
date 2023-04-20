import { Request, Response } from "express";
import createSchoolService from "../../services/School/createSchool.service";


export default async function createSchoolController(req: Request, res: Response) {

    if (!isRequestValid(req.body)) {
        res.status(400).json({
            error: {
                message: "Invalid request"
            },
        });

        return;
    }

    const { name, bio, isHiring, lng, lat, city, province, street_name, country, userId } = req.body;

    const { school, error } = await createSchoolService({ name, bio, isHiring, lng, lat, city, province, street_name, country, userId })


    if (error) {
        res.status(400).json(error);
        return;
    }


    res.status(200).json({
        school
    });


}



const isRequestValid = ({ userId, name, lng, lat, city, province, street_name, country }: any) =>
{
    const isFull = ![userId, name, lng, lat, city, province, street_name, country].includes(undefined);


    return isFull

}
