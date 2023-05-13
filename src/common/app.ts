import { Server } from '@hapi/hapi';
// import { initializeApp } from 'firebase-admin/app';
// import { credential } from 'firebase-admin';
// import account_config = require("./account_config.json");

import { UserRoutes } from '../business/routes/user.routes';
import { DocumentRoutes } from '../business/routes/document.routes';

import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import { AppFirebaseAdmin } from './app.firebase.admin';
import { AppFirebaseClient } from './app.firebase.client';
//import { FirebaseAdmin_ServiceAccountId } from './configuration/firebase.config';

export const InitServer = async () => {

    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });

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

    new AppFirebaseAdmin();
    
    new AppFirebaseClient();

    await server.register(plugins);

    await server.start();

    new DocumentRoutes(server).Initialize();
    new UserRoutes(server).Initialize();
}