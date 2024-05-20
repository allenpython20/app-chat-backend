
import mongoose from "mongoose";
import { ContactModel, UserModel } from "../../data/mongo";
import { ContactCreateDto, ContactEntity, CustomError, ErrorMessages, GeneralMessages, MessageEntity } from "../../domain";



export class ContactService {

    async getContacts(idUser:string){
        try {

            const contacts = await ContactModel.find({user:idUser}).populate('lastMessage')
           
    
            const contactsEntities = contacts.map( (contact) =>  ContactEntity.fromObject(contact) )
     
            return contactsEntities

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    async createContact(contactCreateDto:ContactCreateDto){

        //validar que  el idContact sea de un usuario existente
        const contactExists = await UserModel.findById(contactCreateDto.idContact)
        if(!contactExists){
            throw CustomError.badRequest('El idContact debe ser de un usuario existente')
        }

        //validar que el contacto no existe para el usuario que hace la peticion
        const contact = await ContactModel.findOne({idContact:contactCreateDto.idContact,idChat:contactCreateDto.idChat})
        if(contact){
            throw CustomError.badRequest(`Ya existe el contacto con id ${contactCreateDto.idContact}`)
        }

        try {
           
            if(!contactCreateDto.alias){
                contactCreateDto.alias = contactExists.name
            }

            const contact = new ContactModel(contactCreateDto)

            await contact.save()

            const newContact = await contact.populate('lastMessage')
          
            return ContactEntity.fromObject(newContact)

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

}