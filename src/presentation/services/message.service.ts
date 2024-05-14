import { ContactModel } from "../../data/mongo";
import { MessageModel } from "../../data/mongo/models/message.model";
import { CreateMessageDto, CustomError, MessageEntity } from "../../domain";


export class MessageService{

    async getMessages(idChat:string){

        try{
            const messages = await MessageModel.find({idChat})

            const messagesEntities = messages.map( (message) => MessageEntity.fromObject(message) )

            console.log(messagesEntities)

            return messagesEntities

        }catch(error){
            throw CustomError.internalServer(`${error}`)
        }
      
        

    }

    async createMessage(createMessageDto:CreateMessageDto){

        const contactExists = await ContactModel.findOne({idChat:createMessageDto.idChat})

        if(!contactExists) throw CustomError.badRequest(`No existe el chat con id ${createMessageDto.idChat}`)

        try {
            const message = new MessageModel(createMessageDto)
            await message.save()
            return MessageEntity.fromObject(message)

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

}