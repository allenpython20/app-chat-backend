import { Entity } from "../types/entity.type";
import { MessageEntity } from "./message.entity";


export class ContactEntity {

    constructor(
 
        public readonly id:string,
        public readonly alias : string,
        public readonly lastMessage : {},
        public readonly type:string,
        public readonly messagesPendings:number,
        public readonly idContact:string,
        public readonly idChat:string,
        public readonly img:string,
    ){

    }

    static fromObject(object:Entity){

        const {id,_id,alias='',lastMessage,messagesPendings,type,idContact,idChat,img} = object      

        let lastMessageEntity = {}

      
        if(lastMessage){
          
            lastMessageEntity =  MessageEntity.fromObject(lastMessage)
        }

        return new ContactEntity(id||_id,alias,lastMessageEntity,type,messagesPendings,idContact,idChat,img)


    }

}