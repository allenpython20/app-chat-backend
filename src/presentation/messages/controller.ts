import { Request, Response } from "express";
import { CreateMessageDto, ErrorMessages, GeneralMessages } from "../../domain";
import { MessageService } from "../services/message.service";


export class MessagesController {

    constructor(
        private readonly messagesService:MessageService
    ){}
    
    getMessages = (req:Request,res:Response) => {
       this.messagesService.getMessages(req.body.idChat)
        .then( resp => GeneralMessages.getData(resp,res) )
    }

    createMessage = (req:Request,res:Response) => {

        const [error,createMessageDto] = CreateMessageDto.create(req.body)

        if(error) return GeneralMessages.badRequest(error,res)

        this.messagesService.createMessage(createMessageDto!)
            .then( resp => GeneralMessages.create(resp,res) )
            .catch( error => ErrorMessages.handleError(error,res) )
    }

}