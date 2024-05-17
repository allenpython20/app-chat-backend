import mongoose, { Schema, model } from "mongoose";
import { ModelContactEnum } from "../enums/model-contact.enum";


const contactsSchema = new Schema({

    type : {
        type:String,
        enum: ModelContactEnum.types
    },
    alias : {
        type:String,
    },
    lastMessage: {
        type:Schema.Types.ObjectId,
        ref: 'Message',

    },
    messagesPendings: {
        type:Number
    },
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    idContact: {
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
    idChat: {
        type:String,
        required:true
    },


})

contactsSchema.pre('save', function (next) {
    this.lastMessage == null ? this.lastMessage = new mongoose.Types.ObjectId  : null
    next()
  })

export const ContactModel = model('Contact',contactsSchema)