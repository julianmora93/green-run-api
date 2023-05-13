import { AppDataSource } from "../data.source";
import { CreateUserDto } from "../../common/dto/user.dto";
import { CountryEntity } from "../entities/country.entity";
import { GenderEntity } from "../entities/genders.entity";
import { RoleEntity } from "../entities/role.entity";
import { UserEntity } from "../entities/user.entity";
import { UserStateEntity } from "../entities/user.state.entity";

export class UserRepository {

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

    static getById(id: number): Promise<UserEntity | null>{
        return AppDataSource.getRepository(UserEntity).findOneBy({
            id: id
        });
    }

    static getByFirebaseId(firebaseId: string): Promise<UserEntity | null>{
        return AppDataSource.getRepository(UserEntity).findOneBy({
            firebaseId: firebaseId
        });
    }

    static async updateBalance(userId: number, amount: number): Promise<boolean>{
        try{
            const userRepo = AppDataSource.getRepository(UserEntity);
            await userRepo.update(userId, { balance: amount, updatedAt: new Date()});   
            return true;
        }catch(error: any){
            return false;
        }
    }

}