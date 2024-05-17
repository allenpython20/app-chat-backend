import express,{Router} from 'express'
import cors from 'cors'

interface Options {
    port:number;
    routes:Router
}

export class Server {

    public readonly app = express()

    private readonly port;
    private readonly routes;

    constructor(options:Options){
        const {port,routes} = options
        this.port = port
        this.routes = routes

        this.configuration()
    }


    async configuration(){

        this.app.use( express.json() )
        this.app.use(cors())
        this.app.use(this.routes)

    }

    async start(){
        this.app.listen(this.port,()=>{
            console.log("escucando en el puerto",this.port)
        })
    }

   
    
}