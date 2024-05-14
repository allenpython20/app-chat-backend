import { Entity } from "../types/entity.type"

export class UserEntity {

    constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly email:string,
        public readonly password:string,
        public readonly role:string[],


    ){ }
    
    static fromObject(object: Entity){


        const {id,_id,password,name,email,role} = object

        return new UserEntity(id||_id,name,email,password,role)

    }
}