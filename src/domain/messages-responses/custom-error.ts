

export class CustomError extends Error{


    constructor(
        public readonly status:number,
        public readonly message:string
    ){
        super(message)
    }

    static badRequest(error:string){
        return new CustomError(400,error)
    }

    static internalServer(error:string='Internal server error'){
        return new CustomError(500,error)
    }

    static unauthorized(error:string){
        return new CustomError(401,error)
    }

}