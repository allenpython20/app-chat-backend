import { Schema, model } from "mongoose";
import { ModelContactEnum } from "../enums/model-contact.enum";
import { MessageModelEnum } from "../enums/model-message.enum";


const messageSchema = new Schema({

    body : {
        type:String,
        required:true
    },
    caption : {
        type:String,
    },
    type : {
        type:String,
        enum: MessageModelEnum.types
    },
    msgTime : {
        type:Number,
        required:true
    },
    idChat : {
        type:String,
        required:true
    },
    author: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },

})

export const MessageModel = model('Message',messageSchema)