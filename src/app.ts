import { createServer } from "http"
import { Envs } from "./config/envs"
import { MongoDatabase } from "./data/mongo/mongo-database"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"
import { WssService } from "./presentation/services/wss.service"


(async()=>{
    main()
})()

async function main() {
    
    await MongoDatabase.connect({
        mongoUrl: Envs.MONGO_URL,
        dbName: Envs.MONGO_DB_NAME
    })

    const server = new Server({
        port: Envs.PORT,
       
    })

    const httpServer = createServer(server.app)

    WssService.initWss({
        server: httpServer
    })

    server.setRoutes(AppRoutes.routes)
 
    httpServer.listen(Envs.PORT,()=>{
        console.log("Corriendo en",Envs.PORT)
    })

}