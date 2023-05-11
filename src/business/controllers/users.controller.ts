// import { AppDataSource } from "../../common/data.source";
// import { DocumentEntity } from "../../common/entities/document.entity";
// import { DefaultResponseModel } from "../../common/models/default.rersponse.mode";
// import { UserModel } from "../../common/models/user.model";
// import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";

// export const CreateUserController = async (request: Request, responseController: ResponseToolkit): Promise<ResponseObject> => {
//     //const dataResponse: DefaultResponseModel<UserModel[] | null> = {
//     const dataResponse: DefaultResponseModel<DocumentEntity[] | null> = {
//         status: true,
//         codeStatus: '0x000',
//         message: 'OK',
//         data: []
//     };
//     try {
//         // const userTest: UserModel = { 
//         //     name: 'Julian',
//         //     surname: 'Mora'
//         // };
//         //dataResponse.data?.push(userTest);
//         const documents = await AppDataSource.manager.find(DocumentEntity);
//         dataResponse.data?.push(...documents);

//         return responseController.response(dataResponse);
//     } catch(error: any) {
//         dataResponse.status = false;
//         dataResponse.codeStatus = '0x001';
//         dataResponse.message = 'Pailas => :P';
//         dataResponse.data = error;
//         return responseController.response(dataResponse).code(500);
//     }
// }