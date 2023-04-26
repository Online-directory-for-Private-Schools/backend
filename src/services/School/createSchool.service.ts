import { PrivateSchool } from "../../db/entities/PrivateSchoolEntity";
import { User, UserType } from "../../db/entities/UserEntity";
import { SchoolService } from "../../interfaces/school.interface";

interface SchoolCreationInfo {
    userId: string;
    name: string;
    bio?: string;
    lat: string;
    lng: string;
    city: string;
    country: string;
    province: string;
    street_name: string;
    isHiring?: boolean;
}


export default async function createSchoolService(schoolInfo: SchoolCreationInfo) : Promise<SchoolService> {



    // check if user exists or not

    const userExists = await User.findOneBy({id: schoolInfo.userId})

    if(!userExists) {
        return {
            error: {
                message: "user doesn't exist"
            }
        }
    }


    // checking that the user is of type "school_owner"
    if(userExists.type !== UserType.SCHOOL_OWNER) {
        return {
            error: {
                message: "you are not allowed to create schools"
            }
        }
    }


    const schoolExists = await PrivateSchool.findOneBy({owner: {id: schoolInfo.userId}})

    if(schoolExists) {
        return {
            error: {
                message: "You can't create more than one school, yet"
            }
        }
    }
    

    // creating school
    const school = new PrivateSchool();
    school.name = schoolInfo.name;
    school.lng = schoolInfo.lng
    school.lat = schoolInfo.lat
    school.city = schoolInfo.city
    school.province = schoolInfo.province
    school.country = schoolInfo.country;
    school.street_name = schoolInfo.street_name;
    school.owner = userExists


    if(schoolInfo.bio)
        school.bio = schoolInfo.bio;
    
    if(schoolInfo.isHiring)
        school.isHiring = schoolInfo.isHiring

    
    
    await school.save()

    return {
        school
    }

}