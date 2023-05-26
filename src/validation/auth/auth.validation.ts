import { number, object, string } from "yup";
import { ILoginRequest, IRegisterRequest } from "../../interfaces/requests.interface";
import "yup-phone-lite"
import { UserType } from "../../db/entities/UserEntity";

const loginSchema = object({
    email: string().email().lowercase().required().trim(),
    password: string().min(8).required()
})


const registerSchema = loginSchema.shape({
    name: string().min(5).max(50).required(),
    phone_number: string().optional().phone("DZ", "Please make sure the phone number is valid"),
    type: string().oneOf(Object.values(UserType)).required(),
    cityId: number().min(0).required()
})


export async function validateLogin(loginReq: ILoginRequest) {
    return loginSchema.validate(loginReq)
}

export async function validateRegister(registerReq: IRegisterRequest) {
    return registerSchema.validate(registerReq)
}