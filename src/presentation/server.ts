import express,{Router} from 'express'
import cors from 'cors'

interface Options {
    port:number;

}

export class Server {

    public readonly app = express()
    private readonly port;


    constructor(options:Options){
        const {port} = options
        this.port = port
        
        this.configuration()
    }

    setRoutes(routes:Router){
        this.app.use(routes)

    }

    async configuration(){

        this.app.use( express.json() )
        this.app.use(cors())
        
    }

    async start(){
        this.app.listen(this.port,()=>{
            console.log("escucando en el puerto",this.port)
        })
    }

   
    
}