import { MessageModelEnum } from "../../data/mongo";
import { Dto } from "../types/dto.type";


export class CreateMessageDto {

    private constructor(
        public body:string,
        public caption: string,
        public type:string,
        public msgTime: number,
        public idChat:string,
        public author:string
    ){}

    static create(object:Dto):[string?,CreateMessageDto?]{
        const {body,caption='',fromMe,type,idChat,user} = object

        if(!body) return ['body is required']
        if(!type) return ['type is required']
        if(!MessageModelEnum.types.includes(type)) return [`type must be ${MessageModelEnum.types}`]
        if(!user) return ['user is required']
        if(!idChat) return ['idChat is required']
        const author = user.id
        const msgTime = Date.now();

        return [undefined,new CreateMessageDto(body,caption,type,msgTime,idChat,author)]
    }

}