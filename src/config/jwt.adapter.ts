import jwt from 'jsonwebtoken'
import { Envs } from './envs'


export class JwtAdapter {

    static async generateToken(payload:any,duration:string="2h"){

        return new Promise( (resolve,reject) => {

            jwt.sign(payload,Envs.JWT_SEED,{expiresIn:duration},(err,token)=>{
                if(err) return resolve(null)

                return resolve(token)
            })

        })

    }


    static async validateToken<T>(token:string):Promise<T|null>{

        return new Promise( (resolve) => {

            jwt.verify(token,Envs.JWT_SEED,(err,decoded)=>{
                if (err?.name === "TokenExpiredError") {
                   
                }
                if(err) return resolve(null)
                resolve(decoded as T)
            })

        })

    }

}