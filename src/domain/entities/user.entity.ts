import { Entity } from "../types/entity.type"

export class UserEntity {

    constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly email:string,
        public readonly password:string,
        public readonly role:string[],
        public readonly img:string

    ){ }
    
    static fromObject(object: Entity){


        const {id,_id,password,name,email,role,img} = object

        return new UserEntity(id||_id,name,email,password,role,img)

    }
}