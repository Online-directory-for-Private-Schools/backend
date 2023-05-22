import { object, string } from "yup";
import { IChangeEmailRequest } from "../../../interfaces/requests.interface";

const changeEmailSchema = object({
    email: string().email().required(),
});

// so that in the controller we are not coupled to the YUP library
export default async function validateChangeEmailReq(changeEmailReq: IChangeEmailRequest) {
    return changeEmailSchema.validate(changeEmailReq);
}
