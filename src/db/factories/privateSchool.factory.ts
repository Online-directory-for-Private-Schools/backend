import { setSeederFactory } from "typeorm-extension";
import { Auth } from "../entities/AuthEntity";
import { PrivateSchool } from "../entities/PrivateSchoolEntity";
import { User, UserType } from "../entities/UserEntity";

export default setSeederFactory(PrivateSchool, async (faker) => {

    const user = new User();
    const auth = new Auth();


    // initialize the user object
    user.name = faker.name.fullName()
    user.email = faker.internet.email(user.name)
    user.phone_number = faker.phone.number("+213 ### ## ## ##")
    user.type = UserType.SCHOOL_OWNER


    // initialize the privateschool object
    const privateSchool = new PrivateSchool();
    privateSchool.name = faker.company.name()
    privateSchool.street_name = faker.address.streetAddress()
    privateSchool.city = faker.address.city()
    privateSchool.province = faker.address.state()
    privateSchool.owner = user;



    // initialize the auth object
    auth.user = user
    auth.hashed_password = faker.internet.password()

    await auth.save()


    return privateSchool;
})