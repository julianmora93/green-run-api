// import { EnviromentConfiguration } from "../utils/enviroment";

// export class FirebaseConfig { 
//     private _enviroment = EnviromentConfiguration.dev;

//     get config() {
//         return {
//             apiKey: this._enviroment.apiKey,
//             authDomain: this._enviroment.authDomain,
//             projectId: this._enviroment.projectId,
//             storageBucket: this._enviroment.storageBucket,
//             messagingSenderId: this._enviroment.messagingSenderId,
//             appId: this._enviroment.appId,
//             measurementId: this._enviroment.measurementId,
//         }
//     }

//     get adminConfig() {
//         return {
//             type: this._enviroment.type,
//             project_id: this._enviroment.project_id,
//             private_key_id: this._enviroment.private_key_id,
//             private_key: this._enviroment.private_key,
//             client_email: this._enviroment.client_email,
//             client_id: this._enviroment.client_id,
//             auth_uri: this._enviroment.auth_uri,
//             token_uri: this._enviroment.token_uri,
//             auth_provider_x509_cert_url: this._enviroment.auth_provider_x509_cert_url,
//             client_x509_cert_url: this._enviroment.client_x509_cert_url,
//             universe_domain: this._enviroment.universe_domain
//         }
//     }
// }

import { EnviromentConfiguration } from "../utils/enviroment";

export const FirebaseAdmin_ServiceAccountId: string = EnviromentConfiguration.dev.serviceAccountId;

export const FirebaseClient_Config: any = {
    apiKey: EnviromentConfiguration.dev.apiKey,
    authDomain: EnviromentConfiguration.dev.authDomain,
    projectId: EnviromentConfiguration.dev.projectId,
    storageBucket: EnviromentConfiguration.dev.storageBucket,
    messagingSenderId: EnviromentConfiguration.dev.messagingSenderId,
    appId: EnviromentConfiguration.dev.appId,
    measurementId: EnviromentConfiguration.dev.measurementId
}