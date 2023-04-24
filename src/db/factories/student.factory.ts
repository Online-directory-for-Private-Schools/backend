import { setSeederFactory } from "typeorm-extension";
import { Auth } from "../entities/AuthEntity";
import { User, UserType } from "../entities/UserEntity";

export default setSeederFactory(User, async (faker) => {
    const user = new User();
    const auth = new Auth();


    // initialize the user object
    user.name = faker.name.fullName()
    user.email = faker.internet.email(user.name)
    user.phone_number = faker.phone.number("+213 ### ## ## ##")
    user.type = UserType.STUDENT
    user.city = faker.address.city()
    user.province = faker.address.state()
    user.country = faker.address.country()


    // initialize the auth object
    auth.user = user
    auth.hashed_password = faker.internet.password()

    await auth.save()


    return user;
})
