import { Request, Response } from "express";
import {  ErrorMessages, GeneralMessages, UserLoginDto, UserRegisterDto } from "../../domain";
import { AuthService } from "../services/auth.service";



export class AuthController{

    constructor(
        private readonly authService:AuthService
    ){}

    login = (req:Request,res:Response)=>{

        const body = req.body
        const [error,userLoginDto] = UserLoginDto.create(body)
        if(error){
            return res.json({error})
        }

        this.authService.login(userLoginDto!)
            .then(resp=>GeneralMessages.create(resp,res))
            .catch(err=>ErrorMessages.handleError(err,res))

    }

    register = (req:Request,res:Response)=>{
        const body = req.body;
        const [error,userRegisterDto] = UserRegisterDto.create(body)

        if(error){
            return res.json({error})
        }

        this.authService.register(userRegisterDto!)
            .then( resp => GeneralMessages.create(resp,res) )
            .catch( err => ErrorMessages.handleError(err,res) )


    }
}