import { EnviromentConfiguration } from "../utils/enviroment";

export class DbConnection {

    private _enviroment = EnviromentConfiguration.dev;

    host: string = this._enviroment.host;
    port: number = this._enviroment.port;
    username: string = this._enviroment.username;
    password: string = this._enviroment.password;
    database: string = this._enviroment.database;
}