import { NextFunction, Request, Response } from  "express";
import { CustomError, ErrorMessages, UserEntity } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongo";
  
  
export class AuthMiddleware {
  
    static async validateJWT(req:Request,res:Response,next:NextFunction){
        
        try {
            const authorization = req.header('Authorization')
        
            if(!authorization) throw CustomError.unauthorized('No token')

            if(!authorization.startsWith('Bearer ')) throw CustomError.unauthorized('No Bearer token')

            const token = authorization.split(" ").at(1) || ''

            const payload = await JwtAdapter.validateToken<{id:string,exp:number}>(token)

            if(!payload) throw CustomError.unauthorized('Token invalid')

            // Verificar si el token ha expirado
            if (payload.exp && Date.now() >= payload.exp * 1000) {
                throw CustomError.unauthorized('Token expired');
            }

            const user = await UserModel.findById(payload.id)

            if(!user) throw CustomError.internalServer()

            req.body.user = UserEntity.fromObject(user)

            next()


        } catch (error) {

            return ErrorMessages.handleError(error,res)
        }
       
 
    }
}