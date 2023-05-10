import { AppDataSource } from "../../data-source";
import { City } from "../../db/entities/Address/CityEntity";
import { User } from "../../db/entities/UserEntity";
import { IEditSchoolRequest, IEditUserRequest } from "../../interfaces/requests.interface";
import { UserService } from "../../interfaces/user.interface";
import makeRespErrorUtil from "../../utils/makeRespError.util";
import filterObjectFromFalsyValues from "../../utils/truthifyObject.util";
import getUserService from "./getUser.service";



export default async function editUserService(userInfo: IEditUserRequest): Promise<UserService> {
    const { id, cityId, name, phone_number } = userInfo;

    let user = await User.findOneBy({ id });

    // checking if user exists
    if (!user) {
        return makeRespErrorUtil("No user with the provided id was found")
    }

    
    if(cityId) {
        // check if city exists
        const cityExists = await City.findOneBy({ id: cityId });

        if (!cityExists) {
            return makeRespErrorUtil("City Doesn't exist");
        }
        
        user.city = cityExists;
    }

    const filteredInfo = filterObjectFromFalsyValues({name, phone_number});

    Object.keys(filteredInfo).forEach((key) => {
        (user as any)[key] = filteredInfo[key];
    });

    await user.save();
    await user.reload();


    
    return { user };
}
