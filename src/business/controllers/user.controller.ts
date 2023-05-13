import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { ErrorCodes } from "../../common/utils/error.codes.enum";
import { DefaultResponseDto } from "../../common/dto/default.response.dto";
import { getAuth } from 'firebase-admin/auth';
import { CreateUserDto } from "../../common/dto/user.dto";
import { UserEntity } from "../../data/entities/user.entity";
import { UserRepository } from "../../data/repository/user.respository";

export class UserController {

    //-- Registro para los usuarios
    async createUser(request: Request, result: ResponseToolkit): Promise<ResponseObject>{
        /*
        TODO: 
            > 1: Control de errores en DB
            > 2: Control de guardado en DB por si ocurre un problema se elimine de Firebase
        */
        const dataResult: DefaultResponseDto<UserEntity | null> = {
            status: true,
            codeStatus: 'OK',
            data: null,
            message: 'OK'
        };
        try {
            let paramas: CreateUserDto = request.payload as CreateUserDto;
            const displayName = 
                paramas.firstName + 
                (paramas.secondName? ` ${paramas.secondName}` : '') +
                ` ${paramas.firstSurname}` + 
                (paramas.secondSurname? ` ${paramas.secondSurname}` : '');
            const newUser = await getAuth().createUser({
                email: paramas.email,
                emailVerified: false,
                phoneNumber: `+57${paramas.phoneNumber}`,
                password: paramas.password,
                displayName: displayName,
                disabled: false
            });
            const userData = await UserRepository.create(paramas, newUser.uid);
            dataResult.data = userData;
            return result.response(dataResult);
        } catch(error: any) {
            switch(error.code){
                case 'auth/missing-email':
                    dataResult.codeStatus = '0x0003';
                    dataResult.message = `Error: ${ErrorCodes["0x0003"]} - ${error.message}`;
                    break;
                case 'auth/missing-password':
                    dataResult.codeStatus = '0x0004';
                    dataResult.message = `Error: ${ErrorCodes["0x0004"]} - ${error.message}`;
                    break;
                case 'auth/email-already-in-use':
                    dataResult.codeStatus = '0x0005';
                    dataResult.message = `Error: ${ErrorCodes["0x0005"]} - ${error.message}`;
                    break;
                case 'auth/invalid-email':
                    dataResult.codeStatus = '0x0006';
                    dataResult.message = `Error: ${ErrorCodes["0x0006"]} - ${error.message}`;
                    break;
                default :
                    dataResult.codeStatus = '0x0002';
                    dataResult.message = `Error: ${ErrorCodes["0x0002"]} - ${error.message}`;
                    break;
            }
            dataResult.status = false;
            dataResult.data = null;
            return result.response(dataResult).code(500);
        }
    }

}
