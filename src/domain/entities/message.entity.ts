import { Entity } from "../types/entity.type";


export class MessageEntity {

    constructor(
        public readonly id:string,
        public readonly body:string,
        public readonly type:string,
        public readonly msgTime:number,
        public readonly idChat:string,
        public readonly author:string
    ){

    }

    static fromObject(object:Entity){

        const {id,_id,body,type,msgTime,idChat,author} = object


        return new MessageEntity(id||_id,body,type,msgTime,idChat,author as string)


    }

}