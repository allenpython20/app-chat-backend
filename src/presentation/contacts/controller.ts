import { Request, Response } from "express";

import { ContactCreateDto, CustomError, ErrorMessages, GeneralMessages } from "../../domain";
import { ContactService } from "../services/contact.service";
  
export class ContactsController {
    
    constructor(
        public readonly contactService:ContactService
    ){}

    public createContact = (req:Request,res:Response)=>{

        const [error,contactCreateDto] = ContactCreateDto.create(req.body)

        if(error) return GeneralMessages.badRequest(error,res)

      
        this.contactService.createContact(contactCreateDto!)
            .then( resp =>  GeneralMessages.create(resp,res)  )
            .catch( err=> ErrorMessages.handleError(err,res) )
    
       

 
    }
  

}