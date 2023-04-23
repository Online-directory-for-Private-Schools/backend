import { AppDataSource } from "../../data-source";
import { User } from "../../db/entities/UserEntity";
import { UserService } from "../../interfaces/user.interface";
import getUserService from "./getUser.service";

interface EditUserInfo {
    id: string;
    name?: string;
    phone_number?: string;
    city?: string;
    provinces?: string;
    country?: string;
}

export default async function editUserService(userInfo: EditUserInfo): Promise<UserService> {
    const { id } = userInfo;

    let user = await User.findOneBy({ id });

    // checking if user exists
    if (!user) {
        return {
            error: {
                message: "User with the provided id not found",
            },
        };
    }

    let res = await AppDataSource.createQueryBuilder()
        .update(User, userInfo)
        .where("id = :id", { id })
        .returning("*")
        .updateEntity(true)
        .execute();
    
    return { user: res.raw[0] as User };
}
