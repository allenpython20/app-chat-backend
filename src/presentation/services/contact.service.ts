
import { ContactModel, UserModel } from "../../data/mongo";
import { ContactCreateDto, CustomError, ErrorMessages, GeneralMessages } from "../../domain";



export class ContactService {


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

        


            const contact = new ContactModel(contactCreateDto)
            await contact.save()

            return contact

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }

}