import { AppDataSource } from "../../../data-source";
import { Auth } from "../../../db/entities/Authentication/AuthEntity";
import { EmailVerificationEntity } from "../../../db/entities/Authentication/EmailVerificationEntity";
import { User } from "../../../db/entities/UserEntity";
import { IUserVerificationResponse } from "../../../interfaces/responses.interface";
import { authRouter } from "../../../routes/auth/auth.route";
import makeRespErrorUtil from "../../../utils/makeRespError.util";
import { EmailFactory } from "../../Email/Email.factory";
import generateVerificationCode from "../utils/generateVerificationCode.util";

export default async function verifyUserService(
    userId: string,
    userEnteredCode: string
): Promise<IUserVerificationResponse> {
    // send a verification code to the user's email address

    const userAuthExists = await Auth.findOne({
        where: { userId },
        relations: { user: true, emailVerification: true },
    });

    if (!userAuthExists) {
        return makeRespErrorUtil("User does not exist");
    }

    if (userAuthExists.verified) {
        return makeRespErrorUtil("User is already verified");
    }

    // check if verification code is expired

    const lastCodeGenerationTimestamp = userAuthExists.emailVerification.generated_at.getTime();

    const codeExpirationPeriodMilliseconds = userAuthExists.emailVerification.expiresAfterMinutes * 60 * 1000;

    const currentTimestamp = Date.now();

    if(lastCodeGenerationTimestamp + codeExpirationPeriodMilliseconds < currentTimestamp) {
        return makeRespErrorUtil("Verification code expired");
    }



    // check if verification code is correct
    if(userAuthExists.emailVerification.code !== userEnteredCode) {
        return makeRespErrorUtil("Wrong verification code");
    }
    


    // make user verified and remove their verification record since it's not needed anymore
    userAuthExists.verified = true;


    await AppDataSource.manager.transaction(async (transactionManager) => {
        await transactionManager.remove(userAuthExists.emailVerification)
        await transactionManager.save(userAuthExists)
    })
    

    return {
        info: "User has been verified successfully"
    }

}
