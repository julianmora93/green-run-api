import { Server } from "@hapi/hapi";
import { DocumentController } from "../controllers/document.controller";

export class DocumentRoutes {

    private _server: Server;
    private _documentController: DocumentController;

    constructor(server: Server){
        this._server = server;
        this._documentController = new DocumentController();
    }

    Initialize(): void {
        this._server.route({
            method: 'GET',
            path: '/document',
            handler: this._documentController.getAll
        });

        this._server.route({
            method: 'GET',
            path: '/document/{id}',
            handler: this._documentController.getById
        });
    }

}