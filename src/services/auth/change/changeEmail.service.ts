import { AppDataSource } from "../../../data-source";
import { Auth } from "../../../db/entities/Authentication/AuthEntity";
import { EmailVerificationEntity } from "../../../db/entities/Authentication/EmailVerificationEntity";
import { User } from "../../../db/entities/UserEntity";
import { IChangeEmailRequest } from "../../../interfaces/requests.interface";
import { IChangeAuthInfoResponse } from "../../../interfaces/responses.interface";
import makeRespErrorUtil from "../../../utils/makeRespError.util";
import { EmailFactory } from "../../Email/Email.factory";
import generateVerificationCode from "../utils/generateVerificationCode.util";

export default async function changeEmailService(
    emailChangeInfo: IChangeEmailRequest,
    userId: string
): Promise<IChangeAuthInfoResponse> {
    const { email: newEmail } = emailChangeInfo;


    // check if email belongs to another user
    const userWithSameEmailExists = await User.findOneBy({email: newEmail})

    if(userWithSameEmailExists) {
        if(userWithSameEmailExists.id === userId) {
            return makeRespErrorUtil("New email has to be different from the old email");
        }
        
        return makeRespErrorUtil("Email already taken")
    }

    // check if user exists

    const userAuth = await Auth.findOne({
        where: { userId },
        relations: {
            user: true
        }
    });

    if (!userAuth) {
        return makeRespErrorUtil("user doesn't exist");
    }

    userAuth.user.email = newEmail;

    userAuth.verified = false;

     // generate verification record
     const verificationRecord = EmailVerificationEntity.create({
        auth: userAuth,
        code: generateVerificationCode(),
    });

    userAuth.emailVerification = verificationRecord;

    await AppDataSource.manager.transaction(async (transactionManager) => {
        
        if(userAuth.emailVerification) {
            await transactionManager.remove(userAuth.emailVerification)
        }

        await transactionManager.save(verificationRecord);
        await transactionManager.save(userAuth);
        await transactionManager.save(userAuth.user);
    });

    await EmailFactory.Instance.createVerificationEmail(
        userAuth.user,
        verificationRecord.code
    ).send();

    return {
        info: "Email has been changed successfully"
    }


    // make user unverified
}
