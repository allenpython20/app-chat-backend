

export class UserLoginDto {

    constructor(
        public readonly email:string,
        public readonly password : string
    ){}

    static create(object:{ [key:string]:any }):[string?,UserLoginDto?]{

        const {email,password} = object

        if(!email) return ['Email requerido']
        if(!password) return ['Password requerido']

        return [undefined,new UserLoginDto(email,password)]
    }

}