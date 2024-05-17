import { Router } from  "express";
import { ContactsController } from "./controller";
import { ContactService } from "../services/contact.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
  
  
export class ContactsRoutes {
  
    static get routes(){
 
        const router = Router()
        const controller = new ContactsController(new ContactService)

        router.get('/',[AuthMiddleware.validateJWT],controller.getContacts)
        router.post('/',[AuthMiddleware.validateJWT],controller.createContact)

        return router
 
    }
}