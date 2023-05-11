import { Server } from '@hapi/hapi';
import { DocumentRoutes } from '../business/routes/document.routes';

export const InitServer = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });

    new DocumentRoutes(server).Initialize();

    await server.start();
    console.log('=>>>> JMORA_LOG[./src/app.ts] => init: Server runing on %s', server.info.uri);
}