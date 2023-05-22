import { Auth } from "../../../db/entities/Authentication/AuthEntity";
import { IChangePasswordRequest } from "../../../interfaces/requests.interface";
import { IChangeAuthInfoResponse } from "../../../interfaces/responses.interface";
import makeRespErrorUtil from "../../../utils/makeRespError.util";
import comparePasswordHashUtil from "../utils/comparePasswordHash.util";
import hashPasswordUtil from "../utils/hashPassword.util";

export default async function changePasswordService(
    passwordChangeInfo: IChangePasswordRequest,
    userId: string
): Promise<IChangeAuthInfoResponse> {
    // check if user auth exists

    // check if old password matches the user's password

    // if so, update, otherwise error

    const { newPassword, oldPassword } = passwordChangeInfo;

    const userAuth = await Auth.findOneBy({ userId });

    if (!userAuth) {
        return makeRespErrorUtil("user doesn't exist");
    }

    const isPwValid = await comparePasswordHashUtil(oldPassword, userAuth.hashed_password);

    if (!isPwValid) {
        return makeRespErrorUtil("The provided password is not correct");
    }

    // hash new pw and store it
    const hashedNewPassword = await hashPasswordUtil(newPassword);

    userAuth.hashed_password = hashedNewPassword;

    await userAuth.save();

    return {
        info: "Password has been updated",
    };
}
