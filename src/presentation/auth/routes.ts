import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";


export class AuthRoutes {

    static get routes(){

        const router = Router()
        const controller = new AuthController(new AuthService)

        router.post('/login',controller.login)
        router.post('/register',controller.register)
        router.get('/verifyToken',[AuthMiddleware.validateJWT],controller.verifyToken)
        return router
    }

}

