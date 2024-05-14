

export class UserRegisterDto{


    private constructor(

        public email : string,
        public name: string,
        public password: string
    ){}

    static create(object:{ [key:string] : any }):[string?,UserRegisterDto?]{

        const {email,name,password} = object

        if(!email) return ['Email required',undefined]
        if(!name) return ['Name required',undefined]
        if(!password) return ['Passowrd required',undefined]
        if(password.length < 4) return ['Passowrd length better 4 letters or more',undefined]

        return [ undefined, new UserRegisterDto(email,name,password) ]

    }

}