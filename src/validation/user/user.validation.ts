import { number, object, string } from "yup";
import "yup-phone-lite";
import { IEditUserRequest } from "../../interfaces/requests.interface";

const editUserSchema = object({
    name: string().optional(),
    phone_number: string().phone("DZ").optional(),
    cityId: number().min(0).optional(),
});

export function validateCreateCourse(editUserReq: IEditUserRequest) {
    return editUserSchema.validate(editUserReq);
}
