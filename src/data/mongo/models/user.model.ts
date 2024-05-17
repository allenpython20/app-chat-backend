import { Schema,model } from "mongoose";
import { EnumUserModel } from "../enums/enum-model-user";



const userSchema = new Schema({
    name: {
        type: String,
        required: [true,'name is requiered']
    },
    email: {
        type: String,
        required: [true,'email is requiered'],
        unique:true
    },
    emailValidated: {
        type: Boolean,
        default: false
    },
    password: {
        type:String,
        required: [true,'email is requiered'],
    },
    img: {
        type:String,
    },
    role: {
        type:[String],
        default: EnumUserModel.roles[0],
        enum: EnumUserModel.roles
    }
})

export const UserModel = model('User',userSchema)