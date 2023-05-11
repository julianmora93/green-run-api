import { Request, ResponseToolkit, ResponseObject } from "@hapi/hapi";
import { DefaultResponseDto } from "../../common/dto/default.response.dto";
import { DocumentEntity } from "../../common/entities/document.entity";
import { ErrorCodes } from "../../common/utils/error.codes.enum";
import { DocumentData } from "../../data/document.data";

export class DocumentController {

    async getAll(_: Request, result: ResponseToolkit): Promise<ResponseObject>{

        const dataResult: DefaultResponseDto<DocumentEntity[] | null> = {
            status: true,
            codeStatus: 'OK',
            data: null,
            message: 'OK'
        };

        try{
            const documents = await DocumentData.getAll();
            dataResult.data = documents;
            return result.response(dataResult);
        } catch(error: any) {
            console.log('ERROR => ', error.message);
            dataResult.status = false;
            dataResult.codeStatus = '0x0002';
            dataResult.data = null;
            dataResult.message = `Error: ${ErrorCodes["0x0002"]} - ${error.message}`;
            return result.response(dataResult).code(500);
        }

    }

    async getById(request: Request, result: ResponseToolkit): Promise<ResponseObject>{

        console.log('[request] => ', request.params);

        const dataResult: DefaultResponseDto<DocumentEntity | null> = {
            status: true,
            codeStatus: 'OK',
            data: null,
            message: 'OK'
        };

        try{
            const document = await DocumentData.getById(request.params.id);
            dataResult.data = document;
            return result.response(dataResult);
        } catch(error: any) {
            console.log('ERROR => ', error.message);
            dataResult.status = false;
            dataResult.codeStatus = '0x0002';
            dataResult.data = null;
            dataResult.message = `Error: ${ErrorCodes["0x0002"]} - ${error.message}`;
            return result.response(dataResult).code(500);
        }
        
    }

}