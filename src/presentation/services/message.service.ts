import { ContactModel } from "../../data/mongo";
import { MessageModel } from "../../data/mongo/models/message.model";
import { CreateMessageDto, CustomError, MessageEntity } from "../../domain";
import { WssService } from "./wss.service";


export class MessageService{

    constructor(
        private readonly wssService = WssService.instance
    ){}

    async getMessages(idChat:string){

        try{
            const messages = await MessageModel.find({idChat})

            const messagesEntities = messages.map( (message) => MessageEntity.fromObject(message) )

           

            return messagesEntities

        }catch(error){
            throw CustomError.internalServer(`${error}`)
        }
      
    }

    async getMessagesById(idChat:string){

        try{

        
            const messages = await MessageModel.find({idChat})
            const messagesEntities = messages.map( (message) => MessageEntity.fromObject(message) )

            return messagesEntities

        }catch(error){
            throw CustomError.internalServer(`${error}`)
        }
      
    }

    async createMessage(createMessageDto:CreateMessageDto){

        const contactExists = await ContactModel.findOne({idChat:createMessageDto.idChat,user:createMessageDto.author})
        if(!contactExists) throw CustomError.badRequest(`No existe el chat con id ${createMessageDto.idChat}`)

        try {
            const message = new MessageModel(createMessageDto)
            


            //actualizar el ultimo mensaje del contacto
            const messagesPendings = (contactExists.messagesPendings || 0) + 1
            contactExists.messagesPendings = messagesPendings
         
            await Promise.all([
                message.save(),
                ContactModel.updateMany(
                    { idChat: createMessageDto.idChat }, // Condición
                    { lastMessage: message.id } // Nuevos valores
                ),
                contactExists.save()
            ])

            const messageEntity = MessageEntity.fromObject(message)
            this.createMessageWss({
                message:messageEntity,
                messagesPendings
            })


            return messageEntity

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

    private createMessageWss(data:{message:MessageEntity,messagesPendings:number}){
        this.wssService.sendMessage('on-new-message',data)
    }

}