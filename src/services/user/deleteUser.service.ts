import { User } from "../../db/entities/UserEntity";
import { DeleteUserService, UserService } from "../../interfaces/user.interface";

interface DeleteUserInfo {
    id: string;
}

export default async function deleteUserService(
    userInfo: DeleteUserInfo
): Promise<DeleteUserService> {
    const { id } = userInfo;

    const user = await User.findOneBy({ id });

    // checking if user exists
    if (!user) {
        return {
            error: {
                message: "User with the provided id not found",
            },
        };
    }

    await user.remove();

    return {};
}
