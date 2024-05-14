import { Envs } from "./config/envs"
import { MongoDatabase } from "./data/mongo/mongo-database"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"


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
        routes: AppRoutes.routes
    })

    server.start()

}