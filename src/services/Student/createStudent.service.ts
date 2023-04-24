

import { Student } from "../../db/entities/StudentEntity";
import { User, UserType } from "../../db/entities/UserEntity";
import { CreateStudentService } from "../../interfaces/student.interface";


interface StudentCreationInfo {
    userId: string;
    city: string;
    country: string;
    province: string;
}

/**
 * 
 * @deprecated  student services will be removed due to merging the student entity with the user entity
 */
export default async function createStudentService(
    studentInfo: StudentCreationInfo
): Promise<CreateStudentService> {
    const userExists = await User.findOneBy({ id: studentInfo.userId });

    if (!userExists) {
        return {
            error: {
                message: "user doesn't exist",
            },
        };
    }

    // checking that the user is of type "school_owner"
    if (userExists.type !== UserType.STUDENT) {
        return {
            error: {
                message: "you are not allowed to create a student profile",
            },
        };
    }

    // creating the student
    const student = new Student();
    student.city = studentInfo.city;
    student.country = studentInfo.country;
    student.province = studentInfo.province;
    student.user = userExists;

    await student.save();

    return {
        student,
    };
}
