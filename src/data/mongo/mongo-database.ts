import mongoose from "mongoose";


interface Options{
    mongoUrl : string;
    dbName:string
}

export class MongoDatabase{

    static async connect(options:Options){
        const {mongoUrl,dbName} = options

        try {
            await mongoose.connect(mongoUrl,{
                dbName
            })

            console.log("conectado")
        } catch (error) {
            console.log("ocurrio un error")
        }

    }

    static async disconnect(){
        mongoose.disconnect()
    }


}