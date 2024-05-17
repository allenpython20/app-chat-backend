
import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongo";
import { CustomError, UserEntity, UserLoginDto, UserRegisterDto } from "../../domain";


export class AuthService {

    async register(userRegisterDto:UserRegisterDto) {
        const existUser = await UserModel.findOne({email:userRegisterDto.email})
        if(existUser) throw CustomError.badRequest("Email ya existe")

        try{
           
            const user = new UserModel(userRegisterDto)

            user.password = BcryptAdapter.hash(userRegisterDto.password)

            await user.save()

            const {password,...userEntity} = UserEntity.fromObject(user)

            const token = await JwtAdapter.generateToken({id:userEntity.id},'24h')

            return {user:userEntity,token}


        }catch(error){
           
            throw CustomError.internalServer(`${error}`)
        }
      

    }

    async login(userLoginDto:UserLoginDto){
        const user = await UserModel.findOne({email:userLoginDto.email})
        if(!user) throw CustomError.badRequest("Credenciales invalidas")

        if(!BcryptAdapter.compare(userLoginDto.password,user.password)){
            throw CustomError.badRequest("Credenciales invalidas2")
        }

        try {

            const {password,...userEntity} = UserEntity.fromObject(user)

            const token = await JwtAdapter.generateToken({id:userEntity.id})

            return {user:userEntity,token}
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }


    }

    async verifyToken(user:UserEntity){
    
        try {
    
            return {user}
        
            
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }


    }

}