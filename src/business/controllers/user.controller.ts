import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
//import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ErrorCodes } from "../../common/utils/error.codes.enum";
import { DefaultResponseDto } from "../../common/dto/default.response.dto";
//import {  } from "firebase-admin/app";
import { getAuth } from 'firebase-admin/auth';
import { CreateUserDto } from "../../common/dto/user.dto";
import { UserData } from "../../data/user.data";
import { UserEntity } from "../../common/entities/user.entity";
//import { signInWithEmailAndPassword } from "firebase/auth";

export class UserController { 
    
    //-- Iniciar sesion para los usuario
    async signin(request: Request, result: ResponseToolkit): Promise<ResponseObject>{
        const dataResult: DefaultResponseDto<string> = {
            status: true,
            codeStatus: 'OK',
            data: '',
            message: 'OK'
        };
        return result.response(dataResult).code(500);
        // try{
        //     //const auth = getAuth();
        //     let paramas: any = request.payload;
        //     const signInFirebase = await signInWithEmailAndPassword(auth, paramas.email, paramas.password);
        //     dataResult.message = 'OK';
        //     dataResult.data = await signInFirebase.user.getIdToken();
        //     console.log('JMORA[createAuth] => ', signInFirebase);
        //     return result.response(dataResult);
        // } catch(error: any) {
        //     switch(error.code){
        //         case 'auth/missing-email':
        //             dataResult.codeStatus = '0x0003';
        //             dataResult.message = `Error: ${ErrorCodes["0x0003"]} - ${error.message}`;
        //             break;
        //         case 'auth/missing-password':
        //             dataResult.codeStatus = '0x0004';
        //             dataResult.message = `Error: ${ErrorCodes["0x0004"]} - ${error.message}`;
        //             break;
        //         case 'auth/email-already-in-use':
        //             dataResult.codeStatus = '0x0005';
        //             dataResult.message = `Error: ${ErrorCodes["0x0005"]} - ${error.message}`;
        //             break;
        //         case 'auth/invalid-email':
        //             dataResult.codeStatus = '0x0006';
        //             dataResult.message = `Error: ${ErrorCodes["0x0006"]} - ${error.message}`;
        //             break;
        //         default :
        //             dataResult.codeStatus = '0x0002';
        //             dataResult.message = `Error: ${ErrorCodes["0x0002"]} - ${error.message}`;
        //             break;
        //     }
        //     dataResult.status = false;
        //     dataResult.data = '';
        //     return result.response(dataResult).code(500);
        // }
    }

    async virifyToken(request: Request, result: ResponseToolkit): Promise<ResponseObject>{
        const dataResult: DefaultResponseDto<string> = {
            status: true,
            codeStatus: 'OK',
            data: '',
            message: 'OK'
        };

        let paramas: any = request.payload;

        getAuth().verifyIdToken(paramas.token).then(value => {
            console.log('>>>>>>>> TOKEN: ', value);
        });

        return result.response(dataResult).code(500);
    }

    //-- Registro para los usuarios
    async signup(request: Request, result: ResponseToolkit): Promise<ResponseObject>{
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
        try{
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
            const userData = await UserData.create(paramas, newUser.uid);
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
