import { Response } from "express";
import { CustomError } from "./custom-error";

export class ErrorMessages {

    static handleError(error:any,res:Response){

        if(error instanceof CustomError){
            return res.status(error.status).json({succes:false,error:error.message})
        } 

        return res.status(500).json({succes:false,error:'Internal server error'})

    }

}