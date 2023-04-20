import { resetEnv } from "typeorm-extension";
import { config } from "../../configs/config";
import { Auth } from "../../db/entities/AuthEntity";
import { User } from "../../db/entities/UserEntity";
import { AuthService } from "../../interfaces/user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
                message: "there is no user with that email",
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

    const isValid = await bcrypt.compare(password, auth.hashed_password);

    if (!isValid) {
        return {
            error: {
                message: "The provided password is incorrect",
            },
        };
    }


    return {
        user: userExists,
    }
    
    
}
