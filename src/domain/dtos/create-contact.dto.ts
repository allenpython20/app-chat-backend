import { Validators } from "../../config";
import { ModelContactEnum } from "../../data/mongo";
import { Dto } from "../types/dto.type";

export class ContactCreateDto {

    private constructor(
        public type:string,
        public idLastMessage:string,
        public messagesPendings: number,
        public user:string,
        public idContact: string,
        public idChat:string
    ){ }

    static create( object:Dto ):[string?,ContactCreateDto?]{
        const {type,idLastMessage,user,idContact} = object
        
       
        if(!type) return ['type es required']
        if(!ModelContactEnum.types.includes(type)) return [`type must be ${ModelContactEnum.types}`]
        if(!user) return ['user es required']
        const idUser = user.id
        if(!Validators.isMongoId(idUser)) return ['user must be is id valid']
        if(!idContact) return ['idContact es required']
        if(!Validators.isMongoId(idContact)) return ['idContact must be is id valid']

        const mayorId = idUser > idContact ? idUser : idContact;
        const menorId = idUser > idContact ? idContact : idUser;

        const messagesPendings=0
        const idChat = `${mayorId}_${menorId}@c.us`
      
       
        return [undefined,new ContactCreateDto(type,idLastMessage,messagesPendings,idUser,idContact,idChat)]

    }

}