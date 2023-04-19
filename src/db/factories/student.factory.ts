import { setSeederFactory } from "typeorm-extension";
import { User, UserType } from "../entities/UserEntity";
import { Student } from "../entities/StudentEntity";
import { Auth } from "../entities/AuthEntity";

export default setSeederFactory(Student, async (faker) => {
    const student = new Student();
    const user = new User();
    const auth = new Auth();


    // initialize the user object
    user.name = faker.name.fullName()
    user.email = faker.internet.email(user.name)
    user.phone_number = faker.phone.number("+213 ### ## ## ##")
    user.type = UserType.STUDENT


    // initialize the student object
    student.city = faker.address.city()
    student.province = faker.address.state()
    student.country = faker.address.country()
    student.user = user


    // initialize the auth object
    auth.user = user
    auth.hashed_password = faker.internet.password()

    await auth.save()


    return student;
})
