import { Response } from "express";

export class GeneralMessages {


    static getData(data:any,res:Response){

        return res.status(200).json( {
            success : true,
            data
        })

    }

    static create(data:any,res:Response){

        return res.status(201).json( {
            success : true,
            data
        })

    }

    static badRequest(data:any,res:Response){

        return res.status(400).json( {
            success : false,
            error:data
        })

    }

}