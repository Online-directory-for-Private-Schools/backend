import bcrypt from "bcrypt";
import { Auth } from "../../db/entities/AuthEntity";
import { User, UserType } from "../../db/entities/UserEntity";
import { CreateUserService } from "../../interfaces";




interface UserRegistrationInfo {
    name: string;
    email: string;
    password: string;
    phone_number?: string;
    type: UserType
}


export default async function createUser({name, email, password, phone_number, type}: UserRegistrationInfo) : Promise<CreateUserService> {

    // check if user with given info exists


    const userExists = await User.findOneBy({email})


    if(userExists) {
        return {
            error: {
                message: "user with the same email already exists"
            }
        }
    }

    // create user entities
    const user = new User()
    user.name = name;
    user.email = email
    if(phone_number)
        user.phone_number = phone_number
    user.type = type

    // create Auth entity

    // Todo: add pw validation
    const hashedPw = await bcrypt.hash(password, 10);

    const auth = new Auth();
    auth.hashed_password = hashedPw;
    auth.user = user;


    // save user and their auth records
    await user.save()
    await auth.save()


    // return user to controller
    return {
        user
    }


}