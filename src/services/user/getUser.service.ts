import { User } from "../../db/entities/UserEntity";
import { UserService } from "../../interfaces/user.interface";

interface GetUserInfo {
    id: string;
}

export default async function getUserService(userInfo: GetUserInfo) : Promise<UserService> {
    const { id } = userInfo;


    const user = await User.findOneBy({id})


    // checking if user exists
    if(!user) {
        return {
            error: {
                message: "User with the provided id not found"
            }
        }
    }


    return {
        user
    }
    

}
