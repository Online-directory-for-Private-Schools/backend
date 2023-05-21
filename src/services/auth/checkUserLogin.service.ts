import { resetEnv } from "typeorm-extension";
import { config } from "../../configs/config";
import { Auth } from "../../db/entities/Authentication/AuthEntity";
import { User } from "../../db/entities/UserEntity";
import { AuthService } from "../../interfaces/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import comparePasswordHashUtil from "./utils/comparePasswordHash.util";

interface UserLoginInfo {
    email: string;
    password: string;
}

export default async function checkUserLoginService({
    email,
    password,
}: UserLoginInfo): Promise<AuthService> {
    const userExists = await User.findOneBy({ email });

    if (!userExists) {
        return {
            error: {
                message: "The provided email or password are incorrect",
            },
        };
    }

    const auth = await Auth.findOneBy({ user: { id: userExists.id } });

    if (!auth) {
        return {
            error: {
                message: "User doesn't have credentials",
            },
        };
    }

    const isValid = await comparePasswordHashUtil(password, auth.hashed_password)

    if (!isValid) {
        return {
            error: {
                message: "The provided email or password are incorrect",
            },
        };
    }


    return {
        user: userExists,
    }
    
    
}
