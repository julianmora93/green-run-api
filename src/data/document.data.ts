import { AppDataSource } from "../common/app.data.source";
import { DocumentEntity } from "../common/entities/document.entity";

export class DocumentData {

    static getAll(): Promise<DocumentEntity[]> {
        return AppDataSource.manager.find(DocumentEntity);
    }

    static getById(id: number): Promise<DocumentEntity | null> {
        return AppDataSource.getRepository(DocumentEntity).findOneBy({
            id: id
        });
    }

}