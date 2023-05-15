import { AppDataSource } from "../../../data-source";
import { Auth } from "../../../db/entities/Authentication/AuthEntity";
import { EmailVerificationEntity } from "../../../db/entities/Authentication/EmailVerificationEntity";
import { IUserVerificationResponse } from "../../../interfaces/responses.interface";
import makeRespErrorUtil from "../../../utils/makeRespError.util";
import { EmailFactory } from "../../Email/Email.factory";
import generateVerificationCode from "../utils/generateVerificationCode.util";

export default async function sendVerificationService(
    userId: string
): Promise<IUserVerificationResponse> {
    // send a verification code to the user's email address

    const userAuthExists = await Auth.findOne({
        where: { userId },
        relations: { user: true },
    });

    if (!userAuthExists) {
        return makeRespErrorUtil("User does not exist");
    }

    if (userAuthExists.verified) {
        return makeRespErrorUtil("User is already verified");
    }

    // generate verification record
    const verificationRecord = EmailVerificationEntity.create({
        auth: userAuthExists,
        code: generateVerificationCode(),
    });

    userAuthExists.emailVerification = verificationRecord;

    await AppDataSource.manager.transaction(async (transactionManager) => {
        
        if(userAuthExists.emailVerification) {
            await transactionManager.remove(userAuthExists.emailVerification)
        }

        await transactionManager.save(verificationRecord);
        await transactionManager.save(userAuthExists);
    });

    // send email to the user
    await EmailFactory.Instance.createVerificationEmail(
        userAuthExists.user,
        verificationRecord.code
    ).send();

    return {
        info: "Verification code has been sent to the user",
    };
}
