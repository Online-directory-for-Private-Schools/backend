import { object, ref, string } from "yup";
import { IChangePasswordRequest } from "../../../interfaces/requests.interface";

const changePasswordSchema = object({
    oldPassword: string().required(),
    newPassword: string().min(8).max(36).required(),
    newPasswordConfirmation: string()
        .oneOf([ref("newPassword")], "new password doesn't match with the confirmed password")
        .required(),
});

// so that in the controller we are not coupled to the YUP library
export default async function validateChangePasswordReq(changePasswordReq: IChangePasswordRequest) {
    return changePasswordSchema.validate(changePasswordReq, {
        abortEarly: false,
    });
}
