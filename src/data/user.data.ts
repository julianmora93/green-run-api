import { AppDataSource } from "../common/app.data.source";
import { CreateUserDto } from "../common/dto/user.dto";
import { CountryEntity } from "../common/entities/country.entity";
import { GenderEntity } from "../common/entities/genders.entity";
import { RoleEntity } from "../common/entities/role.entity";
import { UserEntity } from "../common/entities/user.entity";
import { UserStateEntity } from "../common/entities/user.state.entity";

export class UserData {

    static async create(data: CreateUserDto, firebaseId: string): Promise<UserEntity | null>{
        const role = await AppDataSource.getRepository(RoleEntity).findOneBy({ id: data.roleId });
        const gender = await AppDataSource.getRepository(GenderEntity).findOneBy({ id: data.genderId });
        const country = await AppDataSource.getRepository(CountryEntity).findOneBy({ id: data.countryId });
        const userState = await AppDataSource.getRepository(UserStateEntity).findOneBy({ id: data.userStateId });
        const userRepo = AppDataSource.getRepository(UserEntity);
        const newUser: UserEntity = userRepo.create();
        newUser.firebaseId = firebaseId;
        newUser.role = role!;
        newUser.gender = gender!;
        newUser.country = country!;
        newUser.userState = userState!;
        newUser.userName = data.userName;
        newUser.firstName = data.firstName;
        newUser.secondName = data.secondName;
        newUser.firstSurname = data.firstSurname;
        newUser.secondSurname = data.secondSurname;
        newUser.phone = `+57${data.phoneNumber}`;
        newUser.email = data.email;
        newUser.address = data.address;
        newUser.birthDate = data.birthDate;
        newUser.city = data.city;
        newUser.createdAt = new Date();
        return await userRepo.save(newUser);
    }

}