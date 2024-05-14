import { Router } from "express";

import { MessagesRoutes } from "./messages/routes";
import { AuthRoutes } from "./auth/routes";
import { ContactsRoutes } from "./contacts/routes";



export class AppRoutes {

    static get routes(){

        const router:Router = Router();

        router.use('/api/auth',AuthRoutes.routes)
        router.use('/api/messages',MessagesRoutes.routes)
        router.use('/api/contacts',ContactsRoutes.routes)

        return router
    }

}