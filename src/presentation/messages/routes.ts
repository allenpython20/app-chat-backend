import { Router } from "express";
import { MessagesController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { MessageService } from "../services/message.service";

export class MessagesRoutes {
    

    static get routes(){

        const router = Router()
        const controller = new MessagesController(new MessageService)

        router.get('/',[AuthMiddleware.validateJWT],controller.getMessages)
        router.post('/',[AuthMiddleware.validateJWT],controller.createMessage)

        return router

    }

}