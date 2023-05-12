import { Server } from '@hapi/hapi';
import { plugin } from '@hapi/inert';
import { DocumentRoutes } from '../business/routes/document.routes';

import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';


export const InitServer = async () => {
    // const server: Server = new Server({
    //     port: 3000,
    //     host: 'localhost'
    // });

    // new DocumentRoutes(server).Initialize();

    // await server.start();
    // console.log('=>>>> JMORA_LOG[./src/app.ts] => init: Server runing on %s', server.info.uri);


    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });

    // const swaggerOptions: HapiSwagger.RegisterOptions = {
    //     info: {
    //         title: 'Test API Documentation',
    //         version: '5.14.3',
    //         contact: {
    //             name: 'Glenn Jones',
    //             email: 'glenn@example.com'
    //         },
    //     }
    //     schemes: ['https'],
    //     host: 'example.com'
    // };

    const swaggerOptions: HapiSwagger.RegisterOptions = {
        info: {
            title: 'Green Run API',
            version: '1.0.0',
            contact: {
                name: 'Julian Mora',
                email: 'faiberjulianmora@gmail.com'
            },
            description: 'API de prueba con Hapi JS'
        }
    };
    
    const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [{
        plugin: Inert
    },{
        plugin: Vision
    },{
        plugin: HapiSwagger,
        options: swaggerOptions
    }];
    
    await server.register(plugins);

    await server.start();

    new DocumentRoutes(server).Initialize();
}