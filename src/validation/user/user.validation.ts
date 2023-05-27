import { number, object, string } from "yup";
import "yup-phone-lite";
import { IEditUserRequest } from "../../interfaces/requests.interface";

const editUserSchema = object({
    name: string().trim().optional(),
    phone_number: string().phone("DZ").trim().optional(),
    cityId: number().min(0).optional(),
});

export function validateEditUser(editUserReq: IEditUserRequest) {
    return editUserSchema.validate(editUserReq);
}
