import { AuthenticationController } from "../controllers/authentication.controller";
import { UserController } from "../controllers/user.controller";
import { Server } from "@hapi/hapi";

export class UserRoutes {

    private _server: Server;
    private _userController: UserController;
    private _authenticationController: AuthenticationController

    constructor(server: Server){
        this._server = server;
        this._userController = new UserController();
        this._authenticationController = new AuthenticationController();
    }

    Initialize(): void {
        this._server.route({
            method: 'POST',
            path: '/user/signin',
            options: {
                handler: this._authenticationController.signin
            }
        });

        this._server.route({
            method: 'POST',
            path: '/user/signup',
            options: {
                handler: this._userController.createUser
            }
        });
    }

}