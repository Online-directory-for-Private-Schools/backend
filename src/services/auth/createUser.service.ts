import bcrypt from "bcrypt";
import { Auth } from "../../db/entities/Authentication/AuthEntity";
import { User } from "../../db/entities/UserEntity";
import { AuthService } from "../../interfaces/user.interface";
import { IRegisterRequest } from "../../interfaces/requests.interface";
import { City } from "../../db/entities/Address/CityEntity";
import makeRespErrorUtil from "../../utils/makeRespError.util";
import { AppDataSource } from "../../data-source";

export default async function createUserService(regInfo: IRegisterRequest): Promise<AuthService> {
    // check if user with given info exists

    const { name, email, password, phone_number, type, cityId } = regInfo;

    const userExists = await User.findOneBy({ email });

    if (userExists) {
        return {
            error: {
                message: "user with the same email already exists",
            },
        };
    }

    // check if city exists
    const cityExists = await City.findOneBy({ id: cityId });

    if (!cityExists) {
        return makeRespErrorUtil("city does not exist");
    }

    // create user entities
    const user = new User();
    user.name = name;
    user.email = email;
    user.city = cityExists;
    if (phone_number) user.phone_number = phone_number;
    user.type = type;

    // create Auth entity

    // Todo: add pw validation
    const hashedPw = await bcrypt.hash(password, 10);

    const auth = new Auth();
    auth.hashed_password = hashedPw;
    auth.user = user;

    await AppDataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.save(user);
        await transactionalEntityManager.save(auth);
    });

    // return user to controller
    return {
        user,
    };
}
